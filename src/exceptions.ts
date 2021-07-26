/**
 * Custom exceptions for apexofficeprint.
 */

/**
 * The error that is thrown when the AOP server itself returns an error instead of a result.
 * It contains a user message and an encoded message to be handed to AOP support
 *  if they are contacted.
 */
export class AOPError extends Error {
    userMessage: string;

    contactSupportMessage: string;

    encodedMessage: string;

    /**
     * @param fullMessage the full error message received from the AOP server
     */
    constructor(fullMessage: string) {
        const split = AOPError.splitMessage(fullMessage);
        super(split[0]);
        [this.userMessage,
            this.contactSupportMessage,
            this.encodedMessage] = AOPError.splitMessage(fullMessage);
    }

    /**
     * Split the AOP server error message into different parts:
     *  user message, contact support message and encoded message.
     * @param message AOP server error message
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
