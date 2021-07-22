import { describe, test, expect } from '@jest/globals';
import * as aop from '../index';

describe('Test own_utils', () => {
    test('Test file_utils', () => {
        // Also tests bufferToBase64
        expect(typeof aop.ownUtils.readFileAsBase64('README.md') === 'string').toBeTruthy();
    });
    test('Test type_utils', () => {
        expect(aop.ownUtils.pathToExtension('/path/to/file.docx')).toEqual('docx');
        expect(aop.ownUtils.extensionToMimetype('docx')).toEqual('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        expect(aop.ownUtils.mimetypeToExtension('application/vnd.openxmlformats-officedocument.wordprocessingml.document')).toEqual('docx');
    });
});
