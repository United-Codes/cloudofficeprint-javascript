# About

In this file we are going to show you how you can use this Cloud (Cloud Office Print) SDK to generate an output file using a template and data to fill the template. The general approach is to create a template file in which you want the data to appear, then process the data with this SDK and finally let Cloud do the work to merge your template with the data.

In this example, we are going to use solar system data to fill a template we are going to make. The solary system data can be received by sending an HTTP-request to an API. The API used in this example is https://api.le-systeme-solaire.net.

Normally you know the data you will be using to fill in the template, but for this example, we are going to start with a brief overview of the data we will be using. Then we will create a template. Then we will get the data from the solar system API and process this data with this SDK. Finally we send the template together with the data to a Cloud Office Print server and save the response into our output file.

# Input data (API)

The data we use comes from https://api.le-systeme-solaire.net. The data that interests us is about the bodies of the solar system and more specifically the planets and dwarf planets in our solar system. If we go to the URL https://api.le-systeme-solaire.net/rest/bodies, we retrieve a JSON array containing objects for each body in the solar system. One such object may look like this:

```json
{
    "id": "lune",
    "name": "La Lune",
    "englishName": "Moon",
    "isPlanet": false,
    "moons": null,
    "semimajorAxis": 384400,
    "perihelion": 363300,
    "aphelion": 405500,
    "eccentricity": 0.0549,
    "inclination": 5.145,
    "mass": {
        "massValue": 7.346,
        "massExponent": 22
    },
    "vol": {
        "volValue": 2.1968,
        "volExponent": 10
    },
    "density": 3.344,
    "gravity": 1.62,
    "escape": 2380.0,
    "meanRadius": 33.0,
    "equaRadius": 1738.1,
    "polarRadius": 1736.0,
    "flattening": 0.0012,
    "dimension": "",
    "sideralOrbit": 27.3217,
    "sideralRotation": 655.728,
    "aroundPlanet": {
        "planet": "terre",
        "rel": "https://api.le-systeme-solaire.net/rest/bodies/terre"
    },
    "discoveredBy": "",
    "discoveryDate": "",
    "alternativeName": "",
    "axialTilt": 6.68,
    "avgTemp": 0,
    "mainAnomaly": 0.0,
    "argPeriapsis": 0.0,
    "longAscNode": 0.0,
    "rel": "https://api.le-systeme-solaire.net/rest/bodies/lune"
}
```

# Template

Now we will build the template. We can create templates in different file extensions, namely docx, xlsx, pptx, html, md, txt and csv. In this example we will build a template of filetype pptx and docx. The template has to follow a specific structure which can be found at the official Cloud Office Print documentation: https://www.cloudofficeprint.com/docs/.

## pptx

We will build the template in Google Slides. After choosing a pretty theme, we create the title slide. On this slide, we want the title of our presentation and the source where we got the data from. The title slide looks like this:

<img src="https://raw.githubusercontent.com/United-Codes/cloudofficeprint-javascript/master/examples/solar_system_example/imgs/pptx_title.png" width="600" />

Here we encounter our first placeholder/tag: `{*data source}`. Tags are defined by surrounding a variable name with curly brackets. This is the way we let the Cloud Office Print server know that data needs to replace this placeholder. We will see what that data is in the section [Process input data](#process-input-data). In this specific case, we used a hyperlink-tag `{*hyperlink}`.

Note: to minimize the modifications to the input data (see [Input Data (API)](#input-data-api)), it is important to use as variable names the keys available in the input data if possible.

Next, we want to have a slide for each planet with information about this planet. Since all planets have the same parameters (such as mass, density, gravity etc.), we want to specify one template slide and use this for each planet. This template slide looks like this:

<img src="https://raw.githubusercontent.com/United-Codes/cloudofficeprint-javascript/master/examples/solar_system_example/imgs/pptx_planets.png" width="600" />

Again, the placeholders will be replaced with data by the Cloud Office Print server. Since the data given to the Cloud Office Print server will be in JSON-format (see [Process input data](#process-input-data)), it is possible to reach a subfield of an entry by using `entry.subfield`. So if `mass` is a JSON object like this:

```json
"mass": {
    "massValue": ...,
    "massExponent": ...
}
```

we can access the field `massValue` by doing `mass.massValue`, as can be seen on the slide. The tags on this slide are 'normal' tags in the sense that they will just be replaced by a value.

The thing of replicating a certain template slide for each object in a list is exactly what the first tag `{!planets}` is for. For each planet in the planets-array (provided in the data, see [Process input data](#process-input-data)), this slide is repeated.

It might be interesting to plot the radius for each of the planets on a chart. This is the slide used for that:

<img src="https://raw.githubusercontent.com/United-Codes/cloudofficeprint-javascript/master/examples/solar_system_example/imgs/pptx_chart.png" width="600" />

The tag `{$planet_radius_chart}` is used to insert a chart at the place of this placeholder. The data for the chart can be generated using this SDK.

## docx

The template for the "docx"-filetype is very similar to the template for the "pptx"-filetype in the sense that they use the same parameters. For this template we want to generate a table containing information about the planets in the solar system. The template looks like this:

<img src="https://raw.githubusercontent.com/United-Codes/cloudofficeprint-javascript/master/examples/solar_system_example/imgs/docx.png" width="600" />

# Process input data (SDK)

Now that our template is finished, we have to process the data used by the template. That is where this SDK comes into play. In this section we will explain in detail all the code needed to generate the data to fill in the template. The full code can also be found in the example file itself.

The beauty of Cloud Office Print is that the data created by the Python SDK can be used in all templates of different file extensions while using the same tags.

## Setup

First we create a new file and import the Cloud Office Print library:

```typescript
import * as cop from '../../src';

import fetch from 'node-fetch';
```

Then we need to set up the Cloud Office Print server where we will send our template and data to:

```typescript
const SERVER_URL = 'https://api.cloudofficeprint.com/';
const API_KEY = 'YOUR_API_KEY'; // Replace by your own API key

const server = new cop.config.Server(
    SERVER_URL,
    new cop.config.ServerConfig(API_KEY),
);
```

If you have a Cloud Office Print server running on localhost (e.g. on-premise version), replace the server url by the localhost url: http://localhost:8010

We also need to create the main element-collection object that contains all our data:

```typescript
const data = new cop.elements.ElementCollection();
```

## Import data

As discussed in [Input data (API)](#input-data-api), we use an API of a cloud server to receive the data about the planets. The information we use for this example can be received as follows:

```typescript
const res = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
const json = await res.json();
```

## Title slide

The template title slide contains a normal tag for the title `{main_title}` and a hyperlink-tag `{*data_source}`. Now we need to add the data for these tags in our code by creating a Cloud Office Print element (property and hyperlink) and adding this to the main data collection:

```typescript
// Add the title to the data
const mainTitle = new cop.elements.Property('main_title', 'The solar system');
data.add(mainTitle);

// Add the source for the data
const dataSource = new cop.elements.Hyperlink(
    'data_source',
    'https://api.le-systeme-solaire.net/rest/bodies/',
    'Data source',
);
data.add(dataSource);
```

The tag `{main_title}` will be replaced by 'The solar system' and the tag `{*data_source}` will be replaced by the text 'Data source' and this text will have a hyperlink to the URL 'https://docs.spacexdata.com'.

## Planets

NOTE: for JavaScript and TypeScript, the rest of the code needs to be places inside an anonymous async function. This is necessary to asynchronously wait for asynchronous methods.

```typescript
(async () => {
    // the rest of the code
})();
```

The data for the planets needs to be put in a loop-element so that the Cloud Office Print server can iterate over all the planets. We also process the body-array so that we only have the bodies that are planets in our data.

```typescript
// Process data: we only want planets
const planetList: cop.elements.Element[] = json.bodies
    .filter((body: any) => body.isPlanet)
    .map((body: any) => cop.elements.ElementCollection.fromMapping(body));

const planets = new cop.elements.ForEach('planets', planetList);
data.add(planets);
```

## Chart

Finally we need to add the data for the planet radius chart. A chart consists of one or more data series. We want the chart to be a 3D pie chart, so we first create a `PieSeries` with the name of the planets on the x-axis and their radius on the y-axis.

```typescript
// Add planet radius chart to data
const color = new Array(planetList.length);
color[0] = '#7298d4'; // Specify the color for the first pie slice

const radiusSeries = new cop.elements.PieSeries(
    planets.asDict().planets.map((planet: any) => planet.name),
    planets.asDict().planets.map((planet: any) => planet.equaRadius),
    'radius',
    color,
);
```

We then create options for the pie chart. We disable the border around the chart and specify the color of the chart legend's text:

```typescript
const radiusChartOptions = new cop.elements.ChartOptions(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    false,
);

radiusChartOptions.setLegend(
    undefined,
    new cop.elements.ChartTextStyle(undefined, undefined, 'black'),
);
```

Finally, we create the 3D pie chart itself and add it to the element collection:

```typescript
const radiusChart = new cop.elements.Pie3DChart(
    'planet_radius_chart',
    [radiusSeries],
    radiusChartOptions,
);
data.add(radiusChart);
```

# Cloud Office Print server and response

Now that we have the template and the data ready, it is time to let Cloud Office Print merge them together. In the SDK this is implemented by creating a print job:

```typescript
// Create printJob
const printJob = new cop.PrintJob(
    data,
    server,
    cop.Template.fromLocalFile('solar_system_template.pptx'), // pptx
    // cop.Resource.fromLocalFile('solar_system_template.docx'), // docx
);
```

We loaded the template from a local file and passed in our data element collection and our server object.

Finally we actually send this printjob to a Cloud Office Print server and save the response into our output file:

```typescript
// Send the print job to the server and save the response
const response = await printJob.execute();
await response.toFile('output');
```

The resulting file can now be found in the specified folder.

# Result

For the "pptx" output file, we will not add the result in this text, but the output file can be found in the folder of this example. The "docx" output file will look like this:

<img src="https://raw.githubusercontent.com/United-Codes/cloudofficeprint-javascript/master/examples/solar_system_example/imgs/docx_result.png" width="600" />
