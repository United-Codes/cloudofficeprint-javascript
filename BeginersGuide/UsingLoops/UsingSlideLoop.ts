// Install cloudofficeprint using npm install cloudofficeprint 
import * as cop from 'cloudofficeprint';

// Main object that holds the data
const collection = new cop.elements.ElementCollection();


const element1 = cop.elements.ElementCollection.fromMapping(
     {
        "a": "Sales Report Q1",
        "b": "Total Revenue: $125,000",
        "c": "Growth: 15% YoY"
    },
);
const element2 = cop.elements.ElementCollection.fromMapping(
      {
        "a": "Marketing Metrics Q1",
        "b": "New Customers: 2,500",
        "c": "Campaign ROI: 225%"
    },
);
const element3 = cop.elements.ElementCollection.fromMapping(
     {
        "a": "Product Performance Q1",
        "b": "Units Sold: 45,000",
        "c": "Customer Satisfaction: 4.8/5"
    },
);
const element4 = cop.elements.ElementCollection.fromMapping(
    {
        "a": "Support Analytics Q1",
        "b": "Tickets Resolved: 3,200",
        "c": "Average Response Time: 2.5h"
    },
);
const SlideLoop = new cop.elements.ForEachSlide(
    'slideloop',
    [element1, element2,element3,element4],
);

collection.add(SlideLoop);

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
    cop.Resource.fromLocalFile('./data/slide_temp.pptx'),
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