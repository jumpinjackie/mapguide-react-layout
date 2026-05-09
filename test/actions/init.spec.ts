import { describe, it, expect, vi, afterEach } from "vitest";
import { applyInitialBaseLayerVisibility, acknowledgeInitWarnings, normalizeInitPayload } from "../../src/actions/init";
import { initAppFromAppDef, DefaultViewerInitCommand } from "../../src/actions/init-mapguide";
import { ActionType } from "../../src/constants/actions";
import { registerLayout } from "../../src/api/registry/layout";
import { registerRequestBuilder } from "../../src/api/builders/factory";
import { MapAgentRequestBuilder } from "../../src/api/builders/mapagent";

function makeMinimalPayload(): any {
    return {
        activeMapName: "Map1",
        initialUrl: "http://example.com/task",
        locale: "en",
        maps: {},
        config: {},
        capabilities: {
            hasTaskPane: true,
            hasTaskBar: true,
            hasStatusBar: true,
            hasNavigator: true,
            hasSelectionPanel: true,
            hasLegend: true,
            hasToolbar: true,
            hasViewSize: true
        },
        toolbars: {},
        warnings: []
    };
}

describe("actions/init", () => {
    it("applyInitialBaseLayerVisibility sets first non-UTFGrid visible", () => {
        const layers = [
            { kind: "UTFGrid", visible: false },
            { kind: "OSM", visible: false },
            { kind: "UTFGrid", visible: false }
        ];
        applyInitialBaseLayerVisibility(layers as any);
        expect(layers[1].visible).toBe(true);
        expect(layers[0].visible).toBe(true);
        expect(layers[2].visible).toBe(true);
    });
    it("does nothing if no layers", () => {
        const layers: any[] = [];
        applyInitialBaseLayerVisibility(layers);
        expect(layers).toHaveLength(0);
    });
    it("applyInitialBaseLayerVisibility with only UTFGrid layers sets all visible", () => {
        const layers = [
            { kind: "UTFGrid", visible: false },
            { kind: "UTFGrid", visible: false }
        ];
        applyInitialBaseLayerVisibility(layers as any);
        expect(layers[0].visible).toBe(true);
        expect(layers[1].visible).toBe(true);
    });
    it("acknowledgeInitWarnings creates correct action", () => {
        const action = acknowledgeInitWarnings();
        expect(action.type).toBe(ActionType.INIT_ACKNOWLEDGE_WARNINGS);
    });
    it("normalizeInitPayload returns payload unchanged when layout is undefined", () => {
        const payload: any = {
            capabilities: { hasTaskPane: true }
        };
        const result = normalizeInitPayload(payload, undefined);
        expect(result.capabilities.hasTaskPane).toBe(true);
    });
    it("normalizeInitPayload returns payload unchanged when layout is empty string", () => {
        const payload: any = {
            capabilities: { hasTaskPane: true }
        };
        const result = normalizeInitPayload(payload, "");
        expect(result.capabilities.hasTaskPane).toBe(true);
    });
    it("normalizeInitPayload overrides hasTaskPane when layout caps say no task pane", () => {
        // Each test uses a unique layout name to avoid cross-test state contamination in the module-level registry
        registerLayout("no-taskpane-layout-init-test", () => null as any, { hasTaskPane: false });
        const payload: any = {
            capabilities: { hasTaskPane: true }
        };
        const result = normalizeInitPayload(payload, "no-taskpane-layout-init-test");
        expect(result.capabilities.hasTaskPane).toBe(false);
    });
    it("normalizeInitPayload does not override hasTaskPane when layout caps say there is a task pane", () => {
        // Each test uses a unique layout name to avoid cross-test state contamination in the module-level registry
        registerLayout("with-taskpane-layout-init-test", () => null as any, { hasTaskPane: true });
        const payload: any = {
            capabilities: { hasTaskPane: false }
        };
        const result = normalizeInitPayload(payload, "with-taskpane-layout-init-test");
        // capabilities.hasTaskPane is only overridden to false, not to true
        expect(result.capabilities.hasTaskPane).toBe(false);
    });
    it("normalizeInitPayload returns payload unchanged when layout is not registered", () => {
        const payload: any = {
            capabilities: { hasTaskPane: true }
        };
        const result = normalizeInitPayload(payload, "unknown-layout");
        expect(result.capabilities.hasTaskPane).toBe(true);
    });

    describe("initAppFromAppDef", () => {
        const mockAppDef: any = { WidgetSet: [], MapSet: { MapGroup: [] } };
        const mockViewer: any = {};
        const mockGetState = vi.fn().mockReturnValue({ config: {} });

        let runSpy: ReturnType<typeof vi.spyOn>;
        let attachSpy: ReturnType<typeof vi.spyOn>;

        afterEach(() => {
            runSpy?.mockRestore();
            attachSpy?.mockRestore();
        });

        it("dispatches INIT_APP using an internally created DefaultViewerInitCommand", async () => {
            const payload = makeMinimalPayload();
            runSpy = vi.spyOn(DefaultViewerInitCommand.prototype, "runFromAppDefAsync").mockResolvedValue(payload as any);
            const dispatch = vi.fn();
            const thunk = initAppFromAppDef(mockAppDef, mockViewer, { locale: "en", resourceId: "dummy" });
            await thunk(dispatch, mockGetState as any);
            expect(runSpy).toHaveBeenCalledWith(mockAppDef, expect.objectContaining({ locale: "en" }));
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: ActionType.INIT_APP }));
        });

        it("dispatches INIT_ERROR when runFromAppDefAsync rejects", async () => {
            runSpy = vi.spyOn(DefaultViewerInitCommand.prototype, "runFromAppDefAsync").mockRejectedValue(new Error("Init failed"));
            const dispatch = vi.fn();
            const thunk = initAppFromAppDef(mockAppDef, mockViewer, { locale: "en", resourceId: "dummy" });
            await thunk(dispatch, mockGetState as any);
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: ActionType.INIT_ERROR }));
        });

        it("applies initialView override to payload", async () => {
            const payload = makeMinimalPayload();
            runSpy = vi.spyOn(DefaultViewerInitCommand.prototype, "runFromAppDefAsync").mockResolvedValue(payload as any);
            const dispatch = vi.fn();
            const initialView = { x: 1, y: 2, scale: 3 };
            const thunk = initAppFromAppDef(mockAppDef, mockViewer, { locale: "en", resourceId: "dummy", initialView });
            await thunk(dispatch, mockGetState as any);
            const dispatchedAction = dispatch.mock.calls.find(([a]) => a.type === ActionType.INIT_APP)?.[0];
            expect(dispatchedAction?.payload?.initialView).toEqual(initialView);
        });

        it("applies initialActiveMap override to payload", async () => {
            const payload = makeMinimalPayload();
            runSpy = vi.spyOn(DefaultViewerInitCommand.prototype, "runFromAppDefAsync").mockResolvedValue(payload as any);
            const dispatch = vi.fn();
            const thunk = initAppFromAppDef(mockAppDef, mockViewer, { locale: "en", resourceId: "dummy", initialActiveMap: "MapB" });
            await thunk(dispatch, mockGetState as any);
            const dispatchedAction = dispatch.mock.calls.find(([a]) => a.type === ActionType.INIT_APP)?.[0];
            expect(dispatchedAction?.payload?.activeMapName).toBe("MapB");
        });

        it("calls onInit callback with viewer after INIT_APP is dispatched", async () => {
            const payload = makeMinimalPayload();
            runSpy = vi.spyOn(DefaultViewerInitCommand.prototype, "runFromAppDefAsync").mockResolvedValue(payload as any);
            const dispatch = vi.fn();
            const onInit = vi.fn();
            const viewer: any = { someViewerProp: true };
            const thunk = initAppFromAppDef(mockAppDef, viewer, { locale: "en", resourceId: "dummy", onInit });
            await thunk(dispatch, mockGetState as any);
            expect(onInit).toHaveBeenCalledWith(viewer);
        });

        it("attaches a client when config provides agentUri/agentKind", async () => {
            registerRequestBuilder("mapagent", (agentUri, locale) => new MapAgentRequestBuilder(agentUri, locale));
            const payload = makeMinimalPayload();
            runSpy = vi.spyOn(DefaultViewerInitCommand.prototype, "runFromAppDefAsync").mockResolvedValue(payload as any);
            attachSpy = vi.spyOn(DefaultViewerInitCommand.prototype, "attachClient");
            const dispatch = vi.fn();
            const getStateWithAgent = vi.fn().mockReturnValue({
                config: { agentUri: "http://mapserver/mapagent", agentKind: "mapagent" }
            });
            const thunk = initAppFromAppDef(mockAppDef, mockViewer, { locale: "en", resourceId: "dummy" });
            await thunk(dispatch, getStateWithAgent as any);
            expect(attachSpy).toHaveBeenCalled();
        });

        it("merges appSettings from payload with options appSettings", async () => {
            const payload = makeMinimalPayload();
            payload.appSettings = { fromAppDef: "value1", shared: "appDefValue" };
            runSpy = vi.spyOn(DefaultViewerInitCommand.prototype, "runFromAppDefAsync").mockResolvedValue(payload as any);
            const dispatch = vi.fn();
            const thunk = initAppFromAppDef(mockAppDef, mockViewer, {
                locale: "en",
                resourceId: "dummy",
                appSettings: { fromOptions: "value2", shared: "optionsValue" }
            });
            await thunk(dispatch, mockGetState as any);
            const dispatchedAction = dispatch.mock.calls.find(([a]) => a.type === ActionType.INIT_APP)?.[0];
            // appDef settings should overwrite options settings for shared keys
            expect(dispatchedAction?.payload?.appSettings?.fromOptions).toBe("value2");
            expect(dispatchedAction?.payload?.appSettings?.fromAppDef).toBe("value1");
            expect(dispatchedAction?.payload?.appSettings?.shared).toBe("appDefValue");
        });
    });
});
