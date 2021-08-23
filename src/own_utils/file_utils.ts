import * as fs from 'fs';

/**
 * Convert raw data to a base64 string
 * @param rawData a Buffer containing the raw data
 * @returns base64 string of the raw data
 */
export function rawToBase64(rawData: Buffer): string {
    return rawData.toString('base64');
}

/* cop-node-only-start */
/**
 * Read a local file as a base64 string
 * @param path path of the local file
 * @returns base64 representation of the file
 */
export function readFileAsBase64(path: string): string {
    return rawToBase64(fs.readFileSync(path));
}
/* cop-node-only-end */
