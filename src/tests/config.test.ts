import { describe, test, expect } from '@jest/globals';

import * as cop from '../index';

describe('Tests for config', () => {
    test('Test PDFOptions', () => {
        const pdfOpts = new cop.config.PDFOptions(
            true, // evenPage
            false, // mergeMakingEven
            false, // removeLastPage
            'test_modify_password', // modifyPassword
            'test_pw', // readPassword
            0, // passwordProtectionFlag
            'test_watermark', // watermark
            'black', // watermarkColor
            'Arial', // watermarkFont
            50, // watermarkOpacity
            32, // watermarkSize
            true, // lockForm
            3, // copies
            5, // pageMargin
            false, // landscape
            500, // pageWidth
            500, // pageHeight
            'test_page_format', // pageFormat
            false, // merge
            true, // split
            true, // identifyFormFields
            'test_sign_certificate', // signCertificate
            'test_certificate_password', // signCertificatePassword
        );
        pdfOpts.setWatermark('new_watermark', 'grey', 'Arial', 51, 32);
        pdfOpts.setPageMarginAt(6, 'top');
        pdfOpts.setPageOrientation('portrait');
        const conf = new cop.config.OutputConfig(
            'pdf',
            undefined,
            undefined,
            undefined,
            undefined,
            pdfOpts,
        );
        const confExpected = {
            output_even_page: true,
            output_merge_making_even: false,
            output_remove_last_page: false,
            output_modify_password: 'test_modify_password',
            output_read_password: 'test_pw',
            output_password_protection_flag: 0,
            output_watermark: 'new_watermark',
            output_watermark_color: 'grey',
            output_watermark_font: 'Arial',
            output_watermark_opacity: 51,
            output_watermark_size: 32,
            output_type: 'pdf',
            output_encoding: 'raw',
            output_converter: 'libreoffice',
            output_page_width: 500,
            output_page_height: 500,
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
            output_sign_certificate_password: 'test_certificate_password',
            identify_form_fields: true,
            output_split: true,
        };
        expect(conf.asDict()).toEqual(confExpected);
    });
    test('Test CsvOptions', () => {
        const csvOptions = new cop.config.CsvOptions(
            'textDelim',
            'fieldSep',
            5,
        );
        const csvOptionsExpected = {
            output_text_delimiter: 'textDelim',
            output_field_separator: 'fieldSep',
            output_character_set: 5,
        };
        expect(csvOptions.asDict()).toEqual(csvOptionsExpected);
    });
    test('Test printer', () => {
        const printer = new cop.config.Printer(
            'location',
            'version',
            'requester',
            'job_name',
        );
        const printerExpected = {
            location: 'location',
            version: 'version',
            requester: 'requester',
            job_name: 'job_name',
        };
        expect(printer.asDict()).toEqual(printerExpected);
    });
    test('Test cloud access for output file: OAuthToken, AWSToken, FTPToken and SFTPToken', () => {
        // OAuthToken
        const oAuthToken = cop.config.CloudAccessToken.fromOAuth(
            'dropbox',
            'dummy_token',
        );
        const oAuthTokenExpected = {
            output_location: 'dropbox',
            cloud_access_token: 'dummy_token',
        };
        expect(oAuthToken.asDict()).toEqual(oAuthTokenExpected);

        // AWSToken
        const awsToken = cop.config.CloudAccessToken.fromAWS(
            'AWS_access_key_id',
            'AWS_secter_access_key',
        );
        const awsTokenExpected = {
            output_location: 'aws_s3',
            cloud_access_token: {
                access_key: 'AWS_access_key_id',
                secret_access_key: 'AWS_secter_access_key',
            },
        };
        expect(awsToken.asDict()).toEqual(awsTokenExpected);

        // FTPToken & SFTPToken
        const ftpToken = cop.config.CloudAccessToken.fromFTP(
            'host_name',
            35,
            'dummy_user',
            'dummy_pw',
        );
        const ftpCloudAccessToken = {
            host: 'host_name',
            port: 35,
            user: 'dummy_user',
            password: 'dummy_pw',
        };
        const ftpTokenExpected = {
            output_location: 'ftp',
            cloud_access_token: ftpCloudAccessToken,
        };
        const sftpToken = cop.config.CloudAccessToken.fromSFTP(
            'host_name',
            35,
            'dummy_user',
            'dummy_pw',
        );
        const sftpTokenExpected = {
            output_location: 'sftp',
            cloud_access_token: ftpCloudAccessToken,
        };
        expect(ftpToken.asDict()).toEqual(ftpTokenExpected);
        expect(sftpToken.asDict()).toEqual(sftpTokenExpected);
    });
    test('Test post-process, conversion and merge commands', () => {
        // post-process
        const postProcessCommand = new cop.config.Command('echo_post', {
            p1: 'Parameter1',
            p2: 'Parameter2',
            p3: 'Parameter3',
        });
        const postProcessCommands = new cop.config.Commands(
            postProcessCommand,
            false,
            1500,
        );
        const postProcessExpected = {
            post_process: {
                command: 'echo_post',
                return_output: false,
                delete_delay: 1500,
                command_parameters: {
                    p1: 'Parameter1',
                    p2: 'Parameter2',
                    p3: 'Parameter3',
                },
            },
        };
        expect(postProcessCommands.asDict()).toEqual(postProcessExpected);

        // conversion
        const preConversionCommand = new cop.config.Command('echo_pre', {
            p1: 'Parameter1',
            p2: 'Parameter2',
            p3: 'Parameter3',
        });
        const postConversionCommand = new cop.config.Command('echo_post', {
            p1: 'Parameter1',
            p2: 'Parameter2',
            p3: 'Parameter3',
        });
        const conversionCommands = new cop.config.Commands(
            undefined,
            undefined,
            undefined,
            preConversionCommand,
            postConversionCommand,
        );
        const conversionExpected = {
            conversion: {
                pre_command: 'echo_pre',
                pre_command_parameters: {
                    p1: 'Parameter1',
                    p2: 'Parameter2',
                    p3: 'Parameter3',
                },
                post_command: 'echo_post',
                post_command_parameters: {
                    p1: 'Parameter1',
                    p2: 'Parameter2',
                    p3: 'Parameter3',
                },
            },
        };
        expect(conversionCommands.asDict()).toEqual(conversionExpected);

        // merge
        const postMergeCommand = new cop.config.Command('echo_post', {
            p1: 'Parameter1',
            p2: 'Parameter2',
            p3: 'Parameter3',
        });
        const postMergeCommands = new cop.config.Commands(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            postMergeCommand,
        );
        const postMergeExpected = {
            merge: {
                post_command: 'echo_post',
                post_command_parameters: {
                    p1: 'Parameter1',
                    p2: 'Parameter2',
                    p3: 'Parameter3',
                },
            },
        };
        expect(postMergeCommands.asDict()).toEqual(postMergeExpected);
    });
    test('Test route paths', async () => {
        const serv: cop.config.Server = new cop.config.Server(
            'https://api.cloudofficeprint.com/',
            new cop.config.ServerConfig('YOUR_API_KEY'),
        );
        expect(await serv.isReachable()).toBeTruthy();
        expect(typeof (await serv.getVersionCop())).toBe('string');
        expect(typeof (await serv.getVersionSoffice())).toBe('string');
        expect(typeof (await serv.getVersionOfficetopdf())).toBe('string');
        expect(typeof (await serv.getSupportedTemplateMimetypes())).toBe(
            'object',
        );
        expect(typeof (await serv.getSupportedOutputMimetypes('docx'))).toBe(
            'object',
        );
        expect(typeof (await serv.getSupportedPrependMimetypes())).toBe(
            'object',
        );
        expect(typeof (await serv.getSupportedAppendMimetypes())).toBe(
            'object',
        );
        // expect(typeof (await serv.verifyTemplateHash('test_hash'))).toBe(
        //     'object',
        // );
        // expect(
        //     typeof (await serv.checkIpp('http://localhost:3000', '1.1')),
        // ).toBe('object');
    });
});
