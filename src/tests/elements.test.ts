import { describe, test, expect } from '@jest/globals';
import * as cop from '../index';

describe('Tests for elements', () => {
    test(`Test for Property. Also serves as a test for Html, RightToLeft, FootNote,
    Raw, Formula, PageBreak and MarkdownContent.`, () => {
        const prop = new cop.elements.Property(
            'name',
            'value',
        );
        const propExpected = {
            name: 'value',
        };
        expect(prop.asDict()).toEqual(propExpected);
    });
    test('Test cell style property docx', () => {
        const style = new cop.elements.CellStyleDocx(
            '#eb4034',
            10,
        );
        const styleProperty = new cop.elements.CellStyleProperty(
            'name',
            'value',
            style,
        );
        const stylePropertyExpected = {
            name: 'value',
            name_cell_background_color: '#eb4034',
            name_width: 10,
        };
        expect(styleProperty.asDict()).toEqual(stylePropertyExpected);
    });
    test('Test cell style property xlsx', () => {
        const style = new cop.elements.CellStyleXlsx(
            true,
            false,
            '#ff0000',
            'Arial',
            12,
            '#ff0000',
            true,
            false,
            false,
            true,
            false,
            true,
            'medium',
            '#ff0000',
            'mediumDashed',
            '#ff0000',
            'mediumDashDot',
            '#ff0000',
            'mediumDashDotDot',
            '#ff0000',
            'thick',
            'up-wards',
            '#ff0000',
            'center',
            'justify',
            45,
        );
        const styleProperty = new cop.elements.CellStyleProperty(
            'name',
            'value',
            style,
        );
        const stylePropertyExpected = {
            name: 'value',
            name_cell_locked: true,
            name_cell_hidden: false,
            name_cell_background: '#ff0000',
            name_font_name: 'Arial',
            name_font_size: 12,
            name_font_color: '#ff0000',
            name_font_italic: true,
            name_font_bold: false,
            name_font_strike: false,
            name_font_underline: true,
            name_font_superscript: false,
            name_font_subscript: true,
            name_border_top: 'medium',
            name_border_top_color: '#ff0000',
            name_border_bottom: 'mediumDashed',
            name_border_bottom_color: '#ff0000',
            name_border_left: 'mediumDashDot',
            name_border_left_color: '#ff0000',
            name_border_right: 'mediumDashDotDot',
            name_border_right_color: '#ff0000',
            name_border_diagonal: 'thick',
            name_border_diagonal_direction: 'up-wards',
            name_border_diagonal_color: '#ff0000',
            name_text_h_alignment: 'center',
            name_text_v_alignment: 'justify',
            name_text_rotation: 45,
        };
        expect(styleProperty.asDict()).toEqual(stylePropertyExpected);
    });
    test('Test AutoLink', () => {
        const autoLink = new cop.elements.Hyperlink(
            'AutoLink',
            'AutoLink including hyperlinks and text combined',
        );
        const autoLinkExpected = {
            AutoLink:'AutoLink including hyperlinks and text combined'
        };
        expect(autoLink.asDict()).toEqual(autoLinkExpected);
    });
    test('Test hyperlink', () => {
        const hyperlink = new cop.elements.Hyperlink(
            'hyperlink',
            'url',
            'hyperlink_text',
        );
        const hyperlinkExpected = {
            hyperlink: 'url',
            hyperlink_text: 'hyperlink_text',
        };
        expect(hyperlink.asDict()).toEqual(hyperlinkExpected);
    });
    test('Test table of content', () => {
        const toc = new cop.elements.TableOfContents(
            'table',
            'contents',
            4,
            'underscore',
        );
        const tocExpected = {
            table_title: 'contents',
            table_show_level: 4,
            table_tab_leader: 'underscore',
        };
        expect(toc.asDict()).toEqual(tocExpected);
    });
    test('Test span', () => {
        const span = new cop.elements.Span(
            'span_name',
            'This cell will span 2 rows and 3 columns',
            3,
            2,
        );
        const spanExpected = {
            span_name: 'This cell will span 2 rows and 3 columns',
            span_name_col_span: 3,
            span_name_row_span: 2,
        };
        expect(span.asDict()).toEqual(spanExpected);
    });
    test('Test styled property', () => {
        const styledProp = new cop.elements.StyledProperty(
            'cust_first_name',
            'DemoCustomerName',
            'NanumMyeongjo',
            '25pt',
            '#ff00ff',
            true,
            true,
            false,
            false,
            'darkMagenta',
        );
        const styledPropExpected = {
            cust_first_name: 'DemoCustomerName',
            cust_first_name_font_family: 'NanumMyeongjo',
            cust_first_name_font_size: '25pt',
            cust_first_name_font_color: '#ff00ff',
            cust_first_name_bold: true,
            cust_first_name_italic: true,
            cust_first_name_underline: false,
            cust_first_name_strikethrough: false,
            cust_first_name_highlight: 'darkMagenta',
        };
        expect(styledProp.asDict()).toEqual(styledPropExpected);
    });
    test('Test watermark', () => {
        const watermark = new cop.elements.Watermark(
            'wm_name',
            'wm_text',
            'red',
            'Arial',
            50,
            30,
            50,
            -45,
        );
        const watermarkExpected = {
            wm_name: 'wm_text',
            wm_name_color: 'red',
            wm_name_font: 'Arial',
            wm_name_width: 50,
            wm_name_height: 30,
            wm_name_opacity: 50,
            wm_name_rotation: -45,
        };
        expect(watermark.asDict()).toEqual(watermarkExpected);
    });
    test('Test d3 code', () => {
        const d3 = new cop.elements.D3Code(
            'd3_code',
            'test_code',
            ['a', 1, 2, 3, 'b'],
        );
        const d3Expected = {
            d3_code: 'test_code',
            d3_code_data: ['a', 1, 2, 3, 'b'],
        };
        expect(d3.asDict()).toEqual(d3Expected);
    });
    test('Test text box', () => {
        const tbox = new cop.elements.TextBox(
            'tbox_name',
            'tbox_value',
            'Arial',
            'blue',
            12,
            50,
            30,
            25,
        );
        const tboxExpected = {
            tbox_name: 'tbox_value',
            tbox_name_font: 'Arial',
            tbox_name_font_color: 'blue',
            tbox_name_font_size: 12,
            tbox_name_transparency: 50,
            tbox_name_width: 30,
            tbox_name_height: 25,
        };
        expect(tbox.asDict()).toEqual(tboxExpected);
    });
    test('Test element collection', () => {
        const data = new cop.elements.ElementCollection('data'); // Name doesn't get used
        const element1 = cop.elements.Image.fromUrl('image1', 'url_source');
        element1.altText = 'alt_text';
        data.add(element1);
        const element2 = new cop.elements.ForEach(
            'loop',
            [new cop.elements.Property('prop', 'value1'), new cop.elements.Property('prop', 'value2')],
        );
        data.add(element2);
        let dataExpected: { [key: string]: string | { [key: string]: string }[] } = {
            image1: 'url_source',
            image1_alt_text: 'alt_text',
            loop: [
                {
                    prop: 'value1',
                },
                {
                    prop: 'value2',
                },
            ],
        };
        expect(data.asDict()).toEqual(dataExpected);

        data.removeElementByName('image1');
        dataExpected = {
            loop: [
                {
                    prop: 'value1',
                },
                {
                    prop: 'value2',
                },
            ],
        };
        expect(data.asDict()).toEqual(dataExpected);

        const collection = cop.elements.ElementCollection.elementToElementCollection(
            element1,
            'test_name', // Doesn't get used
        );
        const collectionExpected = {
            image1: 'url_source',
            image1_alt_text: 'alt_text',
        };
        expect(collection.asDict()).toEqual(collectionExpected);
    });
    test('Test freeze element', () => {
        const freezeElement = new cop.elements.Freeze('freeze_tag_name', "C10")
        const freezeElementExpected = {
            freeze_tag_name:"C10",
        };
        expect(freezeElement.asDict()).toEqual(freezeElementExpected);
    })
    test('Test insert element',()=>{
        const insertDocument = new cop.elements.Insert('document_to_insert',"base64 encoded document");
        const insertDocumentExpected = {
            document_to_insert:"base64 encoded document",
        }
        expect(insertDocument.asDict()).toEqual(insertDocumentExpected);
    });
    test('Test protect sheet element', () => {
        const protectElement = new cop.elements.ProtectSheet('protect_tag_name', 'password', true, false, true, 'YES', false, true, false, true, 'YES', 'other passord', true, false, true, 'YES');
        const protectElementExpected = {
            protect_tag_name: 'password',
            protect_tag_name_allow_auto_filter: true,
            protect_tag_name_allow_delete_columns: false,
            protect_tag_name_allow_delete_rows: true,
            protect_tag_name_allow_format_cells: 'YES',
            protect_tag_name_allow_format_columns: false,
            protect_tag_name_allow_format_rows: true,
            protect_tag_name_allow_insert_columns: false,
            protect_tag_name_allow_insert_hyperlinks: true,
            protect_tag_name_allow_insert_rows: 'YES',
            protect_tag_name_password: 'other passord',
            protect_tag_name_allow_pivot_tables: true,
            protect_tag_name_allow_select_locked_cells: false,
            protect_tag_name_allow_select_unlocked_cells: true,
            protect_tag_name_allow_sort: 'YES'
        }
        console.log(protectElementExpected);
        expect(protectElement.asDict()).toEqual(protectElementExpected);
    });
    test('Test excel insert element',()=>{
        const excelInsert = new cop.elements.ExcelInsert('fileToInsert',"base64EncodedFile","base64icon",undefined,3,'2px','3px',undefined,3,'2px','50px');
        const excelInsert_expected = {
            "fileToInsert":"base64EncodedFile",
            "fileToInsert_icon":"base64icon",
            "fileToInsert_fromCol":3,
            "fileToInsert_fromRowOff":"2px",
            "fileToInsert_fromColOff":"3px",
            "fileToInsert_toCol":3,
            "fileToInsert_toRowOff":'2px',
            "fileToInsert_toColOff":"50px"
        }
        expect(excelInsert.asDict()).toEqual(excelInsert_expected);
    })
    test('Test embed element',()=>{
        const embedDocument = new cop.elements.Embed('fileToEmbed',"base64 encoded");
        const embedDocumentExpected = {
            fileToEmbed:"base64 encoded",
        }
        expect(embedDocument.asDict()).toEqual(embedDocumentExpected);
    })
    // Cloud Office Print charts get tested in charts.test.ts
});
