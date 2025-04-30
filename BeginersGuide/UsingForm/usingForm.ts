// This example demonstrates how to use the form elements in CloudOfficePrint.
// It creates a PDF form with textboxes, radio buttons, and checkboxes.
// The form is then filled with data and sent to the CloudOfficePrint server for processing.
import * as cop from '../../src'; 
import { Textbox, RadioButton, Checkbox } from '../../src/elements/form';

// Create main element collection
const collection = new cop.elements.ElementCollection();

// 1. Textbox elements
const firstName = new Textbox('first_name');
const lastName = new Textbox(
  'last_name',
  'Apex R&D', // value
  20,          // height
  200,         // width
  true         // multiline
);

// Add textboxes directly to main collection
collection.add(firstName);
collection.add(lastName);

// 2. Radio button group
const radioList = [
  new RadioButton(
    'radiolist',          // name 
    'List A',             // value
    'Option A',      // text
    false                  // selected
  ),
  new RadioButton(
    'radiolist',          // name 
    'List b',             // value
    'List Option b',      // text
    true                 // selected
  )
];

// Add radio buttons to collection
radioList.forEach(radio => {
  collection.add(radio);
});

// 3. Checkbox 
const checkbox = new Checkbox(
  'checkbox',
  true,                   // value 
  'Agree to terms'        // text
);

collection.add(checkbox);

// Server configuration
const server = new cop.config.Server(
  "http://localhost:8010/",
  new cop.config.ServerConfig("YOUR_API_KEY")
);
// Set the server to use the default converter
const output_conf = new cop.config.OutputConfig("pdf");

// Create print job
const printjob = new cop.PrintJob(
  collection,
  server,
  cop.Resource.fromLocalFile("C:/Users/em8ee/cloudofficeprint-javascript/BeginersGuide/UsingForm/data/template.docx"),
  output_conf
);

// Output path
const outputPath =  "C:/Users/em8ee/cloudofficeprint-javascript/BeginersGuide/UsingForm/output/output.pdf";

// Execute and save
(async () => {
  try {
    const response = await printjob.execute();
    await response.toFile(outputPath);
    console.log('PDF form generated successfully!');
  } catch(err) {
    console.error('Error generating PDF:', err);
  }
})();