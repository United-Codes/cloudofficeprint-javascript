// Install cloudofficeprint using npm install cloudofficeprint 
import * as cop from 'cloudofficeprint';

// Main object that holds the data
const collection = new cop.elements.ElementCollection();


//------------------for loop-------------------//
const element1 = cop.elements.ElementCollection.fromMapping(
    {
        a: 1,
        b: 2,
        c: 3,
    },
);
const element2 = cop.elements.ElementCollection.fromMapping(
    {
        a: 4,
        b: 5,
        c: 6,
    },
);
const loop = new cop.elements.ForEach(
    'loop_name',
    [element1, element2],
);

collection.add(loop);

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
    cop.Resource.fromLocalFile('./data/loop_template.docx'),
);

// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile('./output/output');
    }catch(err){
        console.log(err);
    }
})()