import { Resource } from './resource';

/** The Template class */
export class Template {
    resource: Resource;
    startDelimiter?: string;
    endDelimiter?: string;
    shouldHash?: boolean;
    templateHash?: string;

    /**
     * Create a new Template.
     * @param resource the resource of this template.
     * @param startDelimiter the starting delimiter used in the template.
     * @param endDelimiter the ending delimiter used in the template.
     * @param shouldHash whether the template should be hashed on the server.
     * @param templateHash the hash of the template.
     */
    constructor(
        resource: Resource,
        startDelimiter?: string,
        endDelimiter?: string,
        shouldHash?: boolean,
        templateHash?: string,
    ) {
        this.resource = resource;
        this.startDelimiter = startDelimiter;
        this.endDelimiter = endDelimiter;
        this.shouldHash = shouldHash;
        this.templateHash = templateHash;
    }

    /**
     * Update the Template to store a hash.
     * On the next request to the server, the file data will not be sent,
     *  only the hash of the template.
     * @param templateHash the hash of the template.
     */
    updateHash(templateHash: string): void {
        this.templateHash = templateHash;
        this.shouldHash = false;
    }

    /**
     * Reset the stored hash of the template.
     * @param shouldHash whether the template should be hashed on the server, defaults to true.
     */
    resetHash(shouldHash: boolean = true): void {
        this.templateHash = undefined;
        this.shouldHash = shouldHash;
    }

    /**
     * @returns the mime type of the Resource stored in the Template.
     */
    mimetype(): string {
        return this.resource.mimetype();
    }

    /**
     * @returns the dictionary representation of this Template.
     */
    templateDict(): { [key: string]: string | boolean | undefined } {
        if (this.templateHash && !this.shouldHash) {
            return {
                template_type: this.resource.filetype,
                template_hash: this.templateHash,
                start_delimiter: this.startDelimiter,
                end_delimiter: this.endDelimiter,
            };
        }
        return {
            ...this.resource.templateDict(),
            start_delimiter: this.startDelimiter,
            end_delimiter: this.endDelimiter,
            should_hash: this.shouldHash,
            template_hash: this.templateHash,
        };
    }

    /**
     * Create a Template with a RawResource from raw file data.
     * @param rawData the raw data as a Buffer object.
     * @param filetype the file type (extension).
     * @param startDelimiter the starting delimiter used in the template.
     * @param endDelimiter the ending delimiter used in the template.
     * @param shouldHash whether the template should be hashed on the server.
     * @param templateHash the hash of the template.
     * @returns the created Template.
     */
    static fromRaw(
        rawData: Buffer,
        filetype: string,
        startDelimiter?: string,
        endDelimiter?: string,
        shouldHash?: boolean,
        templateHash?: string,
    ): Template {
        return new Template(
            Resource.fromRaw(rawData, filetype),
            startDelimiter,
            endDelimiter,
            shouldHash,
            templateHash,
        );
    }

    /**
     * Create a Template with a Base64Resource from a base64 string.
     * @param base64string the base64 encoded representation of a file.
     * @param filetype the file type (extension).
     * @param startDelimiter the starting delimiter used in the template.
     * @param endDelimiter the ending delimiter used in the template.
     * @param shouldHash whether the template should be hashed on the server.
     * @param templateHash the hash of the template.
     * @returns the created Template.
     */
    static fromBase64(
        base64string: string,
        filetype: string,
        startDelimiter?: string,
        endDelimiter?: string,
        shouldHash?: boolean,
        templateHash?: string,
    ): Template {
        return new Template(
            Resource.fromBase64(base64string, filetype),
            startDelimiter,
            endDelimiter,
            shouldHash,
            templateHash,
        );
    }

    /**
     * Create a Template with a Base64Resource from the contents of a local file.
     * The filetype is determined by the extension of the file.
     * @param localPath the path to the local file.
     * @param startDelimiter the starting delimiter used in the template.
     * @param endDelimiter the ending delimiter used in the template.
     * @param shouldHash whether the template should be hashed on the server.
     * @param templateHash the hash of the template.
     * @returns the created Template.
     */
    static fromLocalFile(
        localPath: string,
        startDelimiter?: string,
        endDelimiter?: string,
        shouldHash?: boolean,
        templateHash?: string,
    ): Template {
        return new Template(
            Resource.fromLocalFile(localPath),
            startDelimiter,
            endDelimiter,
            shouldHash,
            templateHash,
        );
    }

    /**
     * Create a Template with a ServerPathResource targeting a file on the server.
     * The filetype is determined by the extension of the file.
     * @param serverPath the location of the target file on the server.
     * @param startDelimiter the starting delimiter used in the template.
     * @param endDelimiter the ending delimiter used in the template.
     * @param shouldHash whether the template should be hashed on the server.
     * @param templateHash the hash of the template.
     * @returns the created Template.
     */
    static fromServerPath(
        serverPath: string,
        startDelimiter?: string,
        endDelimiter?: string,
        shouldHash?: boolean,
        templateHash?: string,
    ): Template {
        return new Template(
            Resource.fromServerPath(serverPath),
            startDelimiter,
            endDelimiter,
            shouldHash,
            templateHash,
        );
    }

    /**
     * Create a Template with a URLResource targeting a file at the given URL.
     * @param url the file URL.
     * @param filetype the file type (extension).
     * @param serverPath the location of the target file on the server.
     * @param startDelimiter the starting delimiter used in the template.
     * @param endDelimiter the ending delimiter used in the template.
     * @param shouldHash whether the template should be hashed on the server.
     * @param templateHash the hash of the template.
     * @returns the created Template.
     */
    static fromUrl(
        url: string,
        filetype: string,
        startDelimiter?: string,
        endDelimiter?: string,
        shouldHash?: boolean,
        templateHash?: string,
    ): Template {
        return new Template(
            Resource.fromUrl(url, filetype),
            startDelimiter,
            endDelimiter,
            shouldHash,
            templateHash,
        );
    }

    /**
     * Create a Template with a HTMLResource from html data in plain text.
     * @param htmlstring the html content.
     * @param landscape whether or not the orientation needs to be landscape. Defaults to false.
     * @param startDelimiter the starting delimiter used in the template.
     * @param endDelimiter the ending delimiter used in the template.
     * @param shouldHash whether the template should be hashed on the server.
     * @param templateHash the hash of the template.
     * @returns the created Template.
     */
    static fromHtml(
        htmlstring: string,
        landscape: boolean = false,
        startDelimiter?: string,
        endDelimiter?: string,
        shouldHash?: boolean,
        templateHash?: string,
    ): Template {
        return new Template(
            Resource.fromHtml(htmlstring, landscape),
            startDelimiter,
            endDelimiter,
            shouldHash,
            templateHash,
        );
    }
}
