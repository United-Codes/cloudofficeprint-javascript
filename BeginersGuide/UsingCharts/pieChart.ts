import * as cop from "cloudofficeprint"
import * as fs from 'fs';
// Main object that holds the data
const collection = new cop.elements.ElementCollection();

const pies1 = new cop.elements.PieSeries(
    ['a', 'b', 'c'],
    [1, 2, 3],
    'pies1',
    ['red', undefined, 'blue'],
);
const pies2 = new cop.elements.PieSeries(
    ['a', 'b', 'c'],
    [4, 5, 6],
    'pies2',
    ['green', 'blue', undefined],
);
const piesChart = new cop.elements.PieChart(
    'pie_chart',
    [pies1, pies2],
);

collection.add(piesChart);
// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server("http://localhost:8010/", new cop.config.ServerConfig("YOUR_API_KEY"));

// Create print job
const printjob = new cop.PrintJob(collection, server, cop.Resource.fromLocalFile('./data/template_pieChart.docx'));

fs.writeFileSync('./pieChart.json',JSON.stringify(printjob.asDict()));

// Asynchronously execute print job and save response to file
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output_pieChart');
    } catch (err) {
        console.log(err);
    }
})();
