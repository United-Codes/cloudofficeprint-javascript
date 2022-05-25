import { HttpsProxyAgent } from 'https-proxy-agent';
import { Response as HTTPResponse } from 'node-fetch';
import { Globalization, OutputConfig, Server } from './config';
import { Element, RESTSource } from './elements';
import { COPError } from './exceptions';
import { Resource } from './resource';
import { IResponse, Response, ResponsePolling } from './response';
import { Template } from './template';

const fetch = require('node-fetch').default; // .default is needed for node-fetch to work in a webbrowser

export const STATIC_OPTS = {
    tool: 'javascript',
    // 'version': "18.2", # optional: version of Cloud Office Print JSON format
    javascript_sdk_version: '21.2.0',
};

/**
 * A print job for a Cloud Office Print server.
 * This class contains all configuration options, resources, render elements ...
 * and the `PrintJob.execute` method to combine all these and send a request to
 * the Cloud Office Print server.
 */
export class PrintJob {
    data: Element | RESTSource | { [key: string]: Element };
    server: Server;
    outputConfig: OutputConfig;
    template: Resource | undefined;
    subtemplates: { [key: string]: Resource };
    prependFiles: Resource[];
    appendFiles: Resource[];
    globalization: Globalization;
    copVerbose: boolean;

    /**
     * @param data This is either: An `Element` (e.g. an `ElementCollection`);
     *  A mapping, containing file names as keys and an `Element` as data.
     *  Multiple files will be produced from the different datas, the result is a zip file
     *  containing them. In the first case, no output file name is specified and
     *  the server will name it "file0".
     * @param server Server to be used for this print job.
     * @param template Template to use for this print job.
     * @param outputConfig Output configuration to be used for this print job.
     *  Defaults to `OutputConfig`().
     * @param subtemplates Subtemplates for this print job, accessible (in docx) through
     *  `{?include subtemplate_dict_key}`. Defaults to {}.
     * @param prependFiles Files to prepend to the output file. Defaults to [].
     * @param appendFiles Files to append to the output file. Defaults to [].
     * @param globalization globalization options to be used for this print job. Optional.
     * @param copVerbose Whether or not verbose mode should be activated. Defaults to False.
     */
    constructor(
        data: Element | RESTSource | { [key: string]: Element },
        server: Server,
        template?: Resource,
        outputConfig: OutputConfig = new OutputConfig(),
        subtemplates: { [key: string]: Resource } = {},
        prependFiles: Resource[] = [],
        appendFiles: Resource[] = [],
        globalization: Globalization = new Globalization(),
        copVerbose: boolean = false,
    ) {
        this.data = data;
        this.server = server;
        this.outputConfig = outputConfig;
        this.template = template;
        this.subtemplates = subtemplates;
        this.prependFiles = prependFiles;
        this.appendFiles = appendFiles;
        this.globalization = globalization;
        this.copVerbose = copVerbose;
    }

    /**
     * Execute this print job.
     * @returns `IResponse`-object
     */
    async execute(): Promise<IResponse> {
        await this.server.raiseIfUnreachable();
        let proxy;
        if (this.server.config && this.server.config.proxies) {
            proxy = new HttpsProxyAgent(this.server.config.proxies);
        }
        const res: HTTPResponse = await fetch(
            this.server.url, {
                method: 'post',
                body: JSON.stringify(this.asDict()),
                agent: proxy,
                headers: { 'Content-type': 'application/json' },
            },
        )
        if (this.template instanceof Template && this.template.shouldHash === true){
            const hash: string | null = res.headers.get("Template-Hash");
            if (hash !== null){
                this.template.updateHash(hash);
            }
        }

        if (this.outputConfig.polling === true){
            return PrintJob.handleResponsePolling(res, this.server);
        }
        return PrintJob.handleResponse(res);
    }

    /**
     * If you already have the JSON to be sent to the server
     *  (not just the data, but the entire JSON body including your API key and template),
     *  this package will wrap the request to the server.
     * @param jsonData full JSON data that needs to be sent to a Cloud Office Print server
     * @param server `Server`-object
     * @returns `IResponse`-object
     */
    static async executeFullJson(jsonData: any, server: Server): Promise<IResponse> {
        await server.raiseIfUnreachable();
        let proxy;
        if (server.config && server.config.proxies) {
            proxy = new HttpsProxyAgent(server.config.proxies);
        }

        const res: HTTPResponse = await fetch(
            server.url, {
                method: 'post',
                body: JSON.stringify(jsonData),
                agent: proxy,
                headers: { 'Content-type': 'application/json' },
            },
        )

        if (jsonData.output?.output_polling === true){
            return PrintJob.handleResponsePolling(res, server);
        }
        return PrintJob.handleResponse(res);
    }

    /**
     * Converts the HTML response to a `Response`-object
     * @param res HTML response from the Cloud Office Print server
     * @returns `Response`-object of HTML response
     * @throws COPError when response status is not OK
     */
    static async handleResponse(res: HTTPResponse): Promise<Response> {
        if (!(res.ok)) {
            throw new COPError(await res.text());
        } else {
            return new Response(res);
        }
    }

    /**
     * Converts the HTML response to a `ResponsePolling`-object
     * @param res HTML response from the Cloud Office Print server
     * @param server to which the request is made.
     * @returns `Response`-object of HTML response
     * @throws COPError when response status is not OK
     */
    static async handleResponsePolling(res: HTTPResponse, server: Server): Promise<ResponsePolling> {
        if (!(res.ok)) {
            throw new COPError(await res.text());
        } else {
            const json: {[key: string]: string} = JSON.parse(await res.text());
            const id: string = json.url.match(/\/download\/([A-Za-z0-9]*)/)![1];
            let secretKey: string | undefined = undefined;
            if (new RegExp(/\/download\/[A-Za-z0-9]*\?secretkey=(.*)/).test(json.url)){
                secretKey = json.url.match(/\/download\/[A-Za-z0-9]*\?secretkey=(.*)/)![1];
            }
            return new ResponsePolling(server, id, secretKey);
        }
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict() {
        let result: { [key: string]: unknown } = { ...STATIC_OPTS };

        // server config goes in the upper level
        if (this.server.config) {
            result = { ...result, ...this.server.config.asDict() };
        }

        // output config goes in "output" and decides where its sub-configs go through its
        //  as_dict property (e.g. PDFConfigs are just appended at this "output" level)
        result.output = this.outputConfig.asDict();

        if (this.template !== undefined) {
            result.template = this.template.templateDict();
        }

        // If output_type is not specified, set this to the template filetype
        // If no template found: default docx
        if (!(Object.prototype.hasOwnProperty.call(result.output, 'output_type'))) {
            if (this.template) {
                (result.output as {
                    [key: string]: string | number | boolean | {
                        [key: string]: number;
                    } | {
                        [key: string]: string | number;
                    };
                })
                    .output_type = (result.template as { [key: string]: string }).template_type;
            } else {
                (result.output as {
                    [key: string]: string | number | boolean | {
                        [key: string]: number;
                    } | {
                        [key: string]: string | number;
                    };
                }).output_type = 'docx';
            }
        }

        if (this.data.constructor === Object) {
            result.files = Array.from(Object.entries(this.data).map(([name, data]) => ({
                filename: name,
                data: data.asDict(),
            })));
        } else if (this.data instanceof RESTSource) {
            result.files = [this.data.asDict()];
        } else {
            result.files = [{ data: (this.data as Element).asDict() }];
        }

        if (this.prependFiles.length > 0) {
            result.prepend_files = Array.from(this.prependFiles.map(
                (value) => value.secondaryFileDict(),
            ));
        }

        if (this.appendFiles.length > 0) {
            result.append_files = Array.from(this.appendFiles.map(
                (value) => value.secondaryFileDict(),
            ));
        }

        if (Object.keys(this.subtemplates).length > 0) {
            const templatesArray: { [key: string]: string }[] = [];

            Object.entries(this.subtemplates).forEach(
                ([name, res]) => {
                    const toAdd = res.secondaryFileDict();
                    toAdd.name = name;
                    templatesArray.push(toAdd);
                },
            );

            result.templates = templatesArray;
        }

        if (this.globalization !== undefined){
            result.globalization = [this.globalization.asDict()];
        }

        // If verbose mode is activated, print the result to the terminal
        if (this.copVerbose) {
            console.log('The JSON data that is sent to the Cloud Office Print server:\n');
            console.log(JSON.stringify(result, null, 2));
        }

        return result;
    }
}
