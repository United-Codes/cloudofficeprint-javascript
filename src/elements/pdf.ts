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
        let result: {[key: string]: string | number | boolean} = {
            text: this.text,
            x: this.x,
            y: this.y,
        };

        if (this.rotation !== undefined) {
            result = { ...result, rotation: this.rotation };
        }
        if (this.bold !== undefined) {
            result = { ...result, bold: this.bold };
        }
        if (this.italic !== undefined) {
            result = { ...result, italic: this.italic };
        }
        if (this.font !== undefined) {
            result = { ...result, font: this.font };
        }
        if (this.fontColor !== undefined) {
            result = { ...result, font_color: this.fontColor };
        }
        if (this.fontSize !== undefined) {
            result = { ...result, font_size: this.fontSize };
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
        let result: {[key: string]: string | number} = {
            image: this.image,
            x: this.x,
            y: this.y,
        };

        if (this.rotation) {
            result = { ...result, rotation: this.rotation };
        }
        if (this.width) {
            result = { ...result, width: this.width };
        }
        if (this.height) {
            result = { ...result, height: this.height };
        }
        if (this.maxWidth) {
            result = { ...result, max_width: this.maxWidth };
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
        let result: {[key: string]: {[key: string]: string | number | boolean}[]} = {};

        this.texts.forEach(
            (txt) => {
                // If there already is text for this page -> update entry in dictionary
                //  else -> create new entry in dictionary
                const pageString: string = txt.page.toString();
                if (Object.prototype.hasOwnProperty.call(result, pageString)) {
                    if (result.pageString instanceof Array) {
                        result.pageString.push(txt.asInnerDict());
                    } else {
                        // If there already is text for this page, but not yet in a list
                        //  -> make a list
                        result = {
                            ...result,
                            [pageString]: [result.pageString, txt.asInnerDict()],
                        };
                    }
                } else {
                    result = { ...result, [pageString]: [txt.asInnerDict()] };
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
        let result: {[key: string]: {[key: string]: string | number | boolean}[]} = {};

        this.images.forEach(
            (img) => {
                // If there already is image for this page -> update entry in dictionary
                //  else -> create new entry in dictionary
                const pageString: string = img.page.toString();
                if (Object.prototype.hasOwnProperty.call(result, pageString)) {
                    if (result.pageString instanceof Array) {
                        result.pageString.push(img.asInnerDict());
                    } else {
                        // If there already is image for this page, but not yet in a list
                        //  -> make a list
                        result = {
                            ...result,
                            [pageString]: [result.pageString, img.asInnerDict()],
                        };
                    }
                } else {
                    result = { ...result, [pageString]: [img.asInnerDict()] };
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
    formData: {[key: string]: string | boolean};

    /**
     * @param formData a dict containing the keys and values of the fields
     *  that need to be entered in the PDF form
     */
    constructor(formData: {[key: string]: string | boolean}) {
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
    asDict() {
        return {
            [this.name]: this.formData,
        };
    }
}
