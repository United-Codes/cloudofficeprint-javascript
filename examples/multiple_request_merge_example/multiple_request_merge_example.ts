/**
 * This is an example of how you can merge the output files generated
 *  from a single template using multiple requests.
 * This approach is useful if you are dealing with a lot of output files that need to be merged.
 * There is a limit on how much data can be sent to an AOP server,
 *  so this is useful to split one big request into multiple smaller ones.
 * This example will take a minute to run.
 */

import * as aop from '../../src/index';

// Setup AOP server
const SERVER_URL = 'https://api.apexofficeprint.com/';
const API_KEY = 'YOUR_API_KEY'; // Replace by your own API key

const server = new aop.config.Server(
    SERVER_URL,
    new aop.config.ServerConfig(API_KEY),
);

// Let's say we have 100 different customers for who we need to fill in the template
//  and we want to merge the resulting files into a PDF.
// In this example, we are just going to repeat the property 'test' with value 'test' 100 times,
//  but normally you would have different data for each customer.
const data: {[key: string]: aop.elements.Element} = {};
for (let i = 0; i < 100; i += 1) {
    data[`file${i}`] = new aop.elements.Property('test', 'test');
}

// Create output configuration: merge PDF
const conf = new aop.config.OutputConfig(
    'pdf',
    undefined,
    undefined,
    undefined,
    undefined,
    new aop.config.PDFOptions(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
    ),
);

// Let's assume that the AOP server can't handle all the data at once,
//  so we need to split our data into multiple requests.
// Let's use 10 requests with each 10 elements in the data (a total of 100 data elements).
const outputFilesProm: Promise<aop.Response>[] = [];
(async () => {
    for (let i = 0; i < 10; i += 1) {
        // Create print job with 10 data elements
        const d: {[key: string]: aop.elements.Element} = {};
        Object.entries(data).slice(i * 10, (i + 1) * 10).forEach(
            ([key, value]) => {
                d[key] = value;
            },
        );
        const printjob = new aop.PrintJob(
            aop.Resource.fromLocalFile('./examples/multiple_request_merge_example/template.docx'),
            d,
            server,
            conf,
        );

        // Execute the print job and save the response to a list
        outputFilesProm.push(printjob.execute());
    }

    const outputFiles = await Promise.all(outputFilesProm);

    // Wait for the buffers of the server responses
    const buffersProm: Promise<Buffer>[] = [];
    outputFiles.forEach(
        (res) => {
            buffersProm.push(res.buffer);
        },
    );
    const buffers = await Promise.all(buffersProm);

    // Create the final request to merge all the received (merged) PDFs
    // Create Resource-objects from the Response-objects in output_files
    const resources: aop.resource.RawResource[] = [];
    buffers.forEach(
        (buff) => {
            resources.push(aop.Resource.fromRaw(
                buff,
                'pdf',
            ));
        },
    );

    // Create the print job for the last request that merges the 10 merged PDF's
    // As the template we pick the first PDF in the resources-list
    // The other 9 PDFs from the resources-list can be added to append_files (or prepend_files)
    const printjob = new aop.PrintJob(
        resources[0],
        new aop.elements.Property('not_used', 'not_used'),
        server,
        undefined,
        undefined,
        undefined,
        resources.slice(1, resources.length),
    );
    (await printjob.execute()).toFile('./examples/multiple_request_merge_example/output');
})();
