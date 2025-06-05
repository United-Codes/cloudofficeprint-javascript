// This example shows how to use the `{hide !orders}` template tag to hide slides
// when there are no orders for a customer. It uses the CloudOfficePrint JavaScript SDK.
import * as cop from 'cloudofficeprint';

// Sample customer data
const customers_data = [
  {
    sheet_name:      "John Dulles",
    cust_first_name: "John",
    cust_last_name:  "Dulles",
    cust_city:       "Sterling",
    orders: [
      { order_total: 2380, order_name: "Order 1" }
    ]
  },
  {
    sheet_name:      "William Hartsfield",
    cust_first_name: "William",
    cust_last_name:  "Hartsfield",
    cust_city:       "Atlanta",
    orders: [
      { order_total: 1640, order_name: "Order 1" },
      { order_total:  730, order_name: "Order 2" }
    ]
  },
  {
    sheet_name:      "Edward Logan",
    cust_first_name: "Edward",
    cust_last_name:  "Logan",
    cust_city:       "East Boston",
    orders: [
      { order_total: 1515, order_name: "Order 1" },
      { order_total:  905, order_name: "Order 2" }
    ]
  },
  {
    sheet_name:      "Frank OHare",
    cust_first_name: "Frank",
    cust_last_name:  "OHare",
    cust_city:       "Chicago",
    orders: []    // no orders : we want to hide this customer’s slide
  },
  {
    sheet_name:      "Cris Jr Santos",
    cust_first_name: "Cris Jr",
    cust_last_name:  "Santos",
    cust_city:       "Texas",
    orders: []   // no orders : we want to hide this customer’s slide
  }
];
// create a slide for each customer
// Each slide will contain the customer data and a list of orders.
// If the orders array is empty, we will set it to null so that the `{hide !orders}` tag evaluates to true. This will hide the slide in the output
const slideElements = customers_data.map((cust) => {
  const ordersField = (Array.isArray(cust.orders) && cust.orders.length > 0)
    ? cust.orders.map(o => ({
        order_total: o.order_total,
        order_name: o.order_name
      }))
    : null;

    // Create the slide element with the customer data and the orders field.
    return cop.elements.ElementCollection.fromMapping({
    sheet_name:      cust.sheet_name,
    cust_first_name: cust.cust_first_name,
    cust_last_name:  cust.cust_last_name,
    cust_city:       cust.cust_city,
    orders:          ordersField
  });
});
// Create a ForEachSlide element that will loop through the slide elements
const Loop = new cop.elements.ForEachSlide("customers", slideElements);

// Put it into a root ElementCollection
const collection = new cop.elements.ElementCollection();
collection.add(Loop);

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
    cop.Resource.fromLocalFile("./data/hide_temp.pptx")
);

// Asynchronously execute print job and save response to file
(async () => {
    try{
        const response = await printjob.execute();
        await response.toFile("./output/output.pptx");
    }catch(err){
        console.log(err);
    }
})()