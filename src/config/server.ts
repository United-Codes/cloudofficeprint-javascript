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

export class Commands {

}

export class ServerConfig {

}

export class Server {

}
