import * as fs from "fs";
import * as path from "path";
import * as cop from "../../src";

//  Read a local file (e.g., a PNG or PDF) and Base64‐encode it.
// Adjust the file path as needed.
const inputFilePath = path.resolve(__dirname, "./data/view.png");
const rawBuffer = fs.readFileSync(inputFilePath);
const b64Content = rawBuffer.toString("base64");

// Create main element collection
const collection = new cop.elements.ElementCollection();

// Create a PdfInclude element with the Base64 content
// The PdfInclude element allows you to include a PDF or image in the document.
const PdfIncludes = new cop.elements.PdfInclude(
  "view",
  "",
  "view.png",
  "image/png",
   b64Content,
   "base64",
);

collection.add(PdfIncludes);


// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    "http://localhost:8010/",
    new cop.config.ServerConfig("YOUR_API_KEY"),
);

const output_conf = new cop.config.OutputConfig("pdf");

// Create print job
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile(".data/include_temp.docx"),
    output_conf
);

// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile("./output/output.pdf");
        console.log("PDF file created successfully.");
    }catch(err){
        console.log(err);
    }
})()