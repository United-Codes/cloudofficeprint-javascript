import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch, { Response as HTTPReponse } from 'node-fetch';
import { OutputConfig, Server } from './config';
import { Element, RESTSource } from './elements';
import { AOPError } from './exceptions';
import { Resource } from './resource';
import { Response } from './response';

export const STATIC_OPTS = {
    tool: 'javascript',
    // 'version': "18.2", # optional: version of AOP JSON format
    javascript_sdk_version: '21.1',
};

/**
 * A print job for a AOP server.
 * This class contains all configuration options, resources, render elements ...
 * and the `PrintJob.execute` method to combine all these and send a request to the AOP server.
 */
export class PrintJob {
    data: Element | RESTSource | {[key: string]: Element};
    server: Server;
    outputConfig: OutputConfig;
    template: Resource;
    subtemplates: {[key: string]: Resource};
    prependFiles: Resource[];
    appendFiles: Resource[];
    aopVerbose: boolean;

    /**
     * @param template Template to use for this print job.
     * @param data This is either: An `Element` (e.g. an `ElementCollection`);
     *  A mapping, containing file names as keys and an `Element` as data.
     *  Multiple files will be produced from the different datas, the result is a zip file
     *  containing them. In the first case, no output file name is specified and
     *  the server will name it "file0".
     * @param server Server to be used for this print job.
     * @param outputConfig Output configuration to be used for this print job.
     *  Defaults to `OutputConfig`().
     * @param subtemplates Subtemplates for this print job, accessible (in docx) through
     *  `{?include subtemplate_dict_key}`. Defaults to {}.
     * @param prependFiles Files to prepend to the output file. Defaults to [].
     * @param appendFiles Files to append to the output file. Defaults to [].
     * @param aopVerbose Whether or not verbose mode should be activated. Defaults to False.
     */
    constructor(
        template: Resource,
        data: Element | RESTSource | {[key: string]: Element},
        server: Server,
        outputConfig: OutputConfig = new OutputConfig(),
        subtemplates: {[key: string]: Resource} = {},
        prependFiles: Resource[] = [],
        appendFiles: Resource[] = [],
        aopVerbose: boolean = false,
    ) {
        this.data = data;
        this.server = server;
        this.outputConfig = outputConfig;
        this.template = template;
        this.subtemplates = subtemplates;
        this.prependFiles = prependFiles;
        this.appendFiles = appendFiles;
        this.aopVerbose = aopVerbose;
    }

    /**
     * Execute this print job.
     * @returns `Response`-object
     */
    async execute(): Promise<Response> {
        await this.server.raiseIfUnreachable();
        let proxy;
        if (this.server.config && this.server.config.proxies) {
            proxy = new HttpsProxyAgent(this.server.config.proxies);
        }
        return PrintJob.handleResponse(
            await fetch(
                this.server.url,
                {
                    method: 'post',
                    body: JSON.stringify(this.asDict()),
                    agent: proxy,
                    headers: { 'Content-type': 'application/json' },
                },
            ),
        );
    }

    /**
     * If you already have the JSON to be sent to the server
     *  (not just the data, but the entire JSON body including your API key and template),
     *  this package will wrap the request to the server.
     * @param jsonData full JSON data that needs to be sent to an AOP server
     * @param server `Server`-object
     * @returns `Response`-object
     */
    static async executeFullJson(jsonData: object, server: Server): Promise<Response> {
        await server.raiseIfUnreachable();
        let proxy;
        if (server.config && server.config.proxies) {
            proxy = new HttpsProxyAgent(server.config.proxies);
        }
        return PrintJob.handleResponse(
            await fetch(
                server.url,
                {
                    method: 'post',
                    body: JSON.stringify(jsonData),
                    agent: proxy,
                    headers: { 'Content-type': 'application/json' },
                },
            ),
        );
    }

    /**
     * Converts the HTML response to a `Response`-object
     * @param res HTML response from the AOP server
     * @returns `Response`-object of HTML response
     * @throws AOPError when response status is not OK
     */
    static async handleResponse(res: HTTPReponse): Promise<Response> {
        if (!(res.ok)) {
            throw new AOPError(await res.text());
        } else {
            return new Response(res);
        }
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict() {
        let result: {[key: string]: any} = { ...STATIC_OPTS };

        // server config goes in the upper level
        if (this.server.config) {
            result = { ...result, ...this.server.config.asDict() };
        }

        // output config goes in "output" and decides where its sub-configs go through its
        //  as_dict property (e.g. PDFConfigs are just appended at this "output" level)
        result.output = this.outputConfig.asDict();
        result.template = this.template.templateDict();

        // If output_type is not specified, set this to the template filetype
        if (!(Object.prototype.hasOwnProperty.call(result.output, 'output_type'))) {
            result.output.output_type = result.template.template_type;
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
            const templatesArray: {[key: string]: string}[] = [];

            Object.entries(this.subtemplates).forEach(
                ([name, res]) => {
                    const toAdd = res.secondaryFileDict();
                    toAdd.name = name;
                    templatesArray.push(toAdd);
                },
            );

            result.templates = templatesArray;
        }

        // If verbose mode is activated, print the result to the terminal
        if (this.aopVerbose) {
            console.log('The JSON data that is sent to the AOP server:\n');
            console.log(JSON.stringify(result, null, 2));
        }

        return result;
    }
}
