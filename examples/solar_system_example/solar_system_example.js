/**
 * This is a standard example of how to use an API to get data to fill in a template.
 * The SpaceX example `spacex_example.ts` is a more advanced example using this approach.
 */

const cop = require("../../src/index");

const fetch = require("node-fetch");

// Setup Cloud Office Print server
const SERVER_URL = "https://api.cloudofficeprint.com/";
const API_KEY = "YOUR_API_KEY"; // Replace by your own API key

const server = new cop.config.Server(
  SERVER_URL,
  new cop.config.ServerConfig(API_KEY)
);

// Create the main element collection that contains all data
const data = new cop.elements.ElementCollection();

// Add the title to the data
data.add(new cop.elements.Property("main_title", "The solar system"));

// Add the source for the data
data.add(
  new cop.elements.Hyperlink(
    "data_source",
    "https://api.le-systeme-solaire.net/rest/bodies/",
    "Data source"
  )
);

// Process data: we only want planets
const planetList = [];

(async () => {
  // Get solar system data from https://api.le-systeme-solaire.net/rest/bodies/
  const response = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies/"
  );
  const data = await response.json();

  data.bodies.forEach((body) => {
    if (body.isPlanet) {
      const collec = cop.elements.ElementCollection.fromMapping(body);
      planetList.push(collec);
    }
  });

  const planets = new cop.elements.ForEach("planets", planetList);
  data.add(planets);

  // Add planet radius chart to data
  const color = new Array(planetList.length);
  color[0] = "#7298d4"; // Specify the color for the first pie slice

  const radiusSeries = new cop.elements.PieSeries(
    planets.asDict().planets.map((planet) => planet.name),
    planets.asDict().planets.map((planet) => planet.equaRadius),
    "radius",
    color
  );

  const radiusChartOptions = new cop.elements.ChartOptions(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    false
  );

  radiusChartOptions.setLegend(
    undefined,
    new cop.elements.ChartTextStyle(undefined, undefined, "black")
  );

  const radiusChart = new cop.elements.Pie3DChart(
    "planet_radius_chart",
    [radiusSeries],
    radiusChartOptions
  );
  data.add(radiusChart);

  // Create printjob
  const printjob = new cop.PrintJob(
    data,
    server,
    cop.Resource.fromLocalFile(
      "./examples/solar_system_example/pptx/solar_system_template.pptx"
    ) // pptx
    // cop.Resource.fromLocalFile(
    //     './examples/solar_system_example/docx/solar_system_template.docx',
    // ), // docx
  );

  (await printjob.execute()).toFile(
    "./examples/solar_system_example/pptx/output"
  );
  // (await printjob.execute()).toFile('./examples/solar_system_example/docx/output');
})();
