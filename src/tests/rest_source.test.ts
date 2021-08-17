import { describe, test, expect } from '@jest/globals';
import * as cop from '../index';

describe('Tests for class RESTSource', () => {
    test('Test rest source rest', () => {
        const data = new cop.elements.RESTSourceREST(
            'endpoint_url',
            'GET',
            '',
            'output_file',
            [{ 'Content-Type': 'application/json' }],
            'username:password',
        );
        const dataExpected = {
            filename: 'output_file',
            datasource: 'rest',
            method: 'GET',
            body: '',
            endpoint: 'endpoint_url',
            headers: [{ 'Content-Type': 'application/json' }],
            auth: 'username:password',
        };
        expect(data.asDict()).toEqual(dataExpected);
    });
    test('Test rest source graphql', () => {
        const data = new cop.elements.RESTSourceGraphQL(
            'endpoint_url',
            'test_query',
            'output_file',
            [{ 'Content-Type': 'application/json' }],
            'username:password',
        );
        const dataExpected = {
            filename: 'output_file',
            datasource: 'graphql',
            query: 'test_query',
            endpoint: 'endpoint_url',
            headers: [{ 'Content-Type': 'application/json' }],
            auth: 'username:password',
        };
        expect(data.asDict()).toEqual(dataExpected);
    });
    test('Test rest source printjob', () => {
        const serv: cop.config.Server = new cop.config.Server(
            'https://api.cloudofficeprint.com/',
            new cop.config.ServerConfig('YOUR_API_KEY'),
        );
        const data = new cop.elements.RESTSourceREST(
            'endpoint_url',
            'GET',
            '',
            'output_file',
            [{ 'Content-Type': 'application/json' }],
            'username:password',
        );
        const pj = new cop.PrintJob(
            data,
            serv,
            cop.Resource.fromBase64('test_base64', 'docx'),
        );
        const pjExpected = {
            tool: 'javascript',
            javascript_sdk_version: cop.printjob.STATIC_OPTS.javascript_sdk_version,
            api_key: serv.config!.apiKey,
            output: {
                output_converter: 'libreoffice',
                output_encoding: 'raw',
                output_type: 'docx',
            },
            template: {
                template_type: 'docx',
                file: 'test_base64',
            },
            files: [
                {
                    filename: 'output_file',
                    datasource: 'rest',
                    method: 'GET',
                    body: '',
                    endpoint: 'endpoint_url',
                    headers: [{ 'Content-Type': 'application/json' }],
                    auth: 'username:password',
                },
            ],
        };
        expect(pj.asDict()).toEqual(pjExpected);
    });
});
