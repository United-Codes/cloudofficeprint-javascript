// import * as cop from 'cloudofficeprint';
import * as cop from '../../src/index';

import fetch from 'node-fetch';

const SERVER_URL = 'https://api.cloudofficeprint.com/';
const API_KEY = 'YOUR_API_KEY'; // Replace by your own API key

const IMAGE_MAX_HEIGHT = 250; // pptx, xlsx
const IMAGE_MAX_WIDTH = 400; // pptx, xlsx
const CHART_WIDTH = 800; // pptx, xlsx
// const IMAGE_MAX_HEIGHT = 500; // docx
// const IMAGE_MAX_WIDTH = 640; // docx
// const CHART_WIDTH = 650; // docx

// Setup Cloud Office Print server
const server = new cop.config.Server(
    SERVER_URL,
    new cop.config.ServerConfig(API_KEY),
);

// Create data object that contains all the data needed to fill in the template
const data = new cop.elements.ElementCollection();

/**
 * Return only the first sentence of an input.
 * @param input The input that needs to be shortened
 * @returns first sentence of input string
 */
function shortenDescription(input: string): string {
    return `${input.split('.')[0]}.`;
}

(async () => {
    // Get SpaceX data from https://docs.spacexdata.com
    const responses = await Promise.all([
        fetch('https://api.spacexdata.com/v3/info'),
        fetch('https://api.spacexdata.com/v4/rockets'),
        fetch('https://api.spacexdata.com/v4/dragons'),
        fetch('https://api.spacexdata.com/v4/launchpads'),
        fetch('https://api.spacexdata.com/v4/landpads'),
        fetch('https://api.spacexdata.com/v4/ships'),
    ]);
    const [info, rockets, dragons, launchPads, landingPads, ships] =
        await Promise.all(responses.map((res) => res.json()));

    // Add data source hyperlink
    const dataSource = new cop.elements.Hyperlink(
        'data_source',
        'https://docs.spacexdata.com',
        'Data source',
    );
    data.add(dataSource);

    // Add information about SpaceX
    data.addAll(cop.elements.ElementCollection.fromMapping(info));

    // / Add SpaceX website as hyperlink
    const website = new cop.elements.Hyperlink(
        'spacex_website',
        info.links.website,
        'Website',
    );
    data.add(website);

    // Add rocket data
    // / Add rockets description
    const rocketsDescription = new cop.elements.Property(
        'rockets_description',
        'Data about the rockets built by SpaceX',
    );
    data.add(rocketsDescription);

    // / Add rocket images, wikipedia hyperlink and shortened description for each rocket to a list
    const rocketList: cop.elements.Element[] = rockets.map((rocket: any) => {
        const collec = cop.elements.ElementCollection.fromMapping(rocket);

        const img = cop.elements.Image.fromUrl(
            'image',
            (rocket.flickr_images as string[])[0],
            IMAGE_MAX_WIDTH,
            IMAGE_MAX_HEIGHT,
        );
        collec.add(img);

        const hyper = new cop.elements.Hyperlink(
            'wikipedia',
            rocket.wikipedia as string,
            'Wikipedia',
        );
        collec.add(hyper);

        const shortDescription = new cop.elements.Property(
            'description',
            shortenDescription(rocket.description as string),
        );
        collec.add(shortDescription); // Overwrites the current description

        return collec;
    });

    const rocketData = new cop.elements.ForEach('rockets', rocketList);
    data.add(rocketData);

    // / Add rocket chart
    const x: string[] = rockets.map((rocket: any) => rocket.name as string);
    const costY: number[] = rockets.map(
        (rocket: any) => rocket.cost_per_launch as number,
    );

    const costSeries = new cop.elements.ColumnSeries(
        x,
        costY,
        'Cost per launch',
        '#087c6c',
    );

    const rocketsChartOptions = new cop.elements.ChartOptions(
        new cop.elements.ChartAxisOptions(
            undefined,
            undefined,
            undefined,
            undefined,
            'Rocket',
            undefined,
            undefined,
            new cop.elements.ChartTextStyle(undefined, undefined, 'black'),
        ),
        new cop.elements.ChartAxisOptions(
            undefined,
            undefined,
            undefined,
            undefined,
            'Cost ($)',
            undefined,
            undefined,
            new cop.elements.ChartTextStyle(undefined, undefined, 'black'),
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
        new cop.elements.ChartTextStyle(undefined, undefined, 'black'),
    );

    const rocketsChart = new cop.elements.ColumnChart(
        'rockets_chart',
        [costSeries],
        rocketsChartOptions,
    );
    data.add(rocketsChart);

    // Add dragons data

    // / Add dragons description
    const dragonDescription = new cop.elements.Property(
        'dragons_description',
        'Data about the dragon capsules of SpaceX',
    );
    data.add(dragonDescription);

    // / Add dragon images, wikipedia hyperlink and shortened description for each dragon to a list
    const dragonList: cop.elements.Element[] = dragons.map((dragon: any) => {
        const collec = cop.elements.ElementCollection.fromMapping(dragon);

        const img = cop.elements.Image.fromUrl(
            'image',
            (dragon.flickr_images as string[])[0],
            IMAGE_MAX_WIDTH,
            IMAGE_MAX_HEIGHT,
        );
        collec.add(img);

        const hyper = new cop.elements.Hyperlink(
            'wikipedia',
            dragon.wikipedia as string,
            'Wikipedia',
        );
        collec.add(hyper);

        const shortDescription = new cop.elements.Property(
            'description',
            shortenDescription(dragon.description as string),
        );
        collec.add(shortDescription); // Overwrites the current description

        return collec;
    });

    const dragonData = new cop.elements.ForEach('dragons', dragonList);
    data.add(dragonData);

    // Add launch pads data

    // / Add launch pads description
    const launchPadDescription = new cop.elements.Property(
        'launch_pads_description',
        "Data about SpaceX's launch pads",
    );
    data.add(launchPadDescription);

    // / Add launch pad images, wikipedia hyperlink and shortened description for each launch_pad
    const launchPadList: cop.elements.Element[] = launchPads.map(
        (launchPad: any) => {
            const collec =
                cop.elements.ElementCollection.fromMapping(launchPad);

            const img = cop.elements.Image.fromUrl(
                'image',
                (launchPad.images as { [key: string]: string[] }).large[0],
                IMAGE_MAX_WIDTH,
                IMAGE_MAX_HEIGHT,
            );
            collec.add(img);

            const shortDescription = new cop.elements.Property(
                'details',
                shortenDescription(launchPad.details as string),
            );
            collec.add(shortDescription); // Overwrites the current description

            return collec;
        },
    );

    const launchPadData = new cop.elements.ForEach(
        'launch_pads',
        launchPadList,
    );
    data.add(launchPadData);

    // Add landing pads data

    // / Add landing pads description
    const landingPadDescription = new cop.elements.Property(
        'landing_pads_description',
        "Data about SpaceX's landing pads",
    );
    data.add(landingPadDescription);

    // / Add landing pad images, wikipedia hyperlink and shortened description for each landing pad
    const landingPadList: cop.elements.Element[] = landingPads.map(
        (landingPad: any) => {
            const collec =
                cop.elements.ElementCollection.fromMapping(landingPad);

            const img = cop.elements.Image.fromUrl(
                'image',
                (landingPad.images as { [key: string]: string[] }).large[0],
                IMAGE_MAX_WIDTH,
                IMAGE_MAX_HEIGHT,
            );
            collec.add(img);

            const hyper = new cop.elements.Hyperlink(
                'wikipedia',
                landingPad.wikipedia as string,
                'Wikipedia',
            );
            collec.add(hyper);

            const shortDescription = new cop.elements.Property(
                'details',
                shortenDescription(landingPad.details as string),
            );
            collec.add(shortDescription); // Overwrites the current description

            return collec;
        },
    );

    const landingPadData = new cop.elements.ForEach(
        'landing_pads',
        landingPadList,
    );
    data.add(landingPadData);

    // Add ships data

    // / Add ships description
    const shipDescription = new cop.elements.Property(
        'ships_description',
        'Data about the ships that assist SpaceX launches, including ASDS drone ships, tugs, fairing recovery ships, and various support ships',
    );
    data.add(shipDescription);

    // / Add ship images and website hyperlink for each ship to a list
    const shipList: cop.elements.Element[] = ships.map((ship: any) => {
        const collec = cop.elements.ElementCollection.fromMapping(ship);

        const img = cop.elements.Image.fromUrl(
            'image',
            ship.image as string,
            IMAGE_MAX_WIDTH,
            IMAGE_MAX_HEIGHT,
        );
        collec.add(img);

        const hyper = new cop.elements.Hyperlink(
            'website',
            ship.link as string,
            'Website',
        );
        collec.add(hyper);

        return collec;
    });

    const shipData = new cop.elements.ForEach('ships', shipList);
    data.add(shipData);

    // Create printJob
    const printJob = new cop.PrintJob(
        // NOTE: change IMAGE_MAX_HEIGHT, IMAGE_MAX_WIDTH and CHART_WIDTH at the beginning
        //  of this script according to filetype
        data,
        server,
        cop.Template.fromLocalFile('spacex_template.pptx'), // For pptx
        // cop.Template.fromLocalFile('spacex_template.xlsx'), // For xlsx
        // cop.Template.fromLocalFile('spacex_template.docx'), // For docx
    );

    const response = await printJob.execute();
    await response.toFile('output');
})();
