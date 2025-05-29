import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IMapGuideProviderState, MapGuideMapProviderContext } from '../../../src/components/map-providers/mapguide';
import { Polygon, type Geometry } from 'ol/geom';
import { IQueryMapFeaturesOptions } from '../../../src/api/request-builder';
import { ActiveMapTool } from '../../../src/api/common';
import * as logger from '../../../src/utils/logger';
import { ActionType } from '../../../src/constants/actions';
import { registerRequestBuilder } from '../../../src/api/builders/factory';
import { MapAgentRequestBuilder } from '../../../src/api/builders/mapagent';
vi.mock('../../../src/utils/logger');

describe('MapGuideMapProviderContext', () => {
    let context: MapGuideMapProviderContext;
    let initialState: IMapGuideProviderState;

    beforeEach(() => {
        initialState = {
            activeTool: ActiveMapTool.None,
            busyWorkers: 0,
            cancelDigitizationKey: 0,
            undoLastPointKey: 0,
            initialExternalLayers: [],
            stateless: false,
            imageFormat: "PNG8",
            agentUri: "http://localhost/mapagent/mapagent.fcgi",
            agentKind: "mapagent",
            map: {} as any,
            pointSelectionBuffer: 2,
            featureTooltipsEnabled: true,
            manualFeatureTooltips: false,
            sessionId: "session123",
            selectionColor: "0000FF",
            selectionImageFormat: "PNG8",
            selectableLayerNames: [],
            layerTransparency: {},
            appSettings: {},
            showGroups: [],
            hideGroups: [],
            showLayers: [],
            hideLayers: [],
            activeSelectedFeatureXml: "",
            activeSelectedFeatureColor: "FF0000",
            selection: null,
            mapName: "TestMap",
            view: undefined,
            viewRotation: 0,
            viewRotationEnabled: false,
            locale: "en",
            externalBaseLayers: [],
            overviewMapElementSelector: undefined
        };
        context = new MapGuideMapProviderContext();
        // @ts-expect-error: _state is protected
        context._state = { ...initialState };
    });

    it('getProviderName returns "MapGuide"', () => {
        expect(context.getProviderName()).toBe("MapGuide");
    });

    it('setMockMode sets mockMode', () => {
        context.setMockMode("mock" as any);
        expect(context.mockMode).toBe("mock");
    });

    it('getMockMode returns mockMode', () => {
        context.setMockMode("mock" as any);
        // @ts-expect-error: protected
        expect(context.getMockMode()).toBe("mock");
    });

    it('getInitialProviderState returns expected defaults', () => {
        // @ts-expect-error: protected
        const state = context.getInitialProviderState();
        expect(state.stateless).toBe(false);
        expect(state.imageFormat).toBe("PNG8");
        expect(state.selectionColor).toBe("0000FF");
    });

    it('getHookFunction returns a function', () => {
        expect(typeof context.getHookFunction()).toBe('function');
    });

    it('mapguideSupport returns itself', () => {
        expect(context.mapguideSupport()).toBe(context);
    });

    it('getSelection returns selection from state', () => {
        // @ts-expect-error: _state is protected
        context._state.selection = { foo: "bar" } as any;
        expect(context.getSelection()).toEqual({ foo: "bar" });
    });

    it('getSessionId returns sessionId from state', () => {
        expect(context.getSessionId()).toBe("session123");
    });

    it('setFeatureTooltipEnabled dispatches action', () => {
        const onDispatch = vi.fn();
        // @ts-expect-error: _comp is protected
        context._comp = { onDispatch } as any;
        context.setFeatureTooltipEnabled(true);
        expect(onDispatch).toHaveBeenCalledWith({ type: ActionType.MAP_SET_MAPTIP, payload: true });
    });

    it('hideAllPopups disables feature tooltip', () => {
        const setEnabled = vi.fn();
        // @ts-expect-error: _featureTooltip is private
        context._featureTooltip = { setEnabled } as any;
        context.hideAllPopups();
        expect(setEnabled).toHaveBeenCalledWith(false);
    });

    it('isFeatureTooltipEnabled returns correct value', () => {
        // @ts-expect-error: _featureTooltip is private
        context._featureTooltip = { isEnabled: () => true } as any;
        expect(context.isFeatureTooltipEnabled()).toBe(true);
        // @ts-expect-error: _featureTooltip is private
        context._featureTooltip = { isEnabled: () => false } as any;
        expect(context.isFeatureTooltipEnabled()).toBe(false);
    });

    it('clearSelection calls setSelectionXml with empty string', () => {
        const spy = vi.spyOn(context, 'setSelectionXml');
        context.clearSelection();
        expect(spy).toHaveBeenCalledWith("");
    });

    it('selectByGeometry calls sendSelectionQuery with correct options', () => {
        const geom = new Polygon([
            [
                [-5e6, 6e6],
                [-5e6, 8e6],
                [-3e6, 8e6],
                [-3e6, 6e6],
                [-5e6, 6e6],
            ],
        ]);
        const spy = vi.spyOn(context as any, 'sendSelectionQuery');
        context.selectByGeometry(geom);
        expect(spy).toHaveBeenCalled();
    });

    it('queryMapFeatures calls sendSelectionQuery', () => {
        const spy = vi.spyOn(context as any, 'sendSelectionQuery');
        const opts = {} as IQueryMapFeaturesOptions;
        context.queryMapFeatures(opts);
        expect(spy).toHaveBeenCalledWith(opts, undefined, undefined);
    });

    it('getSelectableLayers returns selectableLayerNames from state', () => {
        // @ts-expect-error: _state is protected
        context._state.selectableLayerNames = ["Layer1", "Layer2"];
        // @ts-expect-error: private
        expect(context.getSelectableLayers()).toEqual(["Layer1", "Layer2"]);
    });

    it('buildDefaultQueryOptions returns correct options for geometry string', () => {
        // @ts-expect-error: _state is protected
        context._state.sessionId = "sid";
        // @ts-expect-error: _state is protected
        context._state.mapName = "map";
        // @ts-expect-error: _state is protected
        context._state.selectableLayerNames = ["A", "B"];
        const opts = context['buildDefaultQueryOptions']("GEOM", 2);
        expect(opts.mapname).toBe("map");
        expect(opts.session).toBe("sid");
        expect(opts.geometry).toBe("GEOM");
        expect(opts.requestdata).toBe(2);
        expect(opts.layernames).toBe("A,B");
        expect(opts.persist).toBe(1);
    });

    it('buildDefaultQueryOptions returns correct options for geometry object', () => {
        // @ts-expect-error: _state is protected
        context._state.sessionId = "sid";
        // @ts-expect-error: _state is protected
        context._state.mapName = "map";
        // @ts-expect-error: _state is protected
        context._state.selectableLayerNames = [];
        // @ts-expect-error: _wktFormat is private
        context._wktFormat = { writeGeometry: vi.fn(() => "WKT") } as any;
        const opts = context['buildDefaultQueryOptions']({} as Geometry, 1);
        expect(opts.geometry).toBe("WKT");
        expect(opts.layernames).toBeUndefined();
    });

    it('setProviderState sets _state and _client if not mounted', () => {
        registerRequestBuilder("mapagent", (agentUri, locale) => new MapAgentRequestBuilder(agentUri, locale));
        const nextState: IMapGuideProviderState = { ...initialState, agentUri: "http://foo", agentKind: "mapagent" };
        // @ts-expect-error: _comp/_map are protected
        context._comp = undefined;
        // @ts-expect-error: _map is protected
        context._map = undefined;
        context.setProviderState(nextState);
        // @ts-expect-error: _state is protected
        expect(context._state).toEqual(nextState);
        // @ts-expect-error: _client is private
        expect(context._client).toBeInstanceOf(Object);
    });

    it('setProviderState warns on imageFormat change', () => {
        // @ts-expect-error: _comp/_map are protected
        context._comp = {};
        // @ts-expect-error: _map is protected
        context._map = {};
        // @ts-expect-error: _state is protected
        context._state = { ...initialState, imageFormat: "PNG8" };
        const spy = vi.spyOn(logger, "warn");
        const nextState: IMapGuideProviderState = { ...initialState, imageFormat: "PNG" };
        context.setProviderState(nextState);
        expect(spy).toHaveBeenCalledWith(expect.stringContaining("imageFormat"));
    });

    it('setProviderState warns on agentUri/agentKind change', () => {
        registerRequestBuilder("mapagent", (agentUri, locale) => new MapAgentRequestBuilder(agentUri, locale));
        // @ts-expect-error: _comp/_map are protected
        context._comp = {};
        // @ts-expect-error: _map is protected
        context._map = {};
        // @ts-expect-error: _state is protected
        context._state = { ...initialState, agentUri: "a", agentKind: "b" };
        const spy = vi.spyOn(logger, "warn");
        const nextState: IMapGuideProviderState = { ...initialState, agentUri: "b", agentKind: "mapagent" };
        context.setProviderState(nextState);
        expect(spy).toHaveBeenCalledWith(expect.stringContaining("agentUri"));
        expect(spy).toHaveBeenCalledWith(expect.stringContaining("agentKind"));
    });

    it('detachFromComponent disposes keepAlive and featureTooltip', () => {
        const disposeKeepAlive = vi.fn();
        const disposeFeatureTooltip = vi.fn();
        // @ts-expect-error: _keepAlive is private
        context._keepAlive = { dispose: disposeKeepAlive } as any;
        // @ts-expect-error: _featureTooltip is private
        context._featureTooltip = { dispose: disposeFeatureTooltip } as any;
        const superDetach = vi.spyOn(Object.getPrototypeOf(MapGuideMapProviderContext.prototype), 'detachFromComponent');
        context.detachFromComponent();
        expect(disposeKeepAlive).toHaveBeenCalled();
        expect(disposeFeatureTooltip).toHaveBeenCalled();
        expect(superDetach).toHaveBeenCalled();
    });
});