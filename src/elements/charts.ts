import { Element } from './elements';

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
    asDict(): { [key: string]: string | boolean } {
        const result: { [key: string]: string | boolean } = {};

        if (this.italic !== undefined) {
            result.italic = this.italic;
        }
        if (this.bold !== undefined) {
            result.bold = this.bold;
        }
        if (this.color !== undefined) {
            result.color = this.color;
        }
        if (this.font !== undefined) {
            result.font = this.font;
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
    asDict(): { [key: string]: string | number } {
        const result: { [key: string]: string | number } = {};

        if (this.format !== undefined) {
            result.format = this.format;
        }
        if (this.code !== undefined) {
            result.code = this.code;
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
    asDict(): { [key: string]: string | number | boolean | ChartDateOptions | ChartTextStyle } {
        const result: {
            [key: string]: string | number | boolean | ChartDateOptions | ChartTextStyle
        } = {};

        if (this.orientation !== undefined) {
            result.orientation = this.orientation;
        }
        if (this.min !== undefined) {
            result.min = this.min;
        }
        if (this.max !== undefined) {
            result.max = this.max;
        }
        if (this.date !== undefined) {
            result.type = 'date';
            result.date = this.date;
        }
        if (this.title !== undefined) {
            result.title = this.title;
        }
        if (this.values !== undefined) {
            result.showValues = this.values;
        }
        if (this.valuesStyle !== undefined) {
            result.valuesStyle = this.valuesStyle;
        }
        if (this.titleStyle !== undefined) {
            result.titleStyle = this.titleStyle;
        }
        if (this.titleRotation !== undefined) {
            result.titleRotation = this.titleRotation;
        }
        if (this.majorGridLines !== undefined) {
            result.majorGridlines = this.majorGridLines;
        }
        if (this.majorUnit !== undefined) {
            result.majorUnit = this.majorUnit;
        }
        if (this.minorGridLines !== undefined) {
            result.minorGridlines = this.minorGridLines;
        }
        if (this.minorUnit !== undefined) {
            result.minorUnit = this.minorUnit;
        }
        if (this.formatCode !== undefined) {
            result.formatCode = this.formatCode;
        }

        return result;
    }
}

/**
 * Options object for a Chart.
 */
export class ChartOptions {
    legendOptions: { [key: string]: boolean | string | { [key: string]: string | boolean } } |
        undefined;
    dataLabelsOptions: { [key: string]: boolean | string } | undefined;
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
     *  the COP server. Optional.
     * @param y2Axis The options for the y2-axis. Note: date options for the y2 axis are ignored by
     *  the COP server. Optional.
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
            this.legendOptions.style = style.asDict();
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
            this.dataLabelsOptions.separator = separator;
        }
        if (seriesName !== undefined) {
            this.dataLabelsOptions.showSeriesName = seriesName;
        }
        if (categoryName !== undefined) {
            this.dataLabelsOptions.showCategoryName = categoryName;
        }
        if (legendKey !== undefined) {
            this.dataLabelsOptions.showLegendKey = legendKey;
        }
        if (value !== undefined) {
            this.dataLabelsOptions.showValue = value;
        }
        if (percentage !== undefined) {
            this.dataLabelsOptions.showPercentage = percentage;
        }
        if (position !== undefined) {
            this.dataLabelsOptions.position = position;
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
        { [key: string]: boolean | string | { [key: string]: string | boolean } } |
        {
            [key: string]: {
                [key: string]:
                string | number | boolean | ChartDateOptions | ChartTextStyle
            }
        } |
        number |
        boolean |
        string
    } {
        const result: {
            [key: string]:
            { [key: string]: boolean | string | { [key: string]: string | boolean } } |
            {
                [key: string]: {
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
            result.legend = this.legendOptions;
        }
        if (this.dataLabelsOptions !== undefined) {
            result.dataLabels = this.dataLabelsOptions;
        }
        if (this.xAxis !== undefined) {
            (result.axis as {
                [key: string]: {
                    [key: string]:
                    string | number | boolean | ChartDateOptions | ChartTextStyle
                }
            }).x = this.xAxis.asDict();
        }
        if (this.yAxis !== undefined) {
            (result.axis as {
                [key: string]: {
                    [key: string]:
                    string | number | boolean | ChartDateOptions | ChartTextStyle
                }
            }).y = this.yAxis?.asDict();
        }
        if (this.y2Axis !== undefined) {
            (result.axis as {
                [key: string]: {
                    [key: string]:
                    string | number | boolean | ChartDateOptions | ChartTextStyle
                }
            }).y2 = this.y2Axis.asDict();
        }
        if (this.width !== undefined) {
            result.width = this.width;
        }
        if (this.height !== undefined) {
            result.height = this.height;
        }
        if (this.border !== undefined) {
            result.border = this.border;
        }
        if (this.roundedCorners !== undefined) {
            result.roundedCorners = this.roundedCorners;
        }
        if (this.backgroundColor !== undefined) {
            result.backgroundColor = this.backgroundColor;
        }
        if (this.backgroundOpacity !== undefined) {
            result.backgroundOpacity = this.backgroundOpacity;
        }
        if (this.title !== undefined) {
            result.title = this.title;
        }
        if (this.titleStyle !== undefined) {
            result.titleStyle = this.titleStyle.asDict();
        }
        if (this.grid !== undefined) {
            result.grid = this.grid;
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
    data(): { [key: string]: string | number }[] {
        // Doesn't get used
        return [{ dummy: 'dummy' }];
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string | number | boolean |
        { [key: string]: string | number }[]
    } {
        const result: { [key: string]: string | { [key: string]: number | string }[] } = {
            data: this.data(),
        };

        if (this.name !== undefined) {
            result.name = this.name;
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
    data(): { [key: string]: number | string }[] {
        const result: { [key: string]: number | string }[] = [];

        for (let i = 0; i < this.x.length; i += 1) {
            result.push({ x: this.x[i], y: this.y[i] });
        }

        return result;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string | number | boolean |
        { [key: string]: string | number }[]
    } {
        const result: {
            [key: string]: string | number | boolean |
            { [key: string]: string | number }[]
        } = super.asDict();

        if (this.color !== undefined) {
            result.color = this.color;
        }

        return result;
    }
}

/**
 * A series for pie charts.
 */
export class PieSeries extends XYSeries {
    colors: (string | undefined)[] | undefined;

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
        colors?: (string | undefined)[],
    ) {
        super(x, y, name);
        this.colors = colors;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string | number | boolean |
        { [key: string]: string | number }[]
    } {
        const result: {
            [key: string]: string | number | boolean |
            { [key: string]: string | number }[]
        } = super.asDict();

        if (this.colors !== undefined) {
            // Add the color for each slice to 'data'
            for (let i = 0; i < this.colors.length; i += 1) {
                if (this.colors[i] !== undefined) {
                    (result.data as { [key: string]: string | number; }[])[i]
                        .color = this.colors[i] as string;
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
    asDict(): {
        [key: string]: string | number | boolean |
        { [key: string]: string | number }[]
    } {
        const result: {
            [key: string]: string | number | boolean |
            { [key: string]: string | number }[]
        } = super.asDict();

        if (this.opacity !== undefined) {
            result.opacity = this.opacity;
        }

        return result;
    }
}

/**
 * A series for a line chart.
 */
export class LineSeries extends XYSeries {
    smooth: boolean | undefined;
    symbol: string | undefined;
    symbolSize: string | number | undefined;
    lineWidth: string | undefined;
    lineStyle: string | undefined;

    /**
     * @param x The data for the x-axis.
     * @param y The data for the y-axis.
     * @param name The name of the series. Optional.
     * @param color The color in which the series should be shown on a chart.
     *  Can be html/css colors or hex values. Optional.
     * @param smooth Whether or not the corners of the angles formed in
     *  the data-points are smoothened. Optional.
     * @param symbol Symbol representing the datapoints.
     *  Can be square (default), diamond or triangle. Optional.
     * @param symbolSize Size of the symbol representing the data-points in
     *  (in em, pt, px, cm or in), by default: automatic. Optional.
     * @param lineWidth Thickness of the connecting line in em, pt, px, cm or in. Optional.
     * @param lineStyle Style of the line. Supported options can be found online on the
     *  [Cloud Office Print documentation](https://www.cloudofficeprint.com/docs/#line). Optional.
     */
    // TODO: change website for lineStyle argument?
    constructor(
        x: (number | string)[],
        y: number[],
        name?: string,
        color?: string,
        smooth?: boolean,
        symbol?: string,
        symbolSize?: string | number,
        lineWidth?: string,
        lineStyle?: string,
    ) {
        super(x, y, name, color);
        this.smooth = smooth;
        this.symbol = symbol;
        this.symbolSize = symbolSize;
        this.lineWidth = lineWidth;
        this.lineStyle = lineStyle;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string | number | boolean |
        { [key: string]: string | number }[]
    } {
        const result: {
            [key: string]: string | number | boolean |
            { [key: string]: string | number }[]
        } = super.asDict();

        if (this.smooth !== undefined) {
            result.smooth = this.smooth;
        }
        if (this.symbol !== undefined) {
            result.symbol = this.symbol;
        }
        if (this.symbolSize !== undefined) {
            result.symbolSize = this.symbolSize;
        }
        if (this.lineWidth !== undefined) {
            result.lineWidth = this.lineWidth;
        }
        if (this.lineStyle !== undefined) {
            result.lineStyle = this.lineStyle;
        }

        return result;
    }
}

/**
 * A series for a bubble chart.
 */
export class BubbleSeries extends XYSeries {
    sizes: number[];

    /**
     * @param x The data for the x-axis.
     * @param y The data for the y-axis.
     * @param sizes An iterable containing the sizes for each bubble of the series.
     * @param name The name of the series. Optional.
     * @param color The color in which the series should be shown on a chart.
     *  Can be html/css colors or hex values. Optional.
     */
    constructor(
        x: (number | string)[],
        y: number[],
        sizes: number[],
        name?: string,
        color?: string,
    ) {
        super(x, y, name, color);
        this.sizes = sizes;
    }

    /**
     * Get the data used in the series. E.g. x-values, y-values, ...
     * @returns the data used in the series
     */
    data(): { [key: string]: number | string }[] {
        const result: { [key: string]: number | string }[] = [];

        for (let i = 0; i < this.x.length; i += 1) {
            result.push({ x: this.x[i], y: this.y[i], size: this.sizes[i] });
        }

        return result;
    }
}

/**
 * A series for candlestick charts.
 */
export class StockSeries extends Series {
    x: (number | string)[];
    high: number[];
    low: number[];
    close: number[];
    open: number[] | undefined;
    volume: number[] | undefined;

    /**
     * @param x The data for the x-axis.
     * @param high The data for the hight prices.
     * @param low The data for the low prices.
     * @param close The data for the closing prices.
     * @param open The data for the opening prices. Optional.
     * @param volume The data for the volumes. Optional.
     * @param name The name of the series. Optional.
     */
    constructor(
        x: (number | string)[],
        high: number[],
        low: number[],
        close: number[],
        open?: number[],
        volume?: number[],
        name?: string,
    ) {
        super(name);
        this.x = x;
        this.high = high;
        this.low = low;
        this.close = close;
        this.open = open;
        this.volume = volume;
    }

    /**
     * Get the data used in the series. E.g. x-values, y-values, ...
     * @returns the data used in the series
     */
    data(): { [key: string]: number | string }[] {
        const result: { [key: string]: number | string }[] = [];

        for (let i = 0; i < this.x.length; i += 1) {
            result.push({
                x: this.x[i],
                high: this.high[i],
                low: this.low[i],
                close: this.close[i],
            });
        }

        for (let i = 0; i < result.length; i += 1) {
            if (this.open !== undefined) {
                result[i].open = this.open[i];
            }
            if (this.volume !== undefined) {
                result[i].volume = this.volume[i];
            }
        }

        return result;
    }
}

// The next few classes are exactly the same as XYSeries or LineSeries
export class BarSeries extends XYSeries { }
export class BarStackedSeries extends XYSeries { }
export class BarStackedPercentSeries extends XYSeries { }
export class ColumnSeries extends XYSeries { }
export class ColumnStackedSeries extends XYSeries { }
export class ColumnStackedPercentSeries extends XYSeries { }
export class ScatterSeries extends XYSeries { }
export class RadarSeries extends LineSeries { }

/**
 * The abstract base class for a chart.
 */
export abstract class Chart extends Element {
    options: ChartOptions | undefined;

    /**
     * @param name The name of the chart.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, options?: ChartOptions) {
        super(name);
        this.options = options;
    }

    /**
     * Update the given dict with the chart options and return the result.
     * @param updates the dict that needs to be updated with the chart options
     * @returns the input dict, updated with the chart options
     */
    getDict(updates: { [key: string]: unknown }) {
        let result = {};

        if (this.options !== undefined) {
            (result as { [key: string]: ChartOptions | { [key: string]: unknown } })
                .options = this.options instanceof ChartOptions
                    ? this.options.asDict() : this.options;
        }

        result = { ...result, ...updates };

        return { [this.name]: result };
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{$${this.name}}`]);
    }
}

/**
 * Class for a line chart
 */
export class LineChart extends Chart {
    lines: (LineSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param lines Iterable of line series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, lines: (LineSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.lines = lines;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            lines: Array.from(this.lines.map((line) => line.asDict())),
            type: 'line',
        });
    }
}

/**
 * Class for a bar chart
 */
export class BarChart extends Chart {
    bars: (BarSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param bars Iterable of bar series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, bars: (BarSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.bars = bars;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            bars: Array.from(this.bars.map((bar) => bar.asDict())),
            type: 'bar',
        });
    }
}

/**
 * Class for a stacked bar chart
 */
export class BarStackedChart extends Chart {
    bars: (BarStackedSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param bars Iterable of bar series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, bars: (BarStackedSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.bars = bars;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            bars: Array.from(this.bars.map((bar) => bar.asDict())),
            type: 'barStacked',
        });
    }
}

/**
 * Class for a stacked bar chart with the x-axis expressed in percentage
 */
export class BarStackedPercentChart extends Chart {
    bars: (BarStackedPercentSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param bars Iterable of bar series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, bars: (BarStackedPercentSeries | XYSeries)[],
        options?: ChartOptions) {
        super(name, options);
        this.bars = bars;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            bars: Array.from(this.bars.map((bar) => bar.asDict())),
            type: 'barStackedPercent',
        });
    }
}

/**
 * Class for a column chart
 */
export class ColumnChart extends Chart {
    columns: (ColumnSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param columns Iterable of column series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, columns: (ColumnSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.columns = columns;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            columns: Array.from(this.columns.map((col) => col.asDict())),
            type: 'column',
        });
    }
}

/**
 * Class for a stacked column chart
 */
export class ColumnStackedChart extends Chart {
    columns: (ColumnStackedSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param columns Iterable of column series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, columns: (ColumnStackedSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.columns = columns;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            columns: Array.from(this.columns.map((col) => col.asDict())),
            type: 'columnStacked',
        });
    }
}

/**
 * Class for a stacked column chart with the x-axis expressed in percentage
 */
export class ColumnStackedPercentChart extends Chart {
    columns: (ColumnStackedPercentSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param columns Iterable of column series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, columns: (ColumnStackedPercentSeries | XYSeries)[],
        options?: ChartOptions) {
        super(name, options);
        this.columns = columns;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            columns: Array.from(this.columns.map((col) => col.asDict())),
            type: 'columnStackedPercent',
        });
    }
}

/**
 * Class for a pie chart
 */
export class PieChart extends Chart {
    pies: (PieSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param pies Iterable of pie series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, pies: (PieSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.pies = pies;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            pies: Array.from(this.pies.map((pie) => pie.asDict())),
            type: 'pie',
        });
    }
}

/**
 * Class for a 3D pie chart
 */
export class Pie3DChart extends Chart {
    pies: (PieSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param pies Iterable of pie series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, pies: (PieSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.pies = pies;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            pies: Array.from(this.pies.map((pie) => pie.asDict())),
            type: 'pie3d',
        });
    }
}

/**
 * Class for a doughnut chart
 */
export class DoughnutChart extends Chart {
    pies: (PieSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param pies Iterable of pie series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, pies: (PieSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.pies = pies;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            doughnuts: Array.from(this.pies.map((pie) => pie.asDict())),
            type: 'doughnut',
        });
    }
}

/**
 * Class for a radar chart
 */
export class RadarChart extends Chart {
    radars: (RadarSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param pies Iterable of radar series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, radars: (RadarSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.radars = radars;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            radars: Array.from(this.radars.map((rad) => rad.asDict())),
            type: 'radar',
        });
    }
}

/**
 * Class for a area chart
 */
export class AreaChart extends Chart {
    areas: (AreaSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param pies Iterable of area series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, areas: (AreaSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.areas = areas;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            areas: Array.from(this.areas.map((ar) => ar.asDict())),
            type: 'area',
        });
    }
}

/**
 * Class for a scatter chart
 */
export class ScatterChart extends Chart {
    scatters: (ScatterSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param pies Iterable of scatter series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, scatters: (ScatterSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.scatters = scatters;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            scatters: Array.from(this.scatters.map((scat) => scat.asDict())),
            type: 'scatter',
        });
    }
}

/**
 * Class for a bubble chart
 */
export class BubbleChart extends Chart {
    bubbles: (BubbleSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param pies Iterable of bubble series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, bubbles: (BubbleSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.bubbles = bubbles;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            bubbles: Array.from(this.bubbles.map((bub) => bub.asDict())),
            type: 'bubble',
        });
    }
}

/**
 * Class for a stock chart
 */
export class StockChart extends Chart {
    stocks: (StockSeries | XYSeries)[];

    /**
     * @param name The name of the chart.
     * @param pies Iterable of stock series.
     * @param options The options for the chart. Optional.
     */
    constructor(name: string, stocks: (StockSeries | XYSeries)[], options?: ChartOptions) {
        super(name, options);
        this.stocks = stocks;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {
        [key: string]: string |
        { [key: string]: string | number | boolean | { [key: string]: string | number }[] }
    } {
        return this.getDict({
            stocks: Array.from(this.stocks.map((bub) => bub.asDict())),
            type: 'stock',
        });
    }
}

/**
 * Recursively replace the keys in a (possibly) nested dictionary with a new name.
 * Objects with key "options" will not be modified (y-axis stays y-axis).
 * @param obj input dictionary
 * @param oldKey old name of the key
 * @param newKey new name of the key
 * @returns input dictionary with the old key name replaced by the new key name
 */
function replaceKeyRecursive<T extends object>(obj: T, oldKey: string, newKey: string): T {
    const result: T = { ...obj };
    Object.entries(result).forEach(
        ([key, value]) => {
            if (value.constructor === Object) {
                if (key !== 'options') {
                    (result as { [key: string]: unknown })[key] = replaceKeyRecursive(
                        value,
                        oldKey,
                        newKey,
                    );
                }
            } else if (value.constructor === Array) {
                const newValue: object[] = [];
                value.forEach(
                    (_val, idx) => {
                        newValue.push(replaceKeyRecursive(value[idx], oldKey, newKey));
                    },
                );
                (result as { [key: string]: unknown })[key] = newValue;
            }
        },
    );

    if (Object.prototype.hasOwnProperty.call(result, oldKey)) {
        const val = (result as { [key: string]: unknown })[oldKey];
        delete (result as { [key: string]: unknown })[oldKey];
        (result as { [key: string]: unknown })[newKey] = val;
    }

    return result;
}

/**
 * Class for a combined chart.
 * It is possible to combine more than 2 types of chart but there can only be two value axes."""
 */
export class CombinedChart extends Chart {
    charts: Chart[];
    secondaryCharts: Chart[] | undefined;

    /**
     * @param name The name of the chart.
     * @param charts Charts for the first y-axis.
     * @param secondaryCharts Charts for the secondary y-axis. Optional.
     * @param options The options for the chart. Optional.
     */
    constructor(
        name: string,
        charts: Chart[],
        secondaryCharts?: Chart[],
        options?: ChartOptions,
    ) {
        super(name, options);
        this.charts = charts;
        this.secondaryCharts = secondaryCharts;
    }

    /**
     * Replace the y-axis with the y2-axis for the secondary charts.
     * Add the dict representation for each chart to a list and return that list.
     * @returns list containing the dict representation for each chart, after processing
     */
    getModifiedChartDicts(): object[] {
        const primaryArray = [...this.charts];
        const dictArray: object[] = [];

        primaryArray.forEach(
            (val) => {
                const chartDictFull = val.asDict();
                const chartDict = (chartDictFull as { [key: string]: object })[val.name];
                dictArray.push(chartDict);
            },
        );

        if (this.secondaryCharts !== undefined) {
            const secondaryArray = [...this.secondaryCharts];
            secondaryArray.forEach(
                (val) => {
                    const chartDictFull = val.asDict();
                    const chartDict = (chartDictFull as { [key: string]: object })[val.name];
                    dictArray.push(replaceKeyRecursive(chartDict, 'y', 'y2'));
                },
            );
        }

        return dictArray;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): { [key: string]: unknown } {
        return this.getDict({
            type: 'multiple',
            multiples: this.getModifiedChartDicts(),
        });
    }
}
