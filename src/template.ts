import { Resource } from './resource';

/** The template class */
export class Template {
    resource: Resource;
    startDelimiter?: string;
    endDelimiter?: string;
    shouldHash?: boolean;
    templateHash?: string;

    /**
     * Create a new template
     * @param resource the resource of this template
     * @param startDelimiter the starting delimiter used in the template
     * @param endDelimiter the ending delimiter used in the template
     * @param shouldHash whether the template should be hashed on the server
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
     * Template type as a mime type
     * @returns Template type as a mime type
     */
    mimetype(): string {
        return this.resource.mimetype();
    }

    /**
     * This Resource object as a dictionary object
     * @returns the dictionary representation of this template
     */
    templateDict(): { [key: string]: string | boolean | undefined } {
        return {
            ...this.resource.templateDict(),
            start_delimiter: this.startDelimiter,
            end_delimiter: this.endDelimiter,
            should_hash: this.shouldHash,
            template_hash: this.templateHash,
        };
    }
}
