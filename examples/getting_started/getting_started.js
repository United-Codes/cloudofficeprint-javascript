// const cop = require('cloudofficeprint');
const cop = require('../../dist/src');

const SERVER_URL = 'https://api.cloudofficeprint.com/';
const API_KEY = 'YOUR_API_KEY'; // Replace by your own API key

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

// Add server
const server = new cop.config.Server(
    SERVER_URL,
    new cop.config.ServerConfig(API_KEY),
);

// Create print job
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('getting_started.docx'),
);

// Asynchronously execute print job and save response to file
(async () => {
    const response = await printjob.execute();
    await response.toFile('output');
})();
