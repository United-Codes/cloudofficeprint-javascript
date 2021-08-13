import { describe, test, expect } from '@jest/globals';
import * as aop from '../index';

describe('Tests for class PrintJob', () => {
    test('Test all options for printjob', async () => {
        const serv: aop.config.Server = new aop.config.Server(
            'https://api.apexofficeprint.com/',
            new aop.config.ServerConfig('YOUR_API_KEY'),
        );
        const prependFile = aop.Resource.fromLocalFile('./data/tests/template.docx');

        const template = aop.Resource.fromLocalFile('./data/tests/template.docx');
        const templateMain = aop.Resource.fromLocalFile('./data/tests/template_prepend_append_subtemplate.docx');
        const templateBase64 = template.data;
        const templateMainBase64 = templateMain.data;

        const data = new aop.elements.ElementCollection('data');
        const textTag = new aop.elements.Property('textTag1', 'test_text_tag1');
        data.add(textTag);

        const appendFile = aop.Resource.fromLocalFile('./data/tests/template.docx');

        const subtemplates = {
            sub1: template,
            sub2: template,
        };

        const outputConf = new aop.config.OutputConfig('pdf');

        const printjob = new aop.PrintJob(
            data,
            serv,
            templateMain,
            outputConf,
            subtemplates,
            [prependFile],
            [appendFile],
        );
        const printjobExpected = {
            api_key: serv.config!.apiKey,
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
            javascript_sdk_version: aop.printjob.STATIC_OPTS.javascript_sdk_version,
        };
        expect(printjob.asDict()).toEqual(printjobExpected);
        // Commented out because you need an API key, but the saving to a file works as expected
        // (await printjob.execute()).toFile('./data/tests/prepend_append_subtemplate_test');
    });
    // Works as expected, this test is skipped because an API key is needed
    // Remove '.skip' and enter a valid API key if you want to test this yourself
    test.skip('Test executeFullJson()', async () => {
        const jsonData = {
            aop_remote_debug: 'No',
            apex_version: 'web editor 2',
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
        (await aop.PrintJob.executeFullJson(
            jsonData,
            new aop.config.Server(
                'https://api.apexofficeprint.com/',
                new aop.config.ServerConfig(
                    'YOUR_API_KEY', // Replace by your own API key
                ),
            ),
        )).toFile('./output');
    });
    // Works as expected, this test is skipped because an API key is needed
    // Remove '.skip' and enter a valid API key if you want to test this yourself
    test.skip('Test without template', async () => {
        const collection = new aop.elements.ElementCollection();
        collection.add(new aop.elements.Property('test_property', 'value'));
        collection.add(
            aop.elements.Image.fromUrl(
                'test_image',
                'https://apexofficeprint.com/assets/dist/images/office-print/logo-office-print.svg',
            ),
        );
        const server = new aop.config.Server(
            'https://api.apexofficeprint.com/',
            new aop.config.ServerConfig('YOUR_API_KEY'), // Replace by your own API key
        );
        const printjob = new aop.PrintJob(
            collection,
            server,
        );
        (await printjob.execute()).toFile('./output');
    });
});
