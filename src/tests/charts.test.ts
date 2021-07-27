import { describe, expect, test } from '@jest/globals';
import { replaceKeyRecursive } from '../elements/charts';

describe('Tests for charts', () => {
    test('Test replaceKeyRecursive', () => {
        const input = {
            x: 1,
            y: [
                {
                    x: {
                        x: 2,
                        y: 5,
                    },
                    y: {
                        x: 3,
                        y: 4,
                    },
                },
                {
                    x: 2,
                    y: 2,
                },
            ],
        };
        const expected = {
            x: 1,
            y2: [
                {
                    x: {
                        x: 2,
                        y2: 5,
                    },
                    y2: {
                        x: 3,
                        y2: 4,
                    },
                },
                {
                    x: 2,
                    y2: 2,
                },
            ],
        };
        expect(replaceKeyRecursive(input, 'y', 'y2')).toEqual(expected);
    });
});
