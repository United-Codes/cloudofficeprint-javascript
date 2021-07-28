import { Element } from './elements';

/**
 * The abstract base class for QR-codes and barcodes
 */
export abstract class Code extends Element {
    data: string;
    type: string;

    /**
     * @param name The name for this Code object (AOP tag).
     * @param data The data for this Code object.
     * @param type For the different types of QR-codes and barcodes, we refer to the
     *  [AOP documentation](https://www.apexofficeprint.com/docs/#barcode-qrcode-tags).
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
    asDictSuffixes(): {[key: string]: string | number | boolean} {
        let result: {[key: string]: string | number | boolean} = {};

        if (this.type !== undefined) {
            result = { ...result, _type: this.type };
        }

        return result;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict(): {[key: string]: string | number | boolean} {
        let result: {[key: string]: string | number | boolean} = {
            [this.name]: this.data,
        };

        Object.entries(this.asDictSuffixes()).forEach(
            ([key, value]) => {
                result = { ...result, [`${this.name}${key}`]: value };
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
     * @param name The name for this Code object (AOP tag).
     * @param data The data for this Code object.
     * @param type For the different types of QR-codes and barcodes, we refer to the
     *  [AOP documentation](https://www.apexofficeprint.com/docs/#barcode-qrcode-tags).
     * @param height The height for the generated code. The default is 200 for QR,
     *  50 for the rest. Defaults to None.
     * @param width The width for the generated code. The default is 200. Defaults to None.
     * @param errorcorrectlevel The level of which the QR code should be recoverable.
     *  The options are:
     *  "L" (up to 7% damage)
     *  "M" (up to 15% damage)
     *  "Q" (up to 25% damage)
     *  "H" (up to 30% damage). Defaults to None.
     * @param url The URL to hyperlink to when the barcode/qrcode is clicked. Defaults to None.
     * @param rotation The rotation angle of the barcode/qrcode (in degrees, counterclockwise).
     *  Defaults to None.
     * @param backgroundColor The background color for the barcode/qrcode. default: white/ffffff.
     *  You can provide a hex value; html named colors like red, white, purple; rgb(255, 0, 0) or
     *  any other css supported format. Defaults to None.
     * @param paddingWidth The width padding of the inserted qrcode/barcode. default 10.
     *  In pixels. Defaults to None.
     * @param paddingHeight The height padding of the inserted qrcode/barcode. default 10.
     *  In pixels. Defaults to None.
     * @param extraOptions If you want to include extra options like including barcode text
     *  on the bottom. The options should be space separated and should be followed by a "=" and
     *  their value. E.g.: "includetext guardwhitespace guardwidth=3 guardheight=3".
     *  Please visit https://github.com/bwipp/postscriptbarcode/wiki/Symbologies-Reference
     *  for all the options. Defaults to None.
     */
    constructor(
        name: string,
        data: string,
        type: string,
        height: number,
        width: number,
        errorcorrectlevel: string,
        url: string,
        rotation: number,
        backgroundColor: string,
        paddingWidth: number,
        paddingHeight: number,
        extraOptions: string,
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
    asDictSuffixes(): {[key: string]: string | number | boolean} {
        let result: {[key: string]: string | number | boolean} = super.asDictSuffixes();

        if (this.height !== undefined) {
            result = { ...result, _height: this.height };
        }
        if (this.width !== undefined) {
            result = { ...result, _width: this.width };
        }
        if (this.errorcorrectlevel !== undefined) {
            result = { ...result, _errorcorrectlevel: this.errorcorrectlevel };
        }
        if (this.url !== undefined) {
            result = { ...result, _url: this.url };
        }
        if (this.rotation !== undefined) {
            result = { ...result, _rotation: this.rotation };
        }
        if (this.backgroundColor !== undefined) {
            result = { ...result, _background_color: this.backgroundColor };
        }
        if (this.paddingWidth !== undefined) {
            result = { ...result, _padding_width: this.paddingWidth };
        }
        if (this.paddingHeight !== undefined) {
            result = { ...result, _padding_height: this.paddingHeight };
        }
        if (this.extraOptions !== undefined) {
            result = { ...result, _extra_options: this.extraOptions };
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
     * @param name The name for this Code object (AOP tag).
     * @param data The data for this Code object.
     * @param type For the different types of QR-codes and barcodes, we refer to the
     *  [AOP documentation](https://www.apexofficeprint.com/docs/#barcode-qrcode-tags).
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
    asDictSuffixes(): {[key: string]: string | number | boolean} {
        let result: {[key: string]: string | number | boolean} = super.asDictSuffixes();

        if (this.dotscale !== undefined) {
            result = { ...result, _dotscale: this.dotscale };
        }
        if (this.logo !== undefined) {
            result = { ...result, _logo: this.logo };
        }
        if (this.backgroundImage !== undefined) {
            result = { ...result, _background_image: this.backgroundImage };
        }
        if (this.colorDark !== undefined) {
            result = { ...result, _color_dark: this.colorDark };
        }
        if (this.colorLight !== undefined) {
            result = { ...result, _color_light: this.colorLight };
        }
        if (this.logoWidth !== undefined) {
            result = { ...result, _logo_width: this.logoWidth };
        }
        if (this.logoHeight !== undefined) {
            result = { ...result, _logo_height: this.logoHeight };
        }
        if (this.logoBackgroundColor !== undefined) {
            result = { ...result, _logo_background_color: this.logoBackgroundColor };
        }
        if (this.quietZone !== undefined) {
            result = { ...result, _quiet_zone: this.quietZone };
        }
        if (this.quietZoneColor !== undefined) {
            result = { ...result, _quiet_zone_color: this.quietZoneColor };
        }
        if (this.backgroundImageAlpha !== undefined) {
            result = { ...result, _background_image_alpha: this.backgroundImageAlpha };
        }
        if (this.poColor !== undefined) {
            result = { ...result, _po_color: this.poColor };
        }
        if (this.piColor !== undefined) {
            result = { ...result, _pi_color: this.piColor };
        }
        if (this.poTlColor !== undefined) {
            result = { ...result, _po_tl_color: this.poTlColor };
        }
        if (this.piTlColor !== undefined) {
            result = { ...result, _pi_tl_color: this.piTlColor };
        }
        if (this.poTrColor !== undefined) {
            result = { ...result, _po_tr_color: this.poTrColor };
        }
        if (this.piTrColor !== undefined) {
            result = { ...result, _pi_tr_color: this.piTrColor };
        }
        if (this.poBlColor !== undefined) {
            result = { ...result, _po_bl_color: this.poBlColor };
        }
        if (this.piBlColor !== undefined) {
            result = { ...result, _pi_bl_color: this.piBlColor };
        }
        if (this.timingVColor !== undefined) {
            result = { ...result, _timing_v_color: this.timingVColor };
        }
        if (this.timingHColor !== undefined) {
            result = { ...result, _timing_h_color: this.timingHColor };
        }
        if (this.timingColor !== undefined) {
            result = { ...result, _timing_color: this.timingColor };
        }
        if (this.autoColor !== undefined) {
            result = { ...result, _auto_color: this.autoColor };
        }
        if (this.autoColorDark !== undefined) {
            result = { ...result, _auto_color_dark: this.autoColorDark };
        }
        if (this.autoColorLight !== undefined) {
            result = { ...result, _auto_color_light: this.autoColorLight };
        }

        return result;
    }
}
