const SERVICES: string[] = [
    'dropbox',
    'gdrive',
    'onedrive',
    'aws_s3',
    'sftp',
    'ftp',
];

/**
 * Abstract base class for classes used to specify cloud access information
 *  for outputting to a cloud service.
 */
export abstract class CloudAccessToken {
    service: string;

    /**
     * @param service name of the cloud service
     * @throws error when cloud service is not supported
     */
    constructor(service: string) {
        if (!SERVICES.includes(service)) {
            throw new Error(`Unsupported cloud service: ${service}`);
        }
        this.service = service;
    }

    /**
     * The cloud access token as a dict, for building the JSON.
     * @returns dict representation for this cloud access token
     */
    asDict(): { [key: string]: string | { [key: string]: string | number } } {
        return {
            output_location: this.service,
        };
    }

    /**
     * List all available services.
     * @returns list of available service strings
     */
    static listAvailableServices(): string[] {
        return SERVICES;
    }

    /**
     * Create a token from an OAuth string and service name.
     * @param service cloud service
     * @param token OAuth access token
     * @returns created token
     */
    static fromOAuth(service: string, token: string): OAuthToken {
        return new OAuthToken(service, token);
    }

    /**
     * Create a token from Amazon S3 access key id and secret access key.
     * @param keyId AWS access key ID
     * @param secretKey AWS secret access key
     * @returns created token
     */
    static fromAWS(keyId: string, secretKey: string): AWSToken {
        return new AWSToken(keyId, secretKey);
    }

    /**
     * Create a token from FTP info.
     * When an argument is / defaults to None, no data about it is sent to the Cloud Office Print server.
     * The Cloud Office Print server will then fill in default values.
     * @param host host name or IP address
     * @param port port to use; optional
     * @param user username; optional
     * @param password password for username; optional
     * @returns created token
     */
    static fromFTP(host: string, port?: number, user?: string, password?: string): FTPToken {
        return new FTPToken(host, false, port, user, password);
    }

    /**
     * Create a token from SFTP info.
     * When an argument is / defaults to None, no data about it is sent to the Cloud Office Print server.
     * The Cloud Office Print server will then fill in default values.
     * @param host host name or IP address
     * @param port port to use; optional
     * @param user username; optional
     * @param password password for username; optional
     * @returns created token
     *  This is an FTPToken object, with sftp=True passed into the constructor.
     *  The only difference with FTP is CloudAccessToken.servicename.
     */
    static fromSFTP(host: string, port?: number, user?: string, password?: string): FTPToken {
        return new FTPToken(host, true, port, user, password);
    }
}

/**
 * `CloudAccessToken` to be used for OAuth tokens
 */
export class OAuthToken extends CloudAccessToken {
    token: string;

    /**
     * @param service cloud service
     * @param token OAuth token
     */
    constructor(service: string, token: string) {
        super(service);
        this.token = token;
    }

    /**
     * The cloud access token as a dict, for building the JSON.
     * @returns dict representation for this cloud access token
     */
    asDict(): { [key: string]: string | { [key: string]: string | number } } {
        const result: { [key: string]: string | { [key: string]: string | number } } = super.asDict();
        result.cloud_access_token = this.token;
        return result;
    }
}

/**
 * `CloudAccessToken` to be used for AWS tokens
 */
export class AWSToken extends CloudAccessToken {
    keyId: string;
    secretKey: string;

    /**
     * @param keyId AWS access key ID
     * @param secretKey AWS secret key
     */
    constructor(keyId: string, secretKey: string) {
        super('aws_s3');
        this.keyId = keyId;
        this.secretKey = secretKey;
    }

    /**
     * The cloud access token as a dict, for building the JSON.
     * @returns dict representation for this cloud access token
     */
    asDict(): { [key: string]: string | { [key: string]: string | number } } {
        const result: { [key: string]: string | { [key: string]: string | number } } = super.asDict();
        result.cloud_access_token = {
            access_key: this.keyId,
            secret_access_key: this.secretKey,
        };
        return result;
    }
}

/**
 * `CloudAccessToken` to be used for FTP/SFTP tokens
 */
export class FTPToken extends CloudAccessToken {
    host: string;
    port: number | undefined;
    user: string | undefined;
    password: string | undefined;

    /**
     * @param host Host name or IP address of the FTP/SFTP server.
     * @param sftp whether or not to use SFTP; defaults to false
     * @param port port number of the FTP/SFTP server; optional
     * @param user username for the FTP/SFTP server; optional
     * @param password password for the user; optional
     */
    constructor(host: string,
        sftp: boolean = false,
        port?: number,
        user?: string,
        password?: string) {
        super(sftp ? 'sftp' : 'ftp');
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
    }

    /**
     * The cloud access token as a dict, for building the JSON.
     * @returns dict representation for this cloud access token
     */
    asDict(): { [key: string]: string | { [key: string]: string | number } } {
        const cloudAccessToken: { [key: string]: string | number } = {
            host: this.host,
        };

        if (this.port !== undefined) {
            cloudAccessToken.port = this.port;
        }
        if (this.user !== undefined) {
            cloudAccessToken.user = this.user;
        }
        if (this.password !== undefined) {
            cloudAccessToken.password = this.password;
        }

        const result: { [key: string]: string | { [key: string]: string | number } } = super.asDict();
        result.cloud_access_token = cloudAccessToken;
        return result;
    }
}
