/**
 * Class for optional globalization options.
 * The properties of this class define all possible globalization options.
 * All of them are optional, which is why passing an instance of this class
 *  in an PrintJob is also optional.
 */
export class Globalization {
    dateFormat: string | undefined;
    dateTimeFormat: string | undefined;
    timestampFormat: string | undefined;
    timestampTzFormat: string | undefined;
    direction: string | undefined;
    appPrimaryLanguage: string | undefined;
    nativeLanguageSupport: NativeLanguageSupport;

    /**
     * @param dateFormat this option will specify the date format. Default 'DD-MON-YYYY'.
     * @param dateTimeFormat this option will specify the date time format. Default 'DD-MON-YYYY HH24:MI'.
     * @param timestampFormat this option will specify the timestamp format. Default 'DD-MON-YYYY'.
     * @param timestampTzFormat this option will specify timestamp tz format. Default 'DD-MON-YYYY'.
     * @param direction this option will specify the direction. Default 'ltr'.
     * @param appPrimaryLanguage this option will specify the application primary language. Default 'en'.
     * @param nativeLanguageSupport the native language support options. See NativeLanguageSupport class for default options.
     */
    constructor(
        dateFormat?: string,
        dateTimeFormat?: string,
        timestampFormat?: string,
        timestampTzFormat?: string,
        direction?: string,
        appPrimaryLanguage?: string,
        nativeLanguageSupport?: NativeLanguageSupport,
    ) {
        this.dateFormat = dateFormat;
        this.dateTimeFormat = dateTimeFormat;
        this.timestampFormat = timestampFormat;
        this.timestampTzFormat = timestampTzFormat;
        this.direction = direction;
        this.appPrimaryLanguage = appPrimaryLanguage;
        this.nativeLanguageSupport = nativeLanguageSupport ?? new NativeLanguageSupport();
    }

    /**
     * The dict representation of these globalization options.
     * @returns the dict representation of these globalization options
     */
    asDict(): {[key: string]: string } {
        let result: {[key: string]: string  } = {};

        result = {...result, ...this.nativeLanguageSupport.asDict()};

        if (this.dateFormat !== undefined) {
            result.date_format = this.dateFormat;
        }
        if (this.dateTimeFormat !== undefined) {
            result.date_time_format = this.dateTimeFormat;
        }
        if (this.timestampFormat !== undefined) {
            result.timestamp_format = this.timestampFormat;
        }
        if (this.timestampTzFormat !== undefined) {
            result.timestamp_tz_format = this.timestampTzFormat;
        }
        if (this.direction !== undefined) {
            result.direction = this.direction;
        }
        if (this.appPrimaryLanguage !== undefined) {
            result.application_primary_language = this.appPrimaryLanguage;
        }

        return result;
    }
}

/**
 * Class for optional native language support options.
 * All of them are optional, which is why passing an instance of this class
 * in a Globalization object is also optional.
 */
export class NativeLanguageSupport {
    sort: string | undefined;
    comp: string | undefined;
    numericCharactersDecGrp: string | undefined;
    currency: string | undefined;
    territory: string | undefined;
    language: string | undefined;

    /**
     * @param sort this option will specify native language support sort. Default 'BINARY'.
     * @param comp this option will specify native language support comp. Default 'BINARY'.
     * @param numericCharactersDecGrp this option will specify native language support numeric character decimal group. Default '.,'.
     * @param currency this option will specify native language support currency. Default '$'.
     * @param territory this option will specify native language support territory. Default 'AMERICA'.
     * @param language this option will specify native language support language. Default 'AMERICAN'.
     */
    constructor(
        sort?: string,
        comp?: string,
        numericCharactersDecGrp?: string,
        currency?: string,
        territory?: string,
        language?: string,
    ) {
        this.sort = sort;
        this.comp = comp;
        this.numericCharactersDecGrp = numericCharactersDecGrp;
        this.currency = currency;
        this.territory = territory;
        this.language = language;
    }

    /**
     * The dict representation of these native language support options.
     * @returns the dict representation of these native language support options
     */
    asDict(): {[key: string]: string } {
        const result: { [key: string]: string } = {};

        if (this.sort !== undefined) {
            result.nls_sort = this.sort;
        }
        if (this.comp !== undefined) {
            result.nls_comp = this.comp;
        }
        if (this.numericCharactersDecGrp !== undefined) {
            result.nls_numeric_characters_dec_grp = this.numericCharactersDecGrp;
        }
        if (this.currency !== undefined) {
            result.nls_currency = this.currency;
        }
        if (this.territory !== undefined) {
            result.nls_territory = this.territory;
        }
        if (this.language !== undefined) {
            result.nls_language = this.language;
        }
        return result;
    }
}
