// This example demonstrates how to use the ForEachMergeCells loop in Cloudofficeprint to merge cells in a table for each department.
// It creates a collection of employees in different departments and merges the cells in the table for each department. 
import * as cop from 'cloudofficeprint';
import { ForEachMergeCells } from '../../src/elements/loops'; 

// Main object
const collection = new cop.elements.ElementCollection();
// Create a collection for the departments
const engEmp1 = cop.elements.ElementCollection.fromMapping(
    { name: 'John Smith',    project: 'Website Redesign', status: 'In Progress' });
const engEmp2 = cop.elements.ElementCollection.fromMapping(
    { name: 'Emily Johnson', project: 'API Development',   status: 'Completed'   });
const engEmp3 = cop.elements.ElementCollection.fromMapping(
    { name: 'Michael Brown',  project: 'Mobile App',        status: 'Planning'    });

const mktEmp1 = cop.elements.ElementCollection.fromMapping(
    { name: 'Sarah Wilson',   project: 'Brand Campaign',   status: 'In Progress' });
const mktEmp2 = cop.elements.ElementCollection.fromMapping(
    { name: 'David Thompson', project: 'Market Research',  status: 'Not Started' });
// Create a collection for the employees in each department
// Use the ForEachMergeCells loop to merge cells in the table for each department
const engineeringDept = cop.elements.ElementCollection.fromMapping({ department: 'Engineering' });
engineeringDept.add(
    new ForEachMergeCells('employees', [engEmp1, engEmp2, engEmp3]),
);
// Add the employees to the engineering department collection
const marketingDept = cop.elements.ElementCollection.fromMapping({ department: 'Marketing' });
marketingDept.add(
    new ForEachMergeCells('employees', [mktEmp1, mktEmp2]),
);
// Add the employees to the marketing department collection
// Create the ForEachMergeCells loop for the departments
const departmentsLoop = new ForEachMergeCells('departments', [
    engineeringDept,
    marketingDept,
]);

collection.add(departmentsLoop);

// Server configuration
const server = new cop.config.Server(
    "http://localhost:8010/",
    new cop.config.ServerConfig("YOUR_API_KEY"),
);

//print job 
const printJob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('./data/template.docx')
);
//output configuration
(async () => {
    try {
        const response = await printJob.execute();
        await response.toFile('./output/output.docx');
    } catch (err) {
        console.log('Error during print job execution:', err);
    }
})();
