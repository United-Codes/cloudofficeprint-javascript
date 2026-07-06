import * as cop from '../../src';

// Main object that holds the data
const collection = new cop.elements.ElementCollection();
collection.add(new cop.elements.Property('title', 'Hello World!'));
collection.add(new cop.elements.Property('text', 'This PDF complies with the PDF/A archival standard. Example'));

// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    'http://localhost:8010/',
    new cop.config.ServerConfig('YOUR_API_KEY'),
);


const pdfOptions = new cop.config.PDFOptions();
pdfOptions.validatePdfaLevel = 'pdfa2b';
// pdfOptions.complyPdfaLevel = 'pdfa2b';
pdfOptions.uaCompliantPdf = 'true';

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
        await response.toFile('./output/output.pdf');
    } catch (err) {
        console.log(err);
    }
})();
