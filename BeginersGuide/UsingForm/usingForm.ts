// This example demonstrates how to use the form elements in CloudOfficePrint.
// It creates a PDF form with textboxes, radio buttons, and checkboxes.
// The form is then filled with data and sent to the CloudOfficePrint server for processing.
import * as cop from '../../src'; 
import { Textbox, RadioButton, Checkbox, Dropdown, ComboBox, ListBox, PushButton, Password } from '../../src/elements/form';

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

// 4. Dropdown  and ComboBox
collection.add(new Dropdown(
  'country',
  [
    { value: 'US', label: 'United States' },
    { value: 'BE', label: 'Belgium' },
    { value: 'NP', label: 'Nepal' },
  ],
  'BE', // preselected value
  20,   // height
  200,  // width
));
collection.add(new ComboBox(
  'city',
  [{ value: 'Baglung' }, { value: 'Kathmandu' }],
  'Pokhara', // dfvalue
  20,        // height
  200,       // width
));

// 5. ListBox
collection.add(new ListBox(
  'roles',
  [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' },
  ],
  ['admin', 'user'], // preselected values
  true,              // multiSelect
  80,                // height
  200,               // width
));

// 6. Push button and password field
collection.add(new PushButton('submit', 'Submit form', 24, 120));
collection.add(new Password('pw', 's3cret', 20, 200));

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
  cop.Resource.fromLocalFile("./data/template.docx"),
  output_conf
);

// Output path
const outputPath =  "./output/output.pdf";

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