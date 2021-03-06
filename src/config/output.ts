import { CloudAccessToken } from './cloud';
import { PDFOptions } from './pdf';
import { CsvOptions } from './csv';

/**
 * Class to specify output configuration for a request.
 * This configuration is general and for the entire list of output files.
 */
export class OutputConfig {
    filetype: string | undefined;
    encoding: string;
    converter: string;
    cloudAccessToken: CloudAccessToken | undefined;
    serverDirectory: string | undefined;
    pdfOptions: PDFOptions | undefined;
    csvOptions: CsvOptions | undefined;
    outputAppendPerPage: boolean | undefined;

    /**
     * @param filetype The file type (as extension) to use for the output.
     *  Optional (set to template-type in printjob.ts).
     * @param encoding Encoding of output file. Either "raw" or "base64". Defaults to "raw".
     * @param converter The pdf converter to use. Can be "libreoffice", "officetopdf"
     *  or any custom defined converter. Custom converters are configurated in the
     *  Cloud Office Print server's
     *  `aop_config.json` file. Defaults to "libreoffice".
     * @param cloudAccessToken Access token used to access various cloud services
     *  for output storage. Optional.
     * @param serverDirectory Base directory to save output files into.
     *  Can only be used if the server allows to save on disk.
     *  The specific output path for each file is appended to the base path. Optional.
     * @param pdfOptions Optional PDF options. Optional.
     * @param appendPerPage ability to prepend/append file after each page of output. Optional.
     */
    constructor(
        filetype?: string,
        encoding: string = 'raw',
        converter: string = 'libreoffice',
        cloudAccessToken?: CloudAccessToken,
        serverDirectory?: string,
        pdfOptions?: PDFOptions,
        csvOptions?: CsvOptions,
        appendPerPage?: boolean,
    ) {
        this.filetype = filetype;
        this.encoding = encoding;
        this.converter = converter;
        this.cloudAccessToken = cloudAccessToken;
        this.serverDirectory = serverDirectory;
        this.pdfOptions = pdfOptions;
        this.csvOptions = csvOptions;
        this.outputAppendPerPage = appendPerPage;
    }

    /**
     * The dict representation of this output config.
     * @returns the dict representation of this output config
     */
    asDict(): {
        [key: string]: string | number | boolean | { [key: string]: number } |
        { [key: string]: string | number }
        } {
        let result: {
            [key: string]: string | number | boolean | { [key: string]: number } |
            { [key: string]: string | number }
        } = {
            output_encoding: this.encoding,
            output_converter: this.converter,
        };

        if (this.filetype !== undefined) {
            result.output_type = this.filetype;
        }
        if (this.cloudAccessToken !== undefined) {
            result = { ...result, ...this.cloudAccessToken.asDict() };
        }
        if (this.serverDirectory !== undefined) {
            result.output_directory = this.serverDirectory;
        }
        if (this.pdfOptions !== undefined) {
            result = { ...result, ...this.pdfOptions.asDict() };
        }
        if (this.csvOptions !== undefined) {
            result = { ...result, ...this.csvOptions.asDict() };
        }
        if (this.outputAppendPerPage !== undefined){
            result.output_append_per_page = this.outputAppendPerPage;
        }
        return result;
    }
}
