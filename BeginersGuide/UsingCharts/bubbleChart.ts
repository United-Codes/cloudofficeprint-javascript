import * as cop from "cloudofficeprint"

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

const bubble1 = new cop.elements.BubbleSeries(
    ['a', 'b', 'c'],
    [1, 2, 3],
    [5, 6, 2],
    'bubble1',
    'red',
);
const bubble2 = new cop.elements.BubbleSeries(
    ['a', 'b', 'c'],
    [4, 5, 6],
    [5, 6, 2],
    'bubble2',
    'blue',
);
const bubbleChart = new cop.elements.BubbleChart(
    'bubble_chart',
    [bubble1, bubble2],
);
collection.add(bubbleChart);
// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server("http://localhost:8010/", new cop.config.ServerConfig("YOUR_API_KEY"));

// Create print job
const printjob = new cop.PrintJob(collection, server, cop.Resource.fromLocalFile('./data/template_bubbleChart.docx'));

// Asynchronously execute print job and save response to file
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output_bubbleChart');
    } catch (err) {
        console.log(err);
    }
})();
