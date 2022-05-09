import { describe, test, expect } from '@jest/globals';
import * as cop from '../index';

describe('Tests for images', () => {
    test('Test image', () => {
        const image = new cop.elements.Image(
            'image1',
            'url_source',
            50,
            45,
            'alt_text',
            'wrap_text',
            45,
            50,
            'url',
            30,
            25,
            true,
        );
        const imageExpected = {
            image1: 'url_source',
            image1_max_width: 50,
            image1_max_height: 45,
            image1_alt_text: 'alt_text',
            image1_wrap_text: 'wrap_text',
            image1_rotation: 45,
            image1_transparency: 50,
            image1_url: 'url',
            image1_width: 30,
            image1_height: 25,
            image1_maintain_aspect_ratio: true,
        };
        expect(image.asDict()).toEqual(imageExpected);
    });
});
