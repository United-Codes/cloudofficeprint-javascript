import * as cop from '../../src';


const collection = new cop.elements.ElementCollection();

collection.add(new cop.elements.Property('customer_name', 'John Doe'));
collection.add(new cop.elements.Property('invoice_number', 'INV-2025-001'));
collection.add(new cop.elements.Property('issue_date', '2024-06-15'));
collection.add(new cop.elements.Property('amount', '$1,500.00'));

collection.add(new cop.elements.Property('company_logo', cop.ownUtils.readFileAsBase64('./data/image.png')));

const employee = (name: string, role: string) => {
    const e = new cop.elements.ElementCollection();
    e.add(new cop.elements.Property('name', name));
    e.add(new cop.elements.Property('role', role));
    return e;
};
collection.add(new cop.elements.ForEach('employees', [
    employee('Alice', 'Engineer'),
    employee('Bob', 'Manager'),
    employee('Carol', 'Designer'),
]));

// Add server
// If you are using onpremise-version do not need to specify YOUR_API_KEY else replace it with your api key.
const server = new cop.config.Server(
    'http://localhost:8010/',
    new cop.config.ServerConfig('YOUR_API_KEY'),
);

// Create print job with the PDF template
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('./data/template.pdf'),
    new cop.config.OutputConfig('pdf'),
);

// Asynchronously execute print job and save response to file
(async () => {
    try {
        const response = await printjob.execute();
        await response.toFile('./output/output.pdf');
    } catch (err) {
        console.log(err);
    }
})();
