import * as mime from 'mime-types';

/**
 * Cut off the extension from a file path
 * Example: '/path/to/file.docx' -> 'docx'
 * @param filepath file path to handle
 * @returns the file's type or extension
 */
export function pathToExtension(filepath: string): string {
    return filepath.split('.').pop()!;
}

/**
 * Map an extension or file type to a mime type
 * @param ext extension where we want the mimetype for
 * @returns mime type of the given extension
 */
export function extensionToMimetype(ext: string): string {
    const result: string | false = mime.lookup(ext);
    if (typeof result === 'string') {
        return result;
    }

    throw new Error(`Mimetype for extension ${ext} not found`);
}

/**
 * Map a mime type to an extension or file type
 * @param mimetype mimetype where we want the extension for
 * @returns filetype or extension corresponding to the given mimetype
 */
export function mimetypeToExtension(mimetype: string): string {
    const result: string | false = mime.extension(mimetype);
    if (typeof result === 'string') {
        return result;
    }

    throw new Error(`Extension for mimetype ${mimetype} not found`);
}
