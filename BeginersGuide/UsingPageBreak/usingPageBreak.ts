 // import cloud office print  
 import * as cop from  '../../src';

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

// Add customer data
const customer1 = new cop.elements.ElementCollection();
customer1.add(new cop.elements.Property("cust_first_name", "John"));
customer1.add(new cop.elements.Property("cust_last_name", "Dulles"));
customer1.add(new cop.elements.PageBreak("pageBreak", true));

const customer2 = new cop.elements.ElementCollection();
customer2.add(new cop.elements.Property("cust_first_name", "William")); 
customer2.add(new cop.elements.Property("cust_last_name", "Hartsfield"));
customer2.add(new cop.elements.PageBreak("pageBreak", true));

const customer3 = new cop.elements.ElementCollection();
customer3.add(new cop.elements.Property("cust_first_name", "Edward"));
customer3.add(new cop.elements.Property("cust_last_name", "Logan")); 
customer3.add(new cop.elements.PageBreak("pageBreak", false));

//customers loop
const customers = new cop.elements.ForEach("customers", [customer1, customer2, customer3]);
collection.add(customers);
  
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
      cop.Resource.fromLocalFile("./data/pagebreak_temp.docx"),
  );
  
  // Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile("./output/output.docx");
    }catch(err){
        console.log(err);
    }
})()