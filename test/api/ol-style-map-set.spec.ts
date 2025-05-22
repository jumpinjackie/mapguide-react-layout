import { describe, it, expect, vi } from 'vitest';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import type Geometry from 'ol/geom/Geometry';
import Style from 'ol/style/Style';
import { OLStyleMapSet } from '../../src/api/ol-style-map-set';
import { type IVectorLayerStyle, type IClusterSettings, ClusterClickAction } from '../../src/api/ol-style-contracts';

function createFeatureWithGeometry(geometry: Geometry) {
    return new Feature({ geometry });
}

const SIMPLE_STYLE: IVectorLayerStyle = {
    default: {
        point: {
            type: 'Circle',
            radius: 5,
            fill: { color: '#ff0000', alpha: 1 },
            stroke: { color: '#000000', width: 1, alpha: 1 }
        },
        line: {
            color: '#00ff00',
            width: 2,
            alpha: 1
        },
        polygon: {
            stroke: { color: '#0000ff', width: 1, alpha: 1 },
            fill: { color: '#00ffff', alpha: 1 }
        }
    }
};

describe('OLStyleMapSet.evaluateStyle', () => {
    it('returns null if feature has no geometry', () => {
        const styleSet = new OLStyleMapSet(SIMPLE_STYLE, undefined);
        const feature = new Feature();
        expect(styleSet.evaluateStyle(feature)).toBeNull();
    });

    it('returns correct style for Point geometry', () => {
        const styleSet = new OLStyleMapSet(SIMPLE_STYLE, undefined);
        const feature = createFeatureWithGeometry(new Point([0, 0]));
        const style = styleSet.evaluateStyle(feature);
        expect(style).toBeInstanceOf(Style);
    });

    it('returns correct style for LineString geometry', () => {
        const styleSet = new OLStyleMapSet(SIMPLE_STYLE, undefined);
        const feature = createFeatureWithGeometry(new LineString([[0, 0], [1, 1]]));
        const style = styleSet.evaluateStyle(feature);
        expect(style).toBeInstanceOf(Style);
    });

    it('returns correct style for Polygon geometry', () => {
        const styleSet = new OLStyleMapSet(SIMPLE_STYLE, undefined);
        const feature = createFeatureWithGeometry(new Polygon([[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]));
        const style = styleSet.evaluateStyle(feature);
        expect(style).toBeInstanceOf(Style);
    });

    it('returns style from filter if filter matches', () => {
        const styleWithFilter: IVectorLayerStyle = {
            ...SIMPLE_STYLE,
            foo: {
                point: {
                    type: 'Circle',
                    radius: 10,
                    fill: { color: '#00ff00', alpha: 1 },
                    stroke: { color: '#000000', width: 1, alpha: 1 }
                }
            }
        };
        const styleSet = new OLStyleMapSet(styleWithFilter, undefined);
        // Patch exprContext to always return 'foo'
        vi.spyOn(styleSet['exprContext'], 'evaluateFilter').mockReturnValue('foo');
        const feature = createFeatureWithGeometry(new Point([0, 0]));
        const style = styleSet.evaluateStyle(feature);
        expect(style).toBeInstanceOf(Style);
    });

    it('returns null and logs error if exception is thrown', () => {
        const styleSet = new OLStyleMapSet(SIMPLE_STYLE, undefined);
        const feature = createFeatureWithGeometry(new Point([0, 0]));
        // Patch getGeometry to throw
        vi.spyOn(feature, 'getGeometry').mockImplementation(() => { throw new Error('fail'); });
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
        expect(styleSet.evaluateStyle(feature)).toBeNull();
        expect(consoleError).toHaveBeenCalled();
        consoleError.mockRestore();
    });
});