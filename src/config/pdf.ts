/**
 * Class of optional PDF options.
 * The properties of this class define all possible PDF output options.
 * All of them are optional, which is why passing an instance of this class
 *  in an OutputConfig is also optional.
 */
export class PDFOptions {
    readPassword: string | undefined;
    watermark: string | undefined;
    pageWidth: string | number | undefined;
    pageHeight: string | number | undefined;
    evenPage: boolean | undefined;
    mergeMakingEven: boolean | undefined;
    modifyPassword: string | undefined;
    passwordProtectionFlag: number | undefined;
    lockForm: boolean | undefined;
    copies: number | undefined;
    pageMargin: number | {[key: string]: number} | undefined
    landscape: boolean | undefined;
    pageFormat: string | undefined;
    merge: boolean | undefined;
    signCertificate: string | undefined;
    identifyFormFields: boolean | undefined;
    split: boolean | undefined;

    /**
     * @param readPassword The password needed to open the PDF. Optional.
     * @param watermark Setting this generates a diagonal custom watermark on every
     *  page in the PDF file. Optional.
     * @param pageWidth Only for HTML to PDF. Page width in px, mm, cm, in.
     *  No unit means px. Optional.
     * @param pageHeight Only for HTML to PDF. Page height in px, mm, cm, in.
     *  No unit means px. Optional.
     * @param evenPage If you want your output to have even pages, for example
     *  printing on both sides after merging, you can set this to be true. Optional.
     * @param mergeMakingEven Merge each given document making even paged. Optional.
     * @param modifyPassword The password needed to modify the PDF. Optional.
     * @param passwordProtectionFlag Bit field explained in the PDF specs in table 3.20 in
     *  section 3.5.2, should be given as an integer.
     *  [More info](https://pdfhummus.com/post/147451287581/hummus-1058-and-pdf-writer-updates-encryption). Optional.
     * @param lockForm Locks / flattens the forms in the PDF. Optional.
     * @param copies Repeats the output pdf for the given number of times. Optional.
     * @param pageMargin Only for HTML to PDF. Margin in px. Returns either a dict containing:
     *  { 'top': int, 'bottom': int, 'left': int, 'right': int }
     *  or just an int to be used on all sides. Optional.
     * @param landscape Only for HTML to PDF. If True: the orientation of the output file
     *  is landscape; else portrait (default). Optional.
     * @param pageFormat Only for HTML to PDF. The page format: 'a4' (default)
     *  or 'letter'. Optional.
     * @param merge If True: instead of returning back a zip file for multiple output,
     *  merge it. Optional.
     * @param signCertificate Signing certificate for the output PDF (pkcs #12 .p12/.pfx)
     *  as a base64 string, URL, FTP location or a server path.
     *  The function readFileAsBase64() from file_utils.ts can be used to read local
     *  .p12 or .pfx file as base64. Optional.
     * @param identifyFormFields Identify the form fields in a PDF-form by filling the name
     *  of each field into the respective field. Optional.
     * @param split You can specify to split a PDF in separate files.
     *  You will get one file per page in a zip file. Optional.
     */
    constructor(
        readPassword?: string,
        watermark?: string,
        pageWidth?: string | number,
        pageHeight?: string | number,
        evenPage?: boolean,
        mergeMakingEven?: boolean,
        modifyPassword?: string,
        passwordProtectionFlag?: number,
        lockForm?: boolean,
        copies?: number,
        pageMargin?: number | {[key: string]: number},
        landscape?: boolean,
        pageFormat?: string,
        merge?: boolean,
        signCertificate?: string,
        identifyFormFields?: boolean,
        split?: boolean,
    ) {
        this.readPassword = readPassword;
        this.watermark = watermark;
        this.pageWidth = pageWidth;
        this.pageHeight = pageHeight;
        this.evenPage = evenPage;
        this.mergeMakingEven = mergeMakingEven;
        this.modifyPassword = modifyPassword;
        this.passwordProtectionFlag = passwordProtectionFlag;
        this.lockForm = lockForm;
        this.copies = copies;
        this.pageMargin = pageMargin;
        this.landscape = landscape;
        this.pageFormat = pageFormat;
        this.merge = merge;
        this.signCertificate = signCertificate;
        this.identifyFormFields = identifyFormFields;
        this.split = split;
    }

    /**
     * The dict representation of these PDF options.
     * @returns the dict representation of these PDF options
     */
    asDict(): {[key: string]: string | number | boolean | {[key: string]: number}} {
        const result: {[key: string]: string | number | boolean | {[key: string]: number}} = {};

        if (this.readPassword !== undefined) {
            result.output_read_password = this.readPassword;
        }
        if (this.watermark !== undefined) {
            result.output_watermark = this.watermark;
        }
        if (this.pageWidth !== undefined) {
            result.output_page_width = this.pageWidth;
        }
        if (this.pageHeight !== undefined) {
            result.output_page_height = this.pageHeight;
        }
        if (this.evenPage !== undefined) {
            result.output_even_page = this.evenPage;
        }
        if (this.mergeMakingEven !== undefined) {
            result.output_merge_making_even = this.mergeMakingEven;
        }
        if (this.modifyPassword !== undefined) {
            result.output_modify_password = this.modifyPassword;
        }
        if (this.passwordProtectionFlag !== undefined) {
            result.output_password_protection_flag = this.passwordProtectionFlag;
        }
        if (this.lockForm !== undefined) {
            result.lock_form = this.lockForm;
        }
        if (this.copies !== undefined) {
            result.output_copies = this.copies;
        }
        if (this.pageMargin !== undefined) {
            // For AOP versions later than 21.1.1, output_page_margin will also be supported
            result.page_margin = this.pageMargin;
        }
        if (this.landscape !== undefined) {
            // For AOP versions later than 21.1.1, output_page_orientation will also be supported
            result.page_orientation = this.pageOrientation();
        }
        if (this.pageFormat !== undefined) {
            result.output_page_format = this.pageFormat;
        }
        if (this.merge !== undefined) {
            result.output_merge = this.merge;
        }
        if (this.signCertificate !== undefined) {
            result.output_sign_certificate = this.signCertificate;
        }
        if (this.identifyFormFields !== undefined) {
            result.identify_form_fields = this.identifyFormFields;
        }
        if (this.split !== undefined) {
            result.output_split = this.split;
        }
        return result;
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
                this.pageMargin = {
                    [position]: value,
                };
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
     * @param value the page orientation
     */
    setPageOrientation(value: string) {
        this.landscape = value === 'landscape';
    }
}
