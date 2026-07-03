import * as cop from '../../src';

const invoices = [
    { invoice_no: 'INV-001', amount: '$100' },
    { invoice_no: 'INV-002', amount: '$200' },
    { invoice_no: 'INV-003', amount: '$300' },
];

// Main object that holds the data
const collection = new cop.elements.ElementCollection();
collection.add(new cop.elements.ForEach(
    'invoices',
    invoices.map((inv) => cop.elements.ElementCollection.fromMapping(inv)),
));

// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    'http://localhost:8010/',
    new cop.config.ServerConfig('YOUR_API_KEY'),
);


const pdfOptions = new cop.config.PDFOptions();
pdfOptions.split = true;
pdfOptions.splitByString = 'Invoice No';

const outputConfig = new cop.config.OutputConfig('pdf');
outputConfig.pdfOptions = pdfOptions;

// Create print job
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('./data/template.docx'),
    outputConfig,
);

// Asynchronously execute print job and save response to file 
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output.zip');
    } catch (err) {
        console.log(err);
    }
})();
