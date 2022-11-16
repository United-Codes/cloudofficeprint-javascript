import * as cop from "cloudofficeprint"

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

const line1 = new cop.elements.LineSeries(
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
const line2 = new cop.elements.LineSeries(
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
//Name of tag name of lineChart should be same.
const lineChart = new cop.elements.LineChart(
    'chart',
    [line1, line2],
);
collection.add(lineChart);
// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server("http://localhost:8010/", new cop.config.ServerConfig("YOUR_API_KEY"));

// Create print job
const printjob = new cop.PrintJob(collection, server, cop.Resource.fromLocalFile('./data/template_lineChart.docx'));

// Asynchronously execute print job and save response to file
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output_LineChart');
    } catch (err) {
        console.log(err);
    }
})();
