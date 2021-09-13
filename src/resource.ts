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

/**
 * The abstract base class for the resources
 */
export abstract class Resource {
    data: string | Buffer;
    filetype: string;
    startDelimiter?: string;
    endDelimiter?: string;

    /**
     * @param data the data for this resource
     * @param filetype the filetype of this resource
     * @param startDelimiter the starting delimiter
     * @param endDelimiter the ending delimiter
     */
    constructor(
        data: string | Buffer,
        filetype: string,
        startDelimiter?: string,
        endDelimiter?: string,
    ) {
        this.data = data;
        this.filetype = filetype;
        this.startDelimiter = startDelimiter;
        this.endDelimiter = endDelimiter;
    }

    /**
     * Resource type as a mime type
     * @returns resource type as a mime type
     */
    mimetype(): string {
        return ownUtils.extensionToMimetype(this.filetype);
    }

    /**
     * This Resource object as a dict object for use as a template
     * @returns dict representation of this resource as a template
     */
    templateDict(): {
        template_type: string;
        start_delimiter?: string;
        end_delimiter?: string;
    } {
        return {
            template_type: this.filetype,
            start_delimiter: this.startDelimiter,
            end_delimiter: this.endDelimiter,
        };
    }

    /**
     * This Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert,as subtemplate)
     * @returns this Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert, as subtemplate)
     */
    secondaryFileDict(): { [key: string]: string } {
        return {
            mime_type: this.mimetype(),
            filename: this.data as string,
        };
    }

    /**
     * Create a RawResource from raw file data and a file type (extension)
     * @param rawData raw data as a Buffer object
     * @param filetype file type (extension)
     * @param startDelimiter the starting delimiter
     * @param endDelimiter the ending delimiter
     * @returns the created Resource
     */
    static fromRaw(
        rawData: Buffer,
        filetype: string,
        startDelimiter?: string,
        endDelimiter?: string,
    ): RawResource {
        return new RawResource(rawData, filetype, startDelimiter, endDelimiter);
    }

    /**
     * Create a Base64Resource from a base64 string and a file type (extension)
     * @param base64string base64 encoded representation of a file
     * @param filetype file type (extension)
     * @param startDelimiter the starting delimiter
     * @param endDelimiter the ending delimiter
     * @returns the created Resource
     */
    static fromBase64(
        base64string: string,
        filetype: string,
        startDelimiter?: string,
        endDelimiter?: string,
    ): Base64Resource {
        return new Base64Resource(
            base64string,
            filetype,
            startDelimiter,
            endDelimiter,
        );
    }

    /* cop-node-only-start */
    /**
     * Create a Base64Resource with the contents of a local file.
     * The filetype is determined by the extension of the file.
     * @param localPath path to local file
     * @param startDelimiter the starting delimiter
     * @param endDelimiter the ending delimiter
     * @returns the created Resource
     */
    static fromLocalFile(
        localPath: string,
        startDelimiter?: string,
        endDelimiter?: string,
    ): Base64Resource {
        return new Base64Resource(
            ownUtils.readFileAsBase64(localPath),
            ownUtils.pathToExtension(localPath),
            startDelimiter,
            endDelimiter,
        );
    }
    /* cop-node-only-end */

    /**
     * Create a ServerPathResource targeting a file on the server.
     * The filetype is determined by the extension of the file.
     * @param serverPath location of target file on the server
     * @param startDelimiter the starting delimiter
     * @param endDelimiter the ending delimiter
     * @returns the created Resource
     */
    static fromServerPath(
        serverPath: string,
        startDelimiter?: string,
        endDelimiter?: string,
    ): ServerPathResource {
        return new ServerPathResource(serverPath, startDelimiter, endDelimiter);
    }

    /**
     * Create a URLResource targeting the file at url with given filetype (extension).
     * @param url file url
     * @param filetype file type (extension)
     * @param startDelimiter the starting delimiter
     * @param endDelimiter the ending delimiter
     * @returns the created Resource
     */
    static fromUrl(
        url: string,
        filetype: string,
        startDelimiter?: string,
        endDelimiter?: string,
    ): URLResource {
        return new URLResource(url, filetype, startDelimiter, endDelimiter);
    }

    /**
     * Create an HTMLResource with html data in plain text.
     * Landscape is not supported for prepend/append sources, only for template resources.
     * @param htmlstring html content
     * @param landscape Whether or not the orientation needs to be landscape. Defaults to false.
     * @param startDelimiter the starting delimiter
     * @param endDelimiter the ending delimiter
     * @returns the created Resource
     */
    static fromHtml(
        htmlstring: string,
        landscape: boolean = false,
        startDelimiter?: string,
        endDelimiter?: string,
    ): HTMLResource {
        return new HTMLResource(
            htmlstring,
            landscape,
            startDelimiter,
            endDelimiter,
        );
    }
}

/**
 * A [[Resource]] containing raw buffer data
 */
export class RawResource extends Resource {
    /**
     * @param rawData raw data as a Buffer
     * @param filetype file type (extension)
     * @param startDelimiter the starting delimiter
     * @param endDelimiter the ending delimiter
     */
    constructor(
        rawData: Buffer,
        filetype: string,
        startDelimiter?: string,
        endDelimiter?: string,
    ) {
        super(rawData, filetype, startDelimiter, endDelimiter);
    }

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
    templateDict(): {
        template_type: string;
        file: string;
        start_delimiter?: string;
        end_delimiter?: string;
    } {
        return {
            template_type: this.filetype,
            file: this.base64(),
            start_delimiter: this.startDelimiter,
            end_delimiter: this.endDelimiter,
        };
    }

    /**
     * This Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert,as subtemplate)
     * @returns this Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert, as subtemplate)
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

/**
 * A [[Resource]] containing base64 data
 */
export class Base64Resource extends Resource {
    /**
     * @param base64string base64 encoded data
     * @param filetype file type (extension)
     * @param startDelimiter the starting delimiter
     * @param endDelimiter the ending delimiter
     */
    constructor(
        base64string: string,
        filetype: string,
        startDelimiter?: string,
        endDelimiter?: string,
    ) {
        super(base64string, filetype, startDelimiter, endDelimiter);
    }

    /**
     * This Resource object as a dict object for use as a template
     * @returns dict representation of this resource as a template
     */
    templateDict(): {
        template_type: string;
        file: string;
        start_delimiter?: string;
        end_delimiter?: string;
    } {
        return {
            template_type: this.filetype,
            file: this.data as string,
            start_delimiter: this.startDelimiter,
            end_delimiter: this.endDelimiter,
        };
    }

    /**
     * This Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert,as subtemplate)
     * @returns this Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert, as subtemplate)
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

/**
 * A [[Resource]] targeting a file on the server
 */
export class ServerPathResource extends Resource {
    /**
     * @param serverPath path on the server to target
     * @param startDelimiter the starting delimiter
     * @param endDelimiter the ending delimiter
     */
    constructor(
        serverPath: string,
        startDelimiter?: string,
        endDelimiter?: string,
    ) {
        super(
            serverPath,
            ownUtils.pathToExtension(serverPath),
            startDelimiter,
            endDelimiter,
        );
    }

    /**
     * This Resource object as a dict object for use as a template
     * @returns dict representation of this resource as a template
     */
    templateDict(): {
        template_type: string;
        filename: string;
        start_delimiter?: string;
        end_delimiter?: string;
    } {
        return {
            template_type: this.filetype,
            filename: this.data as string,
            start_delimiter: this.startDelimiter,
            end_delimiter: this.endDelimiter,
        };
    }

    /**
     * This Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert,as subtemplate)
     * @returns this Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert, as subtemplate)
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

/**
 * A [[Resource]] targeting a file at a URL
 */
export class URLResource extends Resource {
    /**
     * @param url URL location of the file
     * @param filetype file type (extension)
     * @param startDelimiter the starting delimiter
     * @param endDelimiter the ending delimiter
     */
    constructor(
        url: string,
        filetype: string,
        startDelimiter?: string,
        endDelimiter?: string,
    ) {
        super(url, filetype, startDelimiter, endDelimiter);
    }

    /**
     * This Resource object as a dict object for use as a template
     * @returns dict representation of this resource as a template
     */
    templateDict(): {
        template_type: string;
        url: string;
        start_delimiter?: string;
        end_delimiter?: string;
    } {
        return {
            template_type: this.filetype,
            url: this.data as string,
            start_delimiter: this.startDelimiter,
            end_delimiter: this.endDelimiter,
        };
    }

    /**
     * This Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert,as subtemplate)
     * @returns this Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert, as subtemplate)
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

/**
 * A [[Resource]] containing HTML data in plain text
 */
export class HTMLResource extends Resource {
    landscape: boolean;

    /**
     * @param htmlstring HTML input in plain text
     * @param landscape Whether or not the HTML should be rendered as landscape-oriented page.
     *  Defaults to false.
     * @param startDelimiter the starting delimiter
     * @param endDelimiter the ending delimiter
     */
    constructor(
        htmlstring: string,
        landscape: boolean = false,
        startDelimiter?: string,
        endDelimiter?: string,
    ) {
        super(htmlstring, 'html', startDelimiter, endDelimiter);
        this.landscape = landscape;
    }

    /**
     * Either undefined or 'landscape', as is passed in the JSON.
     *
     * If 'landscape', the HTML is rendered as landscape-oriented page.
     * Orientation is not supported for prepend/append sources, only for template resources.
     * @returns orientation
     */
    orientation(): string | undefined {
        return this.landscape ? 'landscape' : undefined;
    }

    /**
     * This Resource object as a dict object for use as a template
     * @returns dict representation of this resource as a template
     */
    templateDict(): {
        template_type: string;
        html_template_content: string;
        orientation?: string;
        start_delimiter?: string;
        end_delimiter?: string;
    } {
        return {
            template_type: this.filetype,
            html_template_content: this.data as string,
            orientation: this.orientation(),
            start_delimiter: this.startDelimiter,
            end_delimiter: this.endDelimiter,
        };
    }

    /**
     * This Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert,as subtemplate)
     * @returns this Resource object as a dict object for use as a secondary file
     *  (prepend, append, insert, as subtemplate)
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
