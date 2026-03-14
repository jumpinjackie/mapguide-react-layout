import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { LayerNode, Legend } from "../../src/components/legend";
import { ILegendContext, LegendContext } from "../../src/components/context";
import { RuntimeMap, MapLayer } from "../../src/api/contracts/runtime-map";

// Minimal mock context for basic rendering test
const createMockContext = (): ILegendContext => ({
    stateless: false,
    isFiltering: () => false,
    getMapName: () => undefined,
    getSessionId: () => undefined,
    getFilterText: () => "",
    getLocale: () => "en",
    getBaseIconSize: () => 16,
    getIconMimeType: () => "image/png",
    getChildren: () => [],
    getCurrentScale: () => 5000,
    getTree: () => ({ root: [], groupChildren: {} }),
    getGroupVisibility: () => true,
    getLayerVisibility: (l: any) => l.Visible ?? true,
    setGroupVisibility: () => { },
    setLayerVisibility: () => { },
    getLayerSelectability: () => true,
    setLayerSelectability: () => { },
    getGroupExpanded: (g: any) => g.ExpandInLegend ?? false,
    setGroupExpanded: () => { },
    getLayerExpanded: () => true,
    setLayerExpanded: () => { }
});

const createMockMap = (layers: MapLayer[] = []): RuntimeMap => ({
    SiteVersion: { Major: 0, Minor: 0, Build: 0, Revision: 0 },
    Name: "testmap",
    SessionId: "sess",
    MapDefinition: { Id: "def", Type: "MAP" } as any,
    TileSetDefinition: undefined,
    TileWidth: undefined,
    TileHeight: undefined,
    BackgroundColor: 0xFFFFFF,
    DisplayDpi: 96,
    IconMimeType: "image/png",
    CoordinateSystem: { Wkt: "", MentorCode: "", EpsgCode: "", MetersPerUnit: 1 } as any,
    Extents: { LowerLeftCoordinate: { X: 0, Y: 0 }, UpperRightCoordinate: { X: 100, Y: 100 } } as any,
    Group: [],
    Layer: layers,
    FiniteDisplayScale: undefined
} as any);

describe("Legend component basic rendering", () => {
    it("renders without crashing and shows layer label", () => {
        const ctx = createMockContext();
        const layer: MapLayer = { Type: 1, Selectable: true, LayerDefinition: "def", LegendLabel: "Test Layer", Name: "layer1", ObjectId: "id1", DisplayInLegend: true, ExpandInLegend: false, Visible: true, ActuallyVisible: true, ScaleRange: [{ MinScale: 0, MaxScale: 10000, FeatureStyle: [] }] } as any;
        const map = createMockMap([layer]);
        const { getByText } = render(
            <LegendContext.Provider value={ctx}>
                <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" maxHeight={200} inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} onLayerVisibilityChanged={ctx.setLayerVisibility} />
            </LegendContext.Provider>
        );
        expect(getByText("Test Layer")).toBeInTheDocument();
    });
});

// Additional advanced tests
const createMockContextWithSpies = () => {
    const setLayerVisibility = vi.fn();
    const setGroupVisibility = vi.fn();
    const setLayerSelectability = vi.fn();
    const setGroupExpanded = vi.fn();
    const setLayerExpanded = vi.fn();
    return {
        stateless: false,
        isFiltering: () => false,
        getMapName: () => undefined,
        getSessionId: () => undefined,
        getFilterText: () => "",
        getLocale: () => "en",
        getBaseIconSize: () => 16,
        getIconMimeType: () => "image/png",
        getChildren: () => [],
        getCurrentScale: () => 5000,
        getTree: () => ({ root: [], groupChildren: {} }),
        getGroupVisibility: () => true,
        getLayerVisibility: (l: any) => l.Visible ?? true,
        setGroupVisibility,
        setLayerVisibility,
        getLayerSelectability: () => true,
        setLayerSelectability,
        getGroupExpanded: (g: any) => g.ExpandInLegend ?? false,
        setGroupExpanded,
        getLayerExpanded: () => true,
        setLayerExpanded
    } as unknown as ILegendContext;
};

describe("Legend component advanced tests", () => {
    it("highlights filter text in layer label", () => {
        const ctx = createMockContextWithSpies();
        ctx.isFiltering = () => true;
        ctx.getFilterText = () => "Test";
        const layer: MapLayer = { Type: 1, Selectable: true, LayerDefinition: "def", LegendLabel: "Test Layer", Name: "layer1", ObjectId: "id1", DisplayInLegend: true, ExpandInLegend: false, Visible: true, ActuallyVisible: true, ScaleRange: [{ MinScale: 0, MaxScale: 10000, FeatureStyle: [] }] } as any;
        const map = createMockMap([layer]);
        const { container } = render(
            <LegendContext.Provider value={ctx}>
                <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" maxHeight={200} inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} onLayerVisibilityChanged={ctx.setLayerVisibility} />
            </LegendContext.Provider>
        );
        expect(container.innerHTML).toContain('Test Layer');
    });

    it("calls setLayerVisibility when checkbox toggled", () => {
        const ctx = createMockContextWithSpies();
        // initial visibility false
        ctx.getLayerVisibility = (l) => l.Visible ?? false;
        const layer: MapLayer = { Type: 1, Selectable: true, LayerDefinition: "def", LegendLabel: "Layer A", Name: "layerA", ObjectId: "idA", DisplayInLegend: true, ExpandInLegend: false, Visible: false, ActuallyVisible: true, ScaleRange: [{ MinScale: 0, MaxScale: 10000, FeatureStyle: [] }] } as any;
        const map = createMockMap([layer]);
        const { container } = render(
            <LegendContext.Provider value={ctx}>
                <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" maxHeight={200} inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} onLayerVisibilityChanged={ctx.setLayerVisibility} />
            </LegendContext.Provider>
        );
        const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
        expect(checkbox.checked).toBe(false);
        fireEvent.click(checkbox);
        expect(ctx.setLayerVisibility).toHaveBeenCalledWith("idA", true);
    });
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
        const { container } = render(<LegendContext.Provider value={createMockContextWithSpies()}>
            <LayerNode layer={layer} />
        </LegendContext.Provider>);
        const rules = container.querySelectorAll("li.layer-rule-node");
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
        const { container } = render(<LegendContext.Provider value={createMockContextWithSpies()}>
            <LayerNode layer={layer} />
        </LegendContext.Provider>);
        const rules = container.querySelectorAll("li.layer-rule-node");
        expect(rules).toHaveLength(3); //One for each geom style
    });
});

describe("Legend context menu", () => {
    const makeLayer = (id: string, label: string, selectable = true): MapLayer => ({
        Type: 1,
        Selectable: selectable,
        LayerDefinition: "def",
        LegendLabel: label,
        Name: id,
        ObjectId: id,
        DisplayInLegend: true,
        ExpandInLegend: false,
        Visible: true,
        ActuallyVisible: true,
        ScaleRange: [{ MinScale: 0, MaxScale: 10000, FeatureStyle: [] }]
    } as any);

    it("shows context menu items on right-click", () => {
        const map = createMockMap([makeLayer("l1", "Layer 1")]);
        const { container, getByText } = render(
            <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} />
        );
        fireEvent.contextMenu(container.firstChild as Element);
        expect(getByText("Expand All")).toBeInTheDocument();
        expect(getByText("Collapse All")).toBeInTheDocument();
        expect(getByText("All Selectable")).toBeInTheDocument();
        expect(getByText("All Unselectable")).toBeInTheDocument();
        expect(getByText("Show invisible layers")).toBeInTheDocument();
    });

    it("shows Refresh item when onRefresh is provided", () => {
        const onRefresh = vi.fn();
        const map = createMockMap([makeLayer("l1", "Layer 1")]);
        const { container, getByText } = render(
            <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} onRefresh={onRefresh} />
        );
        fireEvent.contextMenu(container.firstChild as Element);
        expect(getByText("Refresh")).toBeInTheDocument();
    });

    it("does not show Refresh item when onRefresh is not provided", () => {
        const map = createMockMap([makeLayer("l1", "Layer 1")]);
        const { container, queryByText } = render(
            <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} />
        );
        fireEvent.contextMenu(container.firstChild as Element);
        expect(queryByText("Refresh")).toBeNull();
    });

    it("calls onRefresh when Refresh menu item is clicked", () => {
        const onRefresh = vi.fn();
        const map = createMockMap([makeLayer("l1", "Layer 1")]);
        const { container, getByText } = render(
            <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} onRefresh={onRefresh} />
        );
        fireEvent.contextMenu(container.firstChild as Element);
        fireEvent.click(getByText("Refresh"));
        expect(onRefresh).toHaveBeenCalledTimes(1);
    });

    it("calls onGroupExpansionChanged for all layers and groups when Expand All is clicked", () => {
        const onGroupExpansionChanged = vi.fn();
        const layer1 = makeLayer("l1", "Layer 1");
        const map = createMockMap([layer1]);
        const { container, getByText } = render(
            <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} onGroupExpansionChanged={onGroupExpansionChanged} />
        );
        fireEvent.contextMenu(container.firstChild as Element);
        fireEvent.click(getByText("Expand All"));
        expect(onGroupExpansionChanged).toHaveBeenCalledWith("l1", true);
    });

    it("calls onGroupExpansionChanged for all layers and groups when Collapse All is clicked", () => {
        const onGroupExpansionChanged = vi.fn();
        const layer1 = makeLayer("l1", "Layer 1");
        const map = createMockMap([layer1]);
        const { container, getByText } = render(
            <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} onGroupExpansionChanged={onGroupExpansionChanged} />
        );
        fireEvent.contextMenu(container.firstChild as Element);
        fireEvent.click(getByText("Collapse All"));
        expect(onGroupExpansionChanged).toHaveBeenCalledWith("l1", false);
    });

    it("calls onLayerSelectabilityChanged for all selectable layers when All Selectable is clicked", () => {
        const onLayerSelectabilityChanged = vi.fn();
        const layer1 = makeLayer("l1", "Layer 1", true);
        const layer2 = makeLayer("l2", "Layer 2", false);
        const map = createMockMap([layer1, layer2]);
        const { container, getByText } = render(
            <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} onLayerSelectabilityChanged={onLayerSelectabilityChanged} />
        );
        fireEvent.contextMenu(container.firstChild as Element);
        fireEvent.click(getByText("All Selectable"));
        expect(onLayerSelectabilityChanged).toHaveBeenCalledWith("l1", true);
        expect(onLayerSelectabilityChanged).not.toHaveBeenCalledWith("l2", true);
    });

    it("calls onLayerSelectabilityChanged for all selectable layers when All Unselectable is clicked", () => {
        const onLayerSelectabilityChanged = vi.fn();
        const layer1 = makeLayer("l1", "Layer 1", true);
        const map = createMockMap([layer1]);
        const { container, getByText } = render(
            <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} onLayerSelectabilityChanged={onLayerSelectabilityChanged} />
        );
        fireEvent.contextMenu(container.firstChild as Element);
        fireEvent.click(getByText("All Unselectable"));
        expect(onLayerSelectabilityChanged).toHaveBeenCalledWith("l1", false);
    });

    it("shows invisible layers when Show invisible layers is toggled", () => {
        // Layer only visible at scale 0-1000, but currentScale is 5000
        const layer: MapLayer = {
            ...makeLayer("l1", "Invisible Layer"),
            ScaleRange: [{ MinScale: 0, MaxScale: 1000, FeatureStyle: [] }]
        } as any;
        const map = createMockMap([layer]);
        const { container, queryByText, getByText } = render(
            <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} />
        );
        // Layer should not be visible at scale 5000
        expect(queryByText("Invisible Layer")).toBeNull();
        // Open context menu and click "Show invisible layers"
        fireEvent.contextMenu(container.firstChild as Element);
        fireEvent.click(getByText("Show invisible layers"));
        // Layer should now be visible
        expect(queryByText("Invisible Layer")).toBeInTheDocument();
    });

    it("toggles context menu label from Show to Hide when invisible layers are shown", () => {
        const layer: MapLayer = {
            ...makeLayer("l1", "Invisible Layer"),
            ScaleRange: [{ MinScale: 0, MaxScale: 1000, FeatureStyle: [] }]
        } as any;
        const map = createMockMap([layer]);
        const { container, getByText, queryByText } = render(
            <Legend stateless={false} showLayers={undefined} hideLayers={undefined} showGroups={undefined} hideGroups={undefined} locale="en" inlineBaseLayerSwitcher={false} activeMapName="testmap" map={map} currentScale={5000} />
        );
        fireEvent.contextMenu(container.firstChild as Element);
        expect(getByText("Show invisible layers")).toBeInTheDocument();
        expect(queryByText("Hide invisible layers")).toBeNull();
        fireEvent.click(getByText("Show invisible layers"));
        // Re-open context menu
        fireEvent.contextMenu(container.firstChild as Element);
        expect(queryByText("Show invisible layers")).toBeNull();
        expect(getByText("Hide invisible layers")).toBeInTheDocument();
    });
});