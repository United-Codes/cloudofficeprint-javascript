// Install cloudofficeprint using npm install cloudofficeprint 
import * as cop from 'cloudofficeprint';
import * as fs from 'fs';
// Main object that holds the data
const collection = new cop.elements.ElementCollection();

//Barcode has other multiple options like height, width, background-Color and so on., you can explore them  but bellow three are needed.
const testBarcode = new cop.elements.BarCode('barcodeName','123456789125','ean13')

const barcode = new cop.elements.BarCode(
    'barcodeWithMoreOptions',
    '9845632872578',
    'ean13',
    50,
    70,
    'L',
    'https://www.cloudofficeprint.com/',
    0,
    'red',
    25,
    25,
    'includetext guardwhitespace',
);
collection.add(barcode);

collection.add(testBarcode);
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
    cop.Resource.fromLocalFile('./data/barCode_template.docx'),
);
fs.writeFileSync('./barCodes.json',JSON.stringify(printjob.asDict()));


// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile('./output/output_barCode');
    }catch(err){
        console.log(err);
    }
})()