import { Element, ElementCollection, Property } from './elements';

/**
 * The class for representing loops of elements.
 */
export class ForEach extends Element {
    content: Element[];
    tags: Set<string>;

    /**
     * @param name The name for this element (Cloud Office Print tag).
     * @param content An iterable containing the elements for this loop element.
     */
    constructor(name: string, content: Element[]) {
        super(name);
        this.content = content;
        // if this.tags should be overwritten in a subclass of this one,
        //  remember to do so after calling super()
        this.tags = new Set([`{#${name}}`, `{/${name}}`]);
    }

    /**
     * A set containing all available template tags this Element reacts to.
     * @returns set of tags associated with this Element
     */
    availableTags(): Set<string> {
        const result: Set<string> = this.tags;

        this.content.forEach(
            (value) => {
                value.availableTags().forEach(
                    (tag) => {
                        result.add(tag);
                    },
                );
            },
        );

        return result;
    }

    /**
     * The dict representation of this object
     * @returns dict representation of this object
     */
    asDict() {
        return {
            [this.name]: Array.from(this.content.map((el) => el.asDict())),
        };
    }
}

/**
 * Cloud Office Print also provides a way to print labels in Word documents.
 * To do so you can create a document with labels by going to Mailings options and then to Labels.
 * Fill in the tags in the address field and choose the type of label in the Label option.
 * A document can then be generated by clicking New document.
 * Currently however if labels are getting printed then we expect the document only containing
 * labels and no other information and that the tag keys are not used more than once.
 */
export class Labels extends ForEach {
    tags: Set<string>;

    /**
     * @param name The name for this element (Cloud Office Print tag).
     * @param content An iterable containing the elements for this loop element.
     */
    constructor(name: string, content: Element[]) {
        super(name, content);
        this.tags = new Set([`{-${name}}`]);
    }
}

/**
 * Loop where a slide will be repeated for each element of the loop.
 * Only supported in PowerPoint templates.
 */
export class ForEachSlide extends ForEach {
    tags: Set<string>;

    /**
     * @param name The name for this element (Cloud Office Print tag).
     * @param content An iterable containing the elements for this loop element.
     */
    constructor(name: string, content: Element[]) {
        super(name, content);
        this.tags = new Set([`{!${name}}`]);
    }
}

/**
 * Loop where a sheet will be repeated for each element of the loop.
 * Only supported in Excel templates.
 */
export class ForEachSheet extends ForEach {
    tags: Set<string>;

    /**
     * @param name The name for this element (Cloud Office Print tag).
     * @param content An iterable or mapping containing the elements for this loop element.
     */
    constructor(name: string, content: Element[] | { [key: string]: Element }) {
        let contentCopy = content;

        // when content is a mapping, it means "sheet name": content for that sheet
        // when it's just an iterable, don't add sheet names (or users can add a Property manually)
        if (contentCopy.constructor === Object) {
            const newContent: Element[] = [];

            Object.entries(contentCopy).forEach(
                ([sheetname, sheetcontent]) => {
                    let sheetcontentCopy = sheetcontent;
                    // we need to add the additional sheet_name property,
                    //  so we should convert the Element to an ElementCollection if needed
                    if (!(sheetcontentCopy instanceof ElementCollection)) {
                        sheetcontentCopy = ElementCollection
                            .elementToElementCollection(sheetcontentCopy);
                    }
                    // adding the new property containing sheet_name
                    (sheetcontentCopy as ElementCollection).add(new Property('sheet_name', sheetname));
                    newContent.push(sheetcontentCopy);
                },
            );

            contentCopy = newContent;
        }
        super(name, contentCopy as Element[]);
        this.tags = new Set([`{!${name}}`]);
    }
}

/**
 * Horizontal table looping for Word, Excel and CSV templates.
 * Note: this tag can be used to repeat only one row in Word.
 * In Excel this works like a normal loop tag and repeats the cells defined by the rectangular
 * boundary of the starting and closing tag.
 */
export class ForEachInline extends ForEach {
    tags: Set<string>;

    /**
     * @param name The name for this element (Cloud Office Print tag).
     * @param content An iterable containing the elements for this loop element.
     */
    constructor(name: string, content: Element[]) {
        super(name, content);
        this.tags = new Set([`{:${name}}`, `/${name}`]);
    }
}

/**
 * These are the same, but they may not be forever and
 *  combining them into one class breaks consistency
 */
export class ForEachHorizontal extends ForEachInline { }

/**
 * This tag will merge the cells of the loop defined by the tag over the amount of elements rows.
 * Only supported in PowerPoint templates.
 */
export class ForEachTableRow extends ForEach {
    tags: Set<string>;

    /**
     * @param name The name for this element (Cloud Office Print tag).
     * @param content An iterable containing the elements for this loop element.
     */
    constructor(name: string, content: Element[]) {
        super(name, content);
        this.tags = new Set([`{=${name}}`, `{/${name}}`]);
    }
}
