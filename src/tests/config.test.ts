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
    test('Test PDFOptions', () => {
        const pdfOpts = new aop.config.PDFOptions(
            'test_pw',
            'test_watermark',
            500,
            500,
            true,
            false,
            'test_modify_password',
            0,
            true,
            3,
            5,
            false,
            'test_page_format',
            false,
            'test_sign_certificate',
            true,
            true,
        );
        pdfOpts.setPageMarginAt(6, 'top');
        const conf = new aop.config.OutputConfig('pdf', undefined, undefined, undefined, undefined, pdfOpts);
        const confExpected = {
            output_type: 'pdf',
            output_encoding: 'raw',
            output_converter: 'libreoffice',
            output_read_password: 'test_pw',
            output_watermark: 'test_watermark',
            output_page_width: 500,
            output_page_height: 500,
            output_even_page: true,
            output_merge_making_even: false,
            output_modify_password: 'test_modify_password',
            output_password_protection_flag: 0,
            lock_form: true,
            output_copies: 3,
            page_margin: {
                top: 6,
                bottom: 5,
                left: 5,
                right: 5,
            },
            page_orientation: 'portrait',
            output_page_format: 'test_page_format',
            output_merge: false,
            output_sign_certificate: 'test_sign_certificate',
            identify_form_fields: true,
            output_split: true,
        };
        expect(conf.asDict()).toEqual(confExpected);
    });
});
