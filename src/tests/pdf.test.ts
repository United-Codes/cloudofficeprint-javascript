import { describe, test, expect } from '@jest/globals';
import * as cop from '../index';

describe('Tests for pdf elements', () => {
    test('Test cop_pdf_texts element', () => {
        const pdfText11 = new cop.elements.PDFText(
            'test1_1',
            50,
            60,
            3,
            45,
            false,
            true,
            'Arial',
            'blue',
            12,
        );
        const pdfText12 = new cop.elements.PDFText(
            'test1_2',
            20,
            30,
            3,
            45,
            false,
            false,
            'Arial',
            'red',
            10,
        );
        const pdfText2 = new cop.elements.PDFText(
            'test2',
            60,
            70,
            5,
            30,
            true,
            true,
            'Times new roman',
            '#FF00FF',
            15,
        );
        const pdfTextAll = new cop.elements.PDFText(
            'test_all',
            20,
            30,
            undefined,
            15,
            true,
            false,
            'Arial',
            'red',
            20,
        );
        const pdfTexts = new cop.elements.PDFTexts(
            [pdfText11, pdfText12, pdfText2, pdfTextAll],
        );
        const pdfTextsExpected = {
            AOP_PDF_TEXTS: [
                {
                    3: [
                        {
                            text: 'test1_1',
                            x: 50,
                            y: 60,
                            rotation: 45,
                            bold: false,
                            italic: true,
                            font: 'Arial',
                            font_color: 'blue',
                            font_size: 12,
                        },
                        {
                            text: 'test1_2',
                            x: 20,
                            y: 30,
                            rotation: 45,
                            bold: false,
                            italic: false,
                            font: 'Arial',
                            font_color: 'red',
                            font_size: 10,
                        },
                    ],
                    5: [
                        {
                            text: 'test2',
                            x: 60,
                            y: 70,
                            rotation: 30,
                            bold: true,
                            italic: true,
                            font: 'Times new roman',
                            font_color: '#FF00FF',
                            font_size: 15,
                        },
                    ],
                    all: [
                        {
                            text: 'test_all',
                            x: 20,
                            y: 30,
                            rotation: 15,
                            bold: true,
                            italic: false,
                            font: 'Arial',
                            font_color: 'red',
                            font_size: 20,
                        },
                    ],
                },
            ],
        };
        expect(pdfTexts.asDict()).toEqual(pdfTextsExpected);
    });
    test('Test cop_pdf_images element', () => {
        const pdfImage11 = new cop.elements.PDFImage(
            'test1_1',
            50,
            60,
            3,
            45,
            50,
            50,
            100,
        );
        const pdfImage12 = new cop.elements.PDFImage(
            'test1_2',
            60,
            70,
            3,
            30,
            75,
            75,
            75,
        );
        const pdfImage2 = new cop.elements.PDFImage(
            'test2',
            20,
            30,
            5,
            15,
            100,
            100,
            100,
        );
        const pdfImageAll = new cop.elements.PDFImage(
            'test_all',
            25,
            26,
            undefined,
            45,
            20,
            20,
            50,
        );
        const pdfImages = new cop.elements.PDFImages(
            [pdfImage11, pdfImage12, pdfImage2, pdfImageAll],
        );
        const pdfImagesExpected = {
            AOP_PDF_IMAGES: [
                {
                    3: [
                        {
                            image: 'test1_1',
                            x: 50,
                            y: 60,
                            rotation: 45,
                            image_width: 50,
                            image_height: 50,
                            image_max_width: 100,
                        },
                        {
                            image: 'test1_2',
                            x: 60,
                            y: 70,
                            rotation: 30,
                            image_width: 75,
                            image_height: 75,
                            image_max_width: 75,
                        },
                    ],
                    5: [
                        {
                            image: 'test2',
                            x: 20,
                            y: 30,
                            rotation: 15,
                            image_width: 100,
                            image_height: 100,
                            image_max_width: 100,
                        },
                    ],
                    all: [
                        {
                            image: 'test_all',
                            x: 25,
                            y: 26,
                            rotation: 45,
                            image_width: 20,
                            image_height: 20,
                            image_max_width: 50,
                        },
                    ],
                },
            ],
        };
        expect(pdfImages.asDict()).toEqual(pdfImagesExpected);
    });
    test('Test cop_pdf_forms element', () => {
        const form = new cop.elements.PDFFormData(
            {
                f_1: 5,
                f_2: 'test',
                r_1: true,
                r_2: false,
            },
        );
        const formExpected = {
            aop_pdf_form_data: {
                f_1: 5,
                f_2: 'test',
                r_1: true,
                r_2: false,
            },
        };
        expect(form.asDict()).toEqual(formExpected);
    });
    test('Test pdf textbox form element', () => {
        const textbox = new cop.elements.PDFFormTextBox("first_name", "John", 100, 20);
        const textboxExpected = {
            "first_name": {
                "type": "text",
                "name": "first_name",
                "width": 100,
                "height": 20,
                "value": "John",
            }
        };
        expect(textbox.asDict()).toEqual(textboxExpected);
    });
    test('Test pdf checkbox form element', () => {
        const checkbox = new cop.elements.PDFFormCheckBox("CHECKBOX", true, "Check?", 50, 51);
        const checkboxExpected = {
            "CHECKBOX": {
                "type": "checkbox",
                "name": "CHECKBOX",
                "width": 50,
                "height": 51,
                "value": true,
                "text": "Check?",
            }
        };
        expect(checkbox.asDict()).toEqual(checkboxExpected);
    });
    test('Test pdf radio button form element', () => {
        const radiobutton = new cop.elements.PDFFormRadioButton("RADIO_BUTTON", "RadioList", "1", "Option 1", true, 25, 26);
        const radiobuttonExpected = {
            "RADIO_BUTTON": {
                "type": "radio",
                "name": "RadioList",
                "width": 25,
                "height": 26,
                "value": "1",
                "text": "Option 1",
                "selected": true,
            }
        };
        expect(radiobutton.asDict()).toEqual(radiobuttonExpected);
    });
    test('Test pdf unsigned signature field element', () => {
        const signature = new cop.elements.PDFFormSignatureUnsigned("field1", 100, 50);
        const signatureExpected = {
            "field1": {
                "type": "signaturefieldunsigned",
                "name": "field1",
                "width": 100,
                "height": 50,
            }
        };
        expect(signature.asDict()).toEqual(signatureExpected);
    });
    test('Test pdf signed signature field element', () => {
        const signature = new cop.elements.PDFFormSignatureSigned("field2", "base64 encoded certificate", "certificate password", "md", "base64 encoded image", 50 , 100);
        const signatureExpected = {
            "field2": {
                "type": "signaturefieldsigned",
                "name": "field2",
                "width": 50,
                "height": 100,
                "size": "md",
                "value": "base64 encoded certificate",
                "background_image": "base64 encoded image",
                "password": "certificate password",
            }
        };
        expect(signature.asDict()).toEqual(signatureExpected);
    });
});
