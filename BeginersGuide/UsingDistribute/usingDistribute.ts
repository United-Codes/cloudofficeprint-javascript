import * as cop from 'cloudofficeprint';
import { ForEachInline } from '../../src/elements/loops';

// Main data collection
const collection = new cop.elements.ElementCollection();

// product lists 
const productA = [
    { product_name: 'Business Shirt', price: 50, category: 'Mens' },
    { product_name: 'Trousers', price: 80, category: 'Mens' },
    { product_name: 'Jacket', price: 150, category: 'Mens' },
    { product_name: 'Blouse', price: 60, category: 'Womens' }
];

const productB = [
    { product_name: 'Ladies Shoes', price: 120, category: 'Womens' },
    { product_name: 'Belt', price: 30, category: 'Accessories' },
    { product_name: 'Bag', price: 125, category: 'Accessories' },
    { product_name: 'Mens Shoes', price: 110, category: 'Mens' }
];

// Convert to ElementCollection arrays
const productAElements = productA.map(p => cop.elements.ElementCollection.fromMapping(p));
const productBElements = productB.map(p => cop.elements.ElementCollection.fromMapping(p));

// ForEachInline with distribute
collection.add(new ForEachInline('product_a', productAElements)); 
collection.add(new ForEachInline('product_b', productBElements, true)); 

const orders = [
    {
        order_name: 'Order 1',
        order_total: 2380,
        product: [
            { product_name: 'Business Shirt', quantity: 3, unit_price: 50 },
            { product_name: 'Trousers', quantity: 3, unit_price: 80 },
            { product_name: 'Jacket', quantity: 3, unit_price: 150 },
            { product_name: 'Blouse', quantity: 3, unit_price: 60 }
        ]
    },
    {
        order_name: 'Order 2',
        order_total: 1640,
        product: [
            { product_name: 'Blouse', quantity: 4, unit_price: 60 },
            { product_name: 'Skirt', quantity: 4, unit_price: 80 },
            { product_name: 'Ladies Shoes', quantity: 4, unit_price: 120 },
            { product_name: 'Bag', quantity: 4, unit_price: 125 }
        ]
    },
    {
        order_name: 'Order 3',
        order_total: 730,
        product: [
            { product_name: 'Blouse', quantity: 4, unit_price: 60 },
            { product_name: 'Skirt', quantity: 3, unit_price: 80 },
            { product_name: 'Bag', quantity: 2, unit_price: 125 }
        ]
    }
];

// Build orders
const orderElements = orders.map(order => {
    const orderCol = new cop.elements.ElementCollection();
    orderCol.add(new cop.elements.Property('order_name', order.order_name));
    orderCol.add(new cop.elements.Property('order_total', order.order_total));

    const orderProductElements = order.product.map(p =>
        cop.elements.ElementCollection.fromMapping(p)
    );

    orderCol.add(new ForEachInline('product', orderProductElements)); 
    return orderCol;
});

collection.add(new ForEachInline('orders', orderElements));

//print job
const server = new cop.config.Server(
    "http://localhost:8010/",
    new cop.config.ServerConfig("YOUR_API_KEY")
);

const printJob = new cop.PrintJob(
    collection,
    server,
    cop.Resource.fromLocalFile('C:/Users/em8ee/cloudofficeprint-javascript/BeginersGuide/UsingDistribute/data/template.docx')
);

(async () => {
    try {
        const response = await printJob.execute();
        await response.toFile('C:/Users/em8ee/cloudofficeprint-javascript/BeginersGuide/UsingDistribute/output/output');
    } catch (err) {
        console.error('Error:', err);
    }
})();
