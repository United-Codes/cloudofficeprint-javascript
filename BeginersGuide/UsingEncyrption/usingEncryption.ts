
import * as cop from '../../src'; 

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
const text1 = new cop.elements.Property(
    "text2",
    "This is an example created with the Cloud Office Print TypeScript SDK",
);
collection.add(text1);
// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    "http://localhost:8010/",
    new cop.config.ServerConfig("YOUR_API_KEY"),
);
const output_conf = new cop.config.OutputConfig();
output_conf.filetype = "pdf";
output_conf.outputReadPassword= "123";

// Create print job
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile("./data/template.docx"),
    output_conf
);

// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile("./output/output.pdf");
    }catch(err){
        console.log(err);
    }
})()