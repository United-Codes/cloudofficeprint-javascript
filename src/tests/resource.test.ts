import * as fs from 'fs';
import { describe, test, expect } from '@jest/globals';
import * as aop from '../index';

describe('Tests for class Resource', () => {
    test('Test resource base64', () => {
        const resource = aop.Resource.fromBase64('dummy', 'docx');
        const resourceExpected = {
            file: 'dummy',
            template_type: 'docx',
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });
    test('Test resource raw', async () => {
        const localPath = './data/tests/template.docx';
        await new Promise<void>((resolve) => fs.readFile(localPath, (err, data) => {
            if (err) throw err;
            const resource = aop.Resource.fromRaw(data, 'docx');
            const resourceExpected = {
                file: aop.ownUtils.rawToBase64(data),
                template_type: 'docx',
            };
            expect(resource.templateDict()).toEqual(resourceExpected);
            resolve();
        }));
    });
    test('Test resource local file', async () => {
        const localPath = './data/tests/template.docx';
        const resource = aop.Resource.fromLocalFile(localPath);
        await new Promise<void>((resolve) => fs.readFile(localPath, (err, data) => {
            if (err) throw err;
            const resourceExpected = {
                file: aop.ownUtils.rawToBase64(data),
                template_type: 'docx',
            };
            expect(resource.templateDict()).toEqual(resourceExpected);
            resolve();
        }));
    });
    test('Test resource server path', () => {
        const resource = aop.Resource.fromServerPath('dummy/path.docx');
        const resourceExpected = {
            filename: 'dummy/path.docx',
            template_type: 'docx',
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });
    test('Test resource url', () => {
        const resource = aop.Resource.fromUrl('dummy_url', 'docx');
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
        const resource = aop.Resource.fromHtml(htmlString, true);
        const resourceExpected = {
            template_type: 'html',
            orientation: 'landscape',
            html_template_content: htmlString,
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });
});
