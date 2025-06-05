import * as cop from '../../src'; 
// Main object that holds the data
const collection = new cop.elements.ElementCollection();

// 1) Add sample properties
collection.add(new cop.elements.Property("title", "Image Example"));
collection.add(new cop.elements.Property("description", "This images are dynamically loaded using Cloud Office Print"));

collection.add(cop.elements.Image.fromUrl(
  "image_name",
  "https://picsum.photos/300/200",
  100, // maxWidth
  100, // maxHeight
  "Random image", // altText
  "square", // wrapText
  0, // rotation
  10, // transparency
  "https://example.com", // url
  "150px" // width
));


collection.add(cop.elements.Image.fromUrl(
  "img_svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg",
  200, // maxWidth
  200, // maxHeight
  "SVG logo", // altText
  "square", // wrapText
  45, // rotation
  20, // transparency
  "https://www.w3.org/Graphics/SVG/", // url 
  "150px", // width
  "150px", // height
  300 // density
));

collection.add(cop.elements.Image.fromFile(
  "img_file",
  "./local_img/UC_Logo.svg",// image path
  300, // maxWidth
  300, // maxHeight
  "United codes logo", // altText
  "square", // wrapText
  0, // rotation 
  15, // transparency 
  "https://www.united-codes.com", // url
  "150px" // width
));

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
    cop.Resource.fromLocalFile("./data/img_temp.docx"),
);


// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile("./output/ouput.docx");
    }catch(err){
        console.log(err);
    }
})()