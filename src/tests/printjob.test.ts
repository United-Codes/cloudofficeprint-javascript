import { describe, test, expect } from '@jest/globals';

import * as cop from '../index';

describe('Tests for class PrintJob', () => {
    test('Test all options for printjob', async () => {
        const server = new cop.config.Server(
            'https://api.cloudofficeprint.com/',
            new cop.config.ServerConfig('YOUR_API_KEY'),
        );

        const prependFile = cop.Resource.fromLocalFile(
            './data/tests/template.docx',
        );
        const appendFile = cop.Resource.fromLocalFile(
            './data/tests/template.docx',
        );
        const resource = cop.Resource.fromLocalFile(
            './data/tests/template.docx',
        );
        const template = new cop.Template(
            cop.Resource.fromLocalFile(
                './data/tests/template_prepend_append_subtemplate.docx',
            ),
        );

        const resourceBase64 = resource.data;
        const templateBase64 = template.resource.data;

        const data = new cop.elements.ElementCollection('data');

        const textTag = new cop.elements.Property('textTag1', 'test_text_tag1');
        data.add(textTag);

        const outputConf = new cop.config.OutputConfig('pdf');

        const printjob = new cop.PrintJob(
            data,
            server,
            template,
            outputConf,
            { sub1: resource, sub2: resource },
            [prependFile],
            [appendFile],
        );

        const printjobExpected = {
            api_key: server.config!.apiKey,
            append_files: [
                {
                    file_content: resourceBase64,
                    file_source: 'base64',
                    mime_type:
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
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
                    file_content: resourceBase64,
                    file_source: 'base64',
                    mime_type:
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                },
            ],
            template: {
                file: templateBase64,
                template_type: 'docx',
            },
            tool: 'javascript',
            templates: [
                {
                    file_content: resourceBase64,
                    file_source: 'base64',
                    mime_type:
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    name: 'sub1',
                },
                {
                    file_content: resourceBase64,
                    file_source: 'base64',
                    mime_type:
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    name: 'sub2',
                },
            ],
            javascript_sdk_version:
                cop.printjob.STATIC_OPTS.javascript_sdk_version,
        };

        expect(printjob.asDict()).toEqual(printjobExpected);

        // Commented out because you need an API key, but the saving to a file works as expected
        // await (await printjob.execute()).toFile('./data/tests/prepend_append_subtemplate_test');
    });

    // Works as expected, this test is skipped because an API key is needed
    // Remove '.skip' and enter a valid API key if you want to test this yourself
    test.skip('Test executeFullJson()', async () => {
        const API_KEY = 'YOUR_API_KEY';

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

        const response = await cop.PrintJob.executeFullJson(
            jsonData,
            new cop.config.Server(
                'https://api.cloudofficeprint.com/',
                new cop.config.ServerConfig(API_KEY),
            ),
        );
        await response.toFile('./output');
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

        const printjob = new cop.PrintJob(collection, server);
        await (await printjob.execute()).toFile('./output');
    });
});
