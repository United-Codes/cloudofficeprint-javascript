import { Element } from './elements';

/**
 * Abstract base class for PDF's insertable objects.
 */
export abstract class PDFInsertObject {
    x: number;
    y: number;
    page: number | string;

    /**
     * @param x X component of this object's position.
     * @param y Y component of this object's position.
     * @param page Page to include this object on. Either "all" or an integer. Defaults to "all".
     */
    constructor(x: number, y: number, page: number | string = 'all') {
        this.x = x;
        this.y = y;
        this.page = page;
    }
}

/**
 * Adds text to a PDF
 */
export class PDFText extends PDFInsertObject {
    text: string;
    rotation: number | undefined;
    bold: boolean | undefined;
    italic: boolean | undefined;
    font: string | undefined;
    fontColor: string | undefined;
    fontSize: number | undefined;

    /**
     * @param text Text to insert.
     * @param x  X component of this object's position.
     * @param y Y component of this object's position.
     * @param page Page to include this object on. Either "all" or an integer. Defaults to "all".
     * @param rotation Text rotation in degrees. Optional.
     * @param bold Whether or not the text should be in bold. Optional.
     * @param italic Whether or not the text should be in italic. Optional.
     * @param font The text font name. Optional.
     * @param fontColor The text font color, CSS notation. Optional.
     * @param fontSize The text font size. Optional.
     */
    constructor(
        text: string,
        x: number,
        y: number,
        page: number | string = 'all',
        rotation?: number,
        bold?: boolean,
        italic?: boolean,
        font?: string,
        fontColor?: string,
        fontSize?: number,
    ) {
        super(x, y, page);
        this.text = text;
        this.rotation = rotation;
        this.bold = bold;
        this.italic = italic;
        this.font = font;
        this.fontColor = fontColor;
        this.fontSize = fontSize;
    }

    /**
     * @returns identifier for this PDFInsertObject
     */
    static identifier(): string {
        return 'AOP_PDF_TEXTS';
    }

    /**
     * @returns dict representation of this PDFInsertObject
     */
    asInnerDict(): {[key: string]: string | number | boolean} {
        const result: {[key: string]: string | number | boolean} = {
            text: this.text,
            x: this.x,
            y: this.y,
        };

        if (this.rotation !== undefined) {
            result.rotation = this.rotation;
        }
        if (this.bold !== undefined) {
            result.bold = this.bold;
        }
        if (this.italic !== undefined) {
            result.italic = this.italic;
        }
        if (this.font !== undefined) {
            result.font = this.font;
        }
        if (this.fontColor !== undefined) {
            result.font_color = this.fontColor;
        }
        if (this.fontSize !== undefined) {
            result.font_size = this.fontSize;
        }

        return result;
    }
}

/**
 * Inserts an image into a PDF.
 */
export class PDFImage extends PDFInsertObject {
    image: string;
    rotation: number | undefined;
    width: number | undefined;
    height: number | undefined;
    maxWidth: number | undefined;

    /**
     * @param image The image's base64 string or URL.
     * @param x X component of this object's position.
     * @param y Y component of this object's position.
     * @param page Page to include this object on. Either "all" or an integer. Defaults to "all".
     * @param rotation Rotation in degrees. Optional.
     * @param width Image width in px. Optional.
     * @param height Image height in px. Optional.
     * @param maxWidth Max image height in px (for scaling purposes). Optional.
     */
    constructor(
        image: string,
        x: number,
        y: number,
        page: number | string = 'all',
        rotation?: number,
        width?: number,
        height?: number,
        maxWidth?: number,
    ) {
        super(x, y, page);
        this.image = image;
        this.rotation = rotation;
        this.width = width;
        this.height = height;
        this.maxWidth = maxWidth;
    }

    /**
     * @returns identifier for this PDFInsertObject
     */
    static identifier(): string {
        return 'AOP_PDF_IMAGES';
    }

    /**
     * @returns dict representation of this PDFInsertObject
     */
    asInnerDict(): {[key: string]: string | number} {
        const result: {[key: string]: string | number} = {
            image: this.image,
            x: this.x,
            y: this.y,
        };

        if (this.rotation) {
            result.rotation = this.rotation;
        }
        if (this.width) {
            result.image_width = this.width;
        }
        if (this.height) {
            result.image_height = this.height;
        }
        if (this.maxWidth) {
            result.image_max_width = this.maxWidth;
        }

        return result;
    }
}

/**
 * Group of PDF texts as an `Element`.
 * There can only be one of this `Element`.
 * Element name is fixed and important to the server, so multiple will just overwrite.
 */
export class PDFTexts extends Element {
    texts: PDFText[];

    /**
     * @param texts An iterable consisting of `PDFText`-objects.
     */
    constructor(texts: PDFText[]) {
        super(PDFText.identifier());
        this.texts = texts;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {[key: string]: {[key: string]: {[key: string]: string | number | boolean}[]}[]} {
        const result: {[key: string]: {[key: string]: string | number | boolean}[]} = {};

        this.texts.forEach(
            (txt) => {
                // If there already is text for this page -> update entry in dictionary
                //  else -> create new entry in dictionary
                const pageString: string = txt.page.toString();
                if (Object.prototype.hasOwnProperty.call(result, pageString)) {
                    result[pageString].push(txt.asInnerDict());
                } else {
                    result[pageString] = [txt.asInnerDict()];
                }
            },
        );

        return {
            [this.name]: [result],
        };
    }
}

/**
 * Group of PDF images as an `Element`.
 * There can only be one of this `Element`.
 * Element name is fixed and important to the server, so multiple will just overwrite.
 */
export class PDFImages extends Element {
    images: PDFImage[];

    /**
     * @param images An iterable consisting of `PDFImage`-objects.
     */
    constructor(images: PDFImage[]) {
        super(PDFImage.identifier());
        this.images = images;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {[key: string]: {[key: string]: {[key: string]: string | number | boolean}[]}[]} {
        const result: {[key: string]: {[key: string]: string | number | boolean}[]} = {};

        this.images.forEach(
            (img) => {
                // If there already is image for this page -> update entry in dictionary
                //  else -> create new entry in dictionary
                const pageString: string = img.page.toString();
                if (Object.prototype.hasOwnProperty.call(result, pageString)) {
                    result[pageString].push(img.asInnerDict());
                } else {
                    result[pageString] = [img.asInnerDict()];
                }
            },
        );

        return {
            [this.name]: [result],
        };
    }
}

/**
 * Class used for filling in PDF forms.
 * There can only be one of this `Element`.
 * Element name is fixed and important to the server, so multiple will just overwrite.
 */
export class PDFFormData extends Element {
    formData: {[key: string]: string | boolean | number};

    /**
     * @param formData a dict containing the keys and values of the fields
     *  that need to be entered in the PDF form
     */
    constructor(formData: {[key: string]: string | boolean | number}) {
        super(PDFFormData.identifier());
        this.formData = formData;
    }

    /**
     * @returns identifier for this PDFInsertObject
     */
    static identifier(): string {
        return 'aop_pdf_form_data';
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {[key: string]: {[key: string]: string | boolean | number}} {
        return {
            [this.name]: this.formData,
        };
    }
}

/**
 * Abstract base class for a PDF form element.
 */
export abstract class PDFFormElement extends Element {
    type: string;
    width: number | undefined;
    height: number | undefined;

    /**
     * @param name for this element.
     * @param type of this PDF form element.
     * @param width width in px. Optional.
     * @param height height in px. Optional.
     */
    protected constructor(
        name: string,
        type: string,
        width?: number,
        height?: number,
    ) {
        super(name);
        this.type = type;
        this.width = width;
        this.height = height;
    }

    /**
     * Dictionary representation of the inner dict of a PDFFormElement.
     * @returns dictionary inner representation of this PDFFormElement.
     */
    protected innerDict(): { [key: string]: unknown } {
        let result: { [key: string]: unknown } = {
            "name": this.name,
            "type": this.type,
        };
        if (this.width !== undefined){
            result.width = this.width;
        }
        if (this.height !== undefined){
            result.height = this.height;
        }
        return result;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{?form ${this.name}}`]);
    }
}

/**
 * Class for a PDF form element of type text box.
 */
export class PDFFormTextBox extends PDFFormElement {
    value: string | undefined;

    /**
     * @param name for this element.
     * @param value of the text box. Optional.
     * @param width width in px. Optional.
     * @param height height in px. Optional.
     */
    constructor(
        name: string,
        value?: string,
        width?: number,
        height?: number,
    ) {
        super(name, "text", width, height);
        this.value = value;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: unknown } {
        let result: { [key: string]: unknown } = super.innerDict();
        if (this.value !== undefined){
            result.value = this.value;
        }

        return { [this.name]: result };
    }
}

/**
 * Class for a PDF form element of type check box.
 */
export class PDFFormCheckBox extends PDFFormElement {
    check: boolean | undefined;
    text: string | undefined;

    /**
     * @param name for this element.
     * @param check whether the check box is checked. Optional.
     * @param text used as label for the check box. Optional.
     * @param width width in px. Optional.
     * @param height height in px. Optional.
     */
    constructor(
        name: string,
        check?: boolean,
        text?: string,
        width?: number,
        height?: number,
    ) {
        super(name, "checkbox", width, height);
        this.check = check;
        this.text = text;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: unknown } {
        let result: { [key: string]: unknown } = super.innerDict();
        if (this.check !== undefined){
            result.value = this.check;
        }
        if (this.text !== undefined){
            result.text = this.text;
        }
        return { [this.name]: result };
    }
}

/**
 * Class for a PDF form element of type radio button.
 */
export class PDFFormRadioButton extends PDFFormElement {
    group: string | undefined;
    value: string | undefined;
    text: string | undefined;
    selected: boolean | undefined;

    /**
     * @param name for this element.
     * @param group name of radio buttons that are interconnected. Optional, defaults to "name".
     * @param value of the radio button. Optional.
     * @param text used as label for the radio button. Optional.
     * @param selected whether the radio button is selected. Optional.
     * @param width width in px. Optional.
     * @param height height in px. Optional.
     */
    constructor(
        name: string,
        group?: string,
        value?: string,
        text?: string,
        selected?: boolean,
        width?: number,
        height?: number,
    ) {
        super(name, "radio", width, height);
        this.group = group;
        this.value = value;
        this.text = text;
        this.selected = selected;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: unknown } {
        let result: { [key: string]: unknown } = super.innerDict();
        if (this.group !== undefined){
            result.name = this.group;
        }
        if (this.value !== undefined){
            result.value = this.value;
        }
        if (this.text !== undefined){
            result.text = this.text;
        }
        if (this.selected !== undefined){
            result.selected = this.selected;
        }
        return { [this.name]: result };
    }
}

/**
 * Class for an unsigned PDF signature field.
 */
export class PDFFormSignatureUnsigned extends PDFFormElement {

    /**
     * @param name for this element.
     * @param width width in px. Optional.
     * @param height height in px. Optional.
     */
    constructor(
        name: string,
        width?: number,
        height?: number,
    ) {
        super(name, "signaturefieldunsigned", width, height);
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: unknown } {
        return { [this.name]: super.innerDict() };
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{?sign ${this.name}}`]);
    }
}

/**
 * Class for an signed PDF signature field.
 */
export class PDFFormSignatureSigned extends PDFFormElement {
    value: string;
    password: string | undefined;
    size: string | undefined;
    backgroundImage: string | undefined;

    /**
     * @param name for this element.
     * @param value signing certificate as a base64 string, URL, FTP location or a server path.
     * @param password for if the certificate is encrypted. Optional.
     * @param size must either be "sm" for small, "md" for medium or "lg" for large. Optional.
     * @param backgroundImage background image as a base64 string, URL, FTP location or a server path. Optional.
     * @param width width in px. Optional.
     * @param height height in px. Optional.
     */
    constructor(
        name: string,
        value: string,
        password?: string,
        size?: string,
        backgroundImage?: string,
        width?: number,
        height?: number,
    ) {
        super(name, "signaturefieldsigned", width, height);
        this.value = value;
        this.password = password;
        this.size = size;
        this.backgroundImage = backgroundImage;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: unknown } {
        let result: { [key: string]: unknown } = super.innerDict();
        if (this.value !== undefined){
            result.value = this.value;
        }
        if (this.password !== undefined){
            result.password = this.password;
        }
        if (this.size !== undefined){
            result.size = this.size;
        }
        if (this.backgroundImage !== undefined){
            result.background_image = this.backgroundImage;
        }
        return { [this.name]: result };
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{?sign ${this.name}}`]);
    }
}
