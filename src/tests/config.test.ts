import { ForEachMergeCells } from './../elements/loops';
import { describe, test, expect } from '@jest/globals';

import * as cop from '../index';

describe('Tests for config', () => {
    test('Test PDFOptions', () => {
        const pdfOpts = new cop.config.PDFOptions(
            'test_pw', // readPassword
            'test_watermark', // watermark
            32, // watermarkSize
            50, // watermarkOpacity
            'black', // watermarkColor
            'Arial', // watermarkFont
            500, // pageWidth
            500, // pageHeight
            true, // evenPage
            false, // mergeMakingEven
            'test_modify_password', // modifyPassword
            0, // passwordProtectionFlag
            true, // lockForm
            3, // copies
            5, // pageMargin
            false, // landscape
            'test_page_format', // pageFormat
            false, // merge
            'test_sign_certificate', // signCertificate
            'test_certificate_password', // signCertificatePassword
            true, // identifyFormFields
            true, // split
            false, // removeLastPage
            'text in english', // signCertificateTxt
             45, // watermarkRotation
            '1b', // convertToPdfa,
            'sample_attachment_file.pdf', // attachmentName
            true, // convertAttachmentToJson
            true // insertBarcode
        );
        pdfOpts.setWatermark('new_watermark', 'grey', 'Arial', 51, 32, 45);
        pdfOpts.setPageMarginAt(6, 'top');
        const conf = new cop.config.OutputConfig('pdf');
        conf.updateToc = true;
        conf.return_output = true;
        conf.outputLocale = 'nepali';
        conf.pdfOptions = pdfOpts;
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
            output_watermark_rotation: 45,
            output_type: 'pdf',
            output_encoding: 'raw',
            output_converter: 'libreoffice',
            update_toc: true,
            return_output : true,
            output_locale: 'nepali',
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
            output_sign_certificate_txt: 'text in english',
            identify_form_fields: true,
            output_split: true,
            output_convert_to_pdfa: '1b',
            output_attachment_name: 'sample_attachment_file.pdf',
            output_convert_attachment_to_json: true,
            output_insert_barcode: true,
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
            true
        );
        const printerExpected = {
            location: 'location',
            version: 'version',
            requester: 'requester',
            job_name: 'job_name',
            return_output: true
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
        //If you are testing for ipp-printer-> enable ipp-printer on port 3000 and test it.
        // const printer:cop.config.Printer = new cop.config.Printer("http://localhost:3000","1.1")
        // const serv: cop.config.Server = new cop.config.Server(
        //     'http://localhost:8010/',
        //     new cop.config.ServerConfig('YOUR_API_KEY',undefined,printer)
        // );
        const serv: cop.config.Server = new cop.config.Server(
            'http://localhost:8010/',
            new cop.config.ServerConfig('YOUR_API_KEY')
        );
        expect(await serv.isReachable()).toBeTruthy();
        // expect(await serv.isIppPrinterReachable()).toBeTruthy();
        expect(typeof await serv.getVersionSoffice()).toBe('string');
        expect(typeof await serv.getVersionOfficetopdf()).toBe('string');
        expect(typeof await serv.getSupportedTemplateMimetypes()).toBe('object');
        expect(typeof await serv.getSupportedOutputMimetypes('docx')).toBe('object');
        expect(typeof await serv.getSupportedPrependMimetypes()).toBe('object');
        expect(typeof await serv.getSupportedAppendMimetypes()).toBe('object');
        expect(typeof await serv.getVersionCop()).toBe('string');
    });
    test('Test for RequestOptions and output Polling', () => {
        const extraHeaders = {
            file_id: "Any file id like FILE_123",
            access_token: "Access Token for above hostname (if any) "
        }
        const requestOptions = new cop.config.RequestOption('https://www.apexofficeprint.com/post/', extraHeaders);
        const conf = new cop.config.OutputConfig('pdf');
        conf.outputPolling = true;
        conf.requestOption = requestOptions;
        const configExpected = {
            output_type: 'pdf',
            output_encoding: 'raw',
            output_converter: 'libreoffice',
            output_polling: true,
            request_option: {
                url: "https://www.apexofficeprint.com/post/",
                extra_headers: {
                    file_id: "Any file id like FILE_123",
                    access_token: "Access Token for above hostname (if any) "
                }
            }
        };
        console.log(conf.asDict());
        expect(conf.asDict()).toEqual(configExpected);
    });
   
test('Test for output_read_password', () => {
    const conf = new cop.config.OutputConfig();
    conf.outputReadPassword = 'aop_pass';
    const dict = conf.asDict();
        expect(dict).toHaveProperty('output_read_password', 'aop_pass');

});

test('Test for output_export_sheets', () => {
    const conf = new cop.config.OutputConfig('xlsx');
    conf.outputExportSheets = ['Sheet1', 'Sheet3'];
    const confExpected = {
        output_type: 'xlsx',
        output_encoding: 'raw',
        output_converter: 'libreoffice',
        output_export_sheets: ['Sheet1', 'Sheet3'],
    };
    expect(conf.asDict()).toEqual(confExpected);
});

test('Test for image watermark', () => {
    const pdfOpts = new cop.config.PDFOptions();
    pdfOpts.setImageWatermark('logo_base64', 50, 45, 100, 80);
    const conf = new cop.config.OutputConfig('pdf');
    conf.pdfOptions = pdfOpts;
    const confExpected = {
        output_type: 'pdf',
        output_encoding: 'raw',
        output_converter: 'libreoffice',
        output_watermark_image: 'logo_base64',
        output_watermark_image_opacity: 50,
        output_watermark_image_rotation: 45,
        output_watermark_image_width: 100,
        output_watermark_image_height: 80,
    };
    expect(conf.asDict()).toEqual(confExpected);
});

test('Test for compress pdf', () => {
    const pdfOpts = new cop.config.PDFOptions();
    pdfOpts.compressPdf = true;
    const conf = new cop.config.OutputConfig('pdf');
    conf.pdfOptions = pdfOpts;
    const confExpected = {
        output_type: 'pdf',
        output_encoding: 'raw',
        output_converter: 'libreoffice',
        output_compress_pdf: true,
    };
    expect(conf.asDict()).toEqual(confExpected);
});

});
describe('cop_pdf_batching', () => {
    test('test pdf batching', () => {
      const pdfOpts = new cop.config.PDFOptions()
      pdfOpts.merge = true;
      pdfOpts.batch_selector = 'orders:products';
      pdfOpts.batch_size = 3;
      pdfOpts.batch_condition = 'unit_price > 110 ? "Expensive" : unit_price < 80 ? "Cheap" : "Medium"'
      
      const conf = new cop.config.OutputConfig('pdf');
      conf.pdfOptions = pdfOpts;
  
      const confExpected = {
        output_encoding: 'raw',
        output_converter:  'libreoffice',
        output_type:        'pdf',
        output_merge:           true,
        batch_selector:  'orders:products',
        batch_size:      3,
        batch_condition: 'unit_price > 110 ? "Expensive" : unit_price < 80 ? "Cheap" : "Medium"'
      };
        
      expect(conf.asDict()).toEqual(confExpected);
    });
  });
  