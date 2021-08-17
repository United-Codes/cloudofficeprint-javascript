import { describe, test, expect } from '@jest/globals';
import * as cop from '../index';

describe('Test own_utils', () => {
    test('Test file_utils', () => {
        // Also tests rawToBase64
        expect(typeof cop.ownUtils.readFileAsBase64('README.md') === 'string').toBeTruthy();
    });
    test('Test type_utils', () => {
        expect(cop.ownUtils.pathToExtension('/path/to/file.docx')).toEqual('docx');
        expect(cop.ownUtils.extensionToMimetype('docx')).toEqual('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        expect(cop.ownUtils.mimetypeToExtension('application/vnd.openxmlformats-officedocument.wordprocessingml.document')).toEqual('docx');
    });
});
