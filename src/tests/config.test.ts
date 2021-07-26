import { describe, test, expect } from '@jest/globals';
import * as aop from '../index';

describe('Test config', () => {
    test('Test route paths', async () => {
        const serv: aop.config.Server = new aop.config.Server('http://apexofficeprint.com/dev/');
        expect(await serv.isReachable()).toBeTruthy();
        expect(typeof await serv.getVersionSoffice()).toBe('string');
        expect(typeof await serv.getVersionOfficetopdf()).toBe('string');
        expect(typeof await serv.getSupportedTemplateMimetypes()).toBe('object');
        expect(typeof await serv.getSupportedOutputMimetypes('docx')).toBe('object');
        expect(typeof await serv.getSupportedPrependMimetypes()).toBe('object');
        expect(typeof await serv.getSupportedAppendMimetypes()).toBe('object');
        expect(typeof await serv.getVersionAop()).toBe('string');
    });
});
