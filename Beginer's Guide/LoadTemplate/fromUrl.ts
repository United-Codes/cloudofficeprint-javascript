//In this example we load template from differnt locations
// Install cloudofficeprint ``` using npm install cloudofficeprint ```

import * as cop from 'cloudofficeprint'
import * as fs from 'fs';

//-----------FROM URL------------------//
const UrlTemplate = cop.Resource.fromUrl('https://docs.google.com/document/d/1CCBbvNjI2FwIHXJoG2F3HsY7ncskeUhKj0LkqAVZtHA/edit?usp=sharing','docx');


// Main object that holds the data
const collection = new cop.elements.ElementCollection();

// Create the title element and add it to the element collection
const title = new cop.elements.Property(
    "title",
    "Hello World!",
);
collection.add(title);
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

const printjob = new cop.PrintJob(
    collection,
    server,
    UrlTemplate
);
// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile(`./output/output_fromUrl1`);
    }catch(err){
        console.log(err);
    }
})()