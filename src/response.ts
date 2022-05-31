import * as fs from 'fs';
import { Response as HTTPResponse } from 'node-fetch';
import * as ownUtils from './own_utils';
import { Server } from './config';

/**
 * The IResponse interface serves as a interface for the Cloud Office Print server's
 *  response to a printjob request.
 * The Cloud Office Print server can also throw an error, in which case you will be dealing with
 *  a cloudofficeprint.exceptions.COPError instead of this class.
 */
export interface IResponse {
    /**
     * @returns buffer containing the raw binary data of the response.
     */
    buffer(): Promise<ArrayBuffer>;

    /**
     * @returns mime type of this response
     */
    mimetype(): string | Promise<string>;

    /**
     * @returns file type of this response
     */
    filetype(): string | Promise<string>;

    /**
     * Return the string representation of this buffer.
     * Useful if the server returns a JSON (e.g. for output_type 'count_tags').
     * @returns string representation of this buffer
     */
    toString(): Promise<string>;

    /**
     * Write the response to a file at the given path without extension.
     * If the given file path does not contain an extension,
     *  the correct path is automatically added from the response data.
     * That is how this method is intended to be used.
     * You should only specify the extension in the path if you
     *  have some reason to specify the extension manually.
     * @param path path without extension
     */
    toFile(path: string): void;
}

/**
 * The Response class serves as a container for and interface with the Cloud Office Print server's
 *  response to a printjob request.
 * The Cloud Office Print server can also throw an error, in which case you will be dealing with
 *  a cloudofficeprint.exceptions.COPError instead of this class.
 */
export class Response implements IResponse {
    private readonly _mimetype: string;
    private readonly _buffer: Promise<ArrayBuffer>;

    /**
     * You should never need to construct a Response manually
     * @param response Response object from the node-fetch package
     */
    constructor(response: HTTPResponse) {
        const mimetype = response.headers.get('Content-Type');
        const buffer = response.arrayBuffer();
        if (mimetype === null) {
            throw new Error('Could not get the mimetype from the response.');
        }
        this._mimetype = mimetype;
        this._buffer = buffer;
    }

    /**
     * @returns buffer containing the raw binary data of the response.
     */
    buffer(): Promise<ArrayBuffer> {
        return this._buffer;
    }

    /**
     * @returns mime type of this response
     */
    mimetype(): string {
        return this._mimetype;
    }

    /**
     * @returns file type of this response
     */
    filetype(): string {
        return ownUtils.mimetypeToExtension(this._mimetype);
    }

    /**
     * Return the string representation of this buffer.
     * Useful if the server returns a JSON (e.g. for output_type 'count_tags').
     * @returns string representation of this buffer
     */
    async toString(): Promise<string> {
        return Buffer.from(await this._buffer).toString();
    }

    /* cop-node-only-start */
    /**
     * Write the response to a file at the given path without extension.
     * If the given file path does not contain an extension,
     *  the correct path is automatically added from the response data.
     * That is how this method is intended to be used.
     * You should only specify the extension in the path if you
     *  have some reason to specify the extension manually.
     * @param path path without extension
     */
    async toFile(path: string) {
        let pathCopy = path;
        const pathSplit = pathCopy.split('/');
        const fileName = pathSplit[pathSplit.length - 1];
        if (!(fileName.includes('.'))) {
            pathCopy = `${path}.${this.filetype()}`;
        }
        fs.writeFile(pathCopy, Buffer.from(await this._buffer), (err) => {
            if (err) throw err;
        });
    }
    /* cop-node-only-end */
}

/**
 * A response class for a polled print job. Calling a function of this class, while the print job has
 * not been processed yet, will result in an error.
 */
export class ResponsePolling implements IResponse {
    private response: Promise<Response> | undefined;
    server: Server;
    id: string;
    secretKey: string | undefined;

    /**
     * @param server where the response is located. The response will be downloaded from this server.
     * @param id the unique identifier of the polled print job.
     * @param secretKey The secret key used to encrypt the polled print job. Optional.
     */
    constructor(server: Server, id: string, secretKey?: string) {
        this.server = server;
        this.id = id;
        this. secretKey = secretKey;
    }

    /**
     * Private function responsible for download the response corresponding with the polled print job of id.
     * This function throws an error if the print job is not processed yet, see Server.download().
     * @returns response of the polled print job of id.
     */
    private async getResponse(): Promise<Response> {
        if (this.response === undefined){
            this.response = this.server.download(this.id, this.secretKey);
        }
        return this.response;
    }

    /**
     * @returns buffer containing the raw binary data of the response.
     */
    async buffer(): Promise<ArrayBuffer> {
        return (await this.getResponse()).buffer();
    }

    /**
     * @returns mime type of this response
     */
    async mimetype(): Promise<string> {
        return (await this.getResponse()).mimetype();
    }

    /**
     * @returns file type of this response
     */
    async filetype(): Promise<string> {
        return (await this.getResponse()).filetype();
    }

    /**
     * Return the string representation of this buffer.
     * Useful if the server returns a JSON (e.g. for output_type 'count_tags').
     * @returns string representation of this buffer
     */
    async toString(): Promise<string> {
        return this.getResponse().toString();
    }

    /* cop-node-only-start */
    /**
     * Write the response to a file at the given path without extension.
     * If the given file path does not contain an extension,
     *  the correct path is automatically added from the response data.
     * That is how this method is intended to be used.
     * You should only specify the extension in the path if you
     *  have some reason to specify the extension manually.
     * @param path path without extension
     */
    async toFile(path: string) {
        await (await this.getResponse()).toFile(path);
    }
    /* cop-node-only-end */

    /**
     * Deletes the file corresponding with this polling response of the Cloud Office Print server.
     */
    async delete() {
        await this.server.download(this.id, this.secretKey, true);
    }
}

/**
 * Class for a response of the route paths concerning template hash of the Cloud Office Print server.
 * The following methods will return this class: VerifyTemplateHash, RenewTemplateHash and InvalidateTemplateHash.
 */
export class ResponseTemplateHash {
    valid: boolean;
    status: string;
    hash: string;
    ExpiryDateTime: string | undefined;
    ExpiryTimeRemaining: string | undefined;
    ISOExpiryDateTime: Date | undefined;
    MSExpiryTimeRemaining: number | undefined;

    /**
     * @param valid whether the template hash is valid.
     * @param status of the template hash.
     * @param hash template hash.
     * @param ExpiryDateTime expiry date time of the template hash.
     * @param ExpiryTimeRemaining remaining expiry date time of the template hash.
     * @param ISOExpiryDateTime expiry date time of the template hash in ISO format.
     * @param MSExpiryTimeRemaining remaining expiry time in milliseconds.
     */
    constructor(
        valid: boolean,
        status: string,
        hash: string,
        ExpiryDateTime?: string,
        ExpiryTimeRemaining?: string,
        ISOExpiryDateTime?: Date,
        MSExpiryTimeRemaining?: number,
    ) {
        this.valid = valid;
        this.status = status;
        this.hash = hash;
        this.ExpiryDateTime = ExpiryDateTime;
        this.ExpiryTimeRemaining = ExpiryTimeRemaining;
        this.ISOExpiryDateTime = ISOExpiryDateTime;
        this.MSExpiryTimeRemaining = MSExpiryTimeRemaining;
    }

    /**
     * Static factory function to create a ResponseTemplateHash from the response body.
     * @param response
     */
    static fromResponse(response: string) : ResponseTemplateHash {
        const json: any = JSON.parse(response);
        return new ResponseTemplateHash(
            json.valid,
            json.status,
            json.hash,
            json.expiry_date_time ?? json.new_expiry_date_time,
            json.expiry_time_remaining,
            new Date(json.iso_expiry_date_time),
            json.ms_expiry_time_remaining,
        );
    }
}
