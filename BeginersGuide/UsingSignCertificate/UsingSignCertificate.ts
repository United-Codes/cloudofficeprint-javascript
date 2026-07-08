import * as cop from '../../src';

const collection = new cop.elements.ElementCollection('collection');

// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    'http://localhost:8010/',
    new cop.config.ServerConfig('YOUR_API_KEY'),
);

// Sign the output PDF with a certificate
const pdfOptions = new cop.config.PDFOptions();
pdfOptions.sign(
    cop.Resource.fromLocalFile('./data/certificate.p12'),
    'cloudofficeprint',
);
pdfOptions.signCertificateTxt = 'Signed by Cloud Office Print';

const outputConfig = new cop.config.OutputConfig('pdf');
outputConfig.pdfOptions = pdfOptions;

// Create print job
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('./data/template.pdf'),
    outputConfig,
);

// Asynchronously execute print job
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output.pdf');
    } catch (err) {
        console.log(err);
    }
})();
