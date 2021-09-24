import * as ownUtils from './own_utils/index';

/**
 * Module containing the Resource class and its subclasses.
 * Every resource contains or points to a file to be used as a template or to be included
 *  as an append/prepend document (in case of pdf output).
 *
 * ## Resource creation
 *
 * [[Resource]] is the base class which should not be constructed.
 * The recommended way of obtaining a [[Resource]] is through the static from_... methods
 *  (e.g. `Resource.from_local_file`),
 * alternatively, the [[Resource]] subclasses can be constructed to form a valid `Resource`.
 */

/** The abstract base class for the resources */
export abstract class Resource {
    data: string | Buffer;
    filetype: string;

    /**
     * Create a new Resource.
     * @param data the data for this Resource.
     * @param filetype the filetype of this Resource.
     */
    constructor(data: string | Buffer, filetype: string) {
        this.data = data;
        this.filetype = filetype;
    }

    /**
     * @returns the mime type of the Resource.
     */
    mimetype(): string {
        return ownUtils.extensionToMimetype(this.filetype);
    }

    /**
     * @returns the dictionary representation of this Resource.
     */
    templateDict(): { [key: string]: string } {
        return { template_type: this.filetype };
    }

    /**
     * @returns the dictionary representation of this Resource for use as a secondary file
     *  (prepend, append, insert, as subtemplate).
     */
    secondaryFileDict(): { [key: string]: string } {
        return {
            mime_type: this.mimetype(),
            filename: this.data as string,
        };
    }

    /**
     * Create a RawResource from raw file data.
     * @param rawData the raw data as a Buffer object.
     * @param filetype the file type (extension).
     * @returns the created RawResource.
     */
    static fromRaw(rawData: Buffer, filetype: string): RawResource {
        return new RawResource(rawData, filetype);
    }

    /**
     * Create a Base64Resource from a base64 string.
     * @param base64string the base64 encoded representation of a file.
     * @param filetype the file type (extension).
     * @returns the created Base64Resource.
     */
    static fromBase64(base64string: string, filetype: string): Base64Resource {
        return new Base64Resource(base64string, filetype);
    }

    /* cop-node-only-start */
    /**
     * Create a Base64Resource with the contents of a local file.
     * The filetype is determined by the extension of the file.
     * @param localPath the path to local file.
     * @returns the created Base64Resource.
     */
    static fromLocalFile(localPath: string): Base64Resource {
        return new Base64Resource(
            ownUtils.readFileAsBase64(localPath),
            ownUtils.pathToExtension(localPath),
        );
    }
    /* cop-node-only-end */

    /**
     * Create a ServerPathResource targeting a file on the server.
     * The filetype is determined by the extension of the file.
     * @param serverPath the location of target file on the server.
     * @returns the created ServerPathResource.
     */
    static fromServerPath(serverPath: string): ServerPathResource {
        return new ServerPathResource(serverPath);
    }

    /**
     * Create a URLResource targeting a file at the given url.
     * @param url the file url.
     * @param filetype the file type (extension).
     * @returns the created URLResource.
     */
    static fromUrl(url: string, filetype: string): URLResource {
        return new URLResource(url, filetype);
    }

    /**
     * Create an HTMLResource with html data in plain text.
     * Landscape is not supported for prepend/append sources, only for template resources.
     * @param htmlstring the html content.
     * @param landscape whether or not the orientation needs to be landscape. Defaults to false.
     * @returns the created HTMLResource.
     */
    static fromHtml(
        htmlstring: string,
        landscape: boolean = false,
    ): HTMLResource {
        return new HTMLResource(htmlstring, landscape);
    }
}

/** A [[Resource]] containing raw buffer data */
export class RawResource extends Resource {
    /**
     * Create a new RawResource.
     * @param rawData the raw data as a Buffer.
     * @param filetype the file type (extension).
     */
    constructor(rawData: Buffer, filetype: string) {
        super(rawData, filetype);
    }

    /**
     * @returns base64 representation of the raw data in `RawResource.data`
     */
    base64(): string {
        return this.data.toString('base64');
    }

    /**
     * @returns the dictionary representation of this Resource.
     */
    templateDict(): {
        template_type: string;
        file: string;
    } {
        return {
            template_type: this.filetype,
            file: this.base64(),
        };
    }

    /**
     * @returns the dictionary representation of this Resource for use as a secondary file
     *  (prepend, append, insert, as subtemplate).
     */
    secondaryFileDict(): {
        mime_type: string;
        file_source: string;
        file_content: string;
    } {
        return {
            mime_type: this.mimetype(),
            file_source: 'base64',
            file_content: this.base64(),
        };
    }
}

/** A [[Resource]] containing base64 data */
export class Base64Resource extends Resource {
    /**
     * Create a new Base64Resource.
     * @param base64string the base64 encoded data.
     * @param filetype the file type (extension).
     */
    constructor(base64string: string, filetype: string) {
        super(base64string, filetype);
    }

    /**
     * @returns the dictionary representation of this Resource.
     */
    templateDict(): {
        template_type: string;
        file: string;
    } {
        return {
            template_type: this.filetype,
            file: this.data as string,
        };
    }

    /**
     * @returns the dictionary representation of this Resource for use as a secondary file
     *  (prepend, append, insert, as subtemplate).
     */
    secondaryFileDict(): {
        mime_type: string;
        file_source: string;
        file_content: string;
    } {
        return {
            mime_type: this.mimetype(),
            file_source: 'base64',
            file_content: this.data as string,
        };
    }
}

/** A [[Resource]] targeting a file on the server */
export class ServerPathResource extends Resource {
    /**
     * Create a new ServerPathResource.
     * @param serverPath the path on the server to target.
     */
    constructor(serverPath: string) {
        super(serverPath, ownUtils.pathToExtension(serverPath));
    }

    /**
     * @returns the dictionary representation of this Resource.
     */
    templateDict(): {
        template_type: string;
        filename: string;
    } {
        return {
            template_type: this.filetype,
            filename: this.data as string,
        };
    }

    /**
     * @returns the dictionary representation of this Resource for use as a secondary file
     *  (prepend, append, insert, as subtemplate).
     */
    secondaryFileDict(): {
        mime_type: string;
        file_source: string;
        filename: string;
    } {
        return {
            mime_type: this.mimetype(),
            file_source: 'file',
            filename: this.data as string,
        };
    }
}

/** A [[Resource]] targeting a file at a URL */
export class URLResource extends Resource {
    /**
     * Create a new URLResource.
     * @param url the URL location of the file.
     * @param filetype the file type (extension).
     */
    constructor(url: string, filetype: string) {
        super(url, filetype);
    }

    /**
     * @returns the dictionary representation of this Resource.
     */
    templateDict(): {
        template_type: string;
        url: string;
    } {
        return {
            template_type: this.filetype,
            url: this.data as string,
        };
    }

    /**
     * @returns the dictionary representation of this Resource for use as a secondary file
     *  (prepend, append, insert, as subtemplate).
     */
    secondaryFileDict(): {
        mime_type: string;
        file_source: string;
        file_url: string;
    } {
        return {
            mime_type: this.mimetype(),
            file_source: 'file',
            file_url: this.data as string,
        };
    }
}

/** A [[Resource]] containing HTML data in plain text */
export class HTMLResource extends Resource {
    landscape: boolean;

    /**
     * Create a new HTMLResource.
     * @param htmlstring the HTML input in plain text.
     * @param landscape Whether or not the HTML should be rendered as landscape-oriented page.
     *  Defaults to false.
     */
    constructor(htmlstring: string, landscape: boolean = false) {
        super(htmlstring, 'html');
        this.landscape = landscape;
    }

    /**
     * Either undefined or 'landscape', as is passed in the JSON.
     *
     * If 'landscape', the HTML is rendered as landscape-oriented page.
     * Orientation is not supported for prepend/append sources, only for template resources.
     * @returns the orientation.
     */
    orientation(): string | undefined {
        return this.landscape ? 'landscape' : undefined;
    }

    /**
     * @returns the dictionary representation of this Resource.
     */
    templateDict(): {
        template_type: string;
        html_template_content: string;
        orientation?: string;
    } {
        return {
            template_type: this.filetype,
            html_template_content: this.data as string,
            orientation: this.orientation(),
        };
    }

    /**
     * @returns the dictionary representation of this Resource for use as a secondary file
     *  (prepend, append, insert, as subtemplate).
     */
    secondaryFileDict(): {
        mime_type: string;
        file_source: string;
        file_content: string;
    } {
        return {
            mime_type: this.mimetype(),
            file_source: 'file',
            file_content: this.data as string,
        };
    }
}
