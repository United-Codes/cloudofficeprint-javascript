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
    nlsSort: string | undefined;
    nlsComp: string | undefined;
    nlsNumericCharactersDecGrp: string | undefined;
    nlsCurrency: string | undefined;
    nlsTerritory: string | undefined;
    nlsLanguage: string | undefined;
    direction: string | undefined;
    appPrimaryLanguage: string | undefined;

    /**
     * @param dateFormat this option will specify the date format. Default 'DD-MON-YYYY'.
     * @param dateTimeFormat this option will specify the date time format. Default 'DD-MON-YYYY HH24:MI'.
     * @param timestampFormat this option will specify the timestamp format. Default 'DD-MON-YYYY'.
     * @param timestampTzFormat this option will specify timestamp tz format. Default 'DD-MON-YYYY'.
     * @param nlsSort this option will specify native language support sort. Default 'BINARY'.
     * @param nlsComp this option will specify native language support comp. Default 'BINARY'.
     * @param nlsNumericCharactersDecGrp this option will specify native language support numeric character decimal group. Default '.,'.
     * @param nlsCurrency this option will specify native language support currency. Default '$'.
     * @param nlsTerritory this option will specify native language support territory. Default 'AMERICA'.
     * @param nlsLanguage this option will specify native language support language. Default 'AMERICAN'.
     * @param direction this option will specify the direction. Default 'ltr'.
     * @param appPrimaryLanguage this option will specify the application primary language. Default 'en'.
     */
    constructor(
        dateFormat?: string,
        dateTimeFormat?: string,
        timestampFormat?: string,
        timestampTzFormat?: string,
        nlsSort?: string,
        nlsComp?: string,
        nlsNumericCharactersDecGrp?: string,
        nlsCurrency?: string,
        nlsTerritory?: string,
        nlsLanguage?: string,
        direction?: string,
        appPrimaryLanguage?: string,
    ) {
        this.dateFormat = dateFormat;
        this.dateTimeFormat = dateTimeFormat;
        this.timestampFormat = timestampFormat;
        this.timestampTzFormat = timestampTzFormat;
        this.nlsSort = nlsSort;
        this.nlsComp = nlsComp;
        this.nlsNumericCharactersDecGrp = nlsNumericCharactersDecGrp;
        this.nlsCurrency = nlsCurrency;
        this.nlsTerritory = nlsTerritory;
        this.nlsLanguage = nlsLanguage;
        this.direction = direction;
        this.appPrimaryLanguage = appPrimaryLanguage;
    }

    /**
     * The dict representation of these globalization options.
     * @returns the dict representation of these globalization options
     */
    asDict(): {[key: string]: string } {
        const result: {[key: string]: string } = {};

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
        if (this.nlsSort !== undefined) {
            result.nls_sort = this.nlsSort;
        }
        if (this.nlsComp !== undefined) {
            result.nls_comp = this.nlsComp;
        }
        if (this.nlsNumericCharactersDecGrp !== undefined) {
            result.nls_numeric_characters_dec_grp = this.nlsNumericCharactersDecGrp;
        }
        if (this.nlsCurrency !== undefined) {
            result.nls_currency = this.nlsCurrency;
        }
        if (this.nlsTerritory !== undefined) {
            result.nls_territory = this.nlsTerritory;
        }
        if (this.nlsLanguage !== undefined) {
            result.nls_language = this.nlsLanguage;
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
