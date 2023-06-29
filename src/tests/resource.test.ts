import { describe, test, expect } from '@jest/globals';
import * as fs from 'fs/promises';

import * as cop from '../index';

describe('Tests for class Resource', () => {
    test('Test resource raw', async () => {
        const localPath = './data/tests/template.docx';
        const data = await fs.readFile(localPath);
        const resource = cop.Resource.fromRaw(data, 'docx');
        const resourceExpected = {
            file: cop.ownUtils.rawToBase64(data),
            template_type: 'docx',
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });

    test('Test resource base64', () => {
        const resource = cop.Resource.fromBase64('dummy', 'docx');
        const resourceExpected = {
            file: 'dummy',
            template_type: 'docx',
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });

    test('Test resource local file', async () => {
        const localPath = './data/tests/template.docx';
        const data = await fs.readFile(localPath);
        const resource = cop.Resource.fromLocalFile(localPath);
        const resourceExpected = {
            file: cop.ownUtils.rawToBase64(data),
            template_type: 'docx',
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });

    test('Test resource server path', () => {
        const resource = cop.Resource.fromServerPath('dummy/path.docx');
        const resourceExpected = {
            filename: 'dummy/path.docx',
            template_type: 'docx',
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });

    test('Test resource url', () => {
        const resource = cop.Resource.fromUrl('dummy_url', 'docx');
        const resourceExpected = {
            template_type: 'docx',
            url: 'dummy_url',
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });

    test('Test resource html', () => {
        const htmlString = `
            <!DOCTYPE html>
            <html>
            <body>

            <h1>My First Heading</h1>
            <p>My first paragraph.</p>

            </body>
            </html> 
        `;
        const resource = cop.Resource.fromHtml(htmlString, true);
        const resourceExpected = {
            template_type: 'html',
            orientation: 'landscape',
            html_template_content: htmlString,
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });
});
