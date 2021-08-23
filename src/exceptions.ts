/**
 * Custom exceptions for cloudofficeprint.
 */

/**
 * The error that is thrown when the Cloud Office Print server itself returns an error
 * instead of a result.
 * It contains a user message and an encoded message to be handed to Cloud Office Print support
 * if they are contacted.
 */
export class COPError extends Error {
    userMessage: string;
    contactSupportMessage: string;
    encodedMessage: string;

    /**
     * @param fullMessage the full error message received from the Cloud Office Print server
     */
    constructor(fullMessage: string) {
        const split = COPError.splitMessage(fullMessage);
        super(split[0]);
        [this.userMessage,
            this.contactSupportMessage,
            this.encodedMessage] = COPError.splitMessage(fullMessage);
    }

    /**
     * Split the Cloud Office Print server error message into different parts:
     *  user message, contact support message and encoded message.
     * @param message Cloud Office Print server error message
     * @returns an array with the split messages
     */
    static splitMessage(message: string): string[] {
        const separated: string[] = message.split('\n');
        const userMessage: string = separated.slice(0, separated.length - 2).join('\n');
        const contactSupportMessage: string = separated[separated.length - 2];
        const encodedMessage: string = separated[separated.length - 1];
        return [userMessage, contactSupportMessage, encodedMessage];
    }
}
