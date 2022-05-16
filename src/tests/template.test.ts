import * as fs from 'fs';
import { describe, test, expect } from '@jest/globals';
import * as cop from '../index';

describe('Tests for class Template', () => {
    test('Test template base64', () => {
        const template = cop.Template.fromBase64('dummy', 'docx');
        const templateExpected = {
            file: 'dummy',
            template_type: 'docx',
        };
        expect(template.templateDict()).toEqual(templateExpected);
    });
    test('Test template raw', async () => {
        const localPath = './data/tests/template.docx';
        await new Promise<void>((resolve) => fs.readFile(localPath, (err, data) => {
            if (err) throw err;
            const template = cop.Template.fromRaw(data, 'docx');
            const templateExpected = {
                file: cop.ownUtils.rawToBase64(data),
                template_type: 'docx',
            };
            expect(template.templateDict()).toEqual(templateExpected);
            resolve();
        }));
    });
    test('Test template local file', async () => {
        const localPath = './data/tests/template.docx';
        const template = cop.Template.fromLocalFile(localPath);
        await new Promise<void>((resolve) => fs.readFile(localPath, (err, data) => {
            if (err) throw err;
            const templateExpected = {
                file: cop.ownUtils.rawToBase64(data),
                template_type: 'docx',
            };
            expect(template.templateDict()).toEqual(templateExpected);
            resolve();
        }));
    });
    test('Test template server path', () => {
        const template = cop.Template.fromServerPath('dummy/path.docx');
        const templateExpected = {
            filename: 'dummy/path.docx',
            template_type: 'docx',
        };
        expect(template.templateDict()).toEqual(templateExpected);
    });
    test('Test template url', () => {
        const template = cop.Template.fromUrl('dummy_url', 'docx');
        const templateExpected = {
            template_type: 'docx',
            url: 'dummy_url',
        };
        expect(template.templateDict()).toEqual(templateExpected);
    });
    test('Test template html', () => {
        const htmlString = `
            <!DOCTYPE html>
            <html>
            <body>

            <h1>My First Heading</h1>
            <p>My first paragraph.</p>

            </body>
            </html> 
        `;
        const template = cop.Template.fromHtml(htmlString, true);
        const templateExpected = {
            template_type: 'html',
            orientation: 'landscape',
            html_template_content: htmlString,
        };
        expect(template.templateDict()).toEqual(templateExpected);
    });
});
