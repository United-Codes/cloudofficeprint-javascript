import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import urljoin from 'url-join';

/**
 * This class defines an IP-enabled printer to use with the AOP server.
 */
export class Printer {
    location: string;
    version: string;
    requester: string;
    jobName: string;

    /**
     * @param location IP address of the printer
     * @param version IPP version
     * @param requester the name of the requester; defaults to 'AOP'
     * @param jobName the name of the print job; defaults to 'AOP'
     */
    constructor(location: string, version: string, requester: string = 'AOP', jobName: string = 'AOP') {
        this.location = location;
        this.version = version;
        this.requester = requester;
        this.jobName = jobName;
    }

    /**
     * The dict representation of this Printer object.
     * @returns The dict representation of this Printer object.
     */
    asDict(): { location: string, version: string, requester: string, jobName: string } {
        return {
            location: this.location,
            version: this.version,
            requester: this.requester,
            jobName: this.jobName,
        };
    }
}

/**
 * Command object with a single command for the AOP server.
 */
export class Command {
    command: string;
    parameters: {[key: string]: string} | undefined;

    /**
     * @param command The name of the command to execute.
     *  This command should be present in the aop_config.json file.
     * @param parameters The parameters for the command. Optional.
     */
    constructor(command: string, parameters?: {[key: string]: string}) {
        this.command = command;
        this.parameters = parameters;
    }

    /**
     * The dict representation of this command.
     * @returns The dict representation of this command.
     */
    asDict(): {[key: string]: string | {[key: string]: string}} {
        let result: {[key: string]: string | {[key: string]: string}} = {
            command: this.command,
        };

        if (this.parameters !== undefined) {
            result = {
                ...result,
                command_parameters: this.parameters,
            };
        }

        return result;
    }

    /**
     * The dict representation of this command, but 'pre' is prepended to the keys.
     *  This is used for pre-conversion commands.
     * @returns dict representation of this command, with 'pre' prepended to the keys
     */
    asDictPre(): {[key: string]: string | {[key: string]: string}} {
        let result: {[key: string]: string | {[key: string]: string}} = {};

        // prepend 'pre_' to the keys
        Object.entries(this.asDict()).forEach(
            (e) => { result = { ...result, [`pre_${e[0]}`]: e[1] }; },
        );

        return result;
    }

    /**
     * The dict representation of this command, but 'post' is prepended to the keys.
     *  This is used for post-process, post-conversion and post-merge commands.
     * @returns dict representation of this command, with 'post' prepended to the keys
     */
    asDictPost(): {[key: string]: string | {[key: string]: string}} {
        let result: {[key: string]: string | {[key: string]: string}} = {};

        // prepend 'post_' to the keys
        Object.entries(this.asDict()).forEach(
            (e) => { result = { ...result, [`post_${e[0]}`]: e[1] }; },
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
     *  Note this output is AOP's output and not the post process command output. Optional.
     * @param postProcessDeleteDelay AOP deletes the file provided to the command directly after
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
    asDict(): {[key: string]: {[key: string]: string |
        {[key: string]: string} | boolean | number}} {
        let result: {[key: string]: {[key: string]: string |
            {[key: string]: string} | boolean | number}} = {};

        if (this.postProcess !== undefined) {
            let toAdd: {[key: string]: string |
                {[key: string]: string} | boolean | number} = this.postProcess.asDict();
            if (this.postProcessReturn !== undefined) {
                toAdd = { ...toAdd, return_output: this.postProcessReturn };
            }
            if (this.postProcessDeleteDelay !== undefined) {
                toAdd = { ...toAdd, delete_delay: this.postProcessDeleteDelay };
            }
            result = { ...result, post_process: toAdd };
        }

        if (this.preConversion !== undefined || this.postConversion !== undefined) {
            let toAdd = {};
            if (this.preConversion !== undefined) {
                toAdd = { ...toAdd, ...this.preConversion.asDictPre() };
            }
            if (this.postConversion !== undefined) {
                toAdd = { ...toAdd, ...this.postConversion.asDictPost() };
            }
            result = { ...result, conversion: toAdd };
        }

        if (this.postMerge !== undefined) {
            result = { ...result, merge: this.postMerge.asDictPost() };
        }

        return result;
    }
}

/**
 * Class for configuring the server options.
 */
export class ServerConfig {
    apiKey: string | undefined;
    logging: {[key: string]: object} | undefined;
    printer: Printer | undefined;
    commands: Commands | undefined;
    proxies: {[key: string]: string} | undefined;
    aopRemoteDebug: boolean;

    /**
     * @param apiKey API key to use for communicating with an AOP server. Optional.
     * @param logging Additional key/value pairs you would like to have logged into server
     *  printjob.log on the server. (To be used with the --enable_printlog server flag). Optional.
     * @param printer IP printer to use with this server.
     *  See the AOP docs for more info and supported printers. Optional.
     * @param commands Configuration for the various command hooks offered. Optional.
     * @param proxies Proxies for contacting the server URL, [as a dictionary](https://requests.readthedocs.io/en/master/user/advanced/#proxies). Optional.
     * @param aopRemoteDebug If True: The AOP server will log the JSON into the database
     *  and this can bee seen when logged into apexofficeprint.com. Defaults to False.
     */
    constructor(
        apiKey?: string,
        logging?: {[key: string]: object},
        printer?: Printer,
        commands?: Commands,
        proxies?: {[key: string]: string},
        aopRemoteDebug: boolean = false,
    ) {
        this.apiKey = apiKey;
        this.logging = logging;
        this.printer = printer;
        this.commands = commands;
        this.proxies = proxies;
        this.aopRemoteDebug = aopRemoteDebug;
    }

    /**
     * The dict representation of these server configurations.
     * @returns The dict representation of these server configurations.
     */
    asDict(): {[key: string]: string | {[key: string]: object} |
        { location: string; version: string; requester: string; jobName: string; } |
        { [key: string]: string | number | boolean | { [key: string]: string; }; }} {
        let result: {[key: string]: string | {[key: string]: object} |
            { location: string; version: string; requester: string; jobName: string; } |
            { [key: string]: string | number | boolean | { [key: string]: string; }; }} = {};

        if (this.apiKey !== undefined) result = { ...result, api_key: this.apiKey };
        if (this.logging !== undefined) result = { ...result, logging: this.logging };
        if (this.printer !== undefined) result = { ...result, ipp: this.printer.asDict() };
        if (this.aopRemoteDebug) result = { ...result, aop_remote_debug: 'Yes' };
        if (this.commands !== undefined) result = { ...result, ...this.commands.asDict() };

        return result;
    }
}

/**
 * This config class is used to specify the AOP server to interact with.
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
            return await fetch(urljoin(this.url, 'marco'))
                .then((res) => res.text()) === 'polo';
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
        const response = await fetch(urljoin(this.url, 'soffice'), { agent: proxy });
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
        const response = await fetch(urljoin(this.url, 'officetopdf'), { agent: proxy });
        return response.text();
    }

    /**
     * Sends a GET request to server-url/supported_template_mimetypes.
     * @returns JSON of the mime types of templates that AOP supports.
     */
    async getSupportedTemplateMimetypes(): Promise<JSON> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        const response = await fetch(urljoin(this.url, 'supported_template_mimetypes'), { agent: proxy });
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
        const response = await fetch(urljoin(this.url, 'supported_output_mimetypes', `?template=${inputType}`), { agent: proxy });
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
        const response = await fetch(urljoin(this.url, 'supported_prepend_mimetypes'), { agent: proxy });
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
        const response = await fetch(urljoin(this.url, 'supported_append_mimetypes'), { agent: proxy });
        return response.json();
    }

    /**
     * Sends a GET request to server-url/version.
     * @returns the version of AOP that the server runs.
     */
    async getVersionAop(): Promise<string> {
        await this.raiseIfUnreachable();
        let proxy;
        if (this.config && this.config.proxies) {
            proxy = new HttpsProxyAgent(this.config.proxies);
        }
        const response = await fetch(urljoin(this.url, 'version'), { agent: proxy });
        return response.text();
    }
}
