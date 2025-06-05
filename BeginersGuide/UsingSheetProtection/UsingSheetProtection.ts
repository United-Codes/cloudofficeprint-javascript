
import * as cop from '../../src'; 
// Main object that holds the data
const collection = new cop.elements.ElementCollection();

// Create the title element and add it to the element collection
const sheet_protection = new cop.elements.ProtectSheet(
    "protectTag",
    "123",  
    false,
    false,
    false
);
collection.add(sheet_protection);

// Create the text element and add it to the element collection
const fname = new cop.elements.Property(
    "cust_first_name",
    "john",
);
collection.add(fname);

const lname = new cop.elements.Property(
    "cust_last_name",
    "doe",
);
collection.add(lname);

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
    cop.Resource.fromLocalFile("./data/temp.xlsx"),
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