/**
 * This is a standard example of how to use an API to get data to fill in a template.
 * The SpaceX example `spacex_example.ts` is a more advanced example using this approach.
 */

import fetch from 'node-fetch';
import * as cop from '../../src/index';
// const fetch = require('node-fetch').default; // .default is needed for node-fetch to work in a webbrowser

// Setup Cloud Office Print server
const SERVER_URL = 'https://api.cloudofficeprint.com/';
const API_KEY = 'YOUR_API_KEY'; // Replace by your own API key

const server = new cop.config.Server(
    SERVER_URL,
    new cop.config.ServerConfig(API_KEY),
);

// Create the main element collection that contains all data
const data = new cop.elements.ElementCollection();

(async () => {
    // Get solar system data from https://api.le-systeme-solaire.net/rest/bodies/
    const response = await fetch(
        'https://api.le-systeme-solaire.net/rest/bodies/',
    );
    const json = await response.json();

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
    const planetList: cop.elements.Element[] = json.bodies
        .filter((body: any) => body.isPlanet)
        .map((body: any) => cop.elements.ElementCollection.fromMapping(body));

    const planets = new cop.elements.ForEach('planets', planetList);
    data.add(planets);

    // Add planet radius chart to data
    const color = new Array(planetList.length);
    color[0] = '#7298d4'; // Specify the color for the first pie slice

    const radiusSeries = new cop.elements.PieSeries(
        planets.asDict().planets.map((planet: any) => planet.name),
        planets.asDict().planets.map((planet: any) => planet.equaRadius),
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

    // Create printjob
    const printjob = new cop.PrintJob(
        data,
        server,
        cop.Template.fromLocalFile(
            './examples/solar_system_example/pptx/solar_system_template.pptx',
        ), // pptx
        // cop.Resource.fromLocalFile(
        //     './examples/solar_system_example/docx/solar_system_template.docx',
        // ), // docx
    );

    await (
        await printjob.execute()
    ).toFile('./examples/solar_system_example/pptx/output');
    // await (await printjob.execute()).toFile('./examples/solar_system_example/docx/output');
})();
