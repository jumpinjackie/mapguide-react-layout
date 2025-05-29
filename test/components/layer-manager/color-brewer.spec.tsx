import { describe, it, expect } from 'vitest';
import { getMaxRamp } from '../../../src/components/layer-manager/color-brewer';

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