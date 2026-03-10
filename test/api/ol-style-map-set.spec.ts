import { describe, it, expect, vi } from 'vitest';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import type Geometry from 'ol/geom/Geometry';
import Style from 'ol/style/Style';
import { OLStyleMapSet, featureStyleToFlatStyle, vectorStyleToStyleMap } from '../../src/api/ol-style-map-set';
import { type IVectorLayerStyle, type IVectorFeatureStyle, type IClusterSettings, ClusterClickAction } from '../../src/api/ol-style-contracts';
import type { OLFeature } from '../../src/api/ol-types';

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

const CLUSTER_SETTINGS: IClusterSettings = {
    distance: 40,
    onClick: ClusterClickAction.ShowPopup,
    style: SIMPLE_STYLE
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

    it('returns style from matching rule filter', () => {
        const ruleStyle: IVectorLayerStyle = {
            ...SIMPLE_STYLE,
            rules: [
                {
                    filter: ['==', ['get', 'CATEGORY'], 'A'],
                    style: {
                        point: {
                            type: 'Circle',
                            radius: 10,
                            fill: { color: '#00ff00', alpha: 1 },
                            stroke: { color: '#000000', width: 1, alpha: 1 }
                        }
                    }
                }
            ]
        };
        const styleSet = new OLStyleMapSet(ruleStyle, undefined);
        const feature = createFeatureWithGeometry(new Point([0, 0]));
        feature.set('CATEGORY', 'A');
        const style = styleSet.evaluateStyle(feature);
        expect(style).toBeInstanceOf(Style);
    });

    it('falls back to else-rule when no filter matches', () => {
        const ruleStyle: IVectorLayerStyle = {
            default: {
                point: { type: 'Circle', radius: 5, fill: { color: '#aaaaaa', alpha: 255 }, stroke: { color: '#000', width: 1, alpha: 255 } }
            },
            rules: [
                {
                    filter: ['==', ['get', 'CATEGORY'], 'A'],
                    style: {
                        point: { type: 'Circle', radius: 15, fill: { color: '#00ff00', alpha: 255 }, stroke: { color: '#000', width: 1, alpha: 255 } }
                    }
                },
                {
                    else: true,
                    style: {
                        point: { type: 'Circle', radius: 3, fill: { color: '#ff00ff', alpha: 255 }, stroke: { color: '#000', width: 1, alpha: 255 } }
                    }
                }
            ]
        };
        const styleSet = new OLStyleMapSet(ruleStyle, undefined);
        const feature = createFeatureWithGeometry(new Point([0, 0]));
        feature.set('CATEGORY', 'B'); // does not match rule 0
        const style = styleSet.evaluateStyle(feature);
        expect(style).toBeInstanceOf(Style);
    });

    it('falls back to default when no rule matches and no else-rule', () => {
        const ruleStyle: IVectorLayerStyle = {
            ...SIMPLE_STYLE,
            rules: [
                {
                    filter: ['==', ['get', 'X'], 'never'],
                    style: { point: { type: 'Circle', radius: 99, fill: { color: '#ff0000', alpha: 1 }, stroke: { color: '#000', width: 1, alpha: 1 } } }
                }
            ]
        };
        const styleSet = new OLStyleMapSet(ruleStyle, undefined);
        const feature = createFeatureWithGeometry(new Point([0, 0]));
        feature.set('X', 'other');
        const style = styleSet.evaluateStyle(feature);
        expect(style).toBeInstanceOf(Style);
    });

    it('skips rule with a filter that throws and falls back to default', () => {
        const ruleStyle: IVectorLayerStyle = {
            ...SIMPLE_STYLE,
            rules: [
                {
                    filter: ['unknown-op'],
                    style: { point: { type: 'Circle', radius: 50, fill: { color: '#ff0000', alpha: 1 }, stroke: { color: '#000', width: 1, alpha: 1 } } }
                }
            ]
        };
        const styleSet = new OLStyleMapSet(ruleStyle, undefined);
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

    it('returns style for a feature with a dynamic (expression-based) point radius', () => {
        const dynamicStyle: IVectorLayerStyle = {
            default: {
                point: {
                    type: 'Circle',
                    radius: { expr: ['get', 'size'] },
                    fill: { color: '#ff0000', alpha: 255 },
                    stroke: { color: '#000000', width: 1, alpha: 255 }
                }
            }
        };
        const styleSet = new OLStyleMapSet(dynamicStyle, undefined);
        const feature = createFeatureWithGeometry(new Point([0, 0])) as OLFeature;
        feature.set('size', 8);
        const style = styleSet.evaluateStyle(feature);
        expect(style).toBeInstanceOf(Style);
    });
});

describe('OLStyleMapSet.toFlatRules', () => {
    it('produces at least one rule (the default else rule)', () => {
        const styleSet = new OLStyleMapSet(SIMPLE_STYLE, undefined);
        const rules = styleSet.toFlatRules();
        expect(rules.length).toBeGreaterThanOrEqual(1);
        const lastRule = rules[rules.length - 1];
        expect(lastRule.else).toBe(true);
    });

    it('includes rules from IVectorLayerStyle.rules with their filters', () => {
        const styleWithRules: IVectorLayerStyle = {
            ...SIMPLE_STYLE,
            rules: [
                {
                    filter: ['==', ['get', 'TYPE'], 'park'],
                    style: { polygon: { fill: { color: '#00ff00', alpha: 200 }, stroke: { color: '#000', alpha: 255, width: 1 } } }
                }
            ]
        };
        const styleSet = new OLStyleMapSet(styleWithRules, undefined);
        const rules = styleSet.toFlatRules();
        // First rule should have the filter
        expect(rules[0].filter).toEqual(['==', ['get', 'TYPE'], 'park']);
        // Last rule should be the else fallback
        expect(rules[rules.length - 1].else).toBe(true);
    });
});

describe('OLStyleMapSet accessors', () => {
    it('toVectorLayerStyle returns the original style definition', () => {
        const styleSet = new OLStyleMapSet(SIMPLE_STYLE, undefined);
        expect(styleSet.toVectorLayerStyle()).toBe(SIMPLE_STYLE);
    });

    it('toClusterSettings returns undefined when not set', () => {
        const styleSet = new OLStyleMapSet(SIMPLE_STYLE, undefined);
        expect(styleSet.toClusterSettings()).toBeUndefined();
    });

    it('toClusterSettings returns cluster settings when set', () => {
        const styleSet = new OLStyleMapSet(SIMPLE_STYLE, CLUSTER_SETTINGS);
        expect(styleSet.toClusterSettings()).toBe(CLUSTER_SETTINGS);
    });

    it('getClusterClickAction returns undefined when no cluster settings', () => {
        const styleSet = new OLStyleMapSet(SIMPLE_STYLE, undefined);
        expect(styleSet.getClusterClickAction()).toBeUndefined();
    });

    it('getClusterClickAction returns click action from cluster settings', () => {
        const styleSet = new OLStyleMapSet(SIMPLE_STYLE, CLUSTER_SETTINGS);
        expect(styleSet.getClusterClickAction()).toBe(ClusterClickAction.ShowPopup);
    });
});

describe('featureStyleToFlatStyle', () => {
    it('converts a circle point style to flat circle-* properties', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Circle',
                radius: 5,
                fill: { color: '#ff0000', alpha: 255 },
                stroke: { color: '#000000', width: 2, alpha: 255 }
            }
        };
        const flat = featureStyleToFlatStyle(style);
        expect(flat['circle-radius']).toBe(5);
        expect(Array.isArray(flat['circle-fill-color'])).toBe(true);
        expect(flat['circle-stroke-width']).toBe(2);
    });

    it('converts an icon point style to flat icon-* properties', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Icon',
                src: 'marker.png',
                anchor: [0.5, 1],
                rotateWithView: false,
                rotation: 0,
                scale: 1
            }
        };
        const flat = featureStyleToFlatStyle(style);
        expect(flat['icon-src']).toBe('marker.png');
        expect(flat['icon-anchor']).toEqual([0.5, 1]);
    });

    it('converts an icon style with dynamic (expression-based) rotation', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Icon',
                src: 'arrow.png',
                anchor: [0.5, 0.5],
                rotateWithView: false,
                rotation: { expr: ['get', 'heading'] },
                scale: 1
            }
        };
        const flat = featureStyleToFlatStyle(style);
        // Dynamic rotation should produce an OL multiply expression
        expect(Array.isArray(flat['icon-rotation'])).toBe(true);
    });

    it('converts a line style to flat stroke-* properties', () => {
        const style: IVectorFeatureStyle = {
            line: { color: '#00ff00', width: 3, alpha: 128 }
        };
        const flat = featureStyleToFlatStyle(style);
        expect(flat['stroke-width']).toBe(3);
    });

    it('converts a polygon style to flat fill-* and stroke-* properties', () => {
        const style: IVectorFeatureStyle = {
            polygon: {
                fill: { color: '#ff0000', alpha: 100 },
                stroke: { color: '#0000ff', width: 1, alpha: 255 }
            }
        };
        const flat = featureStyleToFlatStyle(style);
        expect(flat['stroke-width']).toBe(1);
        expect(Array.isArray(flat['fill-color'])).toBe(true);
    });

    it('includes label text properties from point style', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Circle',
                radius: 5,
                fill: { color: '#ff0000', alpha: 255 },
                stroke: { color: '#000000', width: 1, alpha: 255 },
                label: {
                    text: { expr: ['get', 'NAME'] },
                    font: '12px sans-serif',
                    fill: { color: '#000000', alpha: 255 }
                }
            }
        };
        const flat = featureStyleToFlatStyle(style);
        expect(flat['text-value']).toEqual(['get', 'NAME']);
        expect(flat['text-font']).toBe('12px sans-serif');
    });

    it('handles dynamic color expression (color is evaluatable, alpha is static)', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Circle',
                radius: 5,
                fill: { color: { expr: ['get', 'color'] }, alpha: 255 },
                stroke: { color: '#000000', width: 1, alpha: 255 }
            }
        };
        const flat = featureStyleToFlatStyle(style);
        // dynamic color expr should be used directly
        expect(flat['circle-fill-color']).toEqual(['get', 'color']);
    });

    it('handles static color + dynamic alpha (produces OL color expression)', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Circle',
                radius: 5,
                fill: { color: '#ff0000', alpha: { expr: ['get', 'opacity'] } },
                stroke: { color: '#000000', width: 1, alpha: 255 }
            }
        };
        const flat = featureStyleToFlatStyle(style);
        // static color + dynamic alpha → ['color', r, g, b, ['/', expr, 255]]
        expect(Array.isArray(flat['circle-fill-color'])).toBe(true);
        expect(flat['circle-fill-color'][0]).toBe('color');
    });

    it('handles both dynamic color and alpha (uses color expression)', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Circle',
                radius: 5,
                fill: { color: { expr: ['get', 'color'] }, alpha: { expr: ['get', 'opacity'] } },
                stroke: { color: '#000000', width: 1, alpha: 255 }
            }
        };
        const flat = featureStyleToFlatStyle(style);
        // both dynamic → uses color expression directly
        expect(flat['circle-fill-color']).toEqual(['get', 'color']);
    });

    it('includes text-stroke-color and text-background-stroke when defined in label', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Circle',
                radius: 5,
                fill: { color: '#ff0000', alpha: 255 },
                stroke: { color: '#000000', width: 1, alpha: 255 },
                label: {
                    text: 'Label',
                    stroke: { color: '#ffffff', width: 2, alpha: 255 },
                    backgroundStroke: { color: '#333333', width: 1, alpha: 255 }
                }
            }
        };
        const flat = featureStyleToFlatStyle(style);
        expect(flat['text-stroke-color']).toBeDefined();
        expect(flat['text-background-stroke-color']).toBeDefined();
    });
});

describe('vectorStyleToStyleMap', () => {
    it('returns a static style map for a non-dynamic point style', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Circle',
                radius: 5,
                fill: { color: '#ff0000', alpha: 255 },
                stroke: { color: '#000000', width: 1, alpha: 255 }
            }
        };
        const result = vectorStyleToStyleMap(style);
        expect(typeof result === 'object' && 'Point' in result).toBe(true);
    });

    it('returns a dynamic style function when a property is an expression', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Circle',
                radius: { expr: ['get', 'size'] },
                fill: { color: '#ff0000', alpha: 255 },
                stroke: { color: '#000000', width: 1, alpha: 255 }
            }
        };
        const result = vectorStyleToStyleMap(style);
        expect(typeof result).toBe('function');
    });

    it('returns a static style map for an icon point style', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Icon',
                src: 'icon.png',
                anchor: [0.5, 1],
                rotateWithView: false,
                rotation: 0,
                scale: 1
            }
        };
        const result = vectorStyleToStyleMap(style);
        // Static icon → static map
        expect(typeof result === 'object' && 'Point' in result).toBe(true);
    });

    it('dynamic style function returns a valid style for a feature', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Circle',
                radius: { expr: ['get', 'size'] },
                fill: { color: '#ff0000', alpha: 255 },
                stroke: { color: '#000000', width: 1, alpha: 255 }
            }
        };
        const result = vectorStyleToStyleMap(style);
        expect(typeof result).toBe('function');
        const feature = new Feature({ geometry: new Point([0, 0]), size: 10 }) as OLFeature;
        const styleMap = (result as Function)(feature);
        expect(styleMap['Point']).toBeInstanceOf(Style);
    });

    it('returns style with text when label is defined in line style', () => {
        const style: IVectorFeatureStyle = {
            line: {
                color: '#000000',
                width: 2,
                alpha: 255,
                label: {
                    text: 'Road',
                    font: '10px sans-serif'
                }
            }
        };
        const result = vectorStyleToStyleMap(style);
        const styleMap = result as any;
        expect(styleMap['LineString']).toBeInstanceOf(Style);
        expect(styleMap['LineString'].getText()).toBeDefined();
    });

    it('returns style with point text when label is defined in dynamic point style', () => {
        const style: IVectorFeatureStyle = {
            point: {
                type: 'Circle',
                radius: { expr: ['get', 'size'] },
                fill: { color: '#ff0000', alpha: 255 },
                stroke: { color: '#000000', width: 1, alpha: 255 },
                label: { text: 'Point Label' }
            }
        };
        const result = vectorStyleToStyleMap(style);
        expect(typeof result).toBe('function');
        const feature = new Feature({ geometry: new Point([0, 0]), size: 5 }) as OLFeature;
        const styleMap = (result as Function)(feature);
        expect(styleMap['Point']).toBeInstanceOf(Style);
        expect(styleMap['Point'].getText()).toBeDefined();
    });

    it('returns style with polygon text when label is defined in dynamic polygon style', () => {
        const style: IVectorFeatureStyle = {
            line: {
                color: { expr: ['get', 'color'] },
                width: 1,
                alpha: 255
            },
            polygon: {
                fill: { color: '#ff0000', alpha: 255 },
                stroke: { color: '#000000', width: 1, alpha: 255 },
                label: { text: 'Poly Label' }
            }
        };
        const result = vectorStyleToStyleMap(style);
        expect(typeof result).toBe('function');
        const feature = new Feature({ geometry: new Point([0, 0]), color: '#ff0000' }) as OLFeature;
        const styleMap = (result as Function)(feature);
        expect(styleMap['Polygon']).toBeInstanceOf(Style);
        expect(styleMap['Polygon'].getText()).toBeDefined();
    });
});