import { describe, test, expect } from '@jest/globals';

import * as cop from '../index';

describe('Tests for class PrintJob', () => {
    test('Test all options for PrintJob', async () => {
        const SERVER_URL = 'https://api.cloudofficeprint.com/';
        const API_KEY = 'YOUR_API_KEY';

        const server = new cop.config.Server(
            SERVER_URL,
            new cop.config.ServerConfig(API_KEY),
        );

        const resource = cop.Resource.fromLocalFile(
            './data/tests/template.docx',
        );
        const template = cop.Template.fromLocalFile(
            './data/tests/template_prepend_append_subtemplate.docx',
        );

        const resourceBase64 = resource.data;
        const templateBase64 = template.resource.data;

        const data = new cop.elements.ElementCollection('data');
        data.add(new cop.elements.Property('textTag1', 'test_text_tag1'));

        const outputConf = new cop.config.OutputConfig('pdf');

        const printjob = new cop.PrintJob(
            data,
            server,
            template,
            outputConf,
            { sub1: resource, sub2: resource },
            [resource],
            [resource],
        );

        const printjobExpected = {
            // api_key: server.config!.apiKey,
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

    test('Test Template hashing for PrintJob', async () => {
        const SERVER_URL = 'https://api.cloudofficeprint.com/';
        const API_KEY = 'YOUR_API_KEY';

        const server = new cop.config.Server(
            SERVER_URL,
            new cop.config.ServerConfig(API_KEY),
        );

        const template = cop.Template.fromLocalFile(
            './data/tests/template.docx',
            undefined,
            undefined,
            true,
        );

        const templateBase64 = template.resource.data;

        const data = new cop.elements.ElementCollection('data');
        data.add(new cop.elements.Property('textTag1', 'test_text_tag1'));

        const printjob = new cop.PrintJob(data, server, template);

        const printjobExpected1 = {
            // api_key: server.config!.apiKey,
            files: [{ data: { textTag1: 'test_text_tag1' } }],
            output: {
                output_converter: 'libreoffice',
                output_encoding: 'raw',
                output_type: 'docx',
            },
            template: {
                file: templateBase64,
                template_type: 'docx',
                should_hash: true,
            },
            tool: 'javascript',
            javascript_sdk_version:
                cop.printjob.STATIC_OPTS.javascript_sdk_version,
        };

        expect(printjob.asDict()).toEqual(printjobExpected1);

        template.updateHash('test_hash');

        const printjobExpected2 = {
            // api_key: server.config!.apiKey,
            files: [{ data: { textTag1: 'test_text_tag1' } }],
            output: {
                output_converter: 'libreoffice',
                output_encoding: 'raw',
                output_type: 'docx',
            },
            template: {
                template_type: 'docx',
                template_hash: 'test_hash',
            },
            tool: 'javascript',
            javascript_sdk_version:
                cop.printjob.STATIC_OPTS.javascript_sdk_version,
        };

        expect(printjob.asDict()).toEqual(printjobExpected2);
    });

    // Works as expected, this test is skipped because an API key is needed
    // Remove '.skip' and enter a valid API key if you want to test this yourself
    test.skip('Test executeFullJson()', async () => {
        const SERVER_URL = 'https://api.cloudofficeprint.com/';
        const API_KEY = 'YOUR_API_KEY';

        const server = new cop.config.Server(
            SERVER_URL,
            new cop.config.ServerConfig(API_KEY),
        );

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

        const response = await cop.PrintJob.executeFullJson(jsonData, server);
        await response.toFile('./output');
    });

    // Works as expected, this test is skipped because an API key is needed
    // Remove '.skip' and enter a valid API key if you want to test this yourself
    test.skip('Test without template', async () => {
        const SERVER_URL = 'https://api.cloudofficeprint.com/';
        const API_KEY = 'YOUR_API_KEY';

        const server = new cop.config.Server(
            SERVER_URL,
            new cop.config.ServerConfig(API_KEY),
        );

        const data = new cop.elements.ElementCollection();
        data.add(new cop.elements.Property('test_property', 'value'));
        data.add(
            cop.elements.Image.fromUrl(
                'test_image',
                'https://www.unitedcodes.com/assets/dist/images/logo-united-codes.svg',
            ),
        );

        const printjob = new cop.PrintJob(data, server);

        const response = await printjob.execute();
        await response.toFile('./output');
    });
});
