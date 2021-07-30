# apexofficeprint-javascript
This project provides a JavaScript/TypeScript interface for APEX Office Print.

# Installation
To install the APEX Office Print Python package, you can type in your terminal:  
`npm install apexofficeprint`

# Usage
## TypeScript
You can import the package in a TypeScript file by doing: `import * as aop from 'PATH_TO/index.ts'`.

## JavaScript
### Build the JavaScript code
Since this project is built in TypeScript, you first have to compile the TypeScript code to JavaScript code.
You can do this by typing `npm run build` in your terminal. A new directory called `dist` will be made containing the compiled JavaScript files.

# Documentation
The documentation for this SDK can be found inside the `docs/` folder on [Github](https://github.com/United-Codes/apexofficeprint-javascript). If you want to generate this documentation yourself, you can run the following command in the project directory:  
`npx typedoc --out docs src/index.ts`

The full APEX Office Print documentation can be found at the [AOP docs](https://www.apexofficeprint.com/docs/).

# ESLint
Airbnb style guide is used in this project with some tweaks (see .eslintrc.json).