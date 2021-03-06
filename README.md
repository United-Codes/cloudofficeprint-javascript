# cloudofficeprint-javascript
This project provides a JavaScript/TypeScript interface for Cloud Office Print.

# Installation
After setting up an npm-project (`npm init` in your terminal), you can install the Cloud Office Print Java-/TypeScript package by typing in your terminal:  
`npm install cloudofficeprint`

The JavaScript/TypeScript SDK can also be used in a web browser by importing the file `bundle.js` from the browser-folder in your HTML file (see browser.html in the browser-folder for an example). The SDK is then available in the browser console as `cop`.

# Usage
1. Create a template (docx, xlsx, pptx, HTML, md, txt, csv), for the possible tags, click [here](http://www.cloudofficeprint.com/docs/#templates).
2. Create the input data with this Java-/TypeScript SDK
3. Send template and data to a Cloud Office Print server and save the response to a file with this Java-/TypeScript SDK

To see the JSON-data that is sent to the Cloud Office Print server, you can turn on verbose-mode by setting the argument `copVerbose` to `True` when creating a `PrintJob`.

# Quickstart: Hello World example
## Template (docx)
<img src="https://raw.githubusercontent.com/United-Codes/cloudofficeprint-javascript/main/imgs/hello_world_template.png" width="600" />

## Data
The data can be generated by the Java-/TypeScript SDK:
```javascript
import * as cop from 'cloudofficeprint';

// Main object that holds the data
const collection = new cop.elements.ElementCollection();

// Create the title element and add it to the element collection
const title = new cop.elements.Property(
    'title',
    'Hello World!',
);
collection.add(title);

// Create the text element and add it to the element collection
const text = new cop.elements.Property(
    'text',
    'This is an example created with the Cloud Office Print Java-/TypeScript SDK',
);
collection.add(text);
...
```

## Cloud Office Print server
The template and the data need to be sent to a Cloud Office Print server that merges both. This can be done by setting up the configuration for a Cloud Office Print server and passing it to the print job instance. You can get your API key by signing up at https://www.cloudofficeprint.com.
```javascript
...
const SERVER_URL = 'https://api.cloudofficeprint.com/';
const API_KEY = 'YOUR_API_KEY'; // Replace by your own API key

// Add server
const server = new cop.config.Server(
    SERVER_URL,
    new cop.config.ServerConfig(API_KEY),
);

// Create print job
const printjob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('PATH_TO_TEMPLATE_FILE'),
);

// Asynchronously execute print job and save response to file
(async () => {
    const response = await printjob.execute();
    await response.toFile('PATH_OF_OUTPUT_FILE');
})();
```

## Result
<img src="https://raw.githubusercontent.com/United-Codes/cloudofficeprint-javascript/main/imgs/hello_world_output.png" width="600" />

# Other examples
Going through the other examples is also recommended as this gives you a good idea on how to use the SDK. The current examples are:
- order_confirmation_example.ts
- pdfsignature_example.ts
- solar_system_example.ts
- spacex_example.ts (the most extensive example)
- multiple_request_merge_example.ts

The examples can be found in the `examples`-directory of the project on [Github](https://github.com/United-Codes/cloudofficeprint-javascript). Each example has its own folder containing the used templates, the generated output files and a markdown file with explanation.

# Documentation
The documentation for this SDK can be found inside the `docs/` folder on [Github](https://github.com/United-Codes/cloudofficeprint-javascript). Open the index.html file in a browser.

The documentation for Cloud Office Print can be found at the [Cloud Office Print docs](https://www.cloudofficeprint.com/docs/).

# Development

## Documentation
To generate the documentation, you can run the following command in the project directory:
```bash
npx typedoc --out docs src/index.ts
```

## Tests 
There are tests for all classes and methods. The tests check if the JSON that needs to be sent to the server is as expected. To run the tests:
1. Open a terminal in the parent directory of this project, which can be found on [Github](https://github.com/United-Codes/cloudofficeprint-javascript).
2. Type in the terminal:
    ```bash
    npm run test
    ```
In the file `printjob.test.ts`, the tests for the `executeFullJson()`-function and for no input template are skipped because these tests need an API key to succeed. You can enable these tests by removing the `.skip` on the first line (as explained in the test file itself). The tests make use of the [jest](https://jestjs.io/)-package.

## Compiling
To compile the TypeScript code to JavaScript code, type in the terminal:
```bash
npm run build
```

To compile the TypeScript code with webpack, so that the package can be used in a browser, type in the terminal:
```bash
npm run bundle
```
This will create a file `bundle.js` that includes the full project, which can be imported in an HTML file (see `browser.html` in the browser-folder).

## ESLint
Airbnb style guide is used in this project with some modifications (see .eslintrc.json).  
To check the project for ESLint errors or warnings, you can type in your terminal:
```bash
eslint "src/**"
```

## Publishing
To publish this project to [Node Package Manager (npm)](https://www.npmjs.com/), follow these steps:
1. Create an npm account [here](https://www.npmjs.com/signup).
2. Create an npm organization [here](https://www.npmjs.com/signup?next=/org/create).
3. In the parent directory of this project, type in your terminal:
    ```bash
    npm login
    ```
4. To publish with private visibility:
    ```bash
    npm publish
    ```
5. To publish with public visibility:
    ```bash
    npm publish --access public
    ```
More information can be found [here](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages).