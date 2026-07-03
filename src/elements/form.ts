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
    if (this.selected !== undefined) result.selected = this.selected;
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

/**
 * A value/label pair for choice form elements (Dropdown, ComboBox, ListBox)
 */
export interface FormChoiceOption {
  value: string;
  label?: string;
}

/**
 * The class for Dropdown element
 */
export class Dropdown extends Element {
  sourceType = 'dropdown';
  options: FormChoiceOption[];
  value?: string;
  height?: number | string;
  width?: number | string;
  lock?: boolean;

    /**
     * Constructor for Dropdown element.
     * @param name - The name of the element.
     * @param options - The selectable options, each a { value, label } pair.
     * @param value - The value that is selected by default.
     * @param height - The height of the element.
     * @param width - The width of the element.
     * @param lock - Whether the field is locked (read-only).
     */
  constructor(
    name: string,
    options: FormChoiceOption[],
    value?: string,
    height?: number | string,
    width?: number | string,
    lock?: boolean
  ) {
    super(name);
    this.options = options;
    this.value = value;
    this.height = height;
    this.width = width;
    this.lock = lock;
  }

    /**
     *
     * @returns A set of available tags for the Dropdown element.
     * The tag is in the format `{?form <name>}`.
     */
  availableTags(): Set<string> {
    return new Set([`{?form ${this.name}}`]);
  }

    /**
     * Converts the Dropdown element to a dictionary format.
     * @returns A dictionary representation of the Dropdown element.
     */
  asDict(): { [key: string]: any } {
    const result: { [key: string]: any } = {
      type: this.sourceType,
      name: this.name,
      options: this.options
    };
    if (this.value !== undefined) result.value = this.value;
    if (this.height !== undefined) result.height = this.height;
    if (this.width !== undefined) result.width = this.width;
    if (this.lock !== undefined) result.lock = this.lock;

    return { [this.name]: [result] };
  }
}

/**
 * The class for ComboBox elements. A ComboBox is an editable dropdown.
 */
export class ComboBox extends Dropdown {
  sourceType = 'combobox';
}

/**
 * The class for ListBox elements.
 */
export class ListBox extends Element {
  sourceType = 'listbox';
  options: FormChoiceOption[];
  values?: string[];
  multiSelect?: boolean;
  height?: number | string;
  width?: number | string;
  lock?: boolean;

    /**
     * Constructor for ListBox element.
     * @param name - The name of the element.
     * @param options - The selectable options, each a { value, label } pair.
     * @param values - The values that are selected by default.
     * @param multiSelect - Whether multiple options can be selected.
     * @param height - The height of the element.
     * @param width - The width of the element.
     * @param lock - Whether the field is locked (read-only).
     */
  constructor(
    name: string,
    options: FormChoiceOption[],
    values?: string[],
    multiSelect?: boolean,
    height?: number | string,
    width?: number | string,
    lock?: boolean
  ) {
    super(name);
    this.options = options;
    this.values = values;
    this.multiSelect = multiSelect;
    this.height = height;
    this.width = width;
    this.lock = lock;
  }

    /**
     *
     * @returns A set of available tags for the ListBox element.
     * The tag is in the format `{?form <name>}`.
     */
  availableTags(): Set<string> {
    return new Set([`{?form ${this.name}}`]);
  }

    /**
     * Converts the ListBox element to a dictionary format.
     * @returns A dictionary representation of the ListBox element.
     */
  asDict(): { [key: string]: any } {
    const result: { [key: string]: any } = {
      type: this.sourceType,
      name: this.name,
      options: this.options
    };
    if (this.values !== undefined) result.values = this.values;
    if (this.multiSelect !== undefined) result.multiSelect = this.multiSelect;
    if (this.height !== undefined) result.height = this.height;
    if (this.width !== undefined) result.width = this.width;
    if (this.lock !== undefined) result.lock = this.lock;

    return { [this.name]: [result] };
  }
}

/**
 * The class for PushButton elements.
 */
export class PushButton extends Element {
  sourceType = 'pushbutton';
  caption?: string;
  height?: number | string;
  width?: number | string;
  lock?: boolean;

    /**
     * Constructor for PushButton element.
     * @param name - The name of the element.
     * @param caption - The text shown on the button.
     * @param height - The height of the element.
     * @param width - The width of the element.
     * @param lock - Whether the field is locked (read-only).
     */
  constructor(
    name: string,
    caption?: string,
    height?: number | string,
    width?: number | string,
    lock?: boolean
  ) {
    super(name);
    this.caption = caption;
    this.height = height;
    this.width = width;
    this.lock = lock;
  }

    /**
     *
     * @returns A set of available tags for the PushButton element.
     * The tag is in the format `{?form <name>}`.
     */
  availableTags(): Set<string> {
    return new Set([`{?form ${this.name}}`]);
  }

    /**
     * Converts the PushButton element to a dictionary format.
     * @returns A dictionary representation of the PushButton element.
     */
  asDict(): { [key: string]: any } {
    const result: { [key: string]: any } = {
      type: this.sourceType,
      name: this.name
    };
    if (this.caption !== undefined) result.caption = this.caption;
    if (this.height !== undefined) result.height = this.height;
    if (this.width !== undefined) result.width = this.width;
    if (this.lock !== undefined) result.lock = this.lock;

    return { [this.name]: [result] };
  }
}

/**
 * The class for Password field elements.
 */
export class Password extends Element {
  sourceType = 'password';
  value?: string;
  height?: number | string;
  width?: number | string;
  lock?: boolean;

    /**
     * Constructor for Password element.
     * @param name - The name of the element.
     * @param value - The value of the element.
     * @param height - The height of the element.
     * @param width - The width of the element.
     * @param lock - Whether the field is locked (read-only).
     */
  constructor(
    name: string,
    value?: string,
    height?: number | string,
    width?: number | string,
    lock?: boolean
  ) {
    super(name);
    this.value = value;
    this.height = height;
    this.width = width;
    this.lock = lock;
  }

    /**
     *
     * @returns A set of available tags for the Password element.
     * The tag is in the format `{?form <name>}`.
     */
  availableTags(): Set<string> {
    return new Set([`{?form ${this.name}}`]);
  }

    /**
     * Converts the Password element to a dictionary format.
     * @returns A dictionary representation of the Password element.
     */
  asDict(): { [key: string]: any } {
    const result: { [key: string]: any } = {
      type: this.sourceType,
      name: this.name
    };
    if (this.value !== undefined) result.value = this.value;
    if (this.height !== undefined) result.height = this.height;
    if (this.width !== undefined) result.width = this.width;
    if (this.lock !== undefined) result.lock = this.lock;

    return { [this.name]: [result] };
  }
}