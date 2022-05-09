import { Element } from './elements';
import * as fileUtils from '../own_utils/file_utils';

/**
 * The class for image elements.
 */
export class Image extends Element {
    source: string;
    maxWidth: number | string | undefined;
    maxHeight: number | string | undefined;
    altText: string | undefined;
    wrapText: string | undefined;
    rotation: number | undefined;
    transparency: number | string | undefined;
    url: string | undefined;
    width: number | string | undefined;
    height: number | string | undefined;
    maintainAspectRatio: boolean | undefined;

    /**
     * @param name The name of the image element.
     * @param source The source for the image: base64 or URL.
     * @param maxWidth The maximum width of the image (for proportional scaling).
     * @param maxHeight The maximum height of the image (for proportional scaling).
     * @param altText The alternative text for the image, used when the image can't be loaded.
     * @param wrapText The wrapping mode of the text around the image. The options are:
     *  In line with text: This option is the default.
     *      If no wrap option specified images will wrapped in line with text;
     *  Square : In order to use this property, wrap option should be "square";
     *  Top and Bottom : In order to use this property, wrap option should be "top-bottom";
     *  Behind Text : In order to use this property, wrap option should be "behind";
     *  In Front of Text : In order to use this property, wrap option should be "front".
     * @param rotation The rotation of the image in degrees.
     * @param transparency The transparency of the image in percent.
     * @param url The URL to load when the image is clicked.
     * @param width The width of the image (for non-proportional scaling).
     * @param height The height of the image (for non-proportional scaling).
     * @param maintainAspectRatio if True: maintain the aspect ratio of the image, width should be specified for this option to work.
     */
    constructor(
        name: string,
        source: string,
        maxWidth?: number | string,
        maxHeight?: number | string,
        altText?: string,
        wrapText?: string,
        rotation?: number,
        transparency?: number | string,
        url?: string,
        width?: number | string,
        height?: number | string,
        maintainAspectRatio?: boolean,
    ) {
        super(name);
        this.source = source;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.altText = altText;
        this.wrapText = wrapText;
        this.rotation = rotation;
        this.transparency = transparency;
        this.url = url;
        this.width = width;
        this.height = height;
        this.maintainAspectRatio = maintainAspectRatio;
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        return new Set([`{%${this.name}}`]);
    }

    /**
     * Get the dict representation of the suffixes that need to be appended to the name of
     *  this property in this object's dict representation.
     * @returns the dict representation of the suffixes that need to be appended to the name of
     *  this property in this object's dict representation
     */
    asDictSuffixes(): {[key: string]: string | number | boolean} {
        const result: {[key: string]: string | number | boolean} = {};

        if (this.maxWidth !== undefined) {
            result._max_width = this.maxWidth;
        }
        if (this.maxHeight !== undefined) {
            result._max_height = this.maxHeight;
        }
        if (this.altText !== undefined) {
            result._alt_text = this.altText;
        }
        if (this.wrapText !== undefined) {
            result._wrap_text = this.wrapText;
        }
        if (this.rotation !== undefined) {
            result._rotation = this.rotation;
        }
        if (this.transparency !== undefined) {
            result._transparency = this.transparency;
        }
        if (this.url !== undefined) {
            result._url = this.url;
        }
        if (this.width !== undefined) {
            result._width = this.width;
        }
        if (this.height !== undefined) {
            result._height = this.height;
        }
        if (this.maintainAspectRatio !== undefined) {
            result._maintain_aspect_ratio = this.maintainAspectRatio;
        }

        return result;
    }

    /**
     * The cloud access token as a dict, for building the JSON.
     * @returns dict representation for this cloud access token
     */
    asDict(): {[key: string]: string | number | boolean} {
        const result: {[key: string]: string | number | boolean} = {
            [this.name]: this.source,
        };

        Object.entries(this.asDictSuffixes()).forEach(
            ([key, value]) => {
                result[`${this.name}${key}`] = value;
            },
        );

        return result;
    }

    /**
     * Generate an Image object from a local file.
     * @param name The name of the image element.
     * @param source The source for the image: base64 or URL.
     * @param maxWidth The maximum width of the image (for proportional scaling).
     * @param maxHeight The maximum height of the image (for proportional scaling).
     * @param altText The alternative text for the image, used when the image can't be loaded.
     * @param wrapText The wrapping mode of the text around the image. The options are:
     *  In line with text: This option is the default.
     *      If no wrap option specified images will wrapped in line with text;
     *  Square : In order to use this property, wrap option should be "square";
     *  Top and Bottom : In order to use this property, wrap option should be "top-bottom";
     *  Behind Text : In order to use this property, wrap option should be "behind";
     *  In Front of Text : In order to use this property, wrap option should be "front".
     * @param rotation The rotation of the image in degrees.
     * @param transparency The transparency of the image in percent.
     * @param url The URL to load when the image is clicked.
     * @param width The width of the image (for non-proportional scaling).
     * @param height The height of the image (for non-proportional scaling).
     * @param maintainAspectRatio if True: maintain the aspect ratio of the image, width should be specified for this option to work.
     * @returns the generated Image object from a local file
     */
    static fromFile(
        name: string,
        path: string,
        maxWidth?: number | string,
        maxHeight?: number | string,
        altText?: string,
        wrapText?: string,
        rotation?: number,
        transparency?: number | string,
        url?: string,
        width?: number | string,
        height?: number | string,
        maintainAspectRatio?: boolean,
    ) {
        return new Image(
            name,
            fileUtils.readFileAsBase64(path),
            maxWidth,
            maxHeight,
            altText,
            wrapText,
            rotation,
            transparency,
            url,
            width,
            height,
            maintainAspectRatio,
        );
    }

    /**
     * Generate an Image object from raw data.
     * @param name The name of the image element.
     * @param source The source for the image: base64 or URL.
     * @param maxWidth The maximum width of the image (for proportional scaling).
     * @param maxHeight The maximum height of the image (for proportional scaling).
     * @param altText The alternative text for the image, used when the image can't be loaded.
     * @param wrapText The wrapping mode of the text around the image. The options are:
     *  In line with text: This option is the default.
     *      If no wrap option specified images will wrapped in line with text;
     *  Square : In order to use this property, wrap option should be "square";
     *  Top and Bottom : In order to use this property, wrap option should be "top-bottom";
     *  Behind Text : In order to use this property, wrap option should be "behind";
     *  In Front of Text : In order to use this property, wrap option should be "front".
     * @param rotation The rotation of the image in degrees.
     * @param transparency The transparency of the image in percent.
     * @param url The URL to load when the image is clicked.
     * @param width The width of the image (for non-proportional scaling).
     * @param height The height of the image (for non-proportional scaling).
     * @param maintainAspectRatio if True: maintain the aspect ratio of the image, width should be specified for this option to work.
     * @returns the generated Image object from raw data
     */
    static fromRaw(
        name: string,
        data: Buffer,
        maxWidth?: number | string,
        maxHeight?: number | string,
        altText?: string,
        wrapText?: string,
        rotation?: number,
        transparency?: number | string,
        url?: string,
        width?: number | string,
        height?: number | string,
        maintainAspectRatio?: boolean,
    ) {
        return new Image(
            name,
            fileUtils.rawToBase64(data),
            maxWidth,
            maxHeight,
            altText,
            wrapText,
            rotation,
            transparency,
            url,
            width,
            height,
            maintainAspectRatio,
        );
    }

    /**
     * Generate an Image object from a base64 string.
     * @param name The name of the image element.
     * @param source The source for the image: base64 or URL.
     * @param maxWidth The maximum width of the image (for proportional scaling).
     * @param maxHeight The maximum height of the image (for proportional scaling).
     * @param altText The alternative text for the image, used when the image can't be loaded.
     * @param wrapText The wrapping mode of the text around the image. The options are:
     *  In line with text: This option is the default.
     *      If no wrap option specified images will wrapped in line with text;
     *  Square : In order to use this property, wrap option should be "square";
     *  Top and Bottom : In order to use this property, wrap option should be "top-bottom";
     *  Behind Text : In order to use this property, wrap option should be "behind";
     *  In Front of Text : In order to use this property, wrap option should be "front".
     * @param rotation The rotation of the image in degrees.
     * @param transparency The transparency of the image in percent.
     * @param url The URL to load when the image is clicked.
     * @param width The width of the image (for non-proportional scaling).
     * @param height The height of the image (for non-proportional scaling).
     * @param maintainAspectRatio if True: maintain the aspect ratio of the image, width should be specified for this option to work.
     * @returns the generated Image object from a base64 string
     */
    static fromBase64(
        name: string,
        base64str: string,
        maxWidth?: number | string,
        maxHeight?: number | string,
        altText?: string,
        wrapText?: string,
        rotation?: number,
        transparency?: number | string,
        url?: string,
        width?: number | string,
        height?: number | string,
        maintainAspectRatio?: boolean,
    ) {
        return new Image(
            name,
            base64str,
            maxWidth,
            maxHeight,
            altText,
            wrapText,
            rotation,
            transparency,
            url,
            width,
            height,
            maintainAspectRatio,
        );
    }

    /**
     * Generate an Image object from a URL.
     * @param name The name of the image element.
     * @param urlSource The source for the image: base64 or URL.
     * @param maxWidth The maximum width of the image (for proportional scaling).
     * @param maxHeight The maximum height of the image (for proportional scaling).
     * @param altText The alternative text for the image, used when the image can't be loaded.
     * @param wrapText The wrapping mode of the text around the image. The options are:
     *  In line with text: This option is the default.
     *      If no wrap option specified images will wrapped in line with text;
     *  Square : In order to use this property, wrap option should be "square";
     *  Top and Bottom : In order to use this property, wrap option should be "top-bottom";
     *  Behind Text : In order to use this property, wrap option should be "behind";
     *  In Front of Text : In order to use this property, wrap option should be "front".
     * @param rotation The rotation of the image in degrees.
     * @param transparency The transparency of the image in percent.
     * @param url The URL to load when the image is clicked.
     * @param width The width of the image (for non-proportional scaling).
     * @param height The height of the image (for non-proportional scaling).
     * @param maintainAspectRatio if True: maintain the aspect ratio of the image, width should be specified for this option to work.
     * @returns the generated Image object from a URL
     */
    static fromUrl(
        name: string,
        urlSource: string,
        maxWidth?: number | string,
        maxHeight?: number | string,
        altText?: string,
        wrapText?: string,
        rotation?: number,
        transparency?: number | string,
        url?: string,
        width?: number | string,
        height?: number | string,
        maintainAspectRatio?: boolean,
    ) {
        return new Image(
            name,
            urlSource,
            maxWidth,
            maxHeight,
            altText,
            wrapText,
            rotation,
            transparency,
            url,
            width,
            height,
            maintainAspectRatio,
        );
    }
}
