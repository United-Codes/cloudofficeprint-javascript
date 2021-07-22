import { extensionToMimetype } from './own_utils';

/**
 * The abstract base class for the resources
 */
export abstract class Resource {
    data: string | Buffer;

    filetype: string;

    /**
     * @param data the data for this resource
     * @param filetype the filetype of this resource
     */
    constructor(data: Buffer, filetype: string) {
        this.data = data;
        this.filetype = filetype;
    }

    /**
     * Resource type as a mime type
     * @returns resource type as a mime type
     */
    mimetype(): string {
        return extensionToMimetype(this.filetype);
    }

    /**
     * Create a Base64Resource from a base64 string and a file type (extension)
     * @param base64string base64 encoded representation of a file
     * @param filetype file type (extension)
     * @returns the created Resource
     */
    // static fromBase64(base64string: string, filetype: string) {
    //     return;
    // }

    /**
     * Create a RawResource from raw file data and a file type (extension)
     * @param rawData raw data as a Buffer object
     * @param filetype file type (extension)
     * @returns the created Resource
     */
    static fromRaw(rawData: Buffer, filetype: string) {
        return new RawResource(rawData, filetype);
    }
}

/**
 * A [[Resource]] containing raw buffer data
 */
export class RawResource extends Resource {
    /**
     * Base64 representation of the raw data in `RawResource.data`
     * @returns base64 representation of the raw data in `RawResource.data`
     */
    base64(): string {
        return this.data.toString('base64');
    }

    /**
     * This Resource object as a dict object for use as a template
     * @returns dict representation of this resource as a template
     */
    templateDict(): { 'template_type': string, 'file': string } {
        return {
            template_type: this.filetype,
            file: this.base64(),
        };
    }

    /**
     * This Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert,as subtemplate)
     * @returns this Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert, as subtemplate)
     */
    secondaryFileDict(): { 'mime_type': string, 'file_source': string, 'file_content': string } {
        return {
            mime_type: this.mimetype(),
            file_source: 'base64',
            file_content: this.base64(),
        };
    }
}
