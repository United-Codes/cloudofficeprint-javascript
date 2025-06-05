import { Labels } from './../../src/elements/loops';
// Install cloudofficeprint using npm install cloudofficeprint 
import * as cop from 'cloudofficeprint';

// Main object that holds the data
const collection = new cop.elements.ElementCollection();


const element1 = cop.elements.ElementCollection.fromMapping(
      {
        "FirstName": "Sarah",
        "LastName": "Johnson",
        "Company": "Marketing Pro LLC",
        "Address1": "456 Market Street",
        "City": "New York",
        "State": "NY",
        "PostalCode": "10013"
    },
);
const element2 = cop.elements.ElementCollection.fromMapping(
     {
        "FirstName": "John",
        "LastName": "Smith",
        "Company": "Tech Solutions Inc.",
        "Address1": "123 Business Ave",
        "City": "San Francisco",
        "State": "CA",
        "PostalCode": "94105"
    },
);
const element3 = cop.elements.ElementCollection.fromMapping(
    {
        "FirstName": "Michael",
        "LastName": "Brown",
        "Company": "Digital Services Co.",
        "Address1": "789 Innovation Blvd",
        "City": "Chicago",
        "State": "IL",
        "PostalCode": "60601"
    },
);
const LablesExample = new cop.elements.Labels(
    'labels',
    [element1, element2,element3],
);

collection.add(LablesExample);

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
    cop.Resource.fromLocalFile('./data/label_temp.docx'),
);

// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile('./output/label_output.docx');
    }catch(err){
        console.log(err);
    }
})()