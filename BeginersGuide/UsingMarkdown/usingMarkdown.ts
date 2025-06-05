 // import cloud office print  
 import * as cop from  '../../src';
 //main object that holds the data
const collection = new cop.elements.ElementCollection();

// Markdown content
const markdownContent = `
# Heading level 1

## Heading level 2

===============

I just love **bold text**.  

Italicized text is the *cat's meow*.

1. First item
2. Second item
3. Third item
4. Fourth item

---

* First item
* Second item
* Third item
* Fourth item

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

<strike>The world is flat.</strike> We now know that the world is round.
`;

// Adding markdown content
collection.add(new cop.elements.MarkdownContent("markdowncontent", markdownContent));

// Create customer collections array
const customerCollections: cop.elements.ElementCollection[] = [];

// Add customers directly
const customersData = [
    { first: "Albert", cust_name_bold: "**Albert**" },
    { first: "Edward", cust_name_bold: "**Edward**" },
    { first: "Eugene", cust_name_bold: "**Eugene**" },
    { first: "Fiorello", cust_name_bold: "**Fiorello**" },
    { first: "Frank", cust_name_bold: "**Frank**" },
    { first: "John", cust_name_bold: "**John**" },
    { first: "William", cust_name_bold: "**William**" }
];

// Create collections for each customer
customersData.forEach(customer => {
    const custCollection = new cop.elements.ElementCollection();
    custCollection.add(new cop.elements.Property("first", customer.first));
    custCollection.add(new cop.elements.Property("cust_name_bold", customer.cust_name_bold));
    customerCollections.push(custCollection);
});

// Create array structure
const customersLoop = new cop.elements.ForEach("cust_names", customerCollections);
collection.add(customersLoop);

//Add server
  // If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
  const server = new cop.config.Server(
      "http://localhost:8010/",
      new cop.config.ServerConfig("YOUR_API_KEY"),
  );
  
  // Create print job
  const printjob = new cop.PrintJob(
      collection,
      server,
      cop.Resource.fromLocalFile("./data/template.docx"),
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
 
