import * as cop from "cloudofficeprint"

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

const area1 = new cop.elements.AreaSeries(
    ['a', 'b', 'c'],
    [1, 2, 3],
    'area1',
    'red',
    50,
);
const area2 = new cop.elements.AreaSeries(
    ['a', 'b', 'c'],
    [4, 5, 6],
    'area2',
    'blue',
    80,
);
const areaChart = new cop.elements.AreaChart(
    'area_chart',
    [area1, area2],
);
collection.add(areaChart);
// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server("http://localhost:8010/", new cop.config.ServerConfig("YOUR_API_KEY"));

// Create print job
const printjob = new cop.PrintJob(collection, server, cop.Resource.fromLocalFile('./data/template_areaChart.docx'));

// Asynchronously execute print job and save response to file
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output_areaChart');
    } catch (err) {
        console.log(err);
    }
})();
