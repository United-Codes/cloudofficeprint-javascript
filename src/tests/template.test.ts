import { describe, test, expect } from '@jest/globals';
import * as fs from 'fs/promises';

import * as cop from '../index';

describe('Tests for class Template', () => {
    test('Test Template base64', () => {
        const template = cop.Template.fromBase64('dummy', 'docx');
        const templateExpected = {
            file: 'dummy',
            template_type: 'docx',
        };
        expect(template.templateDict()).toEqual(templateExpected);
    });

    test('Test Template local file', async () => {
        const localPath = './data/tests/template.docx';
        const data = await fs.readFile(localPath);
        const template = cop.Template.fromLocalFile(localPath);
        const templateExpected = {
            file: cop.ownUtils.rawToBase64(data),
            template_type: 'docx',
        };
        expect(template.templateDict()).toEqual(templateExpected);
    });

    test('Test Template delimiters', async () => {
        const template = cop.Template.fromBase64('dummy', 'docx', '<', '>');
        const templateExpected = {
            file: 'dummy',
            template_type: 'docx',
            start_delimiter: '<',
            end_delimiter: '>',
        };
        expect(template.templateDict()).toEqual(templateExpected);
    });

    test('Test Template hashing', async () => {
        const template = cop.Template.fromBase64(
            'dummy',
            'docx',
            '{',
            '}',
            true,
        );
        const templateExpected = {
            file: 'dummy',
            template_type: 'docx',
            should_hash: true,
            start_delimiter: '{',
            end_delimiter: '}',
        };
        expect(template.templateDict()).toEqual(templateExpected);
    });

    test('Test Template with hash', async () => {
        const template = cop.Template.fromBase64(
            'dummy',
            'docx',
            '{',
            '}',
            false,
            'test_hash',
        );
        const templateExpected = {
            template_type: 'docx',
            template_hash: 'test_hash',
            start_delimiter: '{',
            end_delimiter: '}',
        };
        expect(template.templateDict()).toEqual(templateExpected);
    });

    test('Test Template updating hash', async () => {
        const template = cop.Template.fromBase64(
            'dummy',
            'docx',
            '{',
            '}',
            true,
        );
        template.updateHash('test_hash');
        const templateExpected = {
            template_type: 'docx',
            template_hash: 'test_hash',
            start_delimiter: '{',
            end_delimiter: '}',
        };
        expect(template.templateDict()).toEqual(templateExpected);
    });

    test('Test Template resetting hash', async () => {
        const template = cop.Template.fromBase64(
            'dummy',
            'docx',
            '{',
            '}',
            false,
            'test_hash',
        );
        template.resetHash(true);
        const templateExpected = {
            file: 'dummy',
            template_type: 'docx',
            should_hash: true,
            start_delimiter: '{',
            end_delimiter: '}',
        };
        expect(template.templateDict()).toEqual(templateExpected);
    });
});
