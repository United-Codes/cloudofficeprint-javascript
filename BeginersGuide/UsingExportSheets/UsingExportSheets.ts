 // import cloud office print  
import * as cop from '../../src';

// Sample data for the customers and their orders.
const customers = [
    { sheet_name: 'John Dulles',       cust_first_name: 'John',     cust_last_name: 'Dulles',    cust_city: 'Sterling',      orders: [{ order_name: 'Order 1', order_total: 2380 }] },
    { sheet_name: 'William Hartsfield', cust_first_name: 'William', cust_last_name: 'Hartsfield', cust_city: 'Atlanta',      orders: [{ order_name: 'Order 1', order_total: 1640 }, { order_name: 'Order 2', order_total: 730 }] },
    { sheet_name: 'Edward Logan',      cust_first_name: 'Edward',   cust_last_name: 'Logan',     cust_city: 'East Boston',   orders: [{ order_name: 'Order 1', order_total: 1515 }, { order_name: 'Order 2', order_total: 905 }] },
    { sheet_name: 'Frank OHare',       cust_first_name: 'Frank',    cust_last_name: 'OHare',     cust_city: 'Chicago',       orders: [{ order_name: 'Order 1', order_total: 1060 }] },
    { sheet_name: 'Fiorello LaGuardia', cust_first_name: 'Fiorello', cust_last_name: 'LaGuardia', cust_city: 'Flushing',     orders: [{ order_name: 'Order 1', order_total: 1090 }] },
    { sheet_name: 'Albert Lambert',    cust_first_name: 'Albert',   cust_last_name: 'Lambert',   cust_city: 'St. Louis',     orders: [{ order_name: 'Order 1', order_total: 950 }] },
    { sheet_name: 'Eugene Bradley',    cust_first_name: 'Eugene',   cust_last_name: 'Bradley',   cust_city: 'Windsor Locks', orders: [{ order_name: 'Order 1', order_total: 1890 }, { order_name: 'Order 2', order_total: 870 }] },
    { sheet_name: 'John Doe',          cust_first_name: 'John',     cust_last_name: 'Doe',       cust_city: 'Sterling',      orders: null },
];

const customerSheets = customers.map((customer) =>
    cop.elements.ElementCollection.fromMapping(customer),
);

// Main object that holds the data.
const collection = new cop.elements.ElementCollection();
collection.add(new cop.elements.ForEachSheet('customers', customerSheets));

// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    'http://localhost:8010/',
    new cop.config.ServerConfig('YOUR_API_KEY'),
);

// Create output config to export only the specified sheets in the output file.
const outputConfig = new cop.config.OutputConfig('xlsx');
outputConfig.outputExportSheets = ['John Dulles', 'Edward Logan'];

// Create print job
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('./data/template.xlsx'),
    outputConfig,
);

  // Asynchronously execute print job and save response to file
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output.xlsx');
        console.log('Excel generated successfully with only the exported sheets!');
    } catch (err) {
        console.log(err);
    }
})();
