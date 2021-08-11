import { describe, expect, test } from '@jest/globals';
import * as aop from '../index';

describe('Tests for charts', () => {
    test('Test chart options', () => {
        const xAxis = new aop.elements.ChartAxisOptions(
            'minMax',
            5,
            10,
            new aop.elements.ChartDateOptions(
                'unix',
                'mm/yy',
                'months',
                1,
            ),
            'title_x',
            true,
            new aop.elements.ChartTextStyle(
                true,
                true,
                'red',
                'Arial',
            ),
            new aop.elements.ChartTextStyle(
                true,
                false,
                'blue',
                'Arial',
            ),
            45,
            true,
            2,
            true,
            1,
            'General',
        );
        const yAxis = new aop.elements.ChartAxisOptions(
            'minMax',
            5,
            10,
            undefined,
            'title_y',
            true,
            new aop.elements.ChartTextStyle(
                true,
                true,
                'red',
                'Arial',
            ),
            new aop.elements.ChartTextStyle(
                true,
                false,
                'blue',
                'Arial',
            ),
            45,
            true,
            2,
            true,
            1,
            'General',
        );
        const y2Axis = yAxis;
        const options = new aop.elements.ChartOptions(
            xAxis,
            yAxis,
            y2Axis,
            500,
            500,
            true,
            false,
            'green',
            50,
            'title_chart',
            new aop.elements.ChartTextStyle(
                false,
                true,
                'red',
                'Arial',
            ),
            true,
        );
        options.setLegend(
            'l',
            new aop.elements.ChartTextStyle(
                true,
                true,
                'blue',
                'Arial',
            ),
        );
        options.setDataLabels(
            ';',
            false,
            false,
            true,
            false,
            true,
            'r',
        );
        const optionsExpected = {
            axis: {
                x: {
                    orientation: 'minMax',
                    min: 5,
                    max: 10,
                    type: 'date',
                    date: {
                        format: 'unix',
                        code: 'mm/yy',
                        unit: 'months',
                        step: 1,
                    },
                    title: 'title_x',
                    showValues: true,
                    valuesStyle: {
                        italic: true,
                        bold: true,
                        color: 'red',
                        font: 'Arial',
                    },
                    titleStyle: {
                        italic: true,
                        bold: false,
                        color: 'blue',
                        font: 'Arial',
                    },
                    titleRotation: 45,
                    majorGridlines: true,
                    majorUnit: 2,
                    minorGridlines: true,
                    minorUnit: 1,
                    formatCode: 'General',
                },
                y: {
                    orientation: 'minMax',
                    min: 5,
                    max: 10,
                    title: 'title_y',
                    showValues: true,
                    valuesStyle: {
                        italic: true,
                        bold: true,
                        color: 'red',
                        font: 'Arial',
                    },
                    titleStyle: {
                        italic: true,
                        bold: false,
                        color: 'blue',
                        font: 'Arial',
                    },
                    titleRotation: 45,
                    majorGridlines: true,
                    majorUnit: 2,
                    minorGridlines: true,
                    minorUnit: 1,
                    formatCode: 'General',
                },
                y2: {
                    orientation: 'minMax',
                    min: 5,
                    max: 10,
                    title: 'title_y',
                    showValues: true,
                    valuesStyle: {
                        italic: true,
                        bold: true,
                        color: 'red',
                        font: 'Arial',
                    },
                    titleStyle: {
                        italic: true,
                        bold: false,
                        color: 'blue',
                        font: 'Arial',
                    },
                    titleRotation: 45,
                    majorGridlines: true,
                    majorUnit: 2,
                    minorGridlines: true,
                    minorUnit: 1,
                    formatCode: 'General',
                },
            },
            width: 500,
            height: 500,
            border: true,
            roundedCorners: false,
            backgroundColor: 'green',
            backgroundOpacity: 50,
            title: 'title_chart',
            titleStyle: {
                italic: false,
                bold: true,
                color: 'red',
                font: 'Arial',
            },
            grid: true,
            legend: {
                showLegend: true,
                position: 'l',
                style: {
                    italic: true,
                    bold: true,
                    color: 'blue',
                    font: 'Arial',
                },
            },
            dataLabels: {
                showDataLabels: true,
                separator: ';',
                showSeriesName: false,
                showCategoryName: false,
                showLegendKey: true,
                showValue: false,
                showPercentage: true,
                position: 'r',
            },
        };
        expect(options.asDict()).toEqual(optionsExpected);
    });
    test('Test for LineChart. Also serves as a test for RadarChart (RadarSeries is equivalent to LineSeries)', () => {
        const line1 = new aop.elements.LineSeries(
            ['a', 'b', 'c'],
            [1, 2, 3],
            'line1',
            'red',
            true,
            'diamond',
            10,
            '0.2cm',
            'sysDashDotDot',
        );
        const line2 = new aop.elements.LineSeries(
            ['a', 'b', 'c'],
            [4, 5, 6],
            'line2',
            'blue',
            true,
            'square',
            12,
            '2px',
            'sysDash',
        );
        const lineChart = new aop.elements.LineChart(
            'test_name',
            [line1, line2],
        );
        const lineChartExpected = {
            test_name: {
                lines: [
                    {
                        data: [
                            {
                                x: 'a',
                                y: 1,
                            },
                            {
                                x: 'b',
                                y: 2,
                            },
                            {
                                x: 'c',
                                y: 3,
                            },
                        ],
                        name: 'line1',
                        smooth: true,
                        symbol: 'diamond',
                        symbolSize: 10,
                        color: 'red',
                        lineWidth: '0.2cm',
                        lineStyle: 'sysDashDotDot',
                    },
                    {
                        data: [
                            {
                                x: 'a',
                                y: 4,
                            },
                            {
                                x: 'b',
                                y: 5,
                            },
                            {
                                x: 'c',
                                y: 6,
                            },
                        ],
                        name: 'line2',
                        smooth: true,
                        symbol: 'square',
                        symbolSize: 12,
                        color: 'blue',
                        lineWidth: '2px',
                        lineStyle: 'sysDash',
                    },
                ],
                type: 'line',
            },
        };
        expect(lineChart.asDict()).toEqual(lineChartExpected);
    });
    test(`Test for BarChart. Also serves as the test for: 
    BarStackedChart, BarStackedPercentChart, ColumnChart, ColumnStackedChart, ColumnStackedPercentChart
    and ScatterChart because their constructors take the same argument types (i.e. XYSeries).`, () => {
        const bars1 = new aop.elements.BarSeries(
            ['a', 'b', 'c'],
            [1, 2, 3],
            'bars1',
            'red',
        );
        const bars2 = new aop.elements.BarSeries(
            ['a', 'b', 'c'],
            [4, 5, 6],
            'bars2',
            'blue',
        );
        const barChart = new aop.elements.BarChart(
            'bar_chart',
            [bars1, bars2],
        );
        const barChartExpected = {
            bar_chart: {
                bars: [
                    {
                        data: [
                            {
                                x: 'a',
                                y: 1,
                            },
                            {
                                x: 'b',
                                y: 2,
                            },
                            {
                                x: 'c',
                                y: 3,
                            },
                        ],
                        name: 'bars1',
                        color: 'red',
                    },
                    {
                        data: [
                            {
                                x: 'a',
                                y: 4,
                            },
                            {
                                x: 'b',
                                y: 5,
                            },
                            {
                                x: 'c',
                                y: 6,
                            },
                        ],
                        name: 'bars2',
                        color: 'blue',
                    },
                ],
                type: 'bar',
            },
        };
        expect(barChart.asDict()).toEqual(barChartExpected);
    });
    test(`Test for PieChart. Also serves as the test for Pie3DChart and DoughnutChart,
    because their constructors take the same argument types (i.e. PieSeries).`, () => {
        const pies1 = new aop.elements.PieSeries(
            ['a', 'b', 'c'],
            [1, 2, 3],
            'pies1',
            ['red', undefined, 'blue'],
        );
        const pies2 = new aop.elements.PieSeries(
            ['a', 'b', 'c'],
            [4, 5, 6],
            'pies2',
            ['green', 'blue', undefined],
        );
        const piesChart = new aop.elements.PieChart(
            'pie_chart',
            [pies1, pies2],
        );
        const piesChartExpected = {
            pie_chart: {
                pies: [
                    {
                        data: [
                            {
                                x: 'a',
                                y: 1,
                                color: 'red',
                            },
                            {
                                x: 'b',
                                y: 2,
                            },
                            {
                                x: 'c',
                                y: 3,
                                color: 'blue',
                            },
                        ],
                        name: 'pies1',
                    },
                    {
                        data: [
                            {
                                x: 'a',
                                y: 4,
                                color: 'green',
                            },
                            {
                                x: 'b',
                                y: 5,
                                color: 'blue',
                            },
                            {
                                x: 'c',
                                y: 6,
                            },
                        ],
                        name: 'pies2',
                    },
                ],
                type: 'pie',
            },
        };
        expect(piesChart.asDict()).toEqual(piesChartExpected);
    });
    test('Test for AreaChart', () => {
        const area1 = new aop.elements.AreaSeries(
            ['a', 'b', 'c'],
            [1, 2, 3],
            'area1',
            'red',
            50,
        );
        const area2 = new aop.elements.AreaSeries(
            ['a', 'b', 'c'],
            [4, 5, 6],
            'area2',
            'blue',
            80,
        );
        const areaChart = new aop.elements.AreaChart(
            'area_chart',
            [area1, area2],
        );
        const areaChartExpected = {
            area_chart: {
                areas: [
                    {
                        data: [
                            {
                                x: 'a',
                                y: 1,
                            },
                            {
                                x: 'b',
                                y: 2,
                            },
                            {
                                x: 'c',
                                y: 3,
                            },
                        ],
                        name: 'area1',
                        color: 'red',
                        opacity: 50,
                    },
                    {
                        data: [
                            {
                                x: 'a',
                                y: 4,
                            },
                            {
                                x: 'b',
                                y: 5,
                            },
                            {
                                x: 'c',
                                y: 6,
                            },
                        ],
                        name: 'area2',
                        color: 'blue',
                        opacity: 80,
                    },
                ],
                type: 'area',
            },
        };
        expect(areaChart.asDict()).toEqual(areaChartExpected);
    });
    test('Test for BubbleChart', () => {
        const bubble1 = new aop.elements.BubbleSeries(
            ['a', 'b', 'c'],
            [1, 2, 3],
            [5, 6, 2],
            'bubble1',
            'red',
        );
        const bubble2 = new aop.elements.BubbleSeries(
            ['a', 'b', 'c'],
            [4, 5, 6],
            [5, 6, 2],
            'bubble2',
            'blue',
        );
        const bubbleChart = new aop.elements.BubbleChart(
            'bubble_chart',
            [bubble1, bubble2],
        );
        const bubbleChartExpected = {
            bubble_chart: {
                bubbles: [
                    {
                        data: [
                            {
                                x: 'a',
                                y: 1,
                                size: 5,
                            },
                            {
                                x: 'b',
                                y: 2,
                                size: 6,
                            },
                            {
                                x: 'c',
                                y: 3,
                                size: 2,
                            },
                        ],
                        name: 'bubble1',
                        color: 'red',
                    },
                    {
                        data: [
                            {
                                x: 'a',
                                y: 4,
                                size: 5,
                            },
                            {
                                x: 'b',
                                y: 5,
                                size: 6,
                            },
                            {
                                x: 'c',
                                y: 6,
                                size: 2,
                            },
                        ],
                        name: 'bubble2',
                        color: 'blue',
                    },
                ],
                type: 'bubble',
            },
        };
        expect(bubbleChart.asDict()).toEqual(bubbleChartExpected);
    });
    test('Test for StockChart', () => {
        const stock1 = new aop.elements.StockSeries(
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10, 11, 12],
            [13, 14, 15],
            [16, 17, 18],
            'stock1',
        );
        const stock2 = new aop.elements.StockSeries(
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10, 11, 12],
            [13, 14, 15],
            [16, 17, 18],
            'stock2',
        );
        const stockChart = new aop.elements.StockChart(
            'stock_chart',
            [stock1, stock2],
        );
        const stockChartExpected = {
            stock_chart: {
                stocks: [
                    {
                        data: [
                            {
                                x: 1,
                                high: 4,
                                low: 7,
                                close: 10,
                                open: 13,
                                volume: 16,
                            },
                            {
                                x: 2,
                                high: 5,
                                low: 8,
                                close: 11,
                                open: 14,
                                volume: 17,
                            },
                            {
                                x: 3,
                                high: 6,
                                low: 9,
                                close: 12,
                                open: 15,
                                volume: 18,
                            },
                        ],
                        name: 'stock1',
                    },
                    {
                        data: [
                            {
                                x: 1,
                                high: 4,
                                low: 7,
                                close: 10,
                                open: 13,
                                volume: 16,
                            },
                            {
                                x: 2,
                                high: 5,
                                low: 8,
                                close: 11,
                                open: 14,
                                volume: 17,
                            },
                            {
                                x: 3,
                                high: 6,
                                low: 9,
                                close: 12,
                                open: 15,
                                volume: 18,
                            },
                        ],
                        name: 'stock2',
                    },
                ],
                type: 'stock',
            },
        };
        expect(stockChart.asDict()).toEqual(stockChartExpected);
    });
    test('Test chart combined', () => {
        const axis = new aop.elements.ChartAxisOptions();
        const column1 = new aop.elements.ColumnSeries(
            ['a', 'b', 'c'],
            [1, 2, 3],
            'column1',
        );
        const column2 = new aop.elements.ColumnSeries(
            ['a', 'b', 'c'],
            [4, 5, 6],
            'column2',
        );
        const columnChart = new aop.elements.ColumnChart(
            'column_chart',
            [column1, column2],
        );
        const line1 = new aop.elements.LineSeries(
            ['a', 'b', 'c'],
            [1, 2, 3],
            'line1',
            undefined,
            undefined,
            'square',
        );
        const line2 = new aop.elements.LineSeries(
            ['a', 'b', 'c'],
            [4, 5, 6],
            'line2',
            undefined,
            undefined,
            'square',
        );
        const lineChartOptions = new aop.elements.ChartOptions(
            axis,
            axis,
            undefined,
            50,
            undefined,
            undefined,
            undefined,
            'gray',
            50,
        );
        const lineChart = new aop.elements.LineChart(
            'line_chart',
            [line1, line2],
            lineChartOptions,
        );
        const bar1 = new aop.elements.BarSeries(
            ['a', 'b', 'c'],
            [1, 2, 3],
            'bar1',
        );
        const bar2 = new aop.elements.BarSeries(
            ['a', 'b', 'c'],
            [4, 5, 6],
            'bar2',
        );
        const barChartOptions = new aop.elements.ChartOptions(
            axis,
            axis,
            undefined,
            100,
            100,
            undefined,
            false,
        );
        const barChart = new aop.elements.BarChart(
            'bar_chart',
            [bar1, bar2],
            barChartOptions,
        );
        const combinedChart = new aop.elements.CombinedChart(
            'combined_chart',
            [columnChart, lineChart],
            [barChart],
        );
        const combinedChartExpected = {
            combined_chart: {
                multiples: [
                    {
                        columns: [
                            {
                                data: [
                                    {
                                        x: 'a',
                                        y: 1,
                                    },
                                    {
                                        x: 'b',
                                        y: 2,
                                    },
                                    {
                                        x: 'c',
                                        y: 3,
                                    },
                                ],
                                name: 'column1',
                            },
                            {
                                data: [
                                    {
                                        x: 'a',
                                        y: 4,
                                    },
                                    {
                                        x: 'b',
                                        y: 5,
                                    },
                                    {
                                        x: 'c',
                                        y: 6,
                                    },
                                ],
                                name: 'column2',
                            },
                        ],
                        type: 'column',
                    },
                    {
                        lines: [
                            {
                                data: [
                                    {
                                        x: 'a',
                                        y: 1,
                                    },
                                    {
                                        x: 'b',
                                        y: 2,
                                    },
                                    {
                                        x: 'c',
                                        y: 3,
                                    },
                                ],
                                name: 'line1',
                                symbol: 'square',
                            },
                            {
                                data: [
                                    {
                                        x: 'a',
                                        y: 4,
                                    },
                                    {
                                        x: 'b',
                                        y: 5,
                                    },
                                    {
                                        x: 'c',
                                        y: 6,
                                    },
                                ],
                                name: 'line2',
                                symbol: 'square',
                            },
                        ],
                        options: {
                            axis: {
                                x: {
                                },
                                y: {
                                },
                            },
                            backgroundColor: 'gray',
                            backgroundOpacity: 50,
                            width: 50,
                        },
                        type: 'line',
                    },
                    {
                        bars: [
                            {
                                data: [
                                    {
                                        x: 'a',
                                        y2: 1,
                                    },
                                    {
                                        x: 'b',
                                        y2: 2,
                                    },
                                    {
                                        x: 'c',
                                        y2: 3,
                                    },
                                ],
                                name: 'bar1',
                            },
                            {
                                data: [
                                    {
                                        x: 'a',
                                        y2: 4,
                                    },
                                    {
                                        x: 'b',
                                        y2: 5,
                                    },
                                    {
                                        x: 'c',
                                        y2: 6,
                                    },
                                ],
                                name: 'bar2',
                            },
                        ],
                        options: {
                            axis: {
                                x: {
                                },
                                y: {
                                },
                            },
                            height: 100,
                            roundedCorners: false,
                            width: 100,
                        },
                        type: 'bar',
                    },
                ],
                type: 'multiple',
            },
        };
        expect(combinedChart.asDict()).toEqual(combinedChartExpected);
    });
    test('Test chart aop', () => {
        const aopChart = new aop.elements.AOPChart(
            'aop_chart',
            ['a', 'b', 'c'],
            [[1, 2, 3], [4, 5, 6]],
            new aop.elements.AOPChartDateOptions(
                'd/m/yyyy',
                'days',
                1,
            ),
            'aop_chart_title',
            'x-axis',
            'y-axis',
            'y2-axis',
            'x2-axis',
        );
        const aopChartExpected = {
            aop_chart: {
                xAxis: {
                    data: [
                        'a',
                        'b',
                        'c',
                    ],
                    title: 'x-axis',
                    date: {
                        format: 'd/m/yyyy',
                        unit: 'days',
                        step: 1,
                    },
                },
                yAxis: {
                    series: [
                        {
                            name: 'series 1',
                            data: [
                                1,
                                2,
                                3,
                            ],
                        },
                        {
                            name: 'series 2',
                            data: [
                                4,
                                5,
                                6,
                            ],
                        },
                    ],
                    title: 'y-axis',
                },
                title: 'aop_chart_title',
                x2Axis: {
                    title: 'x2-axis',
                },
                y2Axis: {
                    title: 'y2-axis',
                },
            },
        };
        expect(aopChart.asDict()).toEqual(aopChartExpected);
    });
    test('Test aop chart for y_datas = dictionary', () => {
        const aopChart = new aop.elements.AOPChart(
            'aop_chart',
            ['a', 'b', 'c'],
            {
                first_series: [1, 2, 3],
                second_series: [4, 5, 6],
            },
            new aop.elements.AOPChartDateOptions(
                'd/m/yyyy',
                'days',
                1,
            ),
            'aop_chart_title',
            'x-axis',
            'y-axis',
            'y2-axis',
            'x2-axis',
        );
        const aopChartExpected = {
            aop_chart: {
                xAxis: {
                    data: [
                        'a',
                        'b',
                        'c',
                    ],
                    title: 'x-axis',
                    date: {
                        format: 'd/m/yyyy',
                        unit: 'days',
                        step: 1,
                    },
                },
                yAxis: {
                    series: [
                        {
                            name: 'first_series',
                            data: [
                                1,
                                2,
                                3,
                            ],
                        },
                        {
                            name: 'second_series',
                            data: [
                                4,
                                5,
                                6,
                            ],
                        },
                    ],
                    title: 'y-axis',
                },
                title: 'aop_chart_title',
                x2Axis: {
                    title: 'x2-axis',
                },
                y2Axis: {
                    title: 'y2-axis',
                },
            },
        };
        expect(aopChart.asDict()).toEqual(aopChartExpected);
    });
});
