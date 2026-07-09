import * as cop from '../../src';

const collection = new cop.elements.ElementCollection();

collection.add(new cop.elements.BarCode('product_barcode', '1234567890', 'code128', 50, 100));

// QRCode(name, data, type)
collection.add(new cop.elements.QRCode('product_qr', 'https://www.cloudofficeprint.com/', 'qrcode'));

// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    'http://localhost:8010/',
    new cop.config.ServerConfig('YOUR_API_KEY'),
);

const pdfOptions = new cop.config.PDFOptions();
pdfOptions.insertBarcode = true;

const outputConfig = new cop.config.OutputConfig('pdf');
outputConfig.pdfOptions = pdfOptions;

// Create print job
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('./data/template.pdf'),
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
