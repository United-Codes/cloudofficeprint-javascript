import { describe, test, expect } from '@jest/globals';
import * as fs from 'fs/promises';

import * as cop from '../index';

describe('Tests for class Template', () => {
    test('Test Template local file', async () => {
        const localPath = './data/tests/template.docx';
        const data = await fs.readFile(localPath);
        const resource = cop.Template.fromLocalFile(localPath);
        const resourceExpected = {
            file: cop.ownUtils.rawToBase64(data),
            template_type: 'docx',
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });

    test('Test Template delimiters', async () => {
        const localPath = './data/tests/template.docx';
        const data = await fs.readFile(localPath);
        const resource = cop.Template.fromLocalFile(localPath, '<', '>');
        const resourceExpected = {
            file: cop.ownUtils.rawToBase64(data),
            template_type: 'docx',
            start_delimiter: '<',
            end_delimiter: '>',
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });

    test('Test Template hashing', async () => {
        const localPath = './data/tests/template.docx';
        const data = await fs.readFile(localPath);
        const resource = cop.Template.fromLocalFile(localPath, '{', '}', true);
        const resourceExpected = {
            file: cop.ownUtils.rawToBase64(data),
            template_type: 'docx',
            should_hash: true,
            start_delimiter: '{',
            end_delimiter: '}',
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });

    test('Test Template updating hash', async () => {
        const localPath = './data/tests/template.docx';
        const resource = cop.Template.fromLocalFile(localPath, '{', '}', true);
        resource.updateHash('test_hash');
        const resourceExpected = {
            template_type: 'docx',
            template_hash: 'test_hash',
            start_delimiter: '{',
            end_delimiter: '}',
        };
        expect(resource.templateDict()).toEqual(resourceExpected);
    });
});
