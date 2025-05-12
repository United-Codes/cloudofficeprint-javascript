import { Server } from './../../src/config/server';
import { PrintJob } from './../../src/printjob';
import * as cop from 'cloudofficeprint';
import { TransformationFunction } from '../../src/transformation';
import { OutputConfig } from '../../src/config';
import { ServerConfig } from 'cloudofficeprint/dist/src/config';
import { ElementCollection, Property } from '../../src/elements';

const products = [
  { product_name: 'Business Shirt', quantity: 3, unit_price:  50, category: 'Mens'       },
  { product_name: 'Trousers',       quantity: 3, unit_price:  80, category: 'Mens'       },
  { product_name: 'Jacket',         quantity: 3, unit_price: 150, category: 'Mens'       },
  { product_name: 'Blouse',         quantity: 3, unit_price:  60, category: 'Womens'     },
  { product_name: 'Skirt',          quantity: 3, unit_price:  80, category: 'Womens'     },
  { product_name: 'Ladies Shoes',   quantity: 2, unit_price: 120, category: 'Womens'     },
  { product_name: 'Belt',           quantity: 2, unit_price:  50, category: 'Accessories'},
  { product_name: 'Bag',            quantity: 4, unit_price: 125, category: 'Accessories'},
  { product_name: 'Mens Shoes',     quantity: 2, unit_price: 110, category: 'Mens'       },
  { product_name: 'Wallet',         quantity: 2, unit_price:  50, category: 'Accessories'}
];

const dataCollection = new ElementCollection('data');
dataCollection.add(new Property('cust_first_name', 'John'));
dataCollection.add(new Property('cust_last_name',  'Dullas'));
dataCollection.add(new Property('product',          products));

const dataRoot = {
  data: dataCollection  
};


const jsCode = `
function generateProductRows(products, category) {
    return products
        .filter(product => product.category === category)
        .map(product => {
            if (category === "Mens") {
                product.category_bold = "true";
                product.product_name_font_color = "blue";
            } else {
                product.category_italic = "true";
                product.product_name_font_color = "red";
            }
            const totalCost = product.unit_price * product.quantity;
            return \`
                <tr>
                    <td style="border-width: 1px; border-style: solid; border-color: black; padding: 8px;">\${product.product_name}</td>
                    <td style="border-width: 1px; border-style: solid; border-color: black; padding: 8px;">\${product.unit_price}</td>
                    <td style="border-width: 1px; border-style: solid; border-color: black; padding: 8px;">\${product.quantity}</td>
                    <td style="border-width: 1px; border-style: solid; border-color: black; padding: 8px;">\${totalCost}</td>
                </tr>
            \`;
        })
        .join('');
}

function transform() {
    files.forEach(file => {
        let data = file.data;

        let mensProductsHtml = '<table style="width: 100%; border: 2px solid blue; border-collapse: collapse;">';
        let womensProductsHtml = '<table style="width: 100%; border: 2px solid red; border-collapse: collapse;">';

        const tableHeaders = \`
            <tr>
                <th style="border-width: 1px; border-style: solid; border-color: black; padding: 8px;">Product Name</th>
                <th style="border-width: 1px; border-style: solid; border-color: black; padding: 8px;">Unit Price</th>
                <th style="border-width: 1px; border-style: solid; border-color: black; padding: 8px;">Quantity</th>
                <th style="border-width: 1px; border-style: solid; border-color: black; padding: 8px;">Total Cost</th>
            </tr>
        \`;
        mensProductsHtml += tableHeaders;
        womensProductsHtml += tableHeaders;

        const mensProductsRows = generateProductRows(data.product, "Mens");
        const womensProductsRows = generateProductRows(data.product, "Womens");

        const mensTotals = data.product
            .filter(p => p.category === "Mens")
            .reduce((t, p) => { t.quantity += p.quantity; t.cost += p.unit_price * p.quantity; return t; }, { quantity: 0, cost: 0 });

        const womensTotals = data.product
            .filter(p => p.category === "Womens")
            .reduce((t, p) => { t.quantity += p.quantity; t.cost += p.unit_price * p.quantity; return t; }, { quantity: 0, cost: 0 });

        mensProductsHtml   += mensProductsRows   + '</table>';
        womensProductsHtml += womensProductsRows + '</table>';

        data.mens_products         = mensProductsHtml;
        data.womens_products       = womensProductsHtml;
        data.mens_total_quantity   = mensTotals.quantity;
        data.mens_total_cost       = mensTotals.cost;
        data.womens_total_quantity = womensTotals.quantity;
        data.womens_total_cost     = womensTotals.cost;
    });

    return files;
}
`;

const transformationFunction = new TransformationFunction(jsCode);

// printjob 
const server     = new Server('http://localhost:8010/');
new ServerConfig('YOUR_API_KEY');
const outputConf = new OutputConfig('pdf');

const printJob = new PrintJob(
  dataRoot,
  server,
  cop.Resource.fromLocalFile("C:/Users/em8ee/cloudofficeprint-javascript/BeginersGuide/UsingTransformation/data/template.docx"),
  outputConf,
  undefined, undefined, undefined, undefined, undefined, undefined,
  transformationFunction
);

(async () => {
  try {
    const resp = await printJob.execute();
    await resp.toFile("C:/Users/em8ee/cloudofficeprint-javascript/BeginersGuide/UsingTransformation/output/output.pdf");
    console.log('PDF generated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
})();
