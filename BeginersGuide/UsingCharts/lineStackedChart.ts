import * as cop from '../../src'; 

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

const line1 = new cop.elements.LineStackedSeries(
    ['Q1', 'Q2', 'Q3', 'Q4'],  
    [30, 45, 25, 60],          
    'Product A',
    'green',
    true,
    'circle',
    8,
    '0.2cm',
    'solid',
);

const line2 = new cop.elements.LineStackedSeries( 
    ['Q1', 'Q2', 'Q3', 'Q4'],  
    [20, 35, 40, 45],          
    'Product B',
    'orange',
    true,
    'triangle',
    8,
    '0.2cm',
    'solid',
);

const lineChart = new cop.elements.LineStackedChart( 
    'chart',
    [line1, line2],
);

collection.add(lineChart);
// Add server
const server = new cop.config.Server("http://localhost:8010/", new cop.config.ServerConfig("YOUR_API_KEY"));

// Create print job
const printjob = new cop.PrintJob(collection, server, cop.Resource.fromLocalFile('./data/template_lineChart.docx'));

// Asynchronously execute print job and save response to file
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output_LineStackedChart');
    } catch (err) {
        console.log(err);
    }
})();