/**
 * Class of optional request option.
 * It holds the information that is used to send request.
 */
export class RequestOption {
    url: string;
    extraHeaders: { [key: string]: string | boolean | number };
    /**
     * 
     * @param url valid url to which the output will be posted. It should start with http:// or https://
     * @param extraHeaders any additional information to be included for the header, like authentication token, file id , access token etc. For this you can create an object array holding information and then assign it to extraHeaders.
     */
    constructor(
        url: string,
        extraHeaders: { [key: string]: string | number | boolean }
    ) {
        this.url = url;
        this.extraHeaders = extraHeaders;
    }
    /**
     * The dict representation of this request option.
     * @returns the dict representation of this  request option
     */
    asDict(): { [key: string]: string | { [key: string]: string | number | boolean } } {
        const result: { [key: string]: string | { [key: string]: string | boolean | number } } = {};
        result.url = this.url;
        result.extra_headers = this.extraHeaders;
        return result;
    }
}