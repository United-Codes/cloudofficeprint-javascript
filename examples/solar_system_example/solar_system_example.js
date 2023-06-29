/**
 * This is a standard example of how to use an API to get data to fill in a template.
 * The SpaceX example `spacex_example.ts` is a more advanced example using this approach.
 */

// const cop = require('cloudofficeprint');
const cop = require('../../dist/src');

const fetch = require('node-fetch');

const SERVER_URL = 'https://api.cloudofficeprint.com/';
const API_KEY = 'YOUR_API_KEY'; // Replace by your own API key

// Setup Cloud Office Print server
const server = new cop.config.Server(
    SERVER_URL,
    new cop.config.ServerConfig(API_KEY),
);

// Create the main element collection that contains all data
const data = new cop.elements.ElementCollection();

(async () => {
    // Get solar system data from https://api.le-systeme-solaire.net/rest/bodies/
    const res = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
    const json = await res.json();

    // Add the title to the data
    const mainTitle = new cop.elements.Property(
        'main_title',
        'The solar system',
    );
    data.add(mainTitle);

    // Add the source for the data
    const dataSource = new cop.elements.Hyperlink(
        'data_source',
        'https://api.le-systeme-solaire.net/rest/bodies/',
        'Data source',
    );
    data.add(dataSource);

    // Process data: we only want planets
    const planetList = json.bodies
        .filter((body) => body.isPlanet)
        .map((body) => cop.elements.ElementCollection.fromMapping(body));

    const planets = new cop.elements.ForEach('planets', planetList);
    data.add(planets);

    // Add planet radius chart to data
    const color = new Array(planetList.length);
    color[0] = '#7298d4'; // Specify the color for the first pie slice

    const radiusSeries = new cop.elements.PieSeries(
        planets.asDict().planets.map((planet) => planet.name),
        planets.asDict().planets.map((planet) => planet.equaRadius),
        'radius',
        color,
    );

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

    const radiusChart = new cop.elements.Pie3DChart(
        'planet_radius_chart',
        [radiusSeries],
        radiusChartOptions,
    );
    data.add(radiusChart);

    // Create printJob
    const printJob = new cop.PrintJob(
        data,
        server,
        cop.Template.fromLocalFile('solar_system_template.pptx'), // pptx
        // cop.Template.fromLocalFile('solar_system_template.docx'), // docx
    );

    // Send the print job to the server and save the response
    const response = await printJob.execute();
    await response.toFile('output');
})();
