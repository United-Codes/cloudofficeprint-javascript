import * as ownUtils from '../own_utils/index';

/**
 * Class of optional PDF options.
 * The properties of this class define all possible PDF output options.
 * All of them are optional, which is why passing an instance of this class
 *  in an OutputConfig is also optional.
 */
export class PDFOptions {
    evenPage?: boolean;
    mergeMakingEven?: boolean;
    removeLastPage?: boolean;
    modifyPassword?: string;
    readPassword?: string;
    passwordProtectionFlag?: number;
    watermark?: string;
    watermarkColor?: string;
    watermarkFont?: string;
    watermarkOpacity?: number;
    watermarkSize?: number;
    lockForm?: boolean;
    copies?: number;
    pageMargin?: number | { [key: string]: number };
    landscape?: boolean;
    pageWidth?: string | number;
    pageHeight?: string | number;
    pageFormat?: string;
    merge?: boolean;
    split?: boolean;
    identifyFormFields?: boolean;
    signCertificate?: string;
    signCertificatePassword?: string;

    /**
     * @param evenPage If you want your output to have even pages, for example
     *  printing on both sides after merging, you can set this to be true. Optional.
     * @param mergeMakingEven Merge each given document making even paged. Optional.
     * @param removeLastPage Remove the last page from the given PDF document. Optional.
     * @param modifyPassword The password needed to modify the PDF. Optional.
     * @param readPassword The password needed to open the PDF. Optional.
     * @param passwordProtectionFlag Bit field explained in the PDF specs in table 3.20 in
     *  section 3.5.2, should be given as an integer.
     *  [More info](https://pdfhummus.com/post/147451287581/hummus-1058-and-pdf-writer-updates-encryption). Optional.
     * @param watermark Requires PDF output, generates a diagonal custom watermark on every page of
     *  the PDF file. Optional.
     * @param watermarkColor Requires PDF output, specifies the font of the watermark text
     *  specified, with a default of "black". Optional.
     * @param watermarkFont Requires PDF output, specifies the font of the watermark text
     *  specified, with a default of "Arial". Optional.
     * @param watermarkOpacity Requires PDF output, specifies the opacity of the watermark text
     *  specified, should be as a percentage, i.e. 45. Optional.
     * @param watermarkSize Requires PDF output, specifies the size of watermark text specified,
     *  should be a number in px, i.e. 45. Optional.
     * @param lockForm Locks / flattens the forms in the PDF. Optional.
     * @param copies Repeats the output pdf for the given number of times. Optional.
     * @param pageMargin Only for HTML to PDF. Margin in px. Returns either a dict containing:
     *  { 'top': int, 'bottom': int, 'left': int, 'right': int }
     *  or just an int to be used on all sides. Optional.
     * @param landscape Only for HTML to PDF. If True: the orientation of the output file
     *  is landscape; else portrait (default). Optional.
     * @param pageWidth Only for HTML to PDF. Page width in px, mm, cm, in.
     *  No unit means px. Optional.
     * @param pageHeight Only for HTML to PDF. Page height in px, mm, cm, in.
     *  No unit means px. Optional.
     * @param pageFormat Only for HTML to PDF. The page format: 'a4' (default)
     *  or 'letter'. Optional.
     * @param merge If True: instead of returning back a zip file for multiple output,
     *  merge it. Optional.
     * @param split You can specify to split a PDF in separate files.
     *  You will get one file per page in a zip file. Optional.
     * @param identifyFormFields Identify the form fields in a PDF-form by filling the name
     *  of each field into the respective field. Optional.
     * @param signCertificate Signing certificate for the output PDF (pkcs #12 .p12/.pfx)
     *  as a base64 string, URL, FTP location or a server path.
     *  The function readFileAsBase64() from file_utils.ts can be used to read local
     *  .p12 or .pfx file as base64. Optional.
     * @param signCertificatePassword If you are signing with a password protected certificate,
     *  you can specify the password as a plain string.
     */
    constructor(
        evenPage?: boolean,
        mergeMakingEven?: boolean,
        removeLastPage?: boolean,
        modifyPassword?: string,
        readPassword?: string,
        passwordProtectionFlag?: number,
        watermark?: string,
        watermarkColor?: string,
        watermarkFont?: string,
        watermarkOpacity?: number,
        watermarkSize?: number,
        lockForm?: boolean,
        copies?: number,
        pageMargin?: number | { [key: string]: number },
        landscape?: boolean,
        pageWidth?: string | number,
        pageHeight?: string | number,
        pageFormat?: string,
        merge?: boolean,
        split?: boolean,
        identifyFormFields?: boolean,
        signCertificate?: string,
        signCertificatePassword?: string,
    ) {
        this.evenPage = evenPage;
        this.mergeMakingEven = mergeMakingEven;
        this.removeLastPage = removeLastPage;
        this.modifyPassword = modifyPassword;
        this.readPassword = readPassword;
        this.passwordProtectionFlag = passwordProtectionFlag;
        this.watermark = watermark;
        this.watermarkColor = watermarkColor;
        this.watermarkFont = watermarkFont;
        this.watermarkOpacity = watermarkOpacity;
        this.watermarkSize = watermarkSize;
        this.lockForm = lockForm;
        this.copies = copies;
        this.pageMargin = pageMargin;
        this.landscape = landscape;
        this.pageWidth = pageWidth;
        this.pageHeight = pageHeight;
        this.pageFormat = pageFormat;
        this.merge = merge;
        this.split = split;
        this.identifyFormFields = identifyFormFields;
        this.signCertificate = signCertificate;
        this.signCertificatePassword = signCertificatePassword;
    }

    /**
     * The dict representation of these PDF options.
     * @returns the dict representation of these PDF options
     */
    asDict(): { [key: string]: any } {
        const result: { [key: string]: any } = {};

        if (this.evenPage !== undefined) {
            result.output_even_page = this.evenPage;
        }
        if (this.mergeMakingEven !== undefined) {
            result.output_merge_making_even = this.mergeMakingEven;
        }
        if (this.removeLastPage !== undefined) {
            result.output_remove_last_page = this.removeLastPage;
        }
        if (this.modifyPassword !== undefined) {
            result.output_modify_password = this.modifyPassword;
        }
        if (this.readPassword !== undefined) {
            result.output_read_password = this.readPassword;
        }
        if (this.passwordProtectionFlag !== undefined) {
            result.output_password_protection_flag =
                this.passwordProtectionFlag;
        }
        if (this.watermark !== undefined) {
            result.output_watermark = this.watermark;
        }
        if (this.watermarkColor !== undefined) {
            result.output_watermark_color = this.watermarkColor;
        }
        if (this.watermarkFont !== undefined) {
            result.output_watermark_font = this.watermarkFont;
        }
        if (this.watermarkOpacity !== undefined) {
            result.output_watermark_opacity = this.watermarkOpacity;
        }
        if (this.watermarkSize !== undefined) {
            result.output_watermark_size = this.watermarkSize;
        }
        if (this.lockForm !== undefined) {
            result.lock_form = this.lockForm;
        }
        if (this.copies !== undefined) {
            result.output_copies = this.copies;
        }
        if (this.pageMargin !== undefined) {
            // For Cloud Office Print versions later than 21.1.1 output_page_margin will
            // also be supported
            result.page_margin = this.pageMargin;
        }
        if (this.landscape !== undefined) {
            // For Cloud Office Print versions later than 21.1.1, output_page_orientation will
            // also be supported
            result.page_orientation = this.pageOrientation();
        }
        if (this.pageWidth !== undefined) {
            result.output_page_width = this.pageWidth;
        }
        if (this.pageHeight !== undefined) {
            result.output_page_height = this.pageHeight;
        }
        if (this.pageFormat !== undefined) {
            result.output_page_format = this.pageFormat;
        }
        if (this.merge !== undefined) {
            result.output_merge = this.merge;
        }
        if (this.split !== undefined) {
            result.output_split = this.split;
        }
        if (this.identifyFormFields !== undefined) {
            result.identify_form_fields = this.identifyFormFields;
        }
        if (this.signCertificate !== undefined) {
            result.output_sign_certificate = this.signCertificate;
        }
        if (this.signCertificatePassword !== undefined) {
            result.output_sign_certificate_password =
                this.signCertificatePassword;
        }
        return result;
    }

    /**
     * Set a diagonal custom watermark on every page in the PDF file with a specific text, color,
     *  font, opacity and size.
     * Setting all to undefined will remove the watermark.
     * @param text Specifies the text of the watermark. Optional.
     * @param color Specifies the color of the watermark, with a default of "black". Optional.
     * @param font Specifies the font of the watermark, with a default of "Arial". Optional.
     * @param opacity Specifies the opacity of the watermark, should be as a percentage, i.e. 45.
     *  Optional.
     * @param size Specifies the size of the watermark, should be a number in px, i.e. 45. Optional.
     */
    setWatermark(
        text?: string,
        color?: string,
        font?: string,
        opacity?: number,
        size?: number,
    ) {
        this.watermark = text;
        this.watermarkColor = color;
        this.watermarkFont = font;
        this.watermarkOpacity = opacity;
        this.watermarkSize = size;
    }

    /**
     * Set page margin.
     * Either set the position for all margin positions (if position is None) or set a specific one.
     * @param value page margin in px
     * @param position 'all', 'top', 'bottom', 'left' or 'right'; optional
     */
    setPageMarginAt(value: number, position?: string) {
        if (position !== undefined) {
            if (typeof this.pageMargin === 'object') {
                // page margin is already a dict, add/change this position
                this.pageMargin[position] = value;
            } else if (this.pageMargin === undefined) {
                // page margin not yet defined, set it to a dict with this position defined
                this.pageMargin = { [position]: value };
            } else {
                // page margin defined but no dict, convert to dict first
                const current: number = this.pageMargin;
                this.pageMargin = {
                    top: current,
                    bottom: current,
                    left: current,
                    right: current,
                };
                this.pageMargin[position] = value;
            }
        } else {
            // one value for all margin positions
            this.pageMargin = value;
        }
    }

    /**
     * The page orientation, portrait or landscape.
     * @returns The page orientation, portrait or landscape.
     */
    pageOrientation(): string {
        return this.landscape ? 'landscape' : 'portrait';
    }

    /**
     * Setter for the page orientation.
     * @param orientation the page orientation
     */
    setPageOrientation(orientation: 'landscape' | 'portrait') {
        this.landscape = orientation === 'landscape';
    }

    /**
     * Sign the output PDF with a local certificate file.
     * @param localCertificatePath path to the local certificate file.
     * @param password password of the certificate. Optional.
     */
    sign(localCertificatePath: string, password?: string): void {
        this.signCertificate = ownUtils.readFileAsBase64(localCertificatePath);
        this.signCertificatePassword = password;
    }
}
