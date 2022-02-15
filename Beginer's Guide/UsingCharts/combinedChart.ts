import * as cop from "cloudofficeprintdist/src"

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

const axis = new cop.elements.ChartAxisOptions();
const column1 = new cop.elements.ColumnSeries(
    ['a', 'b', 'c'],
    [1, 2, 3],
    'column1',
);
const column2 = new cop.elements.ColumnSeries(
    ['a', 'b', 'c'],
    [4, 5, 6],
    'column2',
);
const columnChart = new cop.elements.ColumnChart(
    'column_chart',
    [column1, column2],
);
const line1 = new cop.elements.LineSeries(
    ['a', 'b', 'c'],
    [1, 2, 3],
    'line1',
    undefined,
    undefined,
    'square',
);
const line2 = new cop.elements.LineSeries(
    ['a', 'b', 'c'],
    [4, 5, 6],
    'line2',
    undefined,
    undefined,
    'square',
);
const lineChartOptions = new cop.elements.ChartOptions(
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
const lineChart = new cop.elements.LineChart(
    'line_chart',
    [line1, line2],
    lineChartOptions,
);
const bar1 = new cop.elements.BarSeries(
    ['a', 'b', 'c'],
    [1, 2, 3],
    'bar1',
);
const bar2 = new cop.elements.BarSeries(
    ['a', 'b', 'c'],
    [4, 5, 6],
    'bar2',
);
const barChartOptions = new cop.elements.ChartOptions(
    axis,
    axis,
    undefined,
    100,
    100,
    undefined,
    false,
);
const barChart = new cop.elements.BarChart(
    'bar_chart',
    [bar1, bar2],
    barChartOptions,
);
const combinedChart = new cop.elements.CombinedChart(
    'combined_chart',
    [columnChart, lineChart],
    [barChart],
);

collection.add(combinedChart);
// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server("http://localhost:8010/", new cop.config.ServerConfig("YOUR_API_KEY"));

// Create print job
const printjob = new cop.PrintJob(collection, server, cop.Resource.fromLocalFile('./data/template_combinedChart.docx'));

// Asynchronously execute print job and save response to file
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output_combinedChart');
    } catch (err) {
        console.log(err);
    }
})();
