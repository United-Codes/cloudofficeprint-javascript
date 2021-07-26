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
    asDict(): {[key: string]: string} {
        let result: {[key: string]: string} = {
            [this.name]: this.url,
        };

        if (this.text !== undefined) {
            result = { ...result, [`${this.name}_text`]: this.text };
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
    constructor(name: string, title: string, depth?: number, tabLeader?: string) {
        super(name);
        this.title = title;
        this.depth = depth;
        this.tabLeader = tabLeader;
    }

    /**
     * Dictionary representation of this Element.
     * @returns dictionary representation of this Element
     */
    asDict(): {[key: string]: string | number} {
        let result: {[key: string]: string | number} = {};

        if (this.title !== undefined) {
            result = { ...result, [`${this.name}_title`]: this.title };
        }
        if (this.depth !== undefined) {
            result = { ...result, [`${this.name}_show_level`]: this.depth };
        }
        if (this.tabLeader !== undefined) {
            result = { ...result, [`${this.name}_tab_leader`]: this.tabLeader };
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
    asDict(): {[key: string]: string | number} {
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

    asDict(): {[key: string]: string | boolean | number} {
        let result: {[key: string]: string | boolean | number} = {
            [this.name]: this.value,
        };

        if (this.font !== undefined) {
            result = { ...result, [`${this.name}_font_family`]: this.font };
        }
        if (this.fontSize !== undefined) {
            result = { ...result, [`${this.name}_font_size`]: this.fontSize };
        }
        if (this.fontColor !== undefined) {
            result = { ...result, [`${this.name}_font_color`]: this.fontColor };
        }
        if (this.bold !== undefined) {
            result = { ...result, [`${this.name}_bold`]: this.bold };
        }
        if (this.italic !== undefined) {
            result = { ...result, [`${this.name}_italic`]: this.italic };
        }
        if (this.underline !== undefined) {
            result = { ...result, [`${this.name}_underline`]: this.underline };
        }
        if (this.strikethrough !== undefined) {
            result = { ...result, [`${this.name}_strikethrough`]: this.strikethrough };
        }
        if (this.highlightColor !== undefined) {
            result = { ...result, [`${this.name}_highlight`]: this.highlightColor };
        }

        return result;
    }

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

    asDict(): {[key: string]: string | number} {
        let result: {[key: string]: string | number} = {
            [this.name]: this.value,
        };

        if (this.color !== undefined) {
            result = { ...result, [`${this.name}_color`]: this.color };
        }
        if (this.font !== undefined) {
            result = { ...result, [`${this.name}_font`]: this.font };
        }
        if (this.width !== undefined) {
            result = { ...result, [`${this.name}_width`]: this.width };
        }
        if (this.height !== undefined) {
            result = { ...result, [`${this.name}_height`]: this.height };
        }
        if (this.opacity !== undefined) {
            result = { ...result, [`${this.name}_opacity`]: this.opacity };
        }
        if (this.rotation !== undefined) {
            result = { ...result, [`${this.name}_rotation`]: this.rotation };
        }

        return result;
    }

    availableTags(): Set<string> {
        return new Set([`{watermark ${this.name}}`]);
    }
}

export class D3Code extends Element {
    code: string;
    data: string | undefined;

    constructor(name: string, code: string, data?: string) {
        super(name);
        this.code = code;
        this.data = data;
    }

    asDict(): {[key: string]: string} {
        let result: {[key: string]: string} = {
            [this.name]: this.code,
        };

        if (this.data !== undefined) {
            result = { ...result, [`${this.name}_data`]: this.data };
        }

        return result;
    }

    availableTags(): Set<string> {
        return new Set([`{$d3${this.name}}`]);
    }
}

export class AOPChartDateOptions {
    format: string | undefined;
    unit: string | undefined;
    step: number | string | undefined;

    constructor(format?: string, unit?: string, step?: number | string) {
        this.format = format;
        this.unit = unit;
        this.step = step;
    }

    asDict(): {[key: string]: string | number} {
        let result: {[key: string]: string | number} = {};

        if (this.format !== undefined) {
            result = { ...result, format: this.format };
        }
        if (this.unit !== undefined) {
            result = { ...result, unit: this.unit };
        }
        if (this.step !== undefined) {
            result = { ...result, step: this.step };
        }

        return result;
    }
}

export class AOPChart extends Element {
    xData: string[];
    yDatas: {[key: string]: (string | number | {[key: string]: string | number})[]};
    date: AOPChartDateOptions | undefined;
    title: string | undefined;
    xTitle: string | undefined;
    yTitle: string | undefined;
    x2Title: string | undefined;
    y2Title: string | undefined;

    constructor(
        name: string,
        xData: string[],
        yDatas: (string | number | {[key: string]: string | number})[][] |
            {[key: string]: (string | number | {[key: string]: string | number})[]},
        date?: AOPChartDateOptions,
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
                    this.yDatas = { ...this.yDatas, [`series ${index + 1}`]: el };
                },
            );
        } else if (yDatas.constructor !== Object) {
            // If yDatas is not an array and not a dictionary: throw error
            throw new Error(`Expected a dictionary or array, but received ${typeof yDatas}`);
        } else {
            this.yDatas = yDatas;
        }
    }

    asDict(): {
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
                            (string | number | {[key: string]: string | number})[]
                    }[] |
                    string
            } |
            string |
            {
                [key: string]:
                    string
            }
            } {
        const ySeries: {name: string, data: (string | number |
            {[key: string]: string | number})[]}[] = [];
        Object.entries(this.yDatas).forEach(
            (e) => {
                ySeries.push({ name: e[0], data: e[1] });
            },
        );

        let result: {
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
                                (string | number | {[key: string]: string | number})[]
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
            result = { ...result, title: this.title };
        }
        if (this.date !== undefined) {
            result.xAxis = {
                ...result.xAxis as {
                    [key: string]:
                        string[] |
                        string |
                        {
                            [key: string]:
                                string |
                                number
                        }
                },
                date: this.date.asDict(),
            };
        }
        if (this.xTitle !== undefined) {
            result.xAxis = {
                ...result.xAxis as {
                    [key: string]:
                        string[] |
                        string |
                        {
                            [key: string]:
                                string |
                                number
                        }
                },
                title: this.xTitle,
            };
        }
        if (this.yTitle !== undefined) {
            result.yAxis = {
                ...result.yAxis as {
                    [key: string]:
                        {
                            [key: string]:
                                string |
                                (string | number | {[key: string]: string | number})[]
                        }[] |
                        string
                },
                title: this.yTitle,
            };
        }
        if (this.x2Title !== undefined) {
            result = {
                ...result,
                x2Axis: {
                    title: this.x2Title,
                },
            };
        }
        if (this.y2Title !== undefined) {
            result = {
                ...result,
                y2Axis: {
                    title: this.y2Title,
                },
            };
        }

        return result;
    }
}
// TODO: write documentation for classes StyledProperty, Watermark, D3Code, AOPChartDateOptions, AOPChart
