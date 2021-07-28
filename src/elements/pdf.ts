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
     * @param rotation Text rotation in degrees. Defaults to None.
     * @param bold Whether or not the text should be in bold. Defaults to None.
     * @param italic Whether or not the text should be in italic. Defaults to None.
     * @param font The text font name. Defaults to None.
     * @param fontColor The text font color, CSS notation. Defaults to None.
     * @param fontSize The text font size. Defaults to None.
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
     * @param rotation Rotation in degrees. Defaults to None.
     * @param width Image width in px. Defaults to None.
     * @param height Image height in px. Defaults to None.
     * @param maxWidth Max image height in px (for scaling purposes). Defaults to None.
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
