/**
 * Abstract base class for a cell style
 */
export abstract class CellStyle {
    /**
     * Get the dict representation of this cell style.
     * @param propertyName The name of the property for which you want to define the cell style
     * @returns the dict representation of this cell style
     */
    asDict(propertyName: string) {
        let result = {};
        Object.entries(this.asDictSuffixes()).forEach(
            (e) => { result = { ...result, [`${propertyName}${e[0]}`]: e[1] }; },
        );
        return result;
    }

    /**
     * Get the dict representation of the suffixes that need to be appended to the name of
     *  this property in this CellStyle object's dict representation.
     * @returns the dict representation of the suffixes that need to be appended to the name of
     *  this property in this CellStyle object's dict representation
     */
    // Disable eslint warning, because this is an abstract base class
    // eslint-disable-next-line class-methods-use-this
    asDictSuffixes(): {[key: string]: string | number | boolean} {
        return {};
    }
}

/**
 * Cell styling settings for docx templates
 */
export class CellStyleDocx extends CellStyle {
    cellBackgroundColor: string | undefined;
    width: string | number | undefined;

    /**
     * @param cellBackgroundColor The background color of the cell. Optional.
     * @param width The width of the cell. Optional.
     */
    constructor(cellBackgroundColor?: string, width?: string | number) {
        super();
        this.cellBackgroundColor = cellBackgroundColor;
        this.width = width;
    }

    /**
     * Get the dict representation of the suffixes that need to be appended to the name of
     *  this property in this CellStyle object's dict representation.
     * @returns the dict representation of the suffixes that need to be appended to the name of
     *  this property in this CellStyle object's dict representation
     */
    asDictSuffixes(): {[key: string]: string | number | boolean} {
        let result: {[key: string]: string | number | boolean} = super.asDictSuffixes();

        if (this.cellBackgroundColor !== undefined) {
            result = { ...result, _cellBackgroundColor: this.cellBackgroundColor };
        }
        if (this.width !== undefined) {
            result = { ...result, _width: this.width };
        }

        return result;
    }
}

/**
 * Cell styling settings for xlsx templates
 */
export class CellStyleXlsx extends CellStyle {
    cellLocked: boolean | undefined;
    cellHidden: boolean | undefined;
    cellBackground: string | undefined;
    fontName: string | undefined;
    fontSize: string | number | undefined;
    fontColor: string | undefined;
    fontItalic: boolean | undefined;
    fontBold: boolean | undefined;
    fontStrike: boolean | undefined;
    fontUnderline: boolean | undefined;
    fontSuperscript: boolean | undefined;
    fontSubscript: boolean | undefined;
    borderTop: string | undefined;
    borderTopColor: string | undefined;
    borderBottom: string | undefined;
    borderBottomColor: string | undefined;
    borderLeft: string | undefined;
    borderLeftColor: string | undefined;
    borderRight: string | undefined;
    borderRightColor: string | undefined;
    borderDiagonal: string | undefined;
    borderDiagonalDirection: string | undefined;
    borderDiagonalColor: string | undefined;
    textHAlignment: string | undefined;
    textVAlignment: string | undefined;
    textRotation: string | number | undefined;

    /**
     * @param cellLocked Whether or not the cell is locked. Optional.
     * @param cellHidden Whether or not the cell is hidden. Optional.
     * @param cellBackground hex color e.g: #ff0000. Optional.
     * @param fontName name of the font e.g: Arial. Optional.
     * @param fontSize The size of the font. Optional.
     * @param fontColor hex color e.g: #00ff00. Optional.
     * @param fontItalic Whether or not the text is in italic. Optional.
     * @param fontBold Whether or not the text is in bold. Optional.
     * @param fontStrike Whether or not the text is striked. Optional.
     * @param fontUnderline Whether or not the text is underlined. Optional.
     * @param fontSuperscript Whether or not the text is in superscript. Optional.
     * @param fontSubscript Whether or not the text is in subscript. Optional.
     * @param borderTop [dashed / dashDot / hair / dashDotDot / dotted / mediumDashDot /
     *  mediumDashed / mediumDashDotDot / slantDashDot / medium / double / thick ]. Optional.
     * @param borderTopColor hex color e.g: #000000. Optional.
     * @param borderBottom [dashed / dashDot / hair / dashDotDot / dotted / mediumDashDot /
     *  mediumDashed / mediumDashDotDot / slantDashDot / medium / double / thick ]. Optional.
     * @param borderBottomColor hex color e.g: #000000. Optional.
     * @param borderLeft [dashed / dashDot / hair / dashDotDot / dotted / mediumDashDot /
     *  mediumDashed / mediumDashDotDot / slantDashDot / medium / double / thick ]. Optional.
     * @param borderLeftColor hex color e.g: #000000. Optional.
     * @param borderRight [dashed / dashDot / hair / dashDotDot / dotted / mediumDashDot /
     *  mediumDashed / mediumDashDotDot / slantDashDot / medium / double / thick ]. Optional.
     * @param borderRightColor hex color e.g: #000000. Optional.
     * @param borderDiagonal [dashed / dashDot / hair / dashDotDot / dotted / mediumDashDot /
     *  mediumDashed / mediumDashDotDot / slantDashDot / medium / double / thick ]. Optional.
     * @param borderDiagonalDirection [up-wards|down-wards| both]. Optional.
     * @param borderDiagonalColor hex color e.g: #000000. Optional.
     * @param textHAlignment [top|bottom|center|justify]. Optional.
     * @param textVAlignment [top|bottom|center|justify]. Optional.
     * @param textRotation rotation of text value from 0-90 degrees. Optional.
     */
    constructor(
        cellLocked?: boolean,
        cellHidden?: boolean,
        cellBackground?: string,
        fontName?: string,
        fontSize?: string | number,
        fontColor?: string,
        fontItalic?: boolean,
        fontBold?: boolean,
        fontStrike?: boolean,
        fontUnderline?: boolean,
        fontSuperscript?: boolean,
        fontSubscript?: boolean,
        borderTop?: string,
        borderTopColor?: string,
        borderBottom?: string,
        borderBottomColor?: string,
        borderLeft?: string,
        borderLeftColor?: string,
        borderRight?: string,
        borderRightColor?: string,
        borderDiagonal?: string,
        borderDiagonalDirection?: string,
        borderDiagonalColor?: string,
        textHAlignment?: string,
        textVAlignment?: string,
        textRotation?: string | number,
    ) {
        super();
        this.cellLocked = cellLocked;
        this.cellHidden = cellHidden;
        this.cellBackground = cellBackground;
        this.fontName = fontName;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.fontItalic = fontItalic;
        this.fontBold = fontBold;
        this.fontStrike = fontStrike;
        this.fontUnderline = fontUnderline;
        this.fontSuperscript = fontSuperscript;
        this.fontSubscript = fontSubscript;
        this.borderTop = borderTop;
        this.borderTopColor = borderTopColor;
        this.borderBottom = borderBottom;
        this.borderBottomColor = borderBottomColor;
        this.borderLeft = borderLeft;
        this.borderLeftColor = borderLeftColor;
        this.borderRight = borderRight;
        this.borderRightColor = borderRightColor;
        this.borderDiagonal = borderDiagonal;
        this.borderDiagonalDirection = borderDiagonalDirection;
        this.borderDiagonalColor = borderDiagonalColor;
        this.textHAlignment = textHAlignment;
        this.textVAlignment = textVAlignment;
        this.textRotation = textRotation;
    }

    /**
     * Get the dict representation of the suffixes that need to be appended to the name of
     *  this property in this CellStyle object's dict representation.
     * @returns the dict representation of the suffixes that need to be appended to the name of
     *  this property in this CellStyle object's dict representation
     */
    asDictSuffixes(): {[key: string]: string | number | boolean} {
        let result: {[key: string]: string | number | boolean} = super.asDictSuffixes();

        if (this.cellLocked !== undefined) {
            result = { ...result, _cell_locked: this.cellLocked };
        }
        if (this.cellHidden !== undefined) {
            result = { ...result, _cell_hidden: this.cellHidden };
        }
        if (this.cellBackground !== undefined) {
            result = { ...result, _cell_background: this.cellBackground };
        }
        if (this.fontName !== undefined) {
            result = { ...result, _font_name: this.fontName };
        }
        if (this.fontSize !== undefined) {
            result = { ...result, _font_size: this.fontSize };
        }
        if (this.fontColor !== undefined) {
            result = { ...result, _font_color: this.fontColor };
        }
        if (this.fontItalic !== undefined) {
            result = { ...result, _font_italic: this.fontItalic };
        }
        if (this.fontBold !== undefined) {
            result = { ...result, _font_bold: this.fontBold };
        }
        if (this.fontStrike !== undefined) {
            result = { ...result, _font_strike: this.fontStrike };
        }
        if (this.fontUnderline !== undefined) {
            result = { ...result, _font_underline: this.fontUnderline };
        }
        if (this.fontSuperscript !== undefined) {
            result = { ...result, _font_superscript: this.fontSuperscript };
        }
        if (this.fontSubscript !== undefined) {
            result = { ...result, _font_subscript: this.fontSubscript };
        }
        if (this.borderTop !== undefined) {
            result = { ...result, _border_top: this.borderTop };
        }
        if (this.borderTopColor !== undefined) {
            result = { ...result, _border_top_color: this.borderTopColor };
        }
        if (this.borderBottom !== undefined) {
            result = { ...result, _border_bottom: this.borderBottom };
        }
        if (this.borderBottomColor !== undefined) {
            result = { ...result, _border_bottom_color: this.borderBottomColor };
        }
        if (this.borderLeft !== undefined) {
            result = { ...result, _border_left: this.borderLeft };
        }
        if (this.borderLeftColor !== undefined) {
            result = { ...result, _border_left_color: this.borderLeftColor };
        }
        if (this.borderRight !== undefined) {
            result = { ...result, _border_right: this.borderRight };
        }
        if (this.borderRightColor !== undefined) {
            result = { ...result, _border_right_color: this.borderRightColor };
        }
        if (this.borderDiagonal !== undefined) {
            result = { ...result, _border_diagonal: this.borderDiagonal };
        }
        if (this.borderDiagonalDirection !== undefined) {
            result = { ...result, _border_diagonal_direction: this.borderDiagonalDirection };
        }
        if (this.borderDiagonalColor !== undefined) {
            result = { ...result, _border_diagonal_color: this.borderDiagonalColor };
        }
        if (this.textHAlignment !== undefined) {
            result = { ...result, _text_h_alignment: this.textHAlignment };
        }
        if (this.textVAlignment !== undefined) {
            result = { ...result, _text_v_alignment: this.textVAlignment };
        }
        if (this.textRotation !== undefined) {
            result = { ...result, _text_rotation: this.textRotation };
        }

        return result;
    }
}

export abstract class Element {
    name: string;

    /**
     * @param name the name of this element
     */
    constructor(name: string) {
        this.name = name;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    // Disable eslint warning, because this is an abstract base class
    // eslint-disable-next-line class-methods-use-this
    asDict() {
        return {};
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    // Disable eslint warning, because this is an abstract base class
    // eslint-disable-next-line class-methods-use-this
    availableTags(): Set<string> {
        return new Set();
    }
}

export class Property extends Element {
    value: number | string;

    /**
     * @param name the name for this property
     * @param value The value for this property. Note: the general purpose for
     *  this value-field is the value as a string, but this can be of any type, for example a dict.
     */
    constructor(name: string, value: string) {
        super(name);
        this.value = value;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): {[key: string]: string | number | boolean} {
        return {
            [this.name]: this.value,
        };
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags() {
        return new Set(`{${this.name}}`);
    }
}

export class CellStyleProperty extends Property {
    cellStyle: CellStyle;

    /**
     * @param name the name for this property
     * @param value the value for this property
     * @param cellStyle the cell style
     */
    constructor(name: string, value: string, cellStyle: CellStyle) {
        super(name, value);
        this.cellStyle = cellStyle;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): {[key: string]: string | number | boolean} {
        let result: {[key: string]: string | number | boolean} = {
            [this.name]: this.value,
        };

        Object.entries(this.cellStyle.asDictSuffixes()).forEach(
            (e) => {
                result = { ...result, [`${this.name}${e[0]}`]: e[1] };
            },
        );

        return result;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set(`{${this.name}$}`);
    }
}

export class Html extends Property {
    /**
     * @param name the name for this property
     * @param value the value for this property
     */
    constructor(name: string, value: string) {
        super(name, value);
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set(`{_${this.name}}`);
    }
}

export class RightToLeft extends Property {
    /**
     * @param name the name for this property
     * @param value the value for this property
     */
    constructor(name: string, value: string) {
        super(name, value);
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set(`{<${this.name}}`);
    }
}

export class FootNote extends Property {
    /**
     * @param name the name for this property
     * @param value the value for this property
     */
    constructor(name: string, value: string) {
        super(name, value);
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set(`{+${this.name}}`);
    }
}
