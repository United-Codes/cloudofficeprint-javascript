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
        const result: { [key: string]: string | number | boolean } = {};
        Object.entries(this.asDictSuffixes()).forEach(
            ([key, val]) => { result[`${propertyName}${key}`] = val; },
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
    asDictSuffixes(): { [key: string]: string | number | boolean } {
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
    asDictSuffixes(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = super.asDictSuffixes();

        if (this.cellBackgroundColor !== undefined) {
            result._cell_background_color = this.cellBackgroundColor;
        }
        if (this.width !== undefined) {
            result._width = this.width;
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
     * @param fontStrike Whether or not the text is struck. Optional.
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
    asDictSuffixes(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = super.asDictSuffixes();

        if (this.cellLocked !== undefined) {
            result._cell_locked = this.cellLocked;
        }
        if (this.cellHidden !== undefined) {
            result._cell_hidden = this.cellHidden;
        }
        if (this.cellBackground !== undefined) {
            result._cell_background = this.cellBackground;
        }
        if (this.fontName !== undefined) {
            result._font_name = this.fontName;
        }
        if (this.fontSize !== undefined) {
            result._font_size = this.fontSize;
        }
        if (this.fontColor !== undefined) {
            result._font_color = this.fontColor;
        }
        if (this.fontItalic !== undefined) {
            result._font_italic = this.fontItalic;
        }
        if (this.fontBold !== undefined) {
            result._font_bold = this.fontBold;
        }
        if (this.fontStrike !== undefined) {
            result._font_strike = this.fontStrike;
        }
        if (this.fontUnderline !== undefined) {
            result._font_underline = this.fontUnderline;
        }
        if (this.fontSuperscript !== undefined) {
            result._font_superscript = this.fontSuperscript;
        }
        if (this.fontSubscript !== undefined) {
            result._font_subscript = this.fontSubscript;
        }
        if (this.borderTop !== undefined) {
            result._border_top = this.borderTop;
        }
        if (this.borderTopColor !== undefined) {
            result._border_top_color = this.borderTopColor;
        }
        if (this.borderBottom !== undefined) {
            result._border_bottom = this.borderBottom;
        }
        if (this.borderBottomColor !== undefined) {
            result._border_bottom_color = this.borderBottomColor;
        }
        if (this.borderLeft !== undefined) {
            result._border_left = this.borderLeft;
        }
        if (this.borderLeftColor !== undefined) {
            result._border_left_color = this.borderLeftColor;
        }
        if (this.borderRight !== undefined) {
            result._border_right = this.borderRight;
        }
        if (this.borderRightColor !== undefined) {
            result._border_right_color = this.borderRightColor;
        }
        if (this.borderDiagonal !== undefined) {
            result._border_diagonal = this.borderDiagonal;
        }
        if (this.borderDiagonalDirection !== undefined) {
            result._border_diagonal_direction = this.borderDiagonalDirection;
        }
        if (this.borderDiagonalColor !== undefined) {
            result._border_diagonal_color = this.borderDiagonalColor;
        }
        if (this.textHAlignment !== undefined) {
            result._text_h_alignment = this.textHAlignment;
        }
        if (this.textVAlignment !== undefined) {
            result._text_v_alignment = this.textVAlignment;
        }
        if (this.textRotation !== undefined) {
            result._text_rotation = this.textRotation;
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
    value: unknown;

    /**
     * @param name the name for this property
     * @param value The value for this property. Note: the general purpose for
     *  this value-field is the value as a string, but this can be of any type, for example a dict.
     */
    constructor(name: string, value: unknown) {
        super(name);
        this.value = value;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: unknown } {
        return {
            [this.name]: this.value,
        };
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{${this.name}}`]);
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
    asDict(): { [key: string]: unknown } {
        const result: { [key: string]: unknown } = {
            [this.name]: this.value,
        };

        Object.entries(this.cellStyle.asDictSuffixes()).forEach(
            ([key, val]) => {
                result[`${this.name}${key}`] = val;
            },
        );

        return result;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{${this.name}$}`]);
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
        return new Set([`{_${this.name}}`]);
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
        return new Set([`{<${this.name}}`]);
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
        return new Set([`{+${this.name}}`]);
    }
}
/**
 * This tag will allow you to insert text into the document detecting links.
 * The value may or may not have any links.
 * 
 */
export class AutoLink extends Property {

    /**
     * @param name the name for this element
     * @param value the value for the AutoLink.
     */
    constructor(name: string, value: string) {
        super(name, value);
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{*auto ${this.name}}`]);
    }
}

export class Hyperlink extends Element {
    url: string;
    text: string | undefined;

    /**
     * @param name the name for this element
     * @param url the URL for the hyperlink
     * @param text the text for the hyperlink; optional
     */
    constructor(name: string, url: string, text?: string) {
        super(name);
        this.url = url;
        this.text = text;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: string } {
        const result: { [key: string]: string } = {
            [this.name]: this.url,
        };

        if (this.text !== undefined) {
            result[`${this.name}_text`] = this.text;
        }

        return result;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{*${this.name}}`]);
    }
}

export class TableOfContents extends Element {
    title: string | undefined;
    depth: number | undefined;
    tabLeader: string | undefined;

    /**
     * @param name The name for this element.
     * @param title Title of the table of contents. Optional.
     * @param depth The depth of heading to be shown, 3 by default. Optional.
     * @param tabLeader How the space between title and page number should be filled.
     *  Can be "hyphen", "underscore", or "dot" (default). Optional.
     */
    constructor(name: string, title?: string, depth?: number, tabLeader?: string) {
        super(name);
        this.title = title;
        this.depth = depth;
        this.tabLeader = tabLeader;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: string | number } {
        const result: { [key: string]: string | number } = {};

        if (this.title !== undefined) {
            result[`${this.name}_title`] = this.title;
        }
        if (this.depth !== undefined) {
            result[`${this.name}_show_level`] = this.depth;
        }
        if (this.tabLeader !== undefined) {
            result[`${this.name}_tab_leader`] = this.tabLeader;
        }

        return result;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{~${this.name}}`]);
    }
}

export class Raw extends Property {
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
        return new Set([`{@${this.name}}`]);
    }
}

export class Span extends Property {
    columns: number;
    rows: number;

    /**
     * @param name the name for this property
     * @param value the value for this property
     * @param columns the amount of columns to span
     * @param rows the amount of rows to span
     */
    constructor(name: string, value: string, columns: number, rows: number) {
        super(name, value);
        this.columns = columns;
        this.rows = rows;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: unknown } {
        return {
            [this.name]: this.value,
            [`${this.name}_row_span`]: this.rows,
            [`${this.name}_col_span`]: this.columns,
        };
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{${this.name}#}`]);
    }
}

export class Formula extends Property {
    /**
     * @param name the name for this property
     * @param formula the formula
     */
    constructor(name: string, formula: string) {
        super(name, formula);
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{>${this.name}}`]);
    }
}

export class StyledProperty extends Property {
    font: string | undefined;
    fontSize: string | number | undefined;
    fontColor: string | undefined;
    bold: boolean | undefined;
    italic: boolean | undefined;
    underline: boolean | undefined;
    strikethrough: boolean | undefined;
    highlightColor: string | undefined;

    /**
     * @param name the name for this property
     * @param value the value for this property
     * @param font the font; optional
     * @param fontSize the font size; optional
     * @param fontColor the font color; optional
     * @param bold whether or not the text should be bold; optional
     * @param italic whether or not the text should be italic; optional
     * @param underline whether or not the text should be underlined; optional
     * @param strikethrough whether or not the text should be struckthrough; optional
     * @param highlightColor the color in which the text should be hightlighted; optional
     */
    constructor(
        name: string,
        value: string,
        font?: string,
        fontSize?: string | number,
        fontColor?: string,
        bold?: boolean,
        italic?: boolean,
        underline?: boolean,
        strikethrough?: boolean,
        highlightColor?: string,
    ) {
        super(name, value);
        this.font = font;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.bold = bold;
        this.italic = italic;
        this.underline = underline;
        this.strikethrough = strikethrough;
        this.highlightColor = highlightColor;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: unknown } {
        const result: { [key: string]: unknown } = {
            [this.name]: this.value,
        };

        if (this.font !== undefined) {
            result[`${this.name}_font_family`] = this.font;
        }
        if (this.fontSize !== undefined) {
            result[`${this.name}_font_size`] = this.fontSize;
        }
        if (this.fontColor !== undefined) {
            result[`${this.name}_font_color`] = this.fontColor;
        }
        if (this.bold !== undefined) {
            result[`${this.name}_bold`] = this.bold;
        }
        if (this.italic !== undefined) {
            result[`${this.name}_italic`] = this.italic;
        }
        if (this.underline !== undefined) {
            result[`${this.name}_underline`] = this.underline;
        }
        if (this.strikethrough !== undefined) {
            result[`${this.name}_strikethrough`] = this.strikethrough;
        }
        if (this.highlightColor !== undefined) {
            result[`${this.name}_highlight`] = this.highlightColor;
        }

        return result;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{style ${this.name}}`]);
    }
}

export class Watermark extends Property {
    color: string | undefined;
    font: string | undefined;
    width: string | number | undefined;
    height: string | number | undefined;
    opacity: number | undefined;
    rotation: number | undefined;

    /**
     * @param name the name for this property
     * @param text the text for the watermark
     * @param color the color for the watermark; optional
     * @param font the font for the watermark; optional
     * @param width the width of the watermark; optional
     * @param height the height of the watermark; optional
     * @param opacity the opacity of the watermark; optional
     * @param rotation the rotation of the watermark; optional
     */
    constructor(
        name: string,
        text: string,
        color?: string,
        font?: string,
        width?: number | string,
        height?: number | string,
        opacity?: number,
        rotation?: number,
    ) {
        super(name, text);
        this.color = color;
        this.font = font;
        this.width = width;
        this.height = height;
        this.opacity = opacity;
        this.rotation = rotation;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: unknown } {
        const result: { [key: string]: unknown } = {
            [this.name]: this.value,
        };

        if (this.color !== undefined) {
            result[`${this.name}_color`] = this.color;
        }
        if (this.font !== undefined) {
            result[`${this.name}_font`] = this.font;
        }
        if (this.width !== undefined) {
            result[`${this.name}_width`] = this.width;
        }
        if (this.height !== undefined) {
            result[`${this.name}_height`] = this.height;
        }
        if (this.opacity !== undefined) {
            result[`${this.name}_opacity`] = this.opacity;
        }
        if (this.rotation !== undefined) {
            result[`${this.name}_rotation`] = this.rotation;
        }

        return result;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{watermark ${this.name}}`]);
    }
}

export class D3Code extends Element {
    code: string;
    data: unknown | undefined;

    /**
     * @param name the name for this element
     * @param code the JSON-encoded code for generating a D3 image
     * @param data the data that the code will have access to; optional
     */
    constructor(name: string, code: string, data?: unknown) {
        super(name);
        this.code = code;
        this.data = data;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: string | unknown } {
        const result: { [key: string]: string | unknown } = {
            [this.name]: this.code,
        };

        if (this.data !== undefined) {
            result[`${this.name}_data`] = this.data;
        }

        return result;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{$d3 ${this.name}}`]);
    }
}

/**
 * Date options for an COPChart (different from ChartDateOptions in charts.ts).
 */
export class COPChartDateOptions {
    format: string | undefined;
    unit: string | undefined;
    step: number | string | undefined;

    /**
     * @param format The format to display the date on the chart's axis. Optional.
     * @param unit The unit to be used for spacing the axis values. Optional.
     * @param step How many of the above unit should be used for spacing the axis values
     *  (automatic if undefined). This option is not supported in LibreOffice. Optional.
     */
    constructor(format?: string, unit?: string, step?: number | string) {
        this.format = format;
        this.unit = unit;
        this.step = step;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: string | number } {
        const result: { [key: string]: string | number } = {};

        if (this.format !== undefined) {
            result.format = this.format;
        }
        if (this.unit !== undefined) {
            result.unit = this.unit;
        }
        if (this.step !== undefined) {
            result.step = this.step;
        }

        return result;
    }
}

/**
 * The class for an COPChart. This is used for chart templating.
 */
export class COPChart extends Element {
    xData: string[];
    yDatas: { [key: string]: (string | number | { [key: string]: string | number })[] };
    date: COPChartDateOptions | undefined;
    title: string | undefined;
    xTitle: string | undefined;
    yTitle: string | undefined;
    x2Title: string | undefined;
    y2Title: string | undefined;

    /**
     * @param name The name for this element.
     * @param xData The data for the x-axis. Format : ["day 1", "day 2", "day 3", "day 4", "day 5"]
     *  or [{"value": "day 1"}, {"value": "day 2"}, {"value": "day 3"},
     *  {"value": "day 4"}, {"value": "day 5"}]
     * @param yDatas The data for the y-axis in the same format as x_data.
     * @param date The date options for the chart. Optional.
     * @param title The title of the chart. Optional.
     * @param xTitle The title for the x-axis. Optional.
     * @param yTitle The title for the y-axis. Optional.
     * @param y2Title The title for the second y-axis. Optional.
     * @param x2Title The title for the second x-axis. Optional.
     */
    constructor(
        name: string,
        xData: string[],
        yDatas: (string | number | { [key: string]: string | number })[][] |
        { [key: string]: (string | number | { [key: string]: string | number })[] },
        date?: COPChartDateOptions,
        title?: string,
        xTitle?: string,
        yTitle?: string,
        y2Title?: string,
        x2Title?: string,
    ) {
        super(name);
        this.xData = xData;
        this.date = date;
        this.title = title;
        this.xTitle = xTitle;
        this.yTitle = yTitle;
        this.y2Title = y2Title;
        this.x2Title = x2Title;
        this.yDatas = {};

        if (yDatas instanceof Array) {
            yDatas.forEach(
                (el, index) => {
                    this.yDatas[`series ${index + 1}`] = el;
                },
            );
        } else if (yDatas.constructor !== Object) {
            // If yDatas is not an array and not a dictionary: throw error
            throw new Error(`Expected a dictionary or array, but received ${typeof yDatas}`);
        } else {
            this.yDatas = yDatas;
        }
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): {
        [key: string]:
        {
            [key: string]:
            {
                [key: string]:
                string[] |
                string |
                {
                    [key: string]:
                    string |
                    number
                }
            } |
            {
                [key: string]:
                {
                    [key: string]:
                    string |
                    (string | number | { [key: string]: string | number })[]
                }[] |
                string
            } |
            string |
            {
                [key: string]:
                string
            }
        }
    } {
        const ySeries: {
            name: string, data: (string | number |
            { [key: string]: string | number })[]
        }[] = [];
        Object.entries(this.yDatas).forEach(
            (e) => {
                ySeries.push({ name: e[0], data: e[1] });
            },
        );

        const result: {
            [key: string]:
            {
                [key: string]:
                string[] |
                string |
                {
                    [key: string]:
                    string |
                    number
                }
            } |
            {
                [key: string]:
                {
                    [key: string]:
                    string |
                    (string | number | { [key: string]: string | number })[]
                }[] |
                string
            } |
            string |
            {
                [key: string]:
                string
            }
        } = {
            xAxis: {
                data: this.xData,
            },
            yAxis: {
                series: ySeries,
            },
        };

        if (this.title !== undefined) {
            result.title = this.title;
        }
        if (this.date !== undefined) {
            (result.xAxis as {
                [key: string]:
                string[] |
                string |
                {
                    [key: string]:
                    string |
                    number
                }
            }).date = this.date.asDict();
        }
        if (this.xTitle !== undefined) {
            (result.xAxis as {
                [key: string]:
                string[] |
                string |
                {
                    [key: string]:
                    string |
                    number
                }
            }).title = this.xTitle;
        }
        if (this.yTitle !== undefined) {
            (result.yAxis as {
                [key: string]:
                {
                    [key: string]:
                    string |
                    (string | number | { [key: string]: string | number })[]
                }[] |
                string
            }).title = this.yTitle;
        }
        if (this.x2Title !== undefined) {
            result.x2Axis = {
                title: this.x2Title,
            };
        }
        if (this.y2Title !== undefined) {
            result.y2Axis = {
                title: this.y2Title,
            };
        }

        return { [this.name]: result };
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{aopchart ${this.name}}`]);
    }
}

/**
 * The class for a page break property.
 */
export class PageBreak extends Property {
    /**
     * @param name the name for this property
     * @param value Value should be set to 'page' or 'pagebreak' for PageBreak,
     *  'column' or 'columnbreak' for column breaks.
     *  If set to True (default) it will create a pagebreak.
     */
    constructor(name: string, value: string | boolean) {
        super(name, value);
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{?${this.name}}`]);
    }
}

/**
 * The class for markdown content.
 */
export class MarkdownContent extends Property {
    /**
     * @param name the name for this property
     * @param value holds the markdown content
     */
    constructor(name: string, value: string) {
        super(name, value);
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{_${this.name}_}`]);
    }
}

/**
 * This tag will allow you to insert a text box starting in the cell containing the tag in Excel.
 */
export class TextBox extends Element {
    value: string;
    font: string | undefined;
    fontColor: string | undefined;
    fontSize: number | string | undefined;
    transparency: number | string | undefined;
    width: number | string | undefined;
    height: number | string | undefined;

    /**
     * @param name the name for this element
     * @param value the value for this element
     * @param font the font; optional
     * @param fontColor the font color; optional
     * @param fontSize the font size; optional
     * @param transparency the transparency; optional
     * @param width the width of the text box; optional
     * @param height the height of the text box; optional
     */
    constructor(
        name: string,
        value: string,
        font?: string,
        fontColor?: string,
        fontSize?: number | string,
        transparency?: number | string,
        width?: number | string,
        height?: number | string,
    ) {
        super(name);
        this.value = value;
        this.font = font;
        this.fontColor = fontColor;
        this.fontSize = fontSize;
        this.transparency = transparency;
        this.width = width;
        this.height = height;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: string | number } {
        const result: { [key: string]: string | number } = {
            [this.name]: this.value,
        };

        if (this.font !== undefined) {
            result[`${this.name}_font`] = this.font;
        }
        if (this.fontColor !== undefined) {
            result[`${this.name}_font_color`] = this.fontColor;
        }
        if (this.fontSize !== undefined) {
            result[`${this.name}_font_size`] = this.fontSize;
        }
        if (this.transparency !== undefined) {
            result[`${this.name}_transparency`] = this.transparency;
        }
        if (this.width !== undefined) {
            result[`${this.name}_width`] = this.width;
        }
        if (this.height !== undefined) {
            result[`${this.name}_height`] = this.height;
        }

        return result;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{tbox ${this.name}}`]);
    }
}

/**
 * A collection used to group multiple elements together.
 * It can contain nested `ElementCollection`s and should be used to pass multiple `Element`s
 * as PrintJob data, as well as to allow for nested elements.
 * Its name is used as a key name when nested, but ignored for all purposes when it's the
 * outer ElementCollection.
 */
export class ElementCollection extends Element {
    elements: Element[];

    /**
     * @param name The name for this element collection. Not used for the outer ElementCollection,
     *  but needed for nested ElementCollections. Defaults to "".
     * @param elements An iterable containing the elements that need to be added to this collection.
     *  Defaults to [].
     */
    constructor(name: string = '', elements: Element[] = []) {
        super(name);
        this.elements = elements;
    }

    /**
     * Add an element to this element collection object.
     * @param element the element to add to this collection
     */
    add(element: Element) {
        this.elements.push(element);
    }

    /**
     * Add all the elements in the given collection to this collection.
     * @param col the collection of which the elements need to be added to
     *  this element collection object
     */
    addAll(col: ElementCollection) {
        col.elements.forEach(
            (el) => {
                this.add(el);
            },
        );
    }

    /**
     * Remove an element from this element collection object by its name.
     * @param elementName the name of the element that needs to be removed
     */
    removeElementByName(elementName: string) {
        this.elements = this.elements.filter((el) => el.name !== elementName);
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict() {
        let result: { [key: string]: unknown } = {};

        this.elements.forEach(
            (el) => {
                if (el instanceof ElementCollection) {
                    result[el.name] = el.asDict();
                } else {
                    result = { ...result, ...el.asDict() };
                }
            },
        );

        return result;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        const result = new Set<string>();

        this.elements.forEach(
            (el) => {
                el.availableTags().forEach(
                    (tag) => {
                        result.add(tag);
                    },
                );
            },
        );

        return result;
    }

    /**
     * Generate an element collection from an element and a name.
     * @param element the element that needs to be transformed to an element collection
     * @param name the name of the element collection
     * @returns the generated element collection from an element and a name
     */
    static elementToElementCollection(element: Element, name: string = ''): ElementCollection {
        return ElementCollection.fromMapping(element.asDict(), name);
    }

    /**
     * Generate an element collection from a mapping and a name.
     * @param mapping the mapping that needs to be converted to an element collection
     * @param name the name of the element collection; defaults to ''
     * @returns an element collection generated from the given mapping and name
     */
    static fromMapping(mapping: { [key: string]: unknown }, name: string = ''): ElementCollection {
        const resultSet = new Set<Element>();

        Object.entries(mapping).forEach(
            (e) => {
                resultSet.add(new Property(e[0], e[1]));
            },
        );

        return new ElementCollection(name, Array.from(resultSet));
    }

    /**
     * Generate an element collection from a JSON string.
     * @param jsonStr the json string that needs to be transformed to an element collection
     * @param name The name of the element collection. Defaults to ''.
     * @returns an element collection generated from the given JSON string and name
     */
    static fromJson(jsonStr: string, name: string = ''): ElementCollection {
        return ElementCollection.fromMapping(JSON.parse(jsonStr), name);
    }
}

/**
 * This tag will allow you to utilize freeze pane property of the excel.Three options are available. 
 * First option, we can directly place the pane where the tag located. For this option we should provide true parameter.
 * Second option, we can provide the location where we want to place the pane such as "C5".
 * Finally, the third option is false which doesn't place a pane.
 */
export class Freeze extends Property {
    /**
     * @param name name of the freeze tag
     * @param freezeValue value for the freeze tag
     */
    constructor(name: string, freezeValue: string | boolean) {
        super(name, freezeValue);
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{freeze ${this.name}}`]);
    }
}

/**
 * Inside Word and PowerPoint and Excel documents, the tag {?insert fileToInsert} can be used 
 * to insert files like Word, Excel, Powerpoint and PDF documents.
    Please use ExcelInsert element to insert documents in excel, because it has more options available.
 */
export class Insert extends Property {
    /**
     * @param name Name of the insert tag. 
     * @param documentToInsert document to insert which could be url,ftp,sftp or base64 endcoded.
     */
    constructor(name: string, documentToInsert: string) {
        super(name, documentToInsert);
    }
    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`?insert ${this.name}`]);
    }
}

/**
 * Inside Excel it is posiible to insert word, powerpoint, excel and pdf file using AOP tag {?insert fileToInsert}.
        Options available are:  you can provide dynamic icon and icon position.
                                you can preview the document in excel.
 */
export class ExcelInsert extends Element {
    value: string;
    isPreview: boolean | undefined;
    icon: string | undefined;
    fromRow: number | undefined
    fromCol: string | number | undefined;
    fromRowOff: string | undefined;
    fromColOff: string | undefined;
    toRow: number | undefined;
    toCol: string | number | undefined;
    toRowOff: string | undefined;
    toColOff: string | undefined;

    /**
     * 
     * @param name  Name of insert tag. Ex(fileToInsert)
     * @param value File to insert of path to file. (Source can be FTP, SFTP, URL or base64encoded file.)
     * @param isPreview Set it to true for preview. Defaults to false. Optional.
     * @param icon Set it to true for preview. Defaults to false. Optional.
     * @param fromRow position for top of icon. Defaults to row of the tag. Optional.
     * @param fromCol positon for left of icon. Defaults to column of the tag. Optional.
     * @param fromRowOff space after the value of from Row. Defaults to 0. Optional.
     * @param fromColOff space after the value of fromCol. Defaults to 0. Optional.
     * @param toRow position for bottom of icon. Defaults to row of the tag + 3. Optional.
     * @param toCol position for right side of icon. Defaults to column of the tag. Optional.
     * @param toRowOff space after toRow value. Defaults to 20px. Optional.
     * @param toColOff space after toCol value. Defaults to 50px. Optional.
     */
    constructor(
        name: string,
        value: string,
        isPreview?: boolean,
        icon?: string,
        fromRow?: number,
        fromCol?: string | number,
        fromRowOff?: string,
        fromColOff?: string,
        toRow?: number,
        toCol?: string | number,
        toRowOff?: string,
        toColOff?: string
    ) {
        super(name);
        this.value = value;
        this.isPreview = isPreview;
        this.icon = icon;
        this.fromRow = fromRow;
        this.fromCol = fromCol;
        this.fromRowOff = fromRowOff;
        this.fromColOff = fromColOff;
        this.toRow = toRow;
        this.toCol = toCol;
        this.toRowOff = toRowOff;
        this.toColOff = toColOff;
    }
    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = {
            [this.name]: this.value,
        }
        if (this.isPreview !== undefined) {
            result[this.name + '_isPreview'] = this.isPreview
        }
        if (this.icon !== undefined) {
            result[this.name + '_icon'] = this.icon
        }
        if (this.fromRow !== undefined) {
            result[this.name + '_fromRow'] = this.fromRow
        }
        if (this.fromCol !== undefined) {
            result[this.name + '_fromCol'] = this.fromCol
        }
        if (this.fromRowOff !== undefined) {
            result[this.name + '_fromRowOff'] = this.fromRowOff
        }
        if (this.fromColOff !== undefined) {
            result[this.name + '_fromColOff'] = this.fromColOff
        }
        if (this.toRow !== undefined) {
            result[this.name + '_toRow'] = this.toRow
        }
        if (this.toCol !== undefined) {
            result[this.name + '_toCol'] = this.toCol
        }
        if (this.toRowOff !== undefined) {
            result[this.name + '_toRowOff'] = this.toRowOff
        }
        if (this.toColOff !== undefined) {
            result[this.name + '_toColOff'] = this.toColOff
        }
        return result;
    }
    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{?insert ${this.name}}`])
    }

}

/**
 * This tag is used to make password protected sheets in Excel. 
 * This tag has the feature of password along with different other features.
 *     
 * Note: value is considered password, so try to use only one (either value or passowrd).
 */
export class ProtectSheet extends Element {
    value: string | undefined;
    autoFilter: string | boolean | undefined;
    deleteColumns: string | boolean | undefined;
    deleteRows: string | boolean | undefined;
    formatCells: string | boolean | undefined;
    formatColumns: string | boolean | undefined;
    formatRows: string | boolean | undefined;
    insertColumns: string | boolean | undefined;
    insertHyperlinks: string | boolean | undefined;
    insertRows: string | boolean | undefined;
    password: string | undefined;
    pivotTables: string | boolean | undefined;
    selectLockedCells: string | boolean | undefined;
    selectUnlockedCells: string | boolean | undefined;
    sort: string | boolean | undefined;
    /**
     * 
     * @param name Name of the tag
     * @param value Value for the tag; this is used as password
     * @param autoFilter lock auto filter in sheet.
     * @param deleteColumns lock delete columns in sheet.
     * @param deleteRows lock delete rows in sheet.
     * @param formatCells lock format cells.
     * @param formatColumns lock format columns.
     * @param formatRows lock format rows.
     * @param insertColumns lock insert columns.
     * @param insertHyperlinks lock insert hyperlinks.
     * @param insertRows lock insert rows.
     * @param password password to lock with.
     * @param pivotTables lock pivot tables.
     * @param selectLockedCells lock select locked cells.
     * @param selectUnlockedCells lock select unlocked cells.
     * @param sort lock sort.
     */
    constructor(
        name: string,
        value?: string,
        autoFilter?: string | boolean,
        deleteColumns?: string | boolean,
        deleteRows?: string | boolean,
        formatCells?: string | boolean,
        formatColumns?: string | boolean,
        formatRows?: string | boolean,
        insertColumns?: string | boolean,
        insertHyperlinks?: string | boolean,
        insertRows?: string | boolean,
        password?: string,
        pivotTables?: string | boolean,
        selectLockedCells?: string | boolean,
        selectUnlockedCells?: string | boolean,
        sort?: string | boolean
    ) {
        super(name);
        this.value = value;
        this.autoFilter = autoFilter;
        this.deleteColumns = deleteColumns;
        this.deleteRows = deleteRows;
        this.formatCells = formatCells;
        this.formatColumns = formatColumns;
        this.formatRows = formatRows;
        this.insertColumns = insertColumns;
        this.insertHyperlinks = insertHyperlinks;
        this.insertRows = insertRows;
        this.password = password;
        this.pivotTables = pivotTables;
        this.selectLockedCells = selectLockedCells;
        this.selectUnlockedCells = selectUnlockedCells;
        this.sort = sort;
    }
    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): { [key: string]: string | boolean } {
        const result: { [key: string]: string | boolean } = {};
        if (this.value != undefined) {
            result[this.name] = this.value;
        }
        if (this.autoFilter != undefined) {
            result[this.name + `_allow_auto_filter`] = this.autoFilter;
        }
        if (this.deleteColumns != undefined) {
            result[this.name + `_allow_delete_columns`] = this.deleteColumns;
        }
        if (this.deleteRows != undefined) {
            result[this.name + `_allow_delete_rows`] = this.deleteRows;
        }
        if (this.formatCells != undefined) {
            result[this.name + `_allow_format_cells`] = this.formatCells;
        }
        if (this.formatColumns != undefined) {
            result[this.name + `_allow_format_columns`] = this.formatColumns;
        }
        if (this.formatRows != undefined) {
            result[this.name + `_allow_format_rows`] = this.formatRows;
        }
        if (this.insertColumns != undefined) {
            result[this.name + `_allow_insert_columns`] = this.insertColumns;
        }
        if (this.insertHyperlinks != undefined) {
            result[this.name + `_allow_insert_hyperlinks`] = this.insertHyperlinks;
        }
        if (this.insertRows != undefined) {
            result[this.name + `_allow_insert_rows`] = this.insertRows;
        }
        if (this.password != undefined) {
            result[this.name + `_password`] = this.password;
        }
        if (this.pivotTables != undefined) {
            result[this.name + `_allow_pivot_tables`] = this.pivotTables;
        }
        if (this.selectLockedCells != undefined) {
            result[this.name + `_allow_select_locked_cells`] = this.selectLockedCells;
        }
        if (this.selectUnlockedCells != undefined) {
            result[this.name + `_allow_select_unlocked_cells`] = this.selectUnlockedCells;
        }
        if (this.sort != undefined) {
            result[this.name + `_allow_sort`] = this.sort;
        }
        return result;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{protect ${this.name}}`]);
    }
}
/**
 * This tag is used to append the content of docx file to the template by using {?embed fileToEmbed}.
    This is only supported in docx and we can only embed docx file.
    The content of document are not rendered.
 */
export class Embed extends Property {
    /**
     * In docx it is possible to copy the content of one docx file to another.
     * @param name The name of the tag.
     * @param fileToEmbed The docx file to embed. File source could be base64 encoded, ftp, sftp or url. 
     */
    constructor(name: string, fileToEmbed: string) {
        super(name, fileToEmbed);
    }
    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`?embed ${this.name}`]);
    }
}
