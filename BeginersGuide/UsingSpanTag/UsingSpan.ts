
import * as cop from '../../src'; 

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

const spanTitle = new cop.elements.Property(
    "cust_first_name",
    "John",
);

collection.add(spanTitle);

const title2 = new cop.elements.Property(
    "cust_first_name",
    "John",
);

collection.add(title2);

const span1 = new cop.elements.Span(
    "span",
    "This cell will span 2 rows and 3 columns ",
    3,
    2
  
);
const span2 = new cop.elements.Span(
    "testSpan",
    "This cell will span 3 rows and 4 columns",
    4,
    3
);
collection.add(span1);
collection.add(span2);
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
    cop.Resource.fromLocalFile("./data/span_temp.xlsx")
);

// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile("./output/output.xlsx");
    }catch(err){
        console.log(err);
    }
})()