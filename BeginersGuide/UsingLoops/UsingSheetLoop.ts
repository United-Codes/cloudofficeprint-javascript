// Install cloudofficeprint using npm install cloudofficeprint 
import * as cop from 'cloudofficeprint';

// Main object that holds the data
const collection = new cop.elements.ElementCollection();


const element1 = cop.elements.ElementCollection.fromMapping(
     {
        "cust_first_name": "John",
        "cust_last_name": "Smith",
        "orders": [
            {"order_name": "Office Supplies", "order_total": "$525.00"},
            {"order_name": "Electronics", "order_total": "$1,299.99"},
            {"order_name": "Furniture", "order_total": "$2,450.00"}
        ]
    },
);
const element2 = cop.elements.ElementCollection.fromMapping(
    {
        "cust_first_name": "Sarah",
        "cust_last_name": "Johnson",
        "orders": [
            {"order_name": "Software License", "order_total": "$899.00"},
            {"order_name": "IT Support", "order_total": "$750.00"}
        ]
    },
);
const element3 = cop.elements.ElementCollection.fromMapping(
    {
        "cust_first_name": "Michael",
        "cust_last_name": "Brown",
        "orders": [
            {"order_name": "Marketing Services", "order_total": "$3,500.00"},
            {"order_name": "Training Materials", "order_total": "$450.00"},
            {"order_name": "Cloud Storage", "order_total": "$199.99"}
        ]
    },
);

const SheetLoop = new cop.elements.ForEachSheet(
    'customers',
    [element1, element2,element3],
);

collection.add(SheetLoop);

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
    cop.Resource.fromLocalFile('./data/sheet_temp.xlsx'),
);

// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile('./output/sheet_output.xlsx');
    }catch(err){
        console.log(err);
    }
})()