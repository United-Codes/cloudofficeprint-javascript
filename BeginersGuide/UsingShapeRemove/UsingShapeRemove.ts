 // import cloud office print  
 import * as cop from  '../../src';

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

// Create an ElementCollection to hold all elements
const greeting = new cop.elements.Property("greeting", "Hello World, Thank you for using AOP");
collection.add(greeting);

// The remove property will be false, so any shape with {remove?} tag will be removed in the template
const remove = new cop.elements.Property("remove", false);
collection.add(remove);

// Add a quote that will be shown
const quote = new cop.elements.Property("toShow", "When in doubt, look intelligent. - GARRISON KEILLOR");
collection.add(quote);

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
    cop.Resource.fromLocalFile("./data/shapeRemove_temp.pptx")
);

// Asynchronously execute print job and save response to file
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile("./output/output.pptx");
    } catch (err) {
        console.log(err);
    }
})()