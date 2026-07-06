import * as cop from '../../src';

// Main object that holds the data
const collection = new cop.elements.ElementCollection();
collection.add(new cop.elements.Property('title', 'Hello World!'));
collection.add(new cop.elements.Property('text', 'This document is used to extract metadata.'));

// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    'http://localhost:8010/',
    new cop.config.ServerConfig('YOUR_API_KEY'),
);

const outputConfig = new cop.config.OutputConfig('meta_data');

// Create print job
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('./data/template.docx'),
    outputConfig,
);

// Asynchronously execute print job and print
(async () => {
    try {
        const response = await printjob.execute();
        const metadata = await response.toString();
        console.log(metadata);
        await response.toFile('./output/metadata.json');
    } catch (err) {
        console.log(err);
    }
})();
