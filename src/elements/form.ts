import { Element } from './elements';
/**
 * The class for TextBox  elements.
 */
export class Textbox extends Element {
  sourceType = 'text';
  value?: string;
  height?: number | string;
  width?: number | string;
  multiline?: boolean;

    /**
     * Constructor for TextBox element.
     * @param name - The name of the element.
     * @param value - The value of the element.
     * @param height - The height of the element.
     * @param width - The width of the element.
     * @param multiline - Whether the text box is multiline or not.
     */
  constructor(
    name: string,
    value?: string,
    height?: number | string,
    width?: number | string,
    multiline?: boolean
  ) {
    super(name);
    this.value = value;
    this.height = height;
    this.width = width;
    this.multiline = multiline;
  }
/**
 * 
 * @returns A set of available tags for the TextBox element.
 * The tag is in the format `{?form <name>}`.
 */
  availableTags(): Set<string> {
    return new Set([`{?form ${this.name}}`]);
  }

    /**
     * Converts the TextBox element to a dictionary format.
     * @returns A dictionary representation of the TextBox element.
     */
  asDict(): { [key: string]: any } {
    const result: { [key: string]: any } = {
      type: this.sourceType,
      name: this.name
    };
    if (this.value !== undefined) 
        result.value = this.value;
    if (this.height !== undefined) 
        result.height = this.height;
    if (this.width !== undefined) 
        result.width = this.width;
    if (this.multiline !== undefined)
        result.multiline = this.multiline ? 1 : 0;
    
    return { [this.name]: [result] };
  }
}

/**
 * The class for RadioButton elements.
 */

export class RadioButton extends Element {
  sourceType = 'radio';
  value?: string;
  text?: string;
  selected?: boolean;
  height?: number | string;
  width?: number | string;

    /**
     * Constructor for RadioButton element.
     * @param name - The name of the element.
     * @param value - The value of the element.
     * @param text - The text associated with the radio button.
     * @param selected - Whether the radio button is selected or not.
     * @param height - The height of the element.
     * @param width - The width of the element.
     */
  constructor(
    name: string,
    value?: string,
    text?: string,
    selected?: boolean,
    height?: number | string,
    width?: number | string
  ) {
    super(name);
    this.value = value;
    this.text = text;
    this.selected = selected;
    this.height = height;
    this.width = width;
  }
    /**
     * 
     * @returns A set of available tags for the RadioButton element.
     * The tag is in the format `{?form <name>}`.
     */

  availableTags(): Set<string> {
    return new Set([`{?form ${this.name}}`]);
  }

    /**
     * Converts the RadioButton element to a dictionary format.
     * @returns A dictionary representation of the RadioButton element.
     */
  asDict(): { [key: string]: any } {
    const result: { [key: string]: any } = {
      type: this.sourceType,
      name: this.name
    };
    if (this.value !== undefined) result.value = this.value;
    if (this.text !== undefined) result.text = this.text;
    if (this.selected !== undefined) result.selected = this.selected ? 1 : 0;
    if (this.height !== undefined) result.height = this.height;
    if (this.width !== undefined) result.width = this.width;
    
    return { [this.name]: [result] };
  }
}

/**
 * The class for Checkbox elements.
 */
export class Checkbox extends Element {
  sourceType = 'checkbox';
  value?: boolean;
  text?: string;
  height?: number | string;
  width?: number | string;

    /**
     * Constructor for Checkbox element.
     * @param name - The name of the element.
     * @param value - The value of the element.
     * @param text - The text associated with the checkbox.
     * @param height - The height of the element.
     * @param width - The width of the element.
     */
  constructor(
    name: string,
    value?: boolean,
    text?: string,
    height?: number | string,
    width?: number | string
  ) {
    super(name);
    this.value = value;
    this.text = text;
    this.height = height;
    this.width = width;
  }

    /**
     * 
     * @returns A set of available tags for the Checkbox element.
     * The tag is in the format `{?form <name>}`.
     */
  availableTags(): Set<string> {
    return new Set([`{?form ${this.name}}`]);
  }

    /**
     * Converts the Checkbox element to a dictionary format.
     * @returns A dictionary representation of the Checkbox element.
     */
  asDict(): { [key: string]: any } {
    const result: { [key: string]: any } = {
      type: this.sourceType,
      name: this.name
    };
    if (this.value !== undefined) result.value = this.value ? 1 : 0;
    if (this.text !== undefined) result.text = this.text;
    if (this.height !== undefined) result.height = this.height;
    if (this.width !== undefined) result.width = this.width;
    
    return { [this.name]: [result] };
  }
}