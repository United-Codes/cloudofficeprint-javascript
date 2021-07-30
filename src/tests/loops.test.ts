import { describe, test, expect } from '@jest/globals';
import * as aop from '../index';

describe('Test for loops', () => {
    test(`Test ForEach, also serves as the tests for Labels, ForEachSlide,
    ForEachInline, ForEachHorizontal and ForEachTableRow.`, () => {
        const element1 = aop.elements.ElementCollection.fromMapping(
            {
                a: 1,
                b: 2,
                c: 3,
            },
        );
        const element2 = aop.elements.ElementCollection.fromMapping(
            {
                a: 4,
                b: 5,
                c: 6,
            },
        );
        const loop = new aop.elements.ForEach(
            'loop_name',
            [element1, element2],
        );
        const loopExpected = {
            loop_name: [
                {
                    a: 1,
                    b: 2,
                    c: 3,
                },
                {
                    a: 4,
                    b: 5,
                    c: 6,
                },
            ],
        };
        expect(loop.asDict()).toEqual(loopExpected);
    });
    test('Test ForEachSheet', () => {
        let element1 = aop.elements.ElementCollection.fromMapping(
            {
                sheet_name: 'John Dulles',
                sheet_dynamic_print_area: true,
                cust_first_name: 'John',
                cust_last_name: 'Dulles',
                cust_city: 'Sterling',
                orders: [
                    {
                        order_total: 2380,
                        order_name: 'Order 1',
                        product: [
                            {
                                product_name: 'Business Shirt',
                                quantity: 3,
                                unit_price: 50,
                            },
                            {
                                product_name: 'Trousers',
                                quantity: 3,
                                unit_price: 80,
                            },
                            {
                                product_name: 'Jacket',
                                quantity: 3,
                                unit_price: 150,
                            },
                        ],
                    },
                ],
            },
        );
        let element2 = aop.elements.ElementCollection.fromMapping(
            {
                sheet_name: 'William Hartsfield',
                cust_first_name: 'William',
                cust_last_name: 'Hartsfield',
                cust_city: 'Atlanta',
                orders: [
                    {
                        order_total: 1640,
                        order_name: 'Order 1',
                        product: [
                            {
                                product_name: 'Blouse',
                                quantity: 4,
                                unit_price: 60,
                            },
                            {
                                product_name: 'Skirt',
                                quantity: 4,
                                unit_price: 80,
                            },
                        ],
                    },
                    {
                        order_total: 730,
                        order_name: 'Order 2',
                        product: [
                            {
                                product_name: 'Blouse',
                                quantity: 4,
                                unit_price: 60,
                            },
                        ],
                    },
                ],
            },
        );
        const loop1 = new aop.elements.ForEachSheet(
            'customers',
            [element1, element2],
        );

        element1 = aop.elements.ElementCollection.fromMapping(
            {
                sheet_dynamic_print_area: true,
                cust_first_name: 'John',
                cust_last_name: 'Dulles',
                cust_city: 'Sterling',
                orders: [
                    {
                        order_total: 2380,
                        order_name: 'Order 1',
                        product: [
                            {
                                product_name: 'Business Shirt',
                                quantity: 3,
                                unit_price: 50,
                            },
                            {
                                product_name: 'Trousers',
                                quantity: 3,
                                unit_price: 80,
                            },
                            {
                                product_name: 'Jacket',
                                quantity: 3,
                                unit_price: 150,
                            },
                        ],
                    },
                ],
            },
        );
        element2 = aop.elements.ElementCollection.fromMapping(
            {
                cust_first_name: 'William',
                cust_last_name: 'Hartsfield',
                cust_city: 'Atlanta',
                orders: [
                    {
                        order_total: 1640,
                        order_name: 'Order 1',
                        product: [
                            {
                                product_name: 'Blouse',
                                quantity: 4,
                                unit_price: 60,
                            },
                            {
                                product_name: 'Skirt',
                                quantity: 4,
                                unit_price: 80,
                            },
                        ],
                    },
                    {
                        order_total: 730,
                        order_name: 'Order 2',
                        product: [
                            {
                                product_name: 'Blouse',
                                quantity: 4,
                                unit_price: 60,
                            },
                        ],
                    },
                ],
            },
        );
        const loop2 = new aop.elements.ForEachSheet(
            'customers',

            {
                'John Dulles': element1,
                'William Hartsfield': element2,
            },
        );

        const loopExpected = {
            customers: [
                {
                    sheet_name: 'John Dulles',
                    sheet_dynamic_print_area: true,
                    cust_first_name: 'John',
                    cust_last_name: 'Dulles',
                    cust_city: 'Sterling',
                    orders: [
                        {
                            order_total: 2380,
                            order_name: 'Order 1',
                            product: [
                                {
                                    product_name: 'Business Shirt',
                                    quantity: 3,
                                    unit_price: 50,
                                },
                                {
                                    product_name: 'Trousers',
                                    quantity: 3,
                                    unit_price: 80,
                                },
                                {
                                    product_name: 'Jacket',
                                    quantity: 3,
                                    unit_price: 150,
                                },
                            ],
                        },
                    ],
                },
                {
                    sheet_name: 'William Hartsfield',
                    cust_first_name: 'William',
                    cust_last_name: 'Hartsfield',
                    cust_city: 'Atlanta',
                    orders: [
                        {
                            order_total: 1640,
                            order_name: 'Order 1',
                            product: [
                                {
                                    product_name: 'Blouse',
                                    quantity: 4,
                                    unit_price: 60,
                                },
                                {
                                    product_name: 'Skirt',
                                    quantity: 4,
                                    unit_price: 80,
                                },
                            ],
                        },
                        {
                            order_total: 730,
                            order_name: 'Order 2',
                            product: [
                                {
                                    product_name: 'Blouse',
                                    quantity: 4,
                                    unit_price: 60,
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        expect(loop1.asDict()).toEqual(loopExpected);
        expect(loop2.asDict()).toEqual(loopExpected);
    });
});
