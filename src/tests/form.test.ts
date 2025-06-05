import { describe, test, expect } from '@jest/globals';
import * as cop from '../index';
import { Textbox, RadioButton, Checkbox } from '../elements';


describe('PDF Form Elements', () => {
  test('Textbox ', () => {
    const textbox = new Textbox(
      'last_name',
      'Apex R&D',
      20,
      200,
      true
    );
    
    expect(textbox.asDict()).toEqual({
      "last_name": [{
        "type": "text",
        "name": "last_name",
        "value": "Apex R&D",
        "height": 20,
        "width": 200,
        "multiline": 1
      }]
    });
  });

  test('RadioButton', () => {
    const radio = new RadioButton(
      'Radiolist',
      'List A',
      'List Option A',
      true,
      15,
      100
    );
    
    expect(radio.asDict()).toEqual({
      "Radiolist": [{
        "type": "radio",
        "name": "Radiolist",
        "value": "List A",
        "text": "List Option A",
        "selected": 1,
        "height": 15,
        "width": 100
      }]
    });
  });

  test('Checkbox', () => {
    const checkbox = new Checkbox(
      'Checkbox',
      true,
      'IsChecked',
      20,
      200
    );
    
    expect(checkbox.asDict()).toEqual({
      "Checkbox": [{
        "type": "checkbox",
        "name": "Checkbox",
        "value": 1,
        "text": "IsChecked",
        "height": 20,
        "width": 200
      }]
    });
  });

  test('Multiple radio buttons in group', () => {
    const radio1 = new RadioButton('Radiolist', 'List A', 'Option A', true);
    const radio2 = new RadioButton('Radiolist', 'List B', 'Option B', false);
    
    const combined = {
      Radiolist: [
        ...radio1.asDict().Radiolist,
        ...radio2.asDict().Radiolist
      ]
    };
    
    expect(combined).toEqual({
      "Radiolist": [
        {
          "type": "radio",
          "name": "Radiolist",
          "value": "List A",
          "text": "Option A",
          "selected": 1
        },
        {
          "type": "radio",
          "name": "Radiolist",
          "value": "List B",
          "text": "Option B",
          "selected": 0
        }
      ]
    });
  });
});