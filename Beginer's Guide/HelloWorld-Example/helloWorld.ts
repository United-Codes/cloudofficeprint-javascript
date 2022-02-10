// Install cloudofficeprint using npm install cloudofficeprint 
import * as cop from 'cloudofficeprint';

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

// Create the title element and add it to the element collection
const title = new cop.elements.Property(
    "title",
    "Hello World!",
);
collection.add(title);
const PATH_TO_TEMPLATE_FILE = './data/template.docx';
const PATH_OF_OUTPUT_FILE = './output/output.docx';
// Create the text element and add it to the element collection
const text = new cop.elements.Property(
    "text",
    "This is an example created with the Cloud Office Print TypeScript SDK",
);
collection.add(text);

// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    "http://localhost:8010/",
    new cop.config.ServerConfig("YOUR_API_KEY"),
);

// Create print job
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile(PATH_TO_TEMPLATE_FILE),
);

// Asynchronously execute print job and save response to file
(async () => {
    const response = await printjob.execute();
    await response.toFile(PATH_OF_OUTPUT_FILE);
})()