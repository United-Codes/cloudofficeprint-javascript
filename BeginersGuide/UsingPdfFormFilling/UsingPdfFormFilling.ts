import * as cop from '../../src';

const collection = new cop.elements.ElementCollection();
collection.add(new cop.elements.PDFFormData({
    name: 'Nishant Thapa',
    email: 'nishan@nomail.com',
    country: 'Nepal',
    subscribe: true,
}));

// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    'http://localhost:8010/',
    new cop.config.ServerConfig('YOUR_API_KEY'),
);

// Create print job 
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('./data/template.pdf'),
    new cop.config.OutputConfig('pdf'),
);

// Asynchronously execute print job and save response to file
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output.pdf');
    } catch (err) {
        console.log(err);
    }
})();
