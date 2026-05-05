import { describe, it, expect, vi } from "vitest";
import { applyInitialBaseLayerVisibility, acknowledgeInitWarnings, normalizeInitPayload, initAppFromAppDef } from "../../src/actions/init";
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

        it("dispatches INIT_APP when command supports runFromAppDefAsync", async () => {
            const payload = makeMinimalPayload();
            const cmd: any = {
                attachClient: vi.fn(),
                runAsync: vi.fn(),
                runFromAppDefAsync: vi.fn().mockResolvedValue(payload)
            };
            const dispatch = vi.fn();
            const thunk = initAppFromAppDef(mockAppDef, cmd, mockViewer, { locale: "en", resourceId: "dummy" });
            await thunk(dispatch, mockGetState as any);
            expect(cmd.runFromAppDefAsync).toHaveBeenCalledWith(mockAppDef, expect.objectContaining({ locale: "en" }));
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: ActionType.INIT_APP }));
        });

        it("dispatches INIT_ERROR when command does not support runFromAppDefAsync", () => {
            const cmd: any = {
                attachClient: vi.fn(),
                runAsync: vi.fn()
                // runFromAppDefAsync is intentionally absent
            };
            const dispatch = vi.fn();
            const thunk = initAppFromAppDef(mockAppDef, cmd, mockViewer, { locale: "en", resourceId: "dummy" });
            thunk(dispatch, mockGetState as any);
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: ActionType.INIT_ERROR }));
        });

        it("dispatches INIT_ERROR when runFromAppDefAsync rejects", async () => {
            const cmd: any = {
                attachClient: vi.fn(),
                runAsync: vi.fn(),
                runFromAppDefAsync: vi.fn().mockRejectedValue(new Error("Init failed"))
            };
            const dispatch = vi.fn();
            const thunk = initAppFromAppDef(mockAppDef, cmd, mockViewer, { locale: "en", resourceId: "dummy" });
            await thunk(dispatch, mockGetState as any);
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: ActionType.INIT_ERROR }));
        });

        it("applies initialView override to payload", async () => {
            const payload = makeMinimalPayload();
            const cmd: any = {
                attachClient: vi.fn(),
                runAsync: vi.fn(),
                runFromAppDefAsync: vi.fn().mockResolvedValue(payload)
            };
            const dispatch = vi.fn();
            const initialView = { x: 1, y: 2, scale: 3 };
            const thunk = initAppFromAppDef(mockAppDef, cmd, mockViewer, { locale: "en", resourceId: "dummy", initialView });
            await thunk(dispatch, mockGetState as any);
            const dispatchedAction = dispatch.mock.calls.find(([a]) => a.type === ActionType.INIT_APP)?.[0];
            expect(dispatchedAction?.payload?.initialView).toEqual(initialView);
        });

        it("applies initialActiveMap override to payload", async () => {
            const payload = makeMinimalPayload();
            const cmd: any = {
                attachClient: vi.fn(),
                runAsync: vi.fn(),
                runFromAppDefAsync: vi.fn().mockResolvedValue(payload)
            };
            const dispatch = vi.fn();
            const thunk = initAppFromAppDef(mockAppDef, cmd, mockViewer, { locale: "en", resourceId: "dummy", initialActiveMap: "MapB" });
            await thunk(dispatch, mockGetState as any);
            const dispatchedAction = dispatch.mock.calls.find(([a]) => a.type === ActionType.INIT_APP)?.[0];
            expect(dispatchedAction?.payload?.activeMapName).toBe("MapB");
        });

        it("calls onInit callback with viewer after INIT_APP is dispatched", async () => {
            const payload = makeMinimalPayload();
            const cmd: any = {
                attachClient: vi.fn(),
                runAsync: vi.fn(),
                runFromAppDefAsync: vi.fn().mockResolvedValue(payload)
            };
            const dispatch = vi.fn();
            const onInit = vi.fn();
            const viewer: any = { someViewerProp: true };
            const thunk = initAppFromAppDef(mockAppDef, cmd, viewer, { locale: "en", resourceId: "dummy", onInit });
            await thunk(dispatch, mockGetState as any);
            expect(onInit).toHaveBeenCalledWith(viewer);
        });

        it("attaches a client from config agentUri/agentKind before calling runFromAppDefAsync", async () => {
            registerRequestBuilder("mapagent", (agentUri, locale) => new MapAgentRequestBuilder(agentUri, locale));
            const payload = makeMinimalPayload();
            const cmd: any = {
                attachClient: vi.fn(),
                runAsync: vi.fn(),
                runFromAppDefAsync: vi.fn().mockResolvedValue(payload)
            };
            const dispatch = vi.fn();
            const getStateWithAgent = vi.fn().mockReturnValue({
                config: { agentUri: "http://mapserver/mapagent", agentKind: "mapagent" }
            });
            const thunk = initAppFromAppDef(mockAppDef, cmd, mockViewer, { locale: "en", resourceId: "dummy" });
            await thunk(dispatch, getStateWithAgent as any);
            expect(cmd.attachClient).toHaveBeenCalled();
        });

        it("merges appSettings from payload with options appSettings", async () => {
            const payload = makeMinimalPayload();
            payload.appSettings = { fromAppDef: "value1", shared: "appDefValue" };
            const cmd: any = {
                attachClient: vi.fn(),
                runAsync: vi.fn(),
                runFromAppDefAsync: vi.fn().mockResolvedValue(payload)
            };
            const dispatch = vi.fn();
            const thunk = initAppFromAppDef(mockAppDef, cmd, mockViewer, {
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
