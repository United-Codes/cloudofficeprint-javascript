import { Element } from './elements';

/**
 * The abstract base class for QR-codes and barcodes
 */
export abstract class Code extends Element {
    data: string;
    type: string;

    /**
     * @param name The name for this Code object (Cloud Office Print tag).
     * @param data The data for this Code object.
     * @param type For the different types of QR-codes and barcodes, we refer to the
     *  Cloud Office Print documentation.
     */
    constructor(name: string, data: string, type: string) {
        super(name);
        this.data = data;
        this.type = type;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`|${this.name}`]);
    }

    /**
     * Get the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object.
     * @returns the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object
     */
    asDictSuffixes(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = {};

        if (this.type !== undefined) {
            result._type = this.type;
        }

        return result;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = {
            [this.name]: this.data,
        };

        Object.entries(this.asDictSuffixes()).forEach(
            ([key, value]) => {
                result[`${this.name}${key}`] = value;
            },
        );

        return result;
    }
}

/**
 * This class is a subclass of Code and is used to generate a barcode element
 */
export class BarCode extends Code {
    height: number | undefined;
    width: number | undefined;
    errorcorrectlevel: string | undefined;
    url: string | undefined;
    rotation: number | undefined;
    backgroundColor: string | undefined;
    paddingWidth: number | undefined;
    paddingHeight: number | undefined;
    extraOptions: string | undefined;

    /**
     * @param name The name for this Code object (Cloud Office Print tag).
     * @param data The data for this Code object.
     * @param type For the different types of QR-codes and barcodes, we refer to the
     *  Cloud Office Print documentation.
     * @param height The height for the generated code. The default is 200 for QR,
     *  50 for the rest. Optional.
     * @param width The width for the generated code. The default is 200. Optional.
     * @param errorcorrectlevel The level of which the QR code should be recoverable.
     *  The options are:
     *  "L" (up to 7% damage)
     *  "M" (up to 15% damage)
     *  "Q" (up to 25% damage)
     *  "H" (up to 30% damage). Optional.
     * @param url The URL to hyperlink to when the barcode/qrcode is clicked. Optional.
     * @param rotation The rotation angle of the barcode/qrcode (in degrees, counterclockwise).
     *  Optional.
     * @param backgroundColor The background color for the barcode/qrcode. default: white/ffffff.
     *  You can provide a hex value; html named colors like red, white, purple; rgb(255, 0, 0) or
     *  any other css supported format. Optional.
     * @param paddingWidth The width padding of the inserted qrcode/barcode. default 10.
     *  In pixels. Optional.
     * @param paddingHeight The height padding of the inserted qrcode/barcode. default 10.
     *  In pixels. Optional.
     * @param extraOptions If you want to include extra options like including barcode text
     *  on the bottom. The options should be space separated and should be followed by a "=" and
     *  their value. E.g.: "includetext guardwhitespace guardwidth=3 guardheight=3".
     *  Please visit https://github.com/bwipp/postscriptbarcode/wiki/Symbologies-Reference
     *  for all the options. Optional.
     */
    constructor(
        name: string,
        data: string,
        type: string,
        height?: number,
        width?: number,
        errorcorrectlevel?: string,
        url?: string,
        rotation?: number,
        backgroundColor?: string,
        paddingWidth?: number,
        paddingHeight?: number,
        extraOptions?: string,
    ) {
        super(name, data, type);
        this.height = height;
        this.width = width;
        this.errorcorrectlevel = errorcorrectlevel;
        this.url = url;
        this.rotation = rotation;
        this.backgroundColor = backgroundColor;
        this.paddingWidth = paddingWidth;
        this.paddingHeight = paddingHeight;
        this.extraOptions = extraOptions;
    }

    /**
     * Get the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object.
     * @returns the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object
     */
    asDictSuffixes(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = super.asDictSuffixes();

        if (this.height !== undefined) {
            result._height = this.height;
        }
        if (this.width !== undefined) {
            result._width = this.width;
        }
        if (this.errorcorrectlevel !== undefined) {
            result._errorcorrectlevel = this.errorcorrectlevel;
        }
        if (this.url !== undefined) {
            result._url = this.url;
        }
        if (this.rotation !== undefined) {
            result._rotation = this.rotation;
        }
        if (this.backgroundColor !== undefined) {
            result._background_color = this.backgroundColor;
        }
        if (this.paddingWidth !== undefined) {
            result._padding_width = this.paddingWidth;
        }
        if (this.paddingHeight !== undefined) {
            result._padding_height = this.paddingHeight;
        }
        if (this.extraOptions !== undefined) {
            result._extra_options = this.extraOptions;
        }

        return result;
    }
}

/**
 * This class is a subclass of Code and serves as a superclass for the different types of QR-codes
 */
export class QRCode extends Code {
    dotscale: number | undefined;
    logo: string | undefined;
    backgroundImage: string | undefined;
    colorDark: string | undefined;
    colorLight: string | undefined;
    logoWidth: string | number | undefined;
    logoHeight: string | number | undefined;
    logoBackgroundColor: string | undefined;
    quietZone: number | undefined;
    quietZoneColor: string | undefined;
    backgroundImageAlpha: number | undefined;
    poColor: string | undefined;
    piColor: string | undefined;
    poTlColor: string | undefined;
    piTlColor: string | undefined;
    poTrColor: string | undefined;
    piTrColor: string | undefined;
    poBlColor: string | undefined;
    piBlColor: string | undefined;
    timingVColor: string | undefined;
    timingHColor: string | undefined;
    timingColor: string | undefined;
    autoColor: boolean | undefined;
    autoColorDark: string | undefined;
    autoColorLight: string | undefined;

    /**
     * @param name The name for this Code object (Cloud Office Print tag).
     * @param data The data for this Code object.
     * @param type For the different types of QR-codes and barcodes, we refer to the
     *  Cloud Office Print documentation.
     */
    constructor(name: string, data: string, type: string) {
        super(name, data, type);
    }

    /**
     * @param dotscale For body block, must be greater than 0, less than or equal to 1. default is 1
     */
    setDotscale(dotscale: number) {
        this.dotscale = dotscale;
    }
    /**
     * @param logo Logo Image (At center of QR)
     */
    setLogo(logo: string) {
        this.logo = logo;
    }
    /**
     * @param backgroundImage Background Image
     */
    setBackgroundImage(backgroundImage: string) {
        this.backgroundImage = backgroundImage;
    }
    /**
     * @param colorDark Dark color of the QR code
     */
    setColorDark(colorDark: string) {
        this.colorDark = colorDark;
    }
    /**
     * @param colorLight Light color of the QR code
     */
    setColorLight(colorLight: string) {
        this.colorLight = colorLight;
    }
    /**
     * @param logoWidth Width of logo
     */
    setLogoWidth(logoWidth: string | number) {
        this.logoWidth = logoWidth;
    }
    /**
     * @param logoHeight Height of logo
     */
    setLogoHeight(logoHeight: string | number) {
        this.logoHeight = logoHeight;
    }
    /**
     * @param logoBackgroundColor Background color of the QR code
     */
    setLogoBackgroundColor(logoBackgroundColor: string) {
        this.logoBackgroundColor = logoBackgroundColor;
    }
    /**
     * @param quietZone For padding around QR code
     */
    setQuietZone(quietZone: number) {
        this.quietZone = quietZone;
    }
    /**
     * @param quietZoneColor Color of padding area
     */
    setQuietZoneColor(quietZoneColor: string) {
        this.quietZoneColor = quietZoneColor;
    }
    /**
     * @param backgroundImageAlpha Background image transparency,
     *  value between 0 and 1. default is 1
     */
    setBackgroundImageAlpha(backgroundImageAlpha: number) {
        this.backgroundImageAlpha = backgroundImageAlpha;
    }
    /**
     * @param poColor Global Position Outer color. if not set, the defaut is `colorDark`
     */
    setPoColor(poColor: string) {
        this.poColor = poColor;
    }
    /**
     * @param piColor Global Position Inner color. if not set, the defaut is `colorDark`
     */
    setPiColor(piColor: string) {
        this.piColor = piColor;
    }
    /**
     * @param poTlColor Position Outer color - Top Left
     */
    setPoTlColor(poTlColor: string) {
        this.poTlColor = poTlColor;
    }
    /**
     * @param piTlColor Position Inner color - Top Left
     */
    setPiTlColor(piTlColor: string) {
        this.piTlColor = piTlColor;
    }
    /**
     * @param poTrColor Position Outer color - Top Right
     */
    setPoTrColor(poTrColor: string) {
        this.poTrColor = poTrColor;
    }
    /**
     * @param piTrColor Position Inner color - Top Right
     */
    setPiTrColor(piTrColor: string) {
        this.piTrColor = piTrColor;
    }
    /**
     * @param poBlColor Position Outer color - Bottom Left
     */
    setPoBlColor(poBlColor: string) {
        this.poBlColor = poBlColor;
    }
    /**
     * @param piBlColor Position Inner color - Bottom Left
     */
    setPiBlColor(piBlColor: string) {
        this.piBlColor = piBlColor;
    }
    /**
     * @param timingVColor Vertical timing color
     */
    setTimingVColor(timingVColor: string) {
        this.timingVColor = timingVColor;
    }
    /**
     * @param timingHColor Horizontal timing color
     */
    setTimingHColor(timingHColor: string) {
        this.timingHColor = timingHColor;
    }
    /**
     * @param timingColor Global Timing color
     */
    setTimingColor(timingColor: string) {
        this.timingColor = timingColor;
    }
    /**
     * @param loautoColorgo Automatic color adjustment (for data block) (default is false)
     *  (set to false if using background images)
     */
    setAutoColor(autoColor: boolean) {
        this.autoColor = autoColor;
    }
    /**
     * @param autoColorDark Automatic color: dark CSS color
     *  (only required when qr_auto_color is set true)
     *  (dark color prefered, otherwise may lead to undetectable QR)
     */
    setAutoColorDark(autoColorDark: string) {
        this.autoColorDark = autoColorDark;
    }
    /**
     * @param autoColorLight Automatic color: light CSS color
     *  (only required when qr_auto_color is set true)
     */
    setAutoColorLight(autoColorLight: string) {
        this.autoColorLight = autoColorLight;
    }

    /**
     * Get the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object.
     * @returns the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object
     */
    asDictSuffixes(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = super.asDictSuffixes();

        if (this.dotscale !== undefined) {
            result._qr_dotscale = this.dotscale;
        }
        if (this.logo !== undefined) {
            result._qr_logo = this.logo;
        }
        if (this.backgroundImage !== undefined) {
            result._qr_background_image = this.backgroundImage;
        }
        if (this.colorDark !== undefined) {
            result._qr_color_dark = this.colorDark;
        }
        if (this.colorLight !== undefined) {
            result._qr_color_light = this.colorLight;
        }
        if (this.logoWidth !== undefined) {
            result._qr_logo_width = this.logoWidth;
        }
        if (this.logoHeight !== undefined) {
            result._qr_logo_height = this.logoHeight;
        }
        if (this.logoBackgroundColor !== undefined) {
            result._qr_logo_background_color = this.logoBackgroundColor;
        }
        if (this.quietZone !== undefined) {
            result._qr_quiet_zone = this.quietZone;
        }
        if (this.quietZoneColor !== undefined) {
            result._qr_quiet_zone_color = this.quietZoneColor;
        }
        if (this.backgroundImageAlpha !== undefined) {
            result._qr_background_image_alpha = this.backgroundImageAlpha;
        }
        if (this.poColor !== undefined) {
            result._qr_po_color = this.poColor;
        }
        if (this.piColor !== undefined) {
            result._qr_pi_color = this.piColor;
        }
        if (this.poTlColor !== undefined) {
            result._qr_po_tl_color = this.poTlColor;
        }
        if (this.piTlColor !== undefined) {
            result._qr_pi_tl_color = this.piTlColor;
        }
        if (this.poTrColor !== undefined) {
            result._qr_po_tr_color = this.poTrColor;
        }
        if (this.piTrColor !== undefined) {
            result._qr_pi_tr_color = this.piTrColor;
        }
        if (this.poBlColor !== undefined) {
            result._qr_po_bl_color = this.poBlColor;
        }
        if (this.piBlColor !== undefined) {
            result._qr_pi_bl_color = this.piBlColor;
        }
        if (this.timingVColor !== undefined) {
            result._qr_timing_v_color = this.timingVColor;
        }
        if (this.timingHColor !== undefined) {
            result._qr_timing_h_color = this.timingHColor;
        }
        if (this.timingColor !== undefined) {
            result._qr_timing_color = this.timingColor;
        }
        if (this.autoColor !== undefined) {
            result._qr_auto_color = this.autoColor;
        }
        if (this.autoColorDark !== undefined) {
            result._qr_auto_color_dark = this.autoColorDark;
        }
        if (this.autoColorLight !== undefined) {
            result._qr_auto_color_light = this.autoColorLight;
        }

        return result;
    }
}

/**
 * This class is a subclass of QRCode and is used to generate a WiFi QR-code element
 */
export class WiFiQRCode extends QRCode {
    wifiEncryption: string;
    wifiPassword: string | undefined;
    wifiHidden: boolean | undefined;

    /**
     * @param name The name of this Code object (Cloud Office Print tag)
     * @param ssid The ssid of the WiFi
     * @param wifiEncryption The encryption type
     * @param wifiPassword The WiFi password Optional.
     * @param wifiHidden Whether or not the WiFi is hidden. Optional.
     */
    constructor(
        name: string,
        ssid: string,
        wifiEncryption: string,
        wifiPassword?: string,
        wifiHidden?: boolean,
    ) {
        super(name, ssid, 'qr_wifi');
        this.wifiEncryption = wifiEncryption;
        this.wifiPassword = wifiPassword;
        this.wifiHidden = wifiHidden;
    }

    /**
     * Get the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object.
     * @returns the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object
     */
    asDictSuffixes(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = super.asDictSuffixes();

        if (this.wifiPassword !== undefined) {
            result._wifi_password = this.wifiPassword;
        }
        if (this.wifiEncryption !== undefined) {
            result._wifi_encryption = this.wifiEncryption;
        }
        if (this.wifiHidden !== undefined) {
            result._wifi_hidden = this.wifiHidden;
        }

        return result;
    }
}

/**
 * This class is a subclass of QRCode and is used to generate a telephone number QR-code element
 */
export class TelephoneNumberQRCode extends QRCode {
    /**
     * @param name The name of this Code object (Cloud Office Print tag)
     * @param number The telephone number
     */
    constructor(name: string, number: string) {
        super(name, number, 'qr_telephone');
    }
}

/**
 * This class is a subclass of QRCode and is used to generate an email QR-code element
 */
export class EmailQRCode extends QRCode {
    cc: string | undefined;
    bcc: string | undefined;
    subject: string | undefined;
    body: string | undefined;

    /**
     * @param name The name of this Code object (Cloud Office Print tag)
     * @param receiver The receiver of the email
     * @param cc The cc for the email. Optional.
     * @param bcc The bcc for the email. Optional.
     * @param subject The subject for the email. Optional.
     * @param body The body of the email. Optional.
     */
    constructor(
        name: string,
        receiver: string,
        cc?: string,
        bcc?: string,
        subject?: string,
        body?: string,
    ) {
        super(name, receiver, 'qr_email');
        this.cc = cc;
        this.bcc = bcc;
        this.subject = subject;
        this.body = body;
    }

    /**
     * Get the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object.
     * @returns the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object
     */
    asDictSuffixes(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = super.asDictSuffixes();

        if (this.cc !== undefined) {
            result._email_cc = this.cc;
        }
        if (this.bcc !== undefined) {
            result._email_bcc = this.bcc;
        }
        if (this.subject !== undefined) {
            result._email_subject = this.subject;
        }
        if (this.body !== undefined) {
            result._email_body = this.body;
        }

        return result;
    }
}

/**
 * This class is a subclass of QRCode and is used to generate an SMS QR-code element
 */
export class SMSQRCode extends QRCode {
    smsBody: string | undefined;

    /**
     * @param name The name of this Code object (Cloud Office Print tag)
     * @param receiver The telephone number for the receiver of the sms
     * @param smsBody The body of the sms. Optional.
     */
    constructor(
        name: string,
        receiver: string,
        smsBody?: string,
    ) {
        super(name, receiver, 'qr_sms');
        this.smsBody = smsBody;
    }

    /**
     * Get the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object.
     * @returns the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object
     */
    asDictSuffixes(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = super.asDictSuffixes();

        if (this.smsBody !== undefined) {
            result._sms_body = this.smsBody;
        }

        return result;
    }
}

/**
 * This class is a subclass of QRCode and is used to generate a URL QR-code element
 */
export class URLQRCode extends QRCode {
    /**
     * @param name The name of this Code object (Cloud Office Print tag)
     * @param url The URL
     */
    constructor(name: string, url: string) {
        super(name, url, 'qr_url');
    }
}

/**
 * This class is a subclass of QRCode and is used to generate a vCard QR-code element
 */
export class VCardQRCode extends QRCode {
    lastName: string | undefined;
    email: string | undefined;
    website: string | undefined;

    /**
     * @param name The name for this Code object (Cloud Office Print tag).
     * @param firstName The first name.
     * @param lastName The last name. Optional.
     * @param email The email. Optional.
     * @param website The website. Optional.
     */
    constructor(
        name: string,
        firstName: string,
        lastName?: string,
        email?: string,
        website?: string,
    ) {
        super(name, firstName, 'qr_vcard');
        this.lastName = lastName;
        this.email = email;
        this.website = website;
    }

    /**
     * Get the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object.
     * @returns the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object
     */
    asDictSuffixes(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = super.asDictSuffixes();

        if (this.lastName !== undefined) {
            result._vcard_last_name = this.lastName;
        }
        if (this.email !== undefined) {
            result._vcard_email = this.email;
        }
        if (this.website !== undefined) {
            result._vcard_website = this.website;
        }

        return result;
    }
}

/**
 * This class is a subclass of QRCode and is used to generate a MeCard QR-code element
 */
export class MeCardQRCode extends QRCode {
    lastName: string | undefined;
    nickname: string | undefined;
    email: string | undefined;
    contactPrimary: string | undefined;
    contactSecondary: string | undefined;
    contactTertiary: string | undefined;
    website: string | undefined;
    birthday: string | undefined;
    notes: string | undefined;

    /**
     * @param name The name for this Code object (Cloud Office Print tag).
     * @param firstName The first name.
     * @param lastName The last name. Optional.
     * @param nickname The nickname. Optional.
     * @param email The email. Optional.
     * @param contactPrimary The primary contact. Optional.
     * @param contactSecondary The secondary contact. Optional.
     * @param contactTertiary The tertiary contact. Optional.
     * @param website The website. Optional.
     * @param birthday The birthday. Optional.
     * @param notes The notes. Optional.
     */
    constructor(
        name: string,
        firstName: string,
        lastName?: string,
        nickname?: string,
        email?: string,
        contactPrimary?: string,
        contactSecondary?: string,
        contactTertiary?: string,
        website?: string,
        birthday?: string,
        notes?: string,
    ) {
        super(name, firstName, 'qr_me_card');
        this.lastName = lastName;
        this.nickname = nickname;
        this.email = email;
        this.contactPrimary = contactPrimary;
        this.contactSecondary = contactSecondary;
        this.contactTertiary = contactTertiary;
        this.website = website;
        this.birthday = birthday;
        this.notes = notes;
    }

    /**
     * Get the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object.
     * @returns the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object
     */
    asDictSuffixes(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = super.asDictSuffixes();

        if (this.lastName !== undefined) {
            result._me_card_last_name = this.lastName;
        }
        if (this.nickname !== undefined) {
            result._me_card_nickname = this.nickname;
        }
        if (this.email !== undefined) {
            result._me_card_email = this.email;
        }
        if (this.contactPrimary !== undefined) {
            result._me_card_contact_primary = this.contactPrimary;
        }
        if (this.contactSecondary !== undefined) {
            result._me_card_contact_secondary = this.contactSecondary;
        }
        if (this.contactTertiary !== undefined) {
            result._me_card_contact_tertiary = this.contactTertiary;
        }
        if (this.website !== undefined) {
            result._me_card_website = this.website;
        }
        if (this.birthday !== undefined) {
            result._me_card_birthday = this.birthday;
        }
        if (this.notes !== undefined) {
            result._me_card_notes = this.notes;
        }

        return result;
    }
}

/**
 * This class is a subclass of QRCode and is used to generate a geolocation QR-code element
 */
export class GeolocationQRCode extends QRCode {
    longitude: string | undefined;
    altitude: string | undefined;

    /**
     * @param name The name for this Code object (Cloud Office Print tag).
     * @param latitude The latitude.
     * @param longitude The longitude. Optional.
     * @param altitude The altitude. Optional.
     */
    constructor(
        name: string,
        latitude: string,
        longitude?: string,
        altitude?: string,
    ) {
        super(name, latitude, 'qr_geolocation');
        this.longitude = longitude;
        this.altitude = altitude;
    }

    /**
     * Get the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object.
     * @returns the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object
     */
    asDictSuffixes(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = super.asDictSuffixes();

        if (this.longitude !== undefined) {
            result._geolocation_longitude = this.longitude;
        }
        if (this.altitude !== undefined) {
            result._geolocation_altitude = this.altitude;
        }

        return result;
    }
}

/**
 * This class is a subclass of QRCode and is used to generate an event QR-code element
 */
export class EventQRCode extends QRCode {
    startdate: string | undefined;
    enddate: string | undefined;

    /**
     * @param name The name for this Code object (Cloud Office Print tag).
     * @param summary The summary.
     * @param startdate The start date. Optional.
     * @param enddate The end date. Optional.
     */
    constructor(
        name: string,
        summary: string,
        startdate?: string,
        enddate?: string,
    ) {
        super(name, summary, 'qr_event');
        this.startdate = startdate;
        this.enddate = enddate;
    }

    /**
     * Get the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object.
     * @returns the suffixes that need to be appended to the keys of the
     *  dict representation of this Code object
     */
    asDictSuffixes(): { [key: string]: string | number | boolean } {
        const result: { [key: string]: string | number | boolean } = super.asDictSuffixes();

        if (this.startdate !== undefined) {
            result._event_startdate = this.startdate;
        }
        if (this.enddate !== undefined) {
            result._event_enddate = this.enddate;
        }

        return result;
    }
}
