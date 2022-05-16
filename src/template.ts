import { Base64Resource, HTMLResource, RawResource, Resource, ServerPathResource, URLResource } from './resource';
import * as ownUtils from './own_utils';

export class Template extends Resource {
    resource: Resource;
    startDelimiter: string | undefined;
    endDelimiter: string | undefined;
    shouldHash: boolean | undefined;
    hash: string | undefined;

    constructor(
        resource: Resource,
        startDelimiter?: string,
        endDelimiter?: string,
        shouldHash?: boolean,
        hash?: string,
    ) {
        super(resource.data, resource.filetype);
        this.resource = resource;
        this.startDelimiter = startDelimiter;
        this.endDelimiter = endDelimiter;
        this.shouldHash = shouldHash;
        this.hash = hash;
    }

    resetHash(shouldHash: boolean = true) {
        this.hash = undefined;
        this.shouldHash = shouldHash;
    }

    updateHash(hash: string) {
        this.hash = hash;
        this.shouldHash = false;
    }

    /**
     * This Template object as a dict object.
     * @returns dict representation of this template.
     */
    templateDict(): {[key: string]: string | boolean} {
        let result: {[key: string]: string | boolean};
        if (this.hash !== undefined && this.shouldHash !== true){
            result = {
                template_type: this.resource.filetype,
                template_hash: this.hash,
            }
        }
        else{
            result = this.resource.templateDict();
            if (this.shouldHash !== undefined){
                result.should_hash = this.shouldHash;
            }
            if (this.hash !== undefined){
                result.template_hash = this.hash;
            }
        }
        if (this.startDelimiter !== undefined){
            result.start_delimiter = this.startDelimiter;
        }
        if (this.endDelimiter !== undefined){
            result.end_delimiter = this.endDelimiter;
        }
        return result;
    }

    /**
     * Create a Template from raw file data and a file type (extension)
     * @param rawData raw data as a Buffer object.
     * @param filetype file type (extension).
     * @param startDelimiter the starting delimiter used in the template. Optional.
     * @param endDelimiter the ending delimiter used in the template. Optional.
     * @param shouldHash whether the template should be hashed on the Cloud Office Print server. Optional.
     * @param hash the hash of the template. Optional.
     * @returns the created Template.
     */
    static fromRaw(rawData: Buffer, filetype: string, startDelimiter?: string, endDelimiter?: string, shouldHash?: boolean, hash?: string): Template {
        return new Template(new RawResource(rawData, filetype), startDelimiter, endDelimiter, shouldHash, hash);
    }

    /**
     * Create a Template from a base64 string and a file type (extension)
     * @param base64string base64 encoded representation of a file.
     * @param filetype file type (extension).
     * @param startDelimiter the starting delimiter used in the template. Optional.
     * @param endDelimiter the ending delimiter used in the template. Optional.
     * @param shouldHash whether the template should be hashed on the Cloud Office Print server. Optional.
     * @param hash the hash of the template. Optional.
     * @returns the created Template.
     */
    static fromBase64(base64string: string, filetype: string, startDelimiter?: string, endDelimiter?: string, shouldHash?: boolean, hash?: string): Template {
        return new Template(new Base64Resource(base64string, filetype), startDelimiter, endDelimiter, shouldHash, hash);
    }

    /* cop-node-only-start */
    /**
     * Create a Template with the contents of a local file.
     * The filetype is determined by the extension of the file.
     * @param localPath path to local file.
     * @param startDelimiter the starting delimiter used in the template. Optional.
     * @param endDelimiter the ending delimiter used in the template. Optional.
     * @param shouldHash whether the template should be hashed on the Cloud Office Print server. Optional.
     * @param hash the hash of the template. Optional.
     * @returns the created Template.
     */
    static fromLocalFile(localPath: string, startDelimiter?: string, endDelimiter?: string, shouldHash?: boolean, hash?: string): Template {
        const base64string: string = ownUtils.readFileAsBase64(localPath);
        return new Template(new Base64Resource(base64string, ownUtils.pathToExtension(localPath)), startDelimiter, endDelimiter, shouldHash, hash);
    }
    /* cop-node-only-end */

    /**
     * Create a Template targeting a file on the server.
     * The filetype is determined by the extension of the file.
     * @param serverPath location of target file on the server.
     * @param startDelimiter the starting delimiter used in the template. Optional.
     * @param endDelimiter the ending delimiter used in the template. Optional.
     * @param shouldHash whether the template should be hashed on the Cloud Office Print server. Optional.
     * @param hash the hash of the template. Optional.
     * @returns the created Template.
     */
    static fromServerPath(serverPath: string, startDelimiter?: string, endDelimiter?: string, shouldHash?: boolean, hash?: string): Template {
        return new Template(new ServerPathResource(serverPath), startDelimiter, endDelimiter, shouldHash, hash);
    }

    /**
     * Create a Template targeting the file at url with given filetype (extension).
     * @param url file url.
     * @param filetype file type (extension).
     * @param startDelimiter the starting delimiter used in the template. Optional.
     * @param endDelimiter the ending delimiter used in the template. Optional.
     * @param shouldHash whether the template should be hashed on the Cloud Office Print server. Optional.
     * @param hash the hash of the template. Optional.
     * @returns the created Template.
     */
    static fromUrl(url: string, filetype: string, startDelimiter?: string, endDelimiter?: string, shouldHash?: boolean, hash?: string): Template {
        return new Template(new URLResource(url, filetype), startDelimiter, endDelimiter, shouldHash, hash);
    }

    /**
     * Create a Template with html data in plain text.
     * Landscape is not supported for prepend/append sources, only for template resources.
     * @param htmlstring html content.
     * @param landscape Whether or not the orientation needs to be landscape. Defaults to false.
     * @param startDelimiter the starting delimiter used in the template. Optional.
     * @param endDelimiter the ending delimiter used in the template. Optional.
     * @param shouldHash whether the template should be hashed on the Cloud Office Print server. Optional.
     * @param hash the hash of the template. Optional.
     * @returns the created Template.
     */
    static fromHtml(htmlstring: string, landscape: boolean = false, startDelimiter?: string, endDelimiter?: string, shouldHash?: boolean, hash?: string): Template {
        return new Template(new HTMLResource(htmlstring, landscape), startDelimiter, endDelimiter, shouldHash, hash);
    }
}
