import fetch from 'node-fetch';
import * as aop from '../../src/index';

// Setup AOP server
const SERVER_URL = 'https://api.apexofficeprint.com/';
const API_KEY = 'YOUR_API_KEY'; // Replace by your own API key

const server = new aop.config.Server(
    SERVER_URL,
    new aop.config.ServerConfig(API_KEY),
);

// Create data object that contains all the data needed to fill in the template
const data = new aop.elements.ElementCollection();

function shortenDescription(input: string): string {
    /**
     * Return only the first sentence of an input.
     * @param input The input that needs to be shortened
     * @returns first sentence of input string
     */

    return `${input.split('.')[0]}.`;
}

const IMAGE_MAX_HEIGHT = 250; // pptx, xlsx
const IMAGE_MAX_WIDTH = 400; // pptx, xlsx
const CHART_WIDTH = 800; // pptx, xlsx
// const IMAGE_MAX_HEIGHT = 500; // docx
// const IMAGE_MAX_WIDTH = 640; // docx
// const CHART_WIDTH = 650; // pptx, xlsx

// Get SpaceX data from https://docs.spacexdata.com
let info: {[key: string]: string | number | boolean | {[key: string]: unknown}} = {};
let rockets: {[key: string]: string | number | boolean |
    {[key: string]: unknown} | string[]}[] = [];
let dragons: {[key: string]: string | number | boolean |
    {[key: string]: unknown} | string[]}[] = [];
let launchPads: {[key: string]: string | number | boolean |
    {[key: string]: unknown} | string[]}[] = [];
let landingPads: {[key: string]: string | number | boolean |
    {[key: string]: unknown} | string[]}[] = [];
let ships: {[key: string]: string | number | boolean |
    {[key: string]: unknown} | string[]}[] = [];
const infoProm = new Promise<void>((resolve) => fetch('https://api.spacexdata.com/v3/info')
    .then((r) => r.json())
    .then((json) => {
        info = json;
        resolve();
    })); // v4 not supported
const rocketsProm = new Promise<void>((resolve) => fetch('https://api.spacexdata.com/v4/rockets')
    .then((r) => r.json())
    .then((json) => {
        rockets = json;
        resolve();
    }));
const dragonsProm = new Promise<void>((resolve) => fetch('https://api.spacexdata.com/v4/dragons')
    .then((r) => r.json())
    .then((json) => {
        dragons = json;
        resolve();
    }));
const launchPadsProm = new Promise<void>((resolve) => fetch('https://api.spacexdata.com/v4/launchpads')
    .then((r) => r.json())
    .then((json) => {
        launchPads = json;
        resolve();
    }));
const landingPadsProm = new Promise<void>((resolve) => fetch('https://api.spacexdata.com/v4/landpads')
    .then((r) => r.json())
    .then((json) => {
        landingPads = json;
        resolve();
    }));
const shipsProm = new Promise<void>((resolve) => fetch('https://api.spacexdata.com/v4/ships')
    .then((r) => r.json())
    .then((json) => {
        ships = json;
        resolve();
    }));

(async () => {
    // Add data source hyperlink
    const dataSource = new aop.elements.Hyperlink(
        'data_source',
        'https://docs.spacexdata.com',
        'Data source',
    );
    data.add(dataSource);

    // Add information about SpaceX
    await infoProm;
    data.addAll(aop.elements.ElementCollection.fromMapping(info));

    // / Add SpaceX website as hyperlink
    const website = new aop.elements.Hyperlink(
        'spacex_website',
        (info.links as {[key: string]: string}).website,
        'Website',
    );
    data.add(website);

    // Add rocket data
    // / Add rockets description
    const rocketsDescription = new aop.elements.Property('rockets_description', 'Data about the rockets built by SpaceX');
    data.add(rocketsDescription);

    // / Add rocket data to a list
    const rocketList: aop.elements.Element[] = [];

    // / Add rocket images, wikipedia hyperlink and shortened description for each rocket
    await rocketsProm;
    rockets.forEach(
        (rocket) => {
            const collec = aop.elements.ElementCollection.fromMapping(rocket);

            const img = aop.elements.Image.fromUrl('image', (rocket.flickr_images as string[])[0]);
            img.maxHeight = IMAGE_MAX_HEIGHT;
            img.maxWidth = IMAGE_MAX_WIDTH;
            collec.add(img);

            const hyper = new aop.elements.Hyperlink(
                'wikipedia',
                rocket.wikipedia as string,
                'Wikipedia',
            );
            collec.add(hyper);

            const shortDescription = new aop.elements.Property('description', shortenDescription(rocket.description as string));
            collec.add(shortDescription); // Overwrites the current description

            rocketList.push(collec);
        },
    );

    const rocketData = new aop.elements.ForEach('rockets', rocketList);
    data.add(rocketData);

    // / Add rocket chart
    const x: string[] = [];
    const costY: number[] = [];

    rockets.forEach(
        (rocket) => {
            x.push(rocket.name as string);
            costY.push(rocket.cost_per_launch as number);
        },
    );

    const costSeries = new aop.elements.ColumnSeries(
        x,
        costY,
        'Cost per launch',
        '#087c6c',
    );

    const rocketsChartOptions = new aop.elements.ChartOptions(
        new aop.elements.ChartAxisOptions(
            undefined,
            undefined,
            undefined,
            undefined,
            'Rocket',
            undefined,
            undefined,
            new aop.elements.ChartTextStyle(
                undefined,
                undefined,
                'black',
            ),
        ),
        new aop.elements.ChartAxisOptions(
            undefined,
            undefined,
            undefined,
            undefined,
            'Cost ($)',
            undefined,
            undefined,
            new aop.elements.ChartTextStyle(
                undefined,
                undefined,
                'black',
            ),
            -90,
            true,
        ),
        undefined,
        CHART_WIDTH,
        300,
        false,
        true,
        '#c8a45c',
        50,
    );

    rocketsChartOptions.setLegend(
        undefined,
        new aop.elements.ChartTextStyle(
            undefined,
            undefined,
            'black',
        ),
    );

    const rocketsChart = new aop.elements.ColumnChart(
        'rockets_chart',
        [costSeries],
        rocketsChartOptions,
    );

    data.add(rocketsChart);

    // Add dragons data
    // / Add dragons description
    data.add(new aop.elements.Property('dragons_description', 'Data about the dragon capsules of SpaceX'));

    // / Add dragon data to a list
    const dragonList: aop.elements.Element[] = [];

    // / Add dragon images, wikipedia hyperlink and shortened description for each dragon
    await dragonsProm;
    dragons.forEach(
        (dragon) => {
            const collec = aop.elements.ElementCollection.fromMapping(dragon);

            const img = aop.elements.Image.fromUrl('image', (dragon.flickr_images as string[])[0]);
            img.maxHeight = IMAGE_MAX_HEIGHT;
            img.maxWidth = IMAGE_MAX_WIDTH;
            collec.add(img);

            const hyper = new aop.elements.Hyperlink(
                'wikipedia',
                dragon.wikipedia as string,
                'Wikipedia',
            );
            collec.add(hyper);

            const shortDescription = new aop.elements.Property('description', shortenDescription(dragon.description as string));
            collec.add(shortDescription); // Overwrites the current description

            dragonList.push(collec);
        },
    );

    const dragonData = new aop.elements.ForEach('dragons', dragonList);
    data.add(dragonData);

    // Add launch pads data
    // / Add launch pads description
    data.add(new aop.elements.Property('launch_pads_description', "Data about SpaceX's launch pads"));

    // / Add launch pad data to a list
    const launchPadList: aop.elements.Element[] = [];

    // / Add launch pad images, wikipedia hyperlink and shortened description for each launch_pad
    await launchPadsProm;
    launchPads.forEach(
        (launchPad) => {
            const collec = aop.elements.ElementCollection.fromMapping(launchPad);

            const img = aop.elements.Image.fromUrl('image', (launchPad.images as {[key: string]: string[]}).large[0]);
            img.maxHeight = IMAGE_MAX_HEIGHT;
            img.maxWidth = IMAGE_MAX_WIDTH;
            collec.add(img);

            const shortDescription = new aop.elements.Property('details', shortenDescription(launchPad.details as string));
            collec.add(shortDescription); // Overwrites the current description

            launchPadList.push(collec);
        },
    );

    const launchPadData = new aop.elements.ForEach('launch_pads', launchPadList);
    data.add(launchPadData);

    // Add landing pads data
    // / Add landing pads description
    data.add(new aop.elements.Property('landing_pads_description', "Data about SpaceX's landing pads"));

    // / Add landing pad data to a list
    const landingPadList: aop.elements.Element[] = [];

    // / Add landing pad images, wikipedia hyperlink and shortened description for each landing pad
    await landingPadsProm;
    landingPads.forEach(
        (landingPad) => {
            const collec = aop.elements.ElementCollection.fromMapping(landingPad);

            const img = aop.elements.Image.fromUrl('image', (landingPad.images as {[key: string]: string[]}).large[0]);
            img.maxHeight = IMAGE_MAX_HEIGHT;
            img.maxWidth = IMAGE_MAX_WIDTH;
            collec.add(img);

            const hyper = new aop.elements.Hyperlink(
                'wikipedia',
                landingPad.wikipedia as string,
                'Wikipedia',
            );
            collec.add(hyper);

            const shortDescription = new aop.elements.Property('details', shortenDescription(landingPad.details as string));
            collec.add(shortDescription); // Overwrites the current description

            landingPadList.push(collec);
        },
    );

    const landingPadData = new aop.elements.ForEach('landing_pads', landingPadList);

    data.add(landingPadData);

    // Add ships data
    // / Add ships description
    data.add(new aop.elements.Property('ships_description', 'Data about the ships that assist SpaceX launches, including ASDS drone ships, tugs, fairing recovery ships, and various support ships'));

    // / Add ship data to a list
    const shipList: aop.elements.Element[] = [];

    // / Add ship images and website hyperlink for each ship
    await shipsProm;
    ships.forEach(
        (ship) => {
            const collec = aop.elements.ElementCollection.fromMapping(ship);

            const img = aop.elements.Image.fromUrl('image', ship.image as string);
            img.maxHeight = IMAGE_MAX_HEIGHT;
            img.maxWidth = IMAGE_MAX_WIDTH;
            collec.add(img);

            const hyper = new aop.elements.Hyperlink(
                'website',
                ship.link as string,
                'Website',
            );
            collec.add(hyper);

            shipList.push(collec);
        },
    );

    const shipData = new aop.elements.ForEach('ships', shipList);
    data.add(shipData);

    // Create printjob
    const printjob = new aop.PrintJob(
        // NOTE: change IMAGE_MAX_HEIGHT, IMAGE_MAX_WIDTH and CHART_WIDTH at the beginning
        //  of this script according to filetype
        // aop.Resource.fromLocalFile(
        //     './examples/spacex_example/spacex_template.pptx',
        // ), // For pptx
        aop.Resource.fromLocalFile(
            './examples/spacex_example/spacex_template.xlsx',
        ), // For xlsx
        // aop.Resource.fromLocalFile(
        //     './examples/spacex_example/spacex_template.docx',
        // ), // For docx
        data,
        server,
    );

    (await printjob.execute()).toFile('./examples/spacex_example/output');
})();
