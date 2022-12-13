/**
 * Abstract base class for REST datasources.
 */
export abstract class RESTSource {
    datasource: string;
    endpoint: string;
    filename: string | undefined;
    headers: { [key: string]: string }[] | undefined;
    auth: string | undefined;

    /**
     * @param datasource Type of request: graphql or rest.
     * @param endpoint URL of the data source from where the JSON needs to be read.
     * @param filename Name of the output file. Optional.
     * @param headers HTTP headers, e.g. [{"Content-Type":"application/json"},
     *  {"Custom-Auth-Token":"xysazxklj4568asdf46a5sd4f"}]. Optional.
     * @param auth Basic authentication i.e. 'user:password' to compute an Authorization header.
     *  Optional.
     */
    constructor(
        datasource: string,
        endpoint: string,
        filename?: string,
        headers?: { [key: string]: string }[],
        auth?: string,
    ) {
        this.datasource = datasource;
        this.endpoint = endpoint;
        this.filename = filename;
        this.headers = headers;
        this.auth = auth;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): { [key: string]: string | { [key: string]: string }[] } {
        const result: { [key: string]: string | { [key: string]: string }[] } =
            {
                datasource: this.datasource,
                endpoint: this.endpoint,
            };

        if (this.filename !== undefined) {
            result.filename = this.filename;
        }
        if (this.headers !== undefined) {
            result.headers = this.headers;
        }
        if (this.auth !== undefined) {
            result.auth = this.auth;
        }

        return result;
    }
}

/**
 * Class for working with a REST endpoint using a REST request
 */
export class RESTSourceREST extends RESTSource {
    method: string;
    body: string;

    /**
     * @param endpoint URL of the data source from where the JSON needs to be read.
     * @param method HTTP method. Defaults to 'GET'.
     * @param body Body of HTTP request (can be left empty for GET requests). Defaults to ''.
     * @param filename Name of the output file. Optional.
     * @param headers HTTP headers, e.g. [{"Content-Type":"application/json"},
     *  {"Custom-Auth-Token":"xysazxklj4568asdf46a5sd4f"}]. Optional.
     * @param auth Basic authentication i.e. 'user:password' to compute an Authorization header.
     *  Optional.
     */
    constructor(
        endpoint: string,
        method: string = 'GET',
        body: string = '',
        filename?: string,
        headers?: { [key: string]: string }[],
        auth?: string,
    ) {
        super('rest', endpoint, filename, headers, auth);
        this.method = method;
        this.body = body;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): { [key: string]: string | { [key: string]: string }[] } {
        const result: { [key: string]: string | { [key: string]: string }[] } =
            super.asDict();

        result.method = this.method;
        result.body = this.body;

        return result;
    }
}

/**
 * Class for working with a REST endpoint using a GraphQL request
 */
export class RESTSourceGraphQL extends RESTSource {
    query: string;

    /**
     * @param endpoint URL of the data source from where the JSON needs to be read.
     * @param query Graphql query.
     * @param filename Name of the output file. Optional.
     * @param headers HTTP headers, e.g. [{"Content-Type":"application/json"},
     *  {"Custom-Auth-Token":"xysazxklj4568asdf46a5sd4f"}]. Optional.
     * @param auth Basic authentication i.e. 'user:password' to compute an Authorization header.
     *  Optional.
     */
    constructor(
        endpoint: string,
        query: string,
        filename?: string,
        headers?: { [key: string]: string }[],
        auth?: string,
    ) {
        super('graphql', endpoint, filename, headers, auth);
        this.query = query;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): { [key: string]: string | { [key: string]: string }[] } {
        const result: { [key: string]: string | { [key: string]: string }[] } =
            super.asDict();

        result.query = this.query;

        return result;
    }
}
