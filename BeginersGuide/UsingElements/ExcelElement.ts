// Install cloudofficeprint using npm install cloudofficeprint 
import * as cop from 'cloudofficeprint';
// Main object that holds the data
const collection = new cop.elements.ElementCollection();


const style = new cop.elements.CellStyleXlsx(
    true,
    false,
    '#ff0000',
    'Arial',
    12,
    '#ff0000',
    true,
    false,
    false,
    true,
    false,
    true,
    'medium',
    '#ff0000',
    'mediumDashed',
    '#ff0000',
    'mediumDashDot',
    '#ff0000',
    'mediumDashDotDot',
    '#ff0000',
    'thick',
    'up-wards',
    '#ff0000',
    'center',
    'justify',
    45,
);

const styleProperty = new cop.elements.CellStyleProperty(
    'testStyle',//name of the Property
    'Lets see how it looks', //Value
    style,
);
// collection.add(styleProperty);


const span = new cop.elements.Span(
    'span_name',
    'This cell will span 2 rows and 3 columns',
    3,
    2,
);
collection.add(span);

//-------------------Freeze element---------------//

const freezeElement = new cop.elements.Freeze('freezePane', "A2")
collection.add(freezeElement);

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
    cop.Resource.fromLocalFile('./data/excel_Elements_template.xlsx'),
);
import * as fs from "fs";
fs.writeFileSync('./printjob1.json',JSON.stringify(printjob.asDict(),null,4));
// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile('./output/output_excel_Elements');
    }catch(err){
        console.log(err);
    }
})()