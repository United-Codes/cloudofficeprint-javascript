export class TransformationFunction {
    private _jsCode?: string;
    private _filename?: string;

    /**
     * Create a TransformationFunction instance
     * @param jsCode Inline JavaScript code for transformation
     * @param filename Filename from assets/transformation_function/ directory
     */
    constructor(jsCode?: string, filename?: string) {
        if (jsCode  && filename) {
            throw new Error("Cannot set both jsCode & filename");
        }
        this._jsCode = jsCode;
        this._filename = filename;
    }

    get jsCode(): string | undefined {
        return this._jsCode;
    }

    set jsCode(code: string | undefined) {
        if (code === undefined) {
            this._jsCode = undefined;
            return;
        }

        if (this._filename) {
            throw new Error("Cannot set jsccode when filename is already set");
        }

        if (!code.trim()) {
            throw new Error("jscode must be a non empty string");
        }

        this._jsCode = code;
    }

    get filename(): string | undefined {
        return this._filename;
    }

    set filename(name: string | undefined) {
        if (name === undefined) {
            this._filename = undefined;
            return;
        }

        if (this._jsCode) {
            throw new Error("Cannot set filename when jsCode is already set");
        }

        if (typeof name !== "string" || !name.toLowerCase().endsWith(".js")) {
            throw new Error("Filename must end with .js");
        }

        if (name.includes("/") || name.includes("\\")) {
            throw new Error("Filename must not include path separators");
        }

        this._filename = name;
    }

    /**
     * @returns The active transformation value (inline JS or filename)
     */
    toDict(): string {
        if (this._jsCode) {
            return this._jsCode;
        }
        if (this._filename) {
            return this._filename; 
        }
        throw new Error("No transformation defined");
    }
}