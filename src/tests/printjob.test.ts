import { describe, test } from '@jest/globals';
import * as aop from '../index';

describe('Tests for class PrintJob', () => {
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
});
