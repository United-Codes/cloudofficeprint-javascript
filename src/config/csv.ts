/**
 * Class of optional csv options.
 * The properties of this class define all possible csv output options.
 * All of them are optional, which is why passing an instance of this class
 *  in an OutputConfig is also optional.
 * These options can be used when the template is xlsx and the output is csv.
 */
export class CsvOptions {
    textDelimiter: string | undefined;
    fieldSeparator: string | undefined;
    characterSet: number | undefined;

    /**
     * @param textDelimiter this option will specify the text delimiter. Can be " or ' (default ").
     * @param fieldSeparator this option will specify the field separator. Default ,.
     *  Can be any ascii character or 'tab' for tab and 'space' for space.
     * @param characterSet this option will determine the character set. Should be an integer.
     *  See: https://wiki.openoffice.org/wiki/Documentation/DevGuide/Spreadsheets/Filter_Options#Filter_Options_for_Lotus.2C_dBase_and_DIF_Filters
     *  for possible values. Default 0 or system encoding.
     */
    constructor(
        textDelimiter?: string,
        fieldSeparator?: string,
        characterSet?: number,
    ) {
        this.textDelimiter = textDelimiter;
        this.fieldSeparator = fieldSeparator;
        this.characterSet = characterSet;
    }

    /**
     * The dict representation of these csv options.
     * @returns the dict representation of these csv options
     */
    asDict(): {[key: string]: string | number} {
        const result: {[key: string]: string | number} = {};

        if (this.textDelimiter !== undefined) {
            result.output_text_delimiter = this.textDelimiter;
        }
        if (this.fieldSeparator !== undefined) {
            result.output_field_separator = this.fieldSeparator;
        }
        if (this.characterSet !== undefined) {
            result.output_character_set = this.characterSet;
        }

        return result;
    }
}
