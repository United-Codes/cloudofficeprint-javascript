// import * as cop from 'cloudofficeprint';
import * as cop from '../../src';

const SERVER_URL = 'https://api.cloudofficeprint.com/';
const API_KEY = 'YOUR_API_KEY'; // Replace by your own API key

// Setup Cloud Office Print server
const server = new cop.config.Server(
    SERVER_URL,
    new cop.config.ServerConfig(API_KEY),
);

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

// Create the title element and add it to the element collection
const title = new cop.elements.Property('title', 'Hello World!');
collection.add(title);

// Create the text element and add it to the element collection
const text = new cop.elements.Property(
    'text',
    'This is an example created with the Cloud Office Print JavaScript/TypeScript SDK',
);
collection.add(text);

// Create print job
const printJob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('getting_started.docx'),
);

// Asynchronously execute print job and save response to file
(async () => {
    const response = await printJob.execute();
    await response.toFile('output');
})();
