import { HttpsProxyAgent } from 'https-proxy-agent';
import { Response as HTTPResponse } from 'node-fetch';
import { COPError } from '../exceptions';
import { Response, PrintJob } from '../index';
const fetch = require('node-fetch').default; // .default is needed for node-fetch to work in a webbrowser

/**
 * This class defines an IP-enabled printer to use with the Cloud Office Print server.
 */
export class Printer {
    location: string;
    version: string;
    requester: string;
    jobName: string;
    returnOutput: boolean;

    /**
     * @param location IP address of the printer
     * @param version IPP version
     * @param requester the name of the requester; defaults to 'Cloud Office Print'
     * @param jobName the name of the print job; defaults to 'Cloud Office Print'
     * @param returnOutput You can specify whether to return the response from AOP server or not. default is false.
     */
    constructor(location: string, version: string, requester: string = 'Cloud Office Print', jobName: string = 'Cloud Office Print', returnOutput: boolean = false) {
        this.location = location;
        this.version = version;
        this.requester = requester;
        this.jobName = jobName;
        this.returnOutput = returnOutput;
    }

    /**
     * The dict representation of this Printer object.
     * @returns The dict representation of this Printer object.
     */
    asDict(): { 'location': string, 'version': string, 'requester': string, 'job_name': string, "return_output": boolean } {
        return {
            location: this.location,
            version: this.version,
            requester: this.requester,
            job_name: this.jobName,
            return_output: this.returnOutput,
        };
    }
}

/**
 * Command object with a single command for the Cloud Office Print server.
 */
export class Command {
    command: string;
    parameters: { [key: string]: string } | undefined;

    /**
     * @param command The name of the command to execute.
     *  This command should be present in the aop_config.json file.
     * @param parameters The parameters for the command. Optional.
     */
    constructor(command: string, parameters?: { [key: string]: string }) {
        this.command = command;
        this.parameters = parameters;
    }

    /**
     * The dict representation of this command.
     * @returns The dict representation of this command.
     */
    asDict(): { [key: string]: string | { [key: string]: string } } {
        const result: { [key: string]: string | { [key: string]: string } } = {
            command: this.command,
        };

        if (this.parameters !== undefined) {
            result.command_parameters = this.parameters;
        }

        return result;
    }

    /**
     * The dict representation of this command, but 'pre' is prepended to the keys.
     *  This is used for pre-conversion commands.
     * @returns dict representation of this command, with 'pre' prepended to the keys
     */
    asDictPre(): { [key: string]: string | { [key: string]: string } } {
        const result: { [key: string]: string | { [key: string]: string } } = {};

        // prepend 'pre_' to the keys
        Object.entries(this.asDict()).forEach(
            ([key, val]) => { result[`pre_${key}`] = val; },
        );

        return result;
    }

    /**
     * The dict representation of this command, but 'post' is prepended to the keys.
     *  This is used for post-process, post-conversion and post-merge commands.
     * @returns dict representation of this command, with 'post' prepended to the keys
     */
    asDictPost(): { [key: string]: string | { [key: string]: string } } {
        const result: { [key: string]: string | { [key: string]: string } } = {};

        // prepend 'post_' to the keys
        Object.entries(this.asDict()).forEach(
            ([key, val]) => { result[`post_${key}`] = val; },
        );

        return result;
    }
}

/**
 * Command hook configuration class.
 */
export class Commands {
    postProcess: Command | undefined;
    postProcessReturn: boolean | undefined;
    postProcessDeleteDelay: number | undefined;
    preConversion: Command | undefined;
    postConversion: Command | undefined;
    postMerge: Command | undefined;

    /**
     * @param postProcess Command to run after the given request has been processed
     *  but before returning back the output file. Optional
     * @param postProcessReturn Whether to return the output or not.
     *  Note this output is Cloud Office Print's output and not the post process command output.
     *  Optional.
     * @param postProcessDeleteDelay Cloud Office Print deletes the file provided to
     *  the command directly after
     *  executing it. This can be delayed with this option. Integer in milliseconds. Optional.
     * @param preConversion Command to run before conversion. Optional.
     * @param postConversion Command to run after conversion. Optional.
     * @param postMerge Command to run after merging has happened. Optional.
     */
    constructor(
        postProcess?: Command,
        postProcessReturn?: boolean,
        postProcessDeleteDelay?: number,
        preConversion?: Command,
        postConversion?: Command,
        postMerge?: Command,
    ) {
        this.postProcess = postProcess;
        this.postProcessReturn = postProcessReturn;
        this.postProcessDeleteDelay = postProcessDeleteDelay;
        this.preConversion = preConversion;
        this.postConversion = postConversion;
        this.postMerge = postMerge;
    }

    /**
     * The dict representation of this Commands object.
     * @returns The dict representation of this Commands object.
     */
    asDict(): {
        [key: string]: {
            [key: string]: string |
            { [key: string]: string } | boolean | number
        }
    } {
        const result: {
            [key: string]: {
                [key: string]: string |
                { [key: string]: string } | boolean | number
            }
        } = {};

        if (this.postProcess !== undefined) {
            const toAdd: {
                [key: string]: string |
                { [key: string]: string } | boolean | number
            } = this.postProcess.asDict();
            if (this.postProcessReturn !== undefined) {
                toAdd.return_output = this.postProcessReturn;
            }
            if (this.postProcessDeleteDelay !== undefined) {
                toAdd.delete_delay = this.postProcessDeleteDelay;
            }
            result.post_process = toAdd;
        }

        if (this.preConversion !== undefined || this.postConversion !== undefined) {
            let toAdd = {};
            if (this.preConversion !== undefined) {
                toAdd = { ...toAdd, ...this.preConversion.asDictPre() };
            }
            if (this.postConversion !== undefined) {
                toAdd = { ...toAdd, ...this.postConversion.asDictPost() };
            }
            result.conversion = toAdd;
        }

        if (this.postMerge !== undefined) {
            result.merge = this.postMerge.asDictPost();
        }

        return result;
    }
}

/**
 * Class for configuring the server options.
 */
export class ServerConfig {
    apiKey: string | undefined;
    logging: { [key: string]: object } | undefined;
    printer: Printer | undefined;
    commands: Commands | undefined;
    proxies: { [key: string]: string } | undefined;
    copRemoteDebug: boolean;

    /**
     * @param apiKey API key to use for communicating with a Cloud Office Print server. Optional.
     * @param logging Additional key/value pairs you would like to have logged into server
     *  printjob.log on the server. (To be used with the --enable_printlog server flag). Optional.
     * @param printer IP printer to use with this server.
     *  See the Cloud Office Print docs for more info and supported printers. Optional.
     * @param commands Configuration for the various command hooks offered. Optional.
     * @param proxies Proxies for contacting the server URL, [as a dictionary](https://requests.readthedocs.io/en/master/user/advanced/#proxies). Optional.
     * @param copRemoteDebug If True: The Cloud Office Print server will log the JSON into
     *  the database and this can bee seen when logged into cloudofficeprint.com. Defaults to False.
     */
    constructor(
        apiKey?: string,
        logging?: { [key: string]: object },
        printer?: Printer,
        commands?: Commands,
        proxies?: { [key: string]: string },
        copRemoteDebug: boolean = false,
    ) {
        this.apiKey = apiKey;
        this.logging = logging;
        this.printer = printer;
        this.commands = commands;
        this.proxies = proxies;
        this.copRemoteDebug = copRemoteDebug;
    }

    /**
     * The dict representation of these server configurations.
     * @returns The dict representation of these server configurations.
     */
    async asDict(): Promise<{ [key: string]: string | { [key: string]: object; } | { location: string; version: string; requester: string; jobName: string; } | { [key: string]: string | number | boolean | { [key: string]: string; }; }; }> {
        let result: {
            [key: string]: string | { [key: string]: object } |
            { location: string; version: string; requester: string; jobName: string; } |
            { [key: string]: string | number | boolean | { [key: string]: string; }; }
        } = {};

        if (this.apiKey !== undefined) result.api_key = this.apiKey;
        if (this.logging !== undefined) result.logging = this.logging;
        if (this.printer !== undefined) {
            result.ipp = this.printer.asDict()
        }
        if (this.copRemoteDebug) result.aop_remote_debug = 'Yes';
        if (this.commands !== undefined) result = { ...result, ...this.commands.asDict() };

        return result;
    }
}

/**
 * This config class is used to specify the Cloud Office Print server to interact with.
 */
export class Server {
    url: string;
    config: ServerConfig | undefined;

    /**
     * @param url server url
     * @param config server configuration
     */
    constructor(url: string, config?: ServerConfig) {
        this.url = url;
        this.config = config;
    }

    /**
     * Contact the server to see if it is reachable.
     * @returns whether the server at `Server.url` is reachable
     */
    async isReachable(): Promise<boolean> {
        try {
            return await fetch(new URL('marco', this.url).href)
                .then((res: HTTPResponse) => res.text()) === 'polo';
        } catch (error) {
            return false;
        }
    }
    /**
     * Checks the status of ipp-printer based on the location of ipp-printer and the verssion
     * @returns whether the ipp-printer is reachable
     */
    async isIppPrinterReachable() {
        try {
            return await fetch(new URL(`ipp_check?ipp_url=${this.config?.printer?.location}&version=${this.config?.printer?.version}`, this.url).href)
                .then((res: HTTPResponse) => res.json().then(jsonBody => jsonBody.statusCode)) === "successful-ok"
        } catch (error) {
            return false;
        }
    }

    /**
     * raise error if server is unreachable
     */
    async raiseIfUnreachable() {
        const isReachable: boolean = await this.isReachable();
        if (!isReachable) throw new Error(`Could not reach server at ${this.url}`);
    }

    /**
     * Sends a GET request to server-url/soffice.
     * @returns current version of Libreoffice installed on the server.
     */
    async getVersionSoffice(): Promise<string> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        const response = await fetch(new URL('soffice', this.url).href, { agent: proxy });
        return response.text();
    }

    /**
     * Sends a GET request to server-url/officetopdf.
     * @returns current version of OfficeToPdf installed on the server.
     *  (Only available if the server runs in Windows environment).
     */
    async getVersionOfficetopdf(): Promise<string> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        const response = await fetch(new URL('officetopdf', this.url).href, { agent: proxy });
        return response.text();
    }

    /**
     * Sends a GET request to server-url/supported_template_mimetypes.
     * @returns JSON of the mime types of templates that Cloud Office Print supports.
     */
    async getSupportedTemplateMimetypes(): Promise<JSON> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        const response = await fetch(new URL('supported_template_mimetypes', this.url).href, { agent: proxy });
        return response.json();
    }

    /**
     * Sends a GET request to server-url/supported_output_mimetypes?template=input_type.
     * Note: You will get empty JSON if the template extension isn't supported.
     * @param inputType extension of file
     * @returns JSON of the supported output types for the given template extension.
     */
    async getSupportedOutputMimetypes(inputType: string): Promise<JSON> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        const response = await fetch(new URL(`supported_output_mimetypes?template=${inputType}`, this.url).href, { agent: proxy });
        return response.json();
    }

    /**
     * Sends a GET request to server-url/supported_prepend_mimetypes.
     * @returns JSON of the supported prepend file mime types.
     */
    async getSupportedPrependMimetypes(): Promise<JSON> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        const response = await fetch(new URL('supported_prepend_mimetypes', this.url).href, { agent: proxy });
        return response.json();
    }

    /**
     * Sends a GET request to server-url/supported_append_mimetypes.
     * @returns JSON of the supported append file mime types.
     */
    async getSupportedAppendMimetypes(): Promise<JSON> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        const response = await fetch(new URL('supported_append_mimetypes', this.url).href, { agent: proxy });
        return response.json();
    }

    /**
     * Sends a GET request to server-url/version.
     * @returns the version of Cloud Office Print that the server runs.
     */
    async getVersionCop(): Promise<string> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        const response = await fetch(new URL('version', this.url).href, { agent: proxy });
        return response.text();
    }

    /**
     * Sends a GET request to server-url/verify_template_hash?hash=hashcode.
     * @param hashcode the hash of the cached template.
     * @returns JSON of the verify status of the given template hash.
     */
    async verifyTemplateHash(hashcode: string): Promise<JSON> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        const response = await fetch(new URL(`verify_template_hash?hash=${hashcode}`, this.url).href, { agent: proxy });
        return response.json();
    }

    /**
     * Sends a GET request to server-url/renew_template_hash?hash=hashcode.
     * @param hashcode the hash of the cached template.
     * @returns JSON of the renew status of the given template hash.
     */
    async renewTemplateHash(hashcode: string): Promise<JSON> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        const response = await fetch(new URL(`renew_template_hash?hash=${hashcode}`, this.url).href, { agent: proxy });
        return response.json();
    }

    /**
     * Sends a GET request to server-url/invalidate_template_hash?hash=hashcode.
     * @param hashcode the hash of the cached template.
     * @returns JSON of the invalidate status of the given template hash.
     */
    async invalidateTemplateHash(hashcode: string): Promise<JSON> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        const response = await fetch(new URL(`invalidate_template_hash?hash=${hashcode}`, this.url).href, { agent: proxy });
        return response.json();
    }

    /**
     * Sends a GET request to server-url/stats.
     * @param accessToken the access token. Optional.
     * @returns JSON of the current statistics of the Cloud Office Print server.
     */
    async getStats(accessToken?: string): Promise<JSON> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        let url = new URL('stats', this.url);
        if (accessToken !== undefined) {
            url.searchParams.append('access_token', accessToken);
        }
        const response = await fetch(url.href, { agent: proxy });
        return response.json();
    }

    /**
     * Sends a GET request to server-url/server_errors.
     * @param latest amount of the latest lines wanted from the error log file. Optional.
     * @param accessToken the access token. Optional.
     * @returns the server errors in log file format.
     */
    async getErrors(latest?: number, accessToken?: string): Promise<string> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        let url = new URL('server_errors', this.url);
        if (latest !== undefined) {
            url.searchParams.append('latest', latest.toString());
        }
        if (accessToken !== undefined) {
            url.searchParams.append('access_token', accessToken);
        }
        const response = await fetch(url.href, { agent: proxy });
        return response.text();
    }

    /**
     * Sends a GET request to server-url/server_printjobs.
     * @param date specified date in the format 'YYYYMMDD'. Optional.
     * @param accessToken the access token. Optional.
     * @returns the server print jobs in log file format.
     */
    async getPrintJobs(date?: string, accessToken?: string): Promise<string> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        let url = new URL('server_printjobs', this.url);
        if (date !== undefined) {
            url.searchParams.append('date', date);
        }
        if (accessToken !== undefined) {
            url.searchParams.append('access_token', accessToken);
        }
        const response = await fetch(url.href, { agent: proxy });
        return response.text();
    }

    /**
     * Sends a GET request to server-url/network_logs.
     * @param date specified date in the format 'YYYYMMDD'. Optional.
     * @param accessToken the access token. Optional.
     * @returns the network logs in log file format.
     */
    async getNetworkLogs(date?: string, accessToken?: string): Promise<string> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        let url = new URL('network_logs', this.url);
        if (date !== undefined) {
            url.searchParams.append('date', date);
        }
        if (accessToken !== undefined) {
            url.searchParams.append('access_token', accessToken);
        }
        const response = await fetch(url.href, { agent: proxy });
        return response.text();
    }

    /**
     * Contact the server to see if the polled print job is processed.
     * @param id the unique identifier of the polled print job.
     * @param secretKey the secret key used to encrypt the polled print job. Optional.
     * @returns whether the polled print job with the given id is processed.
     */
    async isProcessed(id: string, secretKey?: string): Promise<boolean> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        let url = new URL(`download/${id}`, this.url);
        if (secretKey !== undefined) {
            url.searchParams.append('secretkey', secretKey);
        }
        try {
            return !('message' in await fetch(url.href, { agent: proxy })
                .then((res: HTTPResponse) => res.json()));
        } catch (error) {
            return true;
        }
    }

    /**
     * raise error if the polled print job is not processed yet.
     * @param id the unique identifier of the polled print job.
     * @param secretKey the secret key used to encrypt the polled print job. Optional.
     */
    async raiseIfNotProcessed(id: string, secretKey?: string) {
        await this.raiseIfUnreachable();
        const isProcessed: boolean = await this.isProcessed(id, secretKey);
        if (!isProcessed) throw new Error(`The polled print job with id ${id} is not processed yet.`);
    }

    /**
     * Gets a response of the polled print job.
     * @param id the unique identifier of the polled print job.
     * @param secretKey the secret key used to encrypt the polled print job. Optional.
     * @param deleteAfter whether to delete the polled print job after downloading it. Optional.
     * @returns the response of the polled print job with the given id.
     */
    async download(id: string, secretKey?: string, deleteAfter?: boolean): Promise<Response> {
        await this.raiseIfNotProcessed(id, secretKey);
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        let url = new URL(`download/${id}`, this.url);
        if (secretKey !== undefined) {
            url.searchParams.append('secretkey', secretKey);
        }
        if (deleteAfter !== undefined) {
            url.searchParams.append('delete_after_download', deleteAfter.toString());
        }
        return await PrintJob.handleResponse(await fetch(url.href, { agent: proxy }));
    }
}
