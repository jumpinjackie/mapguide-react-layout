import { describe, it, expect } from 'vitest';
import { parseEpsgCodeFromCRS } from '../../../src/components/layer-manager/wfs-capabilities-panel';

describe('parseEpsgCodeFromCRS', () => {
    it('returns 4326 for CRS84', () => {
        expect(parseEpsgCodeFromCRS('urn:ogc:def:crs:OGC:1.3:CRS84')).toBe(4326);
    });

    it('parses EPSG code from urn:ogc:def:crs:EPSG::XXXX', () => {
        expect(parseEpsgCodeFromCRS('urn:ogc:def:crs:EPSG::3857')).toBe(3857);
        expect(parseEpsgCodeFromCRS('urn:ogc:def:crs:EPSG::1234')).toBe(1234);
    });

    it('parses EPSG code from EPSG:XXXX', () => {
        expect(parseEpsgCodeFromCRS('EPSG:4326')).toBe(4326);
        expect(parseEpsgCodeFromCRS('EPSG:3857')).toBe(3857);
    });

    it('returns undefined for unknown or malformed CRS', () => {
        expect(parseEpsgCodeFromCRS('urn:ogc:def:crs:EPSG:')).toBeUndefined();
        expect(parseEpsgCodeFromCRS('foo:bar')).toBeUndefined();
        expect(parseEpsgCodeFromCRS(undefined)).toBeUndefined();
        expect(parseEpsgCodeFromCRS('')).toBeUndefined();
    });
});