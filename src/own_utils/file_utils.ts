import * as fs from 'fs';

export function bufferToBase64(rawData: Buffer): string {
    return rawData.toString('base64');
}

export function readFileAsBase64(path: string): string {
    return bufferToBase64(fs.readFileSync(path));
}
