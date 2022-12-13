import { describe, expect, test } from '@jest/globals';
import * as cop from '../index';

describe('Tests for codes', () => {
    test('Test class BarCode, a subclass of class Code', () => {
        const barcode = new cop.elements.BarCode(
            'name',
            'data',
            'ean13',
            50,
            50,
            'L',
            'url',
            45,
            'red',
            25,
            25,
            'includetext guardwhitespace',
        );
        const barcodeExpected = {
            name: 'data',
            name_type: 'ean13',
            name_height: 50,
            name_width: 50,
            name_errorcorrectlevel: 'L',
            name_url: 'url',
            name_rotation: 45,
            name_background_color: 'red',
            name_padding_width: 25,
            name_padding_height: 25,
            name_extra_options: 'includetext guardwhitespace',
        };
        expect(barcode.asDict()).toEqual(barcodeExpected);
    });
    test('Test styling options for qr-code class', () => {
        const qr = new cop.elements.QRCode('name', 'data', 'qrcode');

        qr.setDotscale(0.5);
        qr.setLogo('logo');
        qr.setBackgroundImage('background_image');
        qr.setColorDark('color_dark');
        qr.setColorLight('color_light');
        qr.setLogoWidth('logo_width');
        qr.setLogoHeight('logo_height');
        qr.setLogoBackgroundColor('logo_background_color');
        qr.setQuietZone(2);
        qr.setQuietZoneColor('quiet_zone_color');
        qr.setBackgroundImageAlpha(0.5);
        qr.setPoColor('po_color');
        qr.setPiColor('pi_color');
        qr.setPoTlColor('po_tl_color');
        qr.setPiTlColor('pi_tl_color');
        qr.setPoTrColor('po_tr_color');
        qr.setPiTrColor('pi_tr_color');
        qr.setPoBlColor('po_bl_color');
        qr.setPiBlColor('pi_bl_color');
        qr.setTimingVColor('timing_v_color');
        qr.setTimingHColor('timing_h_color');
        qr.setTimingColor('timing_color');
        qr.setAutoColor(false);
        qr.setAutoColorDark('auto_color_dark');
        qr.setAutoColorLight('auto_color_light');

        const qrExpected = {
            name: 'data',
            name_type: 'qrcode',
            name_qr_dotscale: 0.5,
            name_qr_logo: 'logo',
            name_qr_background_image: 'background_image',
            name_qr_color_dark: 'color_dark',
            name_qr_color_light: 'color_light',
            name_qr_logo_width: 'logo_width',
            name_qr_logo_height: 'logo_height',
            name_qr_logo_background_color: 'logo_background_color',
            name_qr_quiet_zone: 2,
            name_qr_quiet_zone_color: 'quiet_zone_color',
            name_qr_background_image_alpha: 0.5,
            name_qr_po_color: 'po_color',
            name_qr_pi_color: 'pi_color',
            name_qr_po_tl_color: 'po_tl_color',
            name_qr_pi_tl_color: 'pi_tl_color',
            name_qr_po_tr_color: 'po_tr_color',
            name_qr_pi_tr_color: 'pi_tr_color',
            name_qr_po_bl_color: 'po_bl_color',
            name_qr_pi_bl_color: 'pi_bl_color',
            name_qr_timing_v_color: 'timing_v_color',
            name_qr_timing_h_color: 'timing_h_color',
            name_qr_timing_color: 'timing_color',
            name_qr_auto_color: false,
            name_qr_auto_color_dark: 'auto_color_dark',
            name_qr_auto_color_light: 'auto_color_light',
        };
        expect(qr.asDict()).toEqual(qrExpected);
    });
    test('Test qr code wifi', () => {
        const wifi = new cop.elements.WiFiQRCode(
            'name',
            'ssid',
            'WPA',
            'password',
            false,
        );
        const wifiExpected = {
            name: 'ssid',
            name_type: 'qr_wifi',
            name_wifi_password: 'password',
            name_wifi_encryption: 'WPA',
            name_wifi_hidden: false,
        };
        expect(wifi.asDict()).toEqual(wifiExpected);
    });
    test('Test qr code telephone', () => {
        const telephoneNumber = new cop.elements.TelephoneNumberQRCode(
            'name',
            '+32_test_number',
        );
        const telephoneNumberExpected = {
            name: '+32_test_number',
            name_type: 'qr_telephone',
        };
        expect(telephoneNumber.asDict()).toEqual(telephoneNumberExpected);
    });
    test('Test qr code email', () => {
        const email = new cop.elements.EmailQRCode(
            'name',
            'receiver',
            'cc',
            'bcc',
            'subject',
            'body',
        );
        const emailExpected = {
            name: 'receiver',
            name_type: 'qr_email',
            name_email_cc: 'cc',
            name_email_bcc: 'bcc',
            name_email_subject: 'subject',
            name_email_body: 'body',
        };
        expect(email.asDict()).toEqual(emailExpected);
    });
    test('Test qr code sms', () => {
        const sms = new cop.elements.SMSQRCode('name', 'receiver', 'sms_body');
        const smsExpected = {
            name: 'receiver',
            name_type: 'qr_sms',
            name_sms_body: 'sms_body',
        };
        expect(sms.asDict()).toEqual(smsExpected);
    });
    test('Test qr code url', () => {
        const url = new cop.elements.URLQRCode('name', 'url');
        const urlExpected = {
            name: 'url',
            name_type: 'qr_url',
        };
        expect(url.asDict()).toEqual(urlExpected);
    });
    test('Test qr code v card', () => {
        const vCard = new cop.elements.VCardQRCode(
            'name',
            'first_name',
            'last_name',
            'email',
            'website',
        );
        const vCardExpected = {
            name: 'first_name',
            name_type: 'qr_vcard',
            name_vcard_last_name: 'last_name',
            name_vcard_email: 'email',
            name_vcard_website: 'website',
        };
        expect(vCard.asDict()).toEqual(vCardExpected);
    });
    test('Test qr code me card', () => {
        const meCard = new cop.elements.MeCardQRCode(
            'name',
            'first_name',
            'last_name',
            'nickname',
            'email',
            'contact_primary',
            'contact_secondary',
            'contact_tertiary',
            'website',
            'birthday',
            'notes',
        );
        const meCardExpected = {
            name: 'first_name',
            name_type: 'qr_me_card',
            name_me_card_last_name: 'last_name',
            name_me_card_nickname: 'nickname',
            name_me_card_email: 'email',
            name_me_card_contact_primary: 'contact_primary',
            name_me_card_contact_secondary: 'contact_secondary',
            name_me_card_contact_tertiary: 'contact_tertiary',
            name_me_card_website: 'website',
            name_me_card_birthday: 'birthday',
            name_me_card_notes: 'notes',
        };
        expect(meCard.asDict()).toEqual(meCardExpected);
    });
    test('Test qr code geolocation', () => {
        const geolocation = new cop.elements.GeolocationQRCode(
            'name',
            'latitude',
            'longitude',
            'altitude',
        );
        const geolocationExpected = {
            name: 'latitude',
            name_type: 'qr_geolocation',
            name_geolocation_longitude: 'longitude',
            name_geolocation_altitude: 'altitude',
        };
        expect(geolocation.asDict()).toEqual(geolocationExpected);
    });
    test('Test qr code event', () => {
        const event = new cop.elements.EventQRCode(
            'name',
            'summary',
            'startdate',
            'enddate',
        );
        const eventExpected = {
            name: 'summary',
            name_type: 'qr_event',
            name_event_startdate: 'startdate',
            name_event_enddate: 'enddate',
        };
        expect(event.asDict()).toEqual(eventExpected);
    });
});
