import * as cop from '../../src'; 

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

const areas1 = new cop.elements.AreaSeries(
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    [1500, 1800, 2200, 2400, 2800, 3000],
    'Direct Traffic',
    '#4472C4',  // Blue
    60,
);

const areas2 = new cop.elements.AreaSeries(
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    [800, 1200, 1500, 1700, 2000, 2500],
    'Referral Traffic',
    '#ED7D31',  // Orange
    60,
);

const areaChart = new cop.elements.AreaStackedChart(
    'area_chart',
    [areas1, areas2],
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
        await response.toFile('./output/output_AreaStackedChart');
    } catch (err) {
        console.log(err);
    }
})();
