import { describe, test, expect } from '@jest/globals';
import * as cop from '../index';
import { Textbox, RadioButton, Checkbox, Dropdown, ComboBox, ListBox, PushButton, Password } from '../elements';


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
          "selected": true
        },
        {
          "type": "radio",
          "name": "Radiolist",
          "value": "List B",
          "text": "Option B",
          "selected": false
        }
      ]
    });
  });

  test('Dropdown', () => {
    const dropdown = new Dropdown(
      'country',
      [{ value: 'be', label: 'Belgium' }, { value: 'np', label: 'Nepal' }],
      'be',
      15,
      100
    );

    expect(dropdown.asDict()).toEqual({
      "country": [{
        "type": "dropdown",
        "name": "country",
        "options": [{ value: 'be', label: 'Belgium' }, { value: 'np', label: 'Nepal' }],
        "value": "be",
        "height": 15,
        "width": 100
      }]
    });
  });

  test('ComboBox', () => {
    const combo = new ComboBox(
      'city',
      [{ value: 'bgl', label: 'baglung' }],
      'bgl'
    );

    expect(combo.asDict()).toEqual({
      "city": [{
        "type": "combobox",
        "name": "city",
        "options": [{ value: 'bgl', label: 'baglung' }],
        "value": "bgl"
      }]
    });
  });

  test('ListBox', () => {
    const listbox = new ListBox(
      'roles',
      [{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }],
      ['admin'],
      true
    );

    expect(listbox.asDict()).toEqual({
      "roles": [{
        "type": "listbox",
        "name": "roles",
        "options": [{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }],
        "values": ["admin"],
        "multiSelect": true
      }]
    });
  });

  test('PushButton', () => {
    const button = new PushButton('submit', 'Submit', 20, 80);

    expect(button.asDict()).toEqual({
      "submit": [{
        "type": "pushbutton",
        "name": "submit",
        "caption": "Submit",
        "height": 20,
        "width": 80
      }]
    });
  });

  test('Password', () => {
    const password = new Password('pw', 'secret', 20, 200, true);

    expect(password.asDict()).toEqual({
      "pw": [{
        "type": "password",
        "name": "pw",
        "value": "secret",
        "height": 20,
        "width": 200,
        "lock": true
      }]
    });
  });

  test('Radio group: same-name radios in a collection merge into one array', () => {
    const collection = new cop.elements.ElementCollection();
    collection.add(new RadioButton('radiolist', 'List A', 'List Option A', false));
    collection.add(new RadioButton('radiolist', 'List B', 'List Option B', true));

    expect(collection.asDict()).toEqual({
      radiolist: [
        { type: 'radio', name: 'radiolist', value: 'List A', text: 'List Option A', selected: 0 },
        { type: 'radio', name: 'radiolist', value: 'List B', text: 'List Option B', selected: 1 },
      ],
    });
  });
});