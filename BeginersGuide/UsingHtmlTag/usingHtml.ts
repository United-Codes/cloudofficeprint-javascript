import * as cop from '../../src';

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

collection.add(new cop.elements.Html(
  "overview",
  `<p>This is a <strong>bold</strong> statement, followed by a line break.<br />
  And here's a new line in the same paragraph.</p>`,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
));

collection.add(new cop.elements.Html(
  "html_with_empty_p",
  `<p>First paragraph.</p> <p></p> <p>Third paragraph.</p>`,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    true
));

collection.add(new cop.elements.Html(
  "lists",
  `<ul>
     <li>Level 1
       <ol>
         <li>Sub-item A</li>
         <li>Sub-item B</li>
       </ol>
     </li>
     <li>Level 2</li>
   </ul>`,
    undefined,
      "1",
      "2",
     true,
     undefined,
     true
));

// HTML table
collection.add(new cop.elements.Html(
  "html_table_1",
  `<table border="1">
     <tr><th>Name</th><th>Age</th><th>Country</th></tr>
     <tr><td>Alice</td><td>30</td><td>USA</td></tr>
     <tr><td>Bob</td><td>25</td><td>Canada</td></tr>
   </table>`,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
));

// image tag
collection.add(new cop.elements.Html(
  "html_img",
  `<img src="https://picsum.photos/200/100" width="100px" height="50px" />`,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
));


// server
const server = new cop.config.Server(
  "http://localhost:8010/",
  new cop.config.ServerConfig("YOUR_API_KEY")
);

// Create print job
const printjob = new cop.PrintJob(
  collection,
  server,
  cop.Resource.fromLocalFile("./data/html_temp.docx"),
);

// Asynchronously execute print job and save response to file
(async () => {
  try {
    const response = await printjob.execute();
    await response.toFile("./output/output.docx");
    console.log("Sucess!!!");
  } catch (err) {
    console.error(err);
  }
})();
