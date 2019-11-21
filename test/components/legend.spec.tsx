import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { MapLayer } from "../../src/api/contracts/runtime-map";
import { LayerNode } from "../../src/components/legend";
import { ILegendContext, LegendContext } from "../../src/components/context";

// Mocks the ILegendContext needed by LayerNode and other legend sub-components
function mockContext(): ILegendContext {
    return {
        getIconMimeType: () => "image/png",
        getChildren: (id) => [],
        getCurrentScale: () => this.props.currentScale,
        getTree: () => { },
        getGroupVisibility: (group) => group.ActuallyVisible,
        getLayerVisibility: (layer) => layer.ActuallyVisible,
        setGroupVisibility: () => { },
        setLayerVisibility: () => { },
        getLayerSelectability: (layer) => true,
        setLayerSelectability: () => { },
        getGroupExpanded: (group) => true,
        setGroupExpanded: () => { },
        getLayerExpanded: (layer) => true,
        setLayerExpanded: () => { }
    };
}

describe("components/legend", () => {
    it("renders a themed layer", () => {
        const layer: MapLayer = {
            Type: 1,
            Selectable: true,
            LayerDefinition: "Library://Samples/Sheboygan/Layers/Parcels.LayerDefinition",
            Name: "Parcels",
            LegendLabel: "Parcels",
            ObjectId: "abcd1234",
            DisplayInLegend: true,
            ExpandInLegend: true,
            Visible: true,
            ActuallyVisible: true,
            ScaleRange: [
                {
                    MinScale: 0,
                    MaxScale: 10000,
                    FeatureStyle: [
                        {
                            Type: 3,
                            Rule: [
                                {
                                    Filter: "RTYPE = 'AGR'",
                                    Icon: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1jnNBe9V+A4zcDOeDDD1YGFgGO3wyK/F/JMuA+AzcDE1k6kcCoAaMGjBoAASwffrAy3GfgJkvzhx+sDADG4w2aBVCvyQAAAABJRU5ErkJggg==",
                                    LegendLabel: "Zone: AGR"
                                },
                                {
                                    Filter: "RTYPE = 'EXM'",
                                    Icon: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1j7Ous+c/H9YeBHPDpGwsDCx/XHwZZ4R9kGfCYgYOBiSydSGDUgFEDRg2AAJZP31gYHjNwkKX50zcWBgDh7w2gYiFR3wAAAABJRU5ErkJggg==",
                                    LegendLabel: "Zone: EXM"
                                },
                                {
                                    Filter: "RTYPE = 'MER'",
                                    Icon: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1j7Omu/c/L84+BHPD5CxMDCy/PPwZJ8T9kGcDAwMLARKZOOBg1YNSAUQMggOXzFyYGBgYWsjR//sLEAACRYwvU9QFABgAAAABJRU5ErkJggg==",
                                    LegendLabel: "Zone: MER"
                                },
                                {
                                    Filter: "RTYPE = 'MFG'",
                                    Icon: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAD5JREFUOI1j7Oqt/8/Nx0AW+PqJgYGFm4+BQUz6P1kGvGJgZGAiz24EGDVg1IBRAyCA5esnSK4iB3z9xMAAAEnVC6Y05mSVAAAAAElFTkSuQmCC",
                                    LegendLabel: "Zone: MFG"
                                },
                                {
                                    Filter: "RTYPE = 'RES'",
                                    Icon: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1j7Oxv/M8pwMhADvj+4T8DC6cAI4OQPDNZBrxj+MvARJZOJDBqwKgBowZAAMv3D/8Z3jH8JUvz9w//GQB8Kg+sTL/RWAAAAABJRU5ErkJggg==",
                                    LegendLabel: "Zone: RES"
                                },
                                {
                                    Filter: "RTYPE = 'S&W'",
                                    Icon: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAENJREFUOI1jbJ/Y/J9diJmBHPDz3V8GFnYhZgZ+ZTayDPjI8IuBiSydSGDUgFEDRg2AAJaf7/4yfGT4RZbmn+/+MgAAmvYPsIiS2soAAAAASUVORK5CYII=",
                                    LegendLabel: "Zone: S&W"
                                },
                                {
                                    Filter: "RTYPE = 'WTC'",
                                    Icon: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1jbJ3c8p9NhJWBHPDrzW8GFjYRVgZudS6yDGBg+MbARKZOOBg1YNSAUQMggOXXm98MDAzfyNL8681vBgAVJg3IbKdDKgAAAABJRU5ErkJggg==",
                                    LegendLabel: "Zone: WTC"
                                },
                                {
                                    Icon: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADdJREFUOI1jNDU1/W9qaspADjh9+jQDi6mpKUNWVhZZBkybNo2BiSydSGDUgFEDRg2AAEZKszMAWEoM/Dho0fsAAAAASUVORK5CYII=",
                                    LegendLabel: "Zone: Other"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        const wrapper = mount(<LegendContext.Provider value={mockContext()}>
            <LayerNode layer={layer} />
        </LegendContext.Provider>);
        const rules = wrapper.find("RuleNode");
        expect(rules.length).toBe(8);
    });
    it("renders a multi-geom-style layer with a rule for each geom style", () => {
        const layer: MapLayer = {
            Type: 1,
            Selectable: true,
            LayerDefinition: "Session:841258e8-63f9-11e7-8000-0a002700000f_en_MTI3LjAuMC4x0AFC0AFB0AFA//testing.LayerDefinition",
            Name: "_testing",
            LegendLabel: "testing",
            ObjectId: "abcd12345",
            DisplayInLegend: true,
            ExpandInLegend: true,
            Visible: true,
            ActuallyVisible: true,
            ScaleRange: [
                {
                    MinScale: 0,
                    MaxScale: 10000,
                    FeatureStyle: [
                        {
                            Type: 4,
                            Rule: [
                                {
                                    Icon: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1j/M/A8J+BAsBEieZRA0YNGDVgMBkAAFhtAh6Zl924AAAAAElFTkSuQmCC"
                                }
                            ]
                        },
                        {
                            Type: 4,
                            Rule: [
                                {
                                    Icon: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAACVJREFUOI1jYBgFwwAwMjD8bcAjL8rAwKCNR56LibruGQVDFAAACkEBy4yPOpAAAAAASUVORK5CYII="
                                }
                            ]
                        },
                        {
                            Type: 4,
                            Rule: [
                                {
                                    Icon: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAFhJREFUOI3t0D0OQFAUROHPIwoNS7ZJe5BoKJR+OpVH4jUkTjv3TDI3w6Z2zooNeSSfKNQYIwd3NISH6sFfQLCkFmQJdkVIGlG+44mfLyjMaCPpgO7C7tkBAXgKXzBhmUQAAAAASUVORK5CYII="
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        const wrapper = mount(<LegendContext.Provider value={mockContext()}>
            <LayerNode layer={layer} />
        </LegendContext.Provider>);
        const rules = wrapper.find("RuleNode");
        expect(rules.length).toBe(3); //One for each geom style
    });
});