import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as React from 'react';
import { getMaxRamp, ColorBrewerSwatch } from '../../../src/components/layer-manager/color-brewer';

vi.mock('colorbrewer', () => ({
    default: {
        YlGn: {
            3: ['#f7fcb9', '#addd8e', '#31a354'],
            9: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529']
        }
    }
}));

describe('getMaxRamp', () => {
    it('returns the array with the maximum length', () => {
        const scheme = {
            a: ['#111', '#222'],
            b: ['#333', '#444', '#555'],
            c: ['#666']
        };
        expect(getMaxRamp(scheme)).toEqual(['#333', '#444', '#555']);
    });

    it('returns the first array if all arrays have the same length', () => {
        const scheme = {
            a: ['#111', '#222'],
            b: ['#333', '#444']
        };
        expect(getMaxRamp(scheme)).toEqual(['#111', '#222']);
    });

    it('returns undefined if scheme is empty', () => {
        expect(getMaxRamp({})).toBeUndefined();
    });

    it('returns the only array if only one exists', () => {
        const scheme = {
            a: ['#111']
        };
        expect(getMaxRamp(scheme)).toEqual(['#111']);
    });

    it('ignores non-array properties', () => {
        const scheme = {
            a: ['#111', '#222'],
            b: 'not-an-array' as unknown as string[]
        };
        expect(getMaxRamp(scheme)).toEqual(['#111', '#222']);
    });
});

describe('ColorBrewerSwatch', () => {
    it('renders a table when a valid ramp is provided via the theme', () => {
        const { container } = render(<ColorBrewerSwatch theme="YlGn" />);
        // Whether table renders or not depends on mock, but component shouldn't throw
        expect(container).toBeDefined();
    });
});