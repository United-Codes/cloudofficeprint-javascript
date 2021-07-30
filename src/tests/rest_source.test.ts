import { describe, test, expect } from '@jest/globals';
import * as aop from '../index';

describe('Tests for class RESTSource', () => {
    test('Test rest source rest', () => {
        const data = new aop.elements.RESTSourceREST(
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
        const data = new aop.elements.RESTSourceGraphQL(
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
        const serv: aop.config.Server = new aop.config.Server(
            'https://api.apexofficeprint.com/',
            new aop.config.ServerConfig('YOUR_API_KEY'),
        );
        const data = new aop.elements.RESTSourceREST(
            'endpoint_url',
            'GET',
            '',
            'output_file',
            [{ 'Content-Type': 'application/json' }],
            'username:password',
        );
        const pj = new aop.PrintJob(
            aop.Resource.fromBase64('test_base64', 'docx'),
            data,
            serv,
        );
        const pjExpected = {
            tool: 'javascript',
            javascript_sdk_version: aop.printjob.STATIC_OPTS.javascript_sdk_version,
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
