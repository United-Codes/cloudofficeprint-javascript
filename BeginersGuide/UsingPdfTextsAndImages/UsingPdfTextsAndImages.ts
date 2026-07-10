import * as cop from '../../src';

const collection = new cop.elements.ElementCollection('collection');

collection.add(new cop.elements.PDFTexts([
    new cop.elements.PDFText(
        'Hello from Cloud Office Print', // text
        50, // x
        50, // y
        'all', // page
        0, // rotation
        true, // bold
        false, // italic
        undefined, // font
        '#FF0000', // fontColor
        20, // fontSize
    ),
]));

const image = cop.ownUtils.readFileAsBase64('./data/image.png');
collection.add(new cop.elements.PDFImages([
    new cop.elements.PDFImage(
        image, // image
        50, // x
        100, // y
        1, // page
        0, // rotation
        120, // width
        120, // height
    ),
]));

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
