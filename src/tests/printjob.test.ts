import { describe, test, expect } from '@jest/globals';
import * as cop from '../index';

describe('Tests for class PrintJob', () => {
    test('Test all options for printjob', async () => {
        const serv: cop.config.Server = new cop.config.Server(
            'https://api.cloudofficeprint.com/',
            new cop.config.ServerConfig('YOUR_API_KEY'),
        );
        const prependFile = cop.Resource.fromLocalFile('./data/tests/template.docx');

        const template = cop.Resource.fromLocalFile('./data/tests/template.docx');
        const templateMain = cop.Resource.fromLocalFile('./data/tests/template_prepend_append_subtemplate.docx');
        const templateBase64 = template.data;
        const templateMainBase64 = templateMain.data;

        const data = new cop.elements.ElementCollection('data');
        const textTag = new cop.elements.Property('textTag1', 'test_text_tag1');
        data.add(textTag);

        const appendFile = cop.Resource.fromLocalFile('./data/tests/template.docx');

        const subtemplates = {
            sub1: template,
            sub2: template,
        };

        const outputConf = new cop.config.OutputConfig('pdf');

        const global = new cop.config.Globalization("DD-MON-YYYY", "DD-MON-YYYY HH24:MI", "DD-MON-YYYY", "DD-MON-YYYY", "BINARY", "BINARY", ".,", "$", "AMERICA", "AMERICAN", "ltr", "en");

        const printjob = new cop.PrintJob(
            data,
            serv,
            templateMain,
            outputConf,
            subtemplates,
            [prependFile],
            [appendFile],
            global,
        );
        const printjobExpected = {
            append_files: [
                {
                    file_content: templateBase64,
                    file_source: 'base64',
                    mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                },
            ],
            files: [
                {
                    data: {
                        textTag1: 'test_text_tag1',
                    },
                },
            ],
            output: {
                output_converter: 'libreoffice',
                output_encoding: 'raw',
                output_type: 'pdf',
            },
            prepend_files: [
                {
                    file_content: templateBase64,
                    file_source: 'base64',
                    mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                },
            ],
            template: {
                file: templateMainBase64,
                template_type: 'docx',
            },
            tool: 'javascript',
            templates: [
                {
                    file_content: templateBase64,
                    file_source: 'base64',
                    mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    name: 'sub1',
                },
                {
                    file_content: templateBase64,
                    file_source: 'base64',
                    mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    name: 'sub2',
                },
            ],
            globalization: [
                {
                    "date_format": "DD-MON-YYYY",
                    "date_time_format": "DD-MON-YYYY HH24:MI",
                    "timestamp_format": "DD-MON-YYYY",
                    "timestamp_tz_format": "DD-MON-YYYY",
                    "nls_sort": "BINARY",
                    "nls_comp": "BINARY",
                    "nls_numeric_characters_dec_grp": ".,",
                    "nls_currency": "$",
                    "nls_territory": "AMERICA",
                    "nls_language": "AMERICAN",
                    "direction": "ltr",
                    "application_primary_language": "en"
                }
            ],
            javascript_sdk_version: cop.printjob.STATIC_OPTS.javascript_sdk_version,
        };
        expect(printjob.asDict()).toEqual(printjobExpected);
        // Commented out because you need an API key, but the saving to a file works as expected
        // await (await printjob.execute()).toFile('./data/tests/prepend_append_subtemplate_test');
    });
    // Works as expected, this test is skipped because an API key is needed
    // Remove '.skip' and enter a valid API key if you want to test this yourself
    test.skip('Test executeFullJson()', async () => {
        const jsonData = {
            aop_remote_debug: 'No',
            version: '3.0',
            tool: 'webeditor-new',
            prepend_files: [],
            append_files: [],
            template: null,
            output: {
                output_type: 'docx',
                output_encoding: 'raw',
            },
            files: [
                {
                    name: 'file1',
                    data: {},
                },
            ],
            templates: [],
        };
        await (await cop.PrintJob.executeFullJson(
            jsonData,
            new cop.config.Server(
                'https://api.cloudofficeprint.com/',
                new cop.config.ServerConfig(
                    'YOUR_API_KEY', // Replace by your own API key
                ),
            ),
        )).toFile('./output');
    });
    // Works as expected, this test is skipped because an API key is needed
    // Remove '.skip' and enter a valid API key if you want to test this yourself
    test.skip('Test without template', async () => {
        const collection = new cop.elements.ElementCollection();
        collection.add(new cop.elements.Property('test_property', 'value'));
        collection.add(
            cop.elements.Image.fromUrl(
                'test_image',
                'https://www.unitedcodes.com/assets/dist/images/logo-united-codes.svg',
            ),
        );
        const server = new cop.config.Server(
            'https://api.cloudofficeprint.com/',
            new cop.config.ServerConfig('YOUR_API_KEY'), // Replace by your own API key
        );
        const printjob = new cop.PrintJob(
            collection,
            server,
        );
        await (await printjob.execute()).toFile('./output');
    });
});
