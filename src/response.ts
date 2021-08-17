import * as fs from 'fs';
import { Response as HTTPReponse } from 'node-fetch';
import * as ownUtils from './own_utils';

/**
 * The Response class serves as a container for and interface with the COP server's
 *  response to a printjob request.
 * The COP server can also throw an error, in which case you will be dealing with
 *  an cloudofficeprint.exceptions.COPError instead of this class.
 */
export class Response {
    mimetype: string;
    buffer: Promise<ArrayBuffer>;

    /**
     * You should never need to construct a Response manually
     * @param response Response object from the node-fetch package
     */
    constructor(response: HTTPReponse) {
        const mimetype = response.headers.get('Content-Type');
        const buffer = response.arrayBuffer();
        if (mimetype === null) {
            throw new Error('Could not get the mimetype from the response.');
        }
        this.mimetype = mimetype;
        this.buffer = buffer;
    }

    /**
     * @returns file type of this response
     */
    filetype(): string {
        return ownUtils.mimetypeToExtension(this.mimetype);
    }

    /**
     * Return the string representation of this buffer.
     * Useful if the server returns a JSON (e.g. for output_type 'count_tags').
     * @returns string representation of this buffer
     */
    async toString(): Promise<string> {
        return Buffer.from(await this.buffer).toString();
    }

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
        fs.writeFile(pathCopy, Buffer.from(await this.buffer), (err) => {
            if (err) throw err;
        });
    }
}
