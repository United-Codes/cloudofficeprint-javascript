import * as cop from "cloudofficeprint"

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

const bars1 = new cop.elements.BarSeries(
    ['a', 'b', 'c'],
    [1, 2, 3],
    'bars1',
    'red',
);
const bars2 = new cop.elements.BarSeries(
    ['a', 'b', 'c'],
    [4, 5, 6],
    'bars2',
    'blue',
);
const barChart = new cop.elements.BarChart(
    'bar_chart',
    [bars1, bars2],
);
collection.add(barChart);
// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server("http://localhost:8010/", new cop.config.ServerConfig("YOUR_API_KEY"));

// Create print job
const printjob = new cop.PrintJob(collection, server, cop.Resource.fromLocalFile('./data/template_barChart.docx'));

//To generte and save json for this particular printjob
// import * as fs from "fs";
// fs.writeFileSync('./printjob1.json',JSON.stringify(printjob.asDict(),null,4));

// Asynchronously execute print job and save response to file
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output_barChart');
    } catch (err) {
        console.log(err);
    }
})();
