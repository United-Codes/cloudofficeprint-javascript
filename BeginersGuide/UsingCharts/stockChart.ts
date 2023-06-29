import * as cop from "cloudofficeprint"
import * as fs from 'fs'
// Main object that holds the data
const collection = new cop.elements.ElementCollection();

const stock1 = new cop.elements.StockSeries(
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15],
    [16, 17, 18],
    'stock1',
);
const stock2 = new cop.elements.StockSeries(
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15],
    [16, 17, 18],
    'stock2',
);
const stockChart = new cop.elements.StockChart(
    'stock_chart',
    [stock1, stock2],
);
collection.add(stockChart);
// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server("http://apexofficeprint.com/dev/", new cop.config.ServerConfig("1FC7446D926A2E3CE0530100007F2364"));

// Create print job
const printjob = new cop.PrintJob(collection, server, cop.Resource.fromLocalFile('./data/template_stockChart.docx'));
fs.writeFileSync('./printjob.json',JSON.stringify(printjob.asDict()));
// console.log(printjob.asDict());
// Asynchronously execute print job and save response to file
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output_stockChart');
    } catch (err) {
        console.log(err);
    }
})();
