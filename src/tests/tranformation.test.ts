import { describe, test, expect } from '@jest/globals';
import * as cop from '../index';

describe('Tests for class TransformationFunction', () => {
  test('inline JS code via constructor', () => {
    const js = 'function transform() {}';
    const tf = new cop.TransformationFunction(js);
    expect(tf.toDict()).toEqual(js);
  });

  test('filename ', () => {
    const filename = 'script.js';
    const tf = new cop.TransformationFunction(undefined, filename);
    expect(tf.toDict()).toEqual(filename);
  });

  test(' jsCode & filename', () => {
    expect(() => {
      new cop.TransformationFunction('code', 'file.js');
    }).toThrow('Cannot set both jsCode & filename');
  });

  test(' filename must end with .js', () => {
    const tf = new cop.TransformationFunction();
    expect(() => {
      tf.filename = 'notjs.txt';
    }).toThrow('Filename must end with .js');
  });

  test('filename must not include path separators', () => {
    const tf = new cop.TransformationFunction();
    expect(() => {
      tf.filename = 'invalid/path.js';
    }).toThrow('Filename must not include path separators');
  });

  test('neither jsCode nor filename throws', () => {
    const tf = new cop.TransformationFunction();
    expect(() => {
      tf.toDict();
    }).toThrow('No transformation defined');
  });
});
