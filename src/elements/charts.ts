/**
 * Class for defining the styling of the text for a chart.
 */
export class ChartTextStyle {
    italic: boolean | undefined;
    bold: boolean | undefined;
    color: string | undefined;
    font: string | undefined;

    /**
     * @param italic Whether or not the text should be in italic. Optional.
     * @param bold Whether or not the text should be in bold. Optional.
     * @param color The color of the text. Optional.
     * @param font The font of the text. Optional.
     */
    constructor(italic?: boolean, bold?: boolean, color?: string, font?: string) {
        this.italic = italic;
        this.bold = bold;
        this.color = color;
        this.font = font;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {[key: string]: string | boolean} {
        let result: {[key: string]: string | boolean} = {};

        if (this.italic !== undefined) {
            result = { ...result, italic: this.italic };
        }
        if (this.bold !== undefined) {
            result = { ...result, bold: this.bold };
        }
        if (this.color !== undefined) {
            result = { ...result, color: this.color };
        }
        if (this.font !== undefined) {
            result = { ...result, font: this.font };
        }

        return result;
    }
}

/**
 * Class for defining the date options for a chart.
 */
export class ChartDateOptions {
    format: string | undefined;
    code: string | undefined;
    unit: string | undefined;
    step: number | string | undefined;

    /**
     * @param format The format to display the date on the chart's axis (e.g. unix). Optional.
     * @param code The code for the date (e.g. dd/mm/yyyy). Optional.
     * @param unit The unit to be used for spacing the axis values (e.g. months). Optional.
     * @param step How many of the above unit should be used for spacing the axis values
     *  (automatic if undefined). This option is not supported in LibreOffice. Optional.
     */
    constructor(format?: string, code?: string, unit?: string, step?: number | string) {
        this.format = format;
        this.code = code;
        this.unit = unit;
        this.step = step;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {[key: string]: string | number} {
        let result: {[key: string]: string | number} = {};

        if (this.format !== undefined) {
            result = { ...result, format: this.format };
        }
        if (this.code !== undefined) {
            result = { ...result, code: this.code };
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

/**
 * Class for defining the axis options for a chart.
 */
export class ChartAxisOptions {
    orientation: string | undefined;
    min: number | undefined;
    max: number | undefined;
    date: ChartDateOptions | undefined;
    title: string | undefined;
    values: boolean | undefined;
    valuesStyle: ChartTextStyle | undefined;
    titleStyle: ChartTextStyle | undefined;
    titleRotation: number | undefined;
    majorGridLines: boolean | undefined;
    majorUnit: number | undefined;
    minorGridLines: boolean | undefined;
    minorUnit: number | undefined;
    formatCode: string | undefined;

    /**
     * @param orientation The orientation of the axis, 'minMax' or 'maxMin'. Optional.
     * @param min Minimum of the axis. Optional.
     * @param max Maximum of the axis. Optional.
     * @param date Date options, only for stock charts. Optional.
     * @param title Title of the axis. Optional.
     * @param values Whether or not to show the values on the axis. Optional.
     * @param valuesStyle Styling for the values. Optional.
     * @param titleStyle Styling for the title. Optional.
     * @param titleRotation Title rotation in degrees, clockwise from horizontal axis. Optional.
     * @param majorGridLines Whether or not to show the major grid lines. Optional.
     * @param majorUnit Automatic when undefined, spacing between major grid lines and axis values.
     *  Optional.
     * @param minorGridLines Whether or not to show the minor grid lines. Optional.
     * @param minorUnit Automatic when undefined, spacing between minor grid lines and axis values.
     *  Optional.
     * @param formatCode Format code for axis data, "General", "Number" ... Optional.
     */
    constructor(
        orientation?: string,
        min?: number,
        max?: number,
        date?: ChartDateOptions,
        title?: string,
        values?: boolean,
        valuesStyle?: ChartTextStyle,
        titleStyle?: ChartTextStyle,
        titleRotation?: number,
        majorGridLines?: boolean,
        majorUnit?: number,
        minorGridLines?: boolean,
        minorUnit?: number,
        formatCode?: string,
    ) {
        this.orientation = orientation;
        this.min = min;
        this.max = max;
        this.date = date;
        this.title = title;
        this.values = values;
        this.valuesStyle = valuesStyle;
        this.titleStyle = titleStyle;
        this.titleRotation = titleRotation;
        this.majorGridLines = majorGridLines;
        this.majorUnit = majorUnit;
        this.minorGridLines = minorGridLines;
        this.minorUnit = minorUnit;
        this.formatCode = formatCode;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {[key: string]: string | number | boolean | ChartDateOptions | ChartTextStyle} {
        let result: {
            [key: string]: string | number | boolean | ChartDateOptions | ChartTextStyle
        } = {};

        if (this.orientation !== undefined) {
            result = { ...result, orientation: this.orientation };
        }
        if (this.min !== undefined) {
            result = { ...result, min: this.min };
        }
        if (this.max !== undefined) {
            result = { ...result, max: this.max };
        }
        if (this.date !== undefined) {
            result = { ...result, date: this.date };
        }
        if (this.title !== undefined) {
            result = { ...result, title: this.title };
        }
        if (this.values !== undefined) {
            result = { ...result, values: this.values };
        }
        if (this.valuesStyle !== undefined) {
            result = { ...result, valuesStyle: this.valuesStyle };
        }
        if (this.titleStyle !== undefined) {
            result = { ...result, titleStyle: this.titleStyle };
        }
        if (this.titleRotation !== undefined) {
            result = { ...result, titleRotation: this.titleRotation };
        }
        if (this.majorGridLines !== undefined) {
            result = { ...result, majorGridLines: this.majorGridLines };
        }
        if (this.majorUnit !== undefined) {
            result = { ...result, majorUnit: this.majorUnit };
        }
        if (this.minorGridLines !== undefined) {
            result = { ...result, minorGridLines: this.minorGridLines };
        }
        if (this.minorUnit !== undefined) {
            result = { ...result, minorUnit: this.minorUnit };
        }
        if (this.formatCode !== undefined) {
            result = { ...result, formatCode: this.formatCode };
        }

        return result;
    }
}

/**
 * Options object for a Chart.
 */
export class ChartOptions {
    legendOptions: {[key: string]: boolean | string | {[key: string]: string | boolean}} |
        undefined;
    dataLabelsOptions: {[key: string]: boolean | string} | undefined;
    xAxis: ChartAxisOptions | undefined;
    yAxis: ChartAxisOptions | undefined;
    y2Axis: ChartAxisOptions | undefined;
    width: number | undefined;
    height: number | undefined;
    border: boolean | undefined;
    roundedCorners: boolean | undefined;
    backgroundColor: string | undefined;
    backgroundOpacity: number | undefined;
    title: string | undefined;
    titleStyle: ChartTextStyle | undefined;
    grid: boolean | undefined;

    /**
     * @param xAxis The options for the x-axis. Optional.
     * @param yAxis The options for the y-axis. Note: date options for the y axis are ignored by
     *  the AOP server. Optional.
     * @param y2Axis The options for the y2-axis. Note: date options for the y2 axis are ignored by
     *  the AOP server. Optional.
     * @param width Width of the chart. Optional.
     * @param height Height of the chart. Optional.
     * @param border Whether or not the chart should have a border. Optional.
     * @param roundedCorners Whether or not the chart should have rounded corners.
     *  Note: displaying rounded corners is not supported by LibreOffice. Optional.
     * @param backgroundColor Background color for the entire chart. Optional.
     * @param backgroundOpacity The opacity of the background color for the entire chart.
     *  Note: backgroundOpacity is ignored if backgroundColor is not specified or if backgroundColor
     *  is specified in a color space which includes an alpha channel (e.g. rgba(0,191,255,0.5)).
     *  In the latter case, the alpha channel in backgroundColor is used. Optional.
     * @param title The title of the chart. Optional.
     * @param titleStyle The styling for the title of the chart. Optional.
     * @param grid Whether or not the chart should have a grid. Optional.
     */
    constructor(
        xAxis?: ChartAxisOptions,
        yAxis?: ChartAxisOptions,
        y2Axis?: ChartAxisOptions,
        width?: number,
        height?: number,
        border?: boolean,
        roundedCorners?: boolean,
        backgroundColor?: string,
        backgroundOpacity?: number,
        title?: string,
        titleStyle?: ChartTextStyle,
        grid?: boolean,
    ) {
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.y2Axis = y2Axis;
        this.width = width;
        this.height = height;
        this.border = border;
        this.roundedCorners = roundedCorners;
        this.backgroundColor = backgroundColor;
        this.backgroundOpacity = backgroundOpacity;
        this.title = title;
        this.titleStyle = titleStyle;
        this.grid = grid;
    }

    /**
     * Setter for the legend of the chart.
     * @param position Position of the legend.  'l': left, 'r': right, 'b': bottom, 't': top.
     *  Defaults to 'r'.
     * @param style The styling for the text of the legend. Optional.
     */
    setLegend(position: string = 'r', style?: ChartTextStyle) {
        this.legendOptions = {
            showLegend: true,
            position,
        };

        if (style !== undefined) {
            this.legendOptions = { ...this.legendOptions, style: style.asDict() };
        }
    }

    /**
     * Setter for removing the legend from the chart.
     */
    removeLegend() {
        this.legendOptions = undefined;
    }

    /**
     * @param separator Seperator : can be either false or anything else
     *  for example \n or \t or ; or (, if false). Optional.
     * @param seriesName Whether or not to include the series name in the data label. Optional.
     * @param categoryName Whether or not to include the series category name in the data label.
     *  Optional.
     * @param legendKey Whether or not to include the legend key (i.e. the color of the series)
     *  in the data label. Optional.
     * @param value Whether or not to include the actual value in the data label. Optional.
     * @param percentage Whether or not to include the percentage in the data label.
     *  By default True for pie/pie3d and doughnut. Optional.
     * @param position The position of the data label.
     *  Can be 'center', 'left', 'right', 'above', 'below', 'insideBase', 'bestFit', 'outsideEnd',
     *  'insideEnd'. Note that not all options might be available for specific charts. Optional.
     */
    setDataLabels(
        separator?: string,
        seriesName?: boolean,
        categoryName?: boolean,
        legendKey?: boolean,
        value?: boolean,
        percentage?: boolean,
        position?: string,
    ) {
        this.dataLabelsOptions = {
            showDataLabels: true,
        };

        if (separator !== undefined) {
            this.dataLabelsOptions = { ...this.dataLabelsOptions, separator };
        }
        if (seriesName !== undefined) {
            this.dataLabelsOptions = { ...this.dataLabelsOptions, showSeriesName: seriesName };
        }
        if (categoryName !== undefined) {
            this.dataLabelsOptions = { ...this.dataLabelsOptions, showCategoryName: categoryName };
        }
        if (legendKey !== undefined) {
            this.dataLabelsOptions = { ...this.dataLabelsOptions, showLegendKey: legendKey };
        }
        if (value !== undefined) {
            this.dataLabelsOptions = { ...this.dataLabelsOptions, showValue: value };
        }
        if (percentage !== undefined) {
            this.dataLabelsOptions = { ...this.dataLabelsOptions, showPercentage: percentage };
        }
        if (position !== undefined) {
            this.dataLabelsOptions = { ...this.dataLabelsOptions, position };
        }
    }

    /**
     * Setter to remove the data labels from the chart.
     */
    removeDataLabels() {
        this.dataLabelsOptions = undefined;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]:
            {[key: string]: boolean | string | {[key: string]: string | boolean}} |
            {[key: string]: {
                [key: string]:
                    string | number | boolean | ChartDateOptions | ChartTextStyle
                }
            } |
            number |
            boolean |
            string
            } {
        let result: {
            [key: string]:
                {[key: string]: boolean | string | {[key: string]: string | boolean}} |
                {[key: string]: {
                    [key: string]:
                        string | number | boolean | ChartDateOptions | ChartTextStyle
                    }
                } |
                number |
                boolean |
                string
        } = {
            axis: {},
        };

        if (this.legendOptions !== undefined) {
            result = { ...result, legend: this.legendOptions };
        }
        if (this.dataLabelsOptions !== undefined) {
            result = { ...result, dataLabels: this.dataLabelsOptions };
        }
        if (this.xAxis !== undefined) {
            result.axis = {
                ...result.axis as {[key: string]: {
                    [key: string]:
                        string | number | boolean | ChartDateOptions | ChartTextStyle
                    }
                },
                x: this.xAxis.asDict(),
            };
        }
        if (this.yAxis !== undefined) {
            result.axis = {
                ...result.axis as {[key: string]: {
                    [key: string]:
                        string | number | boolean | ChartDateOptions | ChartTextStyle
                    }
                },
                y: this.yAxis.asDict(),
            };
        }
        if (this.y2Axis !== undefined) {
            result.axis = {
                ...result.axis as {[key: string]: {
                    [key: string]:
                        string | number | boolean | ChartDateOptions | ChartTextStyle
                    }
                },
                y2: this.y2Axis.asDict(),
            };
        }
        if (this.width !== undefined) {
            result = { ...result, width: this.width };
        }
        if (this.height !== undefined) {
            result = { ...result, height: this.height };
        }
        if (this.border !== undefined) {
            result = { ...result, border: this.border };
        }
        if (this.roundedCorners !== undefined) {
            result = { ...result, roundedCorners: this.roundedCorners };
        }
        if (this.backgroundColor !== undefined) {
            result = { ...result, backgroundColor: this.backgroundColor };
        }
        if (this.backgroundOpacity !== undefined) {
            result = { ...result, backgroundOpacity: this.backgroundOpacity };
        }
        if (this.title !== undefined) {
            result = { ...result, title: this.title };
        }
        if (this.titleStyle !== undefined) {
            result = { ...result, titleStyle: this.titleStyle.asDict() };
        }
        if (this.grid !== undefined) {
            result = { ...result, grid: this.grid };
        }

        return result;
    }
}

/**
 * Abstract base class for a series.
 */
export abstract class Series {
    name: string | undefined;

    /**
     * @param name The name of the series. Optional.
     */
    constructor(name?: string) {
        this.name = name;
    }

    /**
     * Get the data used in the series. E.g. x-values, y-values, ...
     * @returns the data used in the series
     */
    // Disable eslint warning, because this is an abstract base class
    // eslint-disable-next-line class-methods-use-this
    data(): {[key: string]: string | number}[] {
        // Doesn't get used
        return [{ dummy: 'dummy' }];
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {[key: string]: string | number | {[key: string]: string | number}[]} {
        let result: {[key: string]: string | {[key: string]: number | string}[]} = {
            data: this.data(),
        };

        if (this.name !== undefined) {
            result = { ...result, name: this.name };
        }

        return result;
    }
}

/**
 * A series for the case where the data consists of x-values and y-values.
 */
export class XYSeries extends Series {
    x: (number | string)[];
    y: number[];
    color: string | undefined;

    /**
     * @param x The data for the x-axis.
     * @param y The data for the y-axis.
     * @param name The name of the series. Optional.
     * @param color The color in which the series should be shown on a chart.
     *  Can be html/css colors or hex values. Optional.
     */
    constructor(
        x: (number | string)[],
        y: number[],
        name?: string,
        color?: string,
    ) {
        super(name);
        this.x = x;
        this.y = y;
        this.color = color;
    }

    /**
     * Get the data used in the series. E.g. x-values, y-values, ...
     * @returns the data used in the series
     */
    data(): {[key: string]: number | string}[] {
        const result: {[key: string]: number | string}[] = [];

        for (let i = 0; i < this.x.length; i += 1) {
            result.push({ x: this.x[i], y: this.y[i] });
        }

        return result;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {[key: string]: string | number | {[key: string]: string | number}[]} {
        let result: {[key: string]: string | number |
            {[key: string]: string | number}[]} = super.asDict();

        if (this.color !== undefined) {
            result = { ...result, color: this.color };
        }

        return result;
    }
}

/**
 * A series for pie charts.
 */
export class PieSeries extends XYSeries {
    colors: string[] | undefined;

    /**
     * @param x The data for the x-axis.
     * @param y The data for the y-axis.
     * @param name The name of the series. Optional.
     * @param colors Should be an iterable that contains the color for each specific pie slice.
     *  If no colors are specified, the document's theme color is used.
     *  If some colors are specified, but not for all data points, random colors will fill the gaps.
     *  The value for non-specified colors must be None.
     *  Warning: this is not the same as self.color of XYSeries,
     *  which is the color for the entire series, but this is not applicable to PieSeries.
     *  Optional.
     */
    constructor(
        x: (number | string)[],
        y: number[],
        name?: string,
        colors?: string[],
    ) {
        super(x, y, name);
        this.colors = colors;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {[key: string]: string | number | {[key: string]: string | number}[]} {
        const result: {[key: string]: string | number |
            {[key: string]: string | number}[]} = super.asDict();

        if (this.colors !== undefined) {
            // Add the color for each slice to 'data'
            for (let i = 0; i < this.colors.length; i += 1) {
                if (this.colors[i] !== undefined) {
                    (result.data as { [key: string]: string | number; }[])[i] = {
                        ...(result.data as { [key: string]: string | number; }[])[i],
                        color: this.colors[i],
                    };
                }
            }
        }

        return result;
    }
}

/**
 * A series for an area chart.
 */
export class AreaSeries extends XYSeries {
    opacity: number | undefined;

    /**
     * @param x The data for the x-axis.
     * @param y The data for the y-axis.
     * @param name The name of the series. Optional.
     * @param color The color in which the series should be shown on a chart.
     *  Can be html/css colors or hex values. Optional.
     * @param opacity The opacity for the color of the series. Optional.
     */
    constructor(
        x: (number | string)[],
        y: number[],
        name?: string,
        color?: string,
        opacity?: number,
    ) {
        super(x, y, name, color);
        this.opacity = opacity;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {[key: string]: string | number | {[key: string]: string | number}[]} {
        let result: {[key: string]: string | number |
            {[key: string]: string | number}[]} = super.asDict();

        if (this.opacity !== undefined) {
            result = { ...result, opacity: this.opacity };
        }

        return result;
    }
}
