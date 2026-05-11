import { describe, it, expect, vi } from "vitest";
import { applyInitialBaseLayerVisibility, acknowledgeInitWarnings, normalizeInitPayload, initAppFromAppDef } from "../../src/actions/init";
import { ActionType } from "../../src/constants/actions";
import { registerLayout } from "../../src/api/registry/layout";
import type { IInitAppActionPayload } from "../../src/actions/defs";
import type { IViewerInitCommand } from "../../src/actions/init-command";
import type { ApplicationDefinition } from "../../src/api/contracts/fusion";
import { registerRequestBuilder } from "../../src/api/builders/factory";
import { MapAgentRequestBuilder } from "../../src/api/builders/mapagent";

// Register the mapagent request builder so tests that create a Client succeed
registerRequestBuilder("mapagent", (agentUri, locale) => new MapAgentRequestBuilder(agentUri, locale));

function makeMinimalPayload(overrides?: Partial<IInitAppActionPayload>): IInitAppActionPayload {
    return {
        activeMapName: "TestMap",
        initialUrl: "server/TaskPane.html",
        locale: "en",
        maps: { "TestMap": {} as any },
        config: {},
        capabilities: {
            hasTaskPane: false,
            hasTaskBar: false,
            hasStatusBar: false,
            hasNavigator: false,
            hasSelectionPanel: false,
            hasLegend: false,
            hasToolbar: false,
            hasViewSize: false
        },
        toolbars: {} as any,
        warnings: [],
        ...overrides
    };
}

function makeMinimalAppDef(): ApplicationDefinition {
    return {
        WidgetSet: [],
        Extension: {}
    };
}

function makeMockCmd(payload?: IInitAppActionPayload, rejectWith?: Error): IViewerInitCommand {
    return {
        attachClient: vi.fn(),
        runAsync: vi.fn(),
        loadResourceAsync: vi.fn(),
        runFromAppDefAsync: rejectWith
            ? vi.fn().mockRejectedValue(rejectWith)
            : vi.fn().mockResolvedValue(payload ?? makeMinimalPayload())
    };
}

function makeRecursiveDispatch(dispatched: any[], getState: () => any) {
    const dispatch = (action: any): any => {
        if (typeof action === "function") {
            return action(dispatch, getState);
        }
        dispatched.push(action);
        return action;
    };
    return dispatch;
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
        it("dispatches INIT_APP with payload from cmd.runFromAppDefAsync", async () => {
            const payload = makeMinimalPayload();
            const cmd = makeMockCmd(payload);
            const dispatched: any[] = [];
            const state = { config: {} };
            const dispatch = makeRecursiveDispatch(dispatched, () => state);

            const thunk = initAppFromAppDef(cmd, { locale: "en", resourceId: "" }, makeMinimalAppDef(), null as any);
            await thunk(dispatch as any, () => state as any);

            const initAction = dispatched.find(a => a.type === ActionType.INIT_APP);
            expect(initAction).toBeDefined();
            expect(initAction.payload).toBe(payload);
        });

        it("dispatches INIT_ERROR when cmd.runFromAppDefAsync rejects", async () => {
            const error = new Error("Init failed");
            const cmd = makeMockCmd(undefined, error);
            const dispatched: any[] = [];
            const state = { config: {} };
            const dispatch = makeRecursiveDispatch(dispatched, () => state);

            const thunk = initAppFromAppDef(cmd, { locale: "en", resourceId: "" }, makeMinimalAppDef(), null as any);
            await thunk(dispatch as any, () => state as any);

            const errorAction = dispatched.find(a => a.type === ActionType.INIT_ERROR);
            expect(errorAction).toBeDefined();
            expect(errorAction.payload.error.message).toBe("Init failed");
        });

        it("applies initialView override onto the dispatched INIT_APP payload", async () => {
            const payload = makeMinimalPayload();
            const cmd = makeMockCmd(payload);
            const dispatched: any[] = [];
            const state = { config: {} };
            const dispatch = makeRecursiveDispatch(dispatched, () => state);

            const thunk = initAppFromAppDef(cmd, {
                locale: "en",
                resourceId: "",
                initialView: { x: 1, y: 2, scale: 3 }
            }, makeMinimalAppDef(), null as any);
            await thunk(dispatch as any, () => state as any);

            const initAction = dispatched.find(a => a.type === ActionType.INIT_APP);
            expect(initAction.payload.initialView).toEqual({ x: 1, y: 2, scale: 3 });
        });

        it("applies initialActiveMap override onto the dispatched INIT_APP payload", async () => {
            const payload = makeMinimalPayload();
            const cmd = makeMockCmd(payload);
            const dispatched: any[] = [];
            const state = { config: {} };
            const dispatch = makeRecursiveDispatch(dispatched, () => state);

            const thunk = initAppFromAppDef(cmd, {
                locale: "en",
                resourceId: "",
                initialActiveMap: "MapB"
            }, makeMinimalAppDef(), null as any);
            await thunk(dispatch as any, () => state as any);

            const initAction = dispatched.find(a => a.type === ActionType.INIT_APP);
            expect(initAction.payload.activeMapName).toBe("MapB");
        });

        it("calls onInit callback with viewer after INIT_APP is dispatched", async () => {
            const payload = makeMinimalPayload();
            const cmd = makeMockCmd(payload);
            const dispatched: any[] = [];
            const state = { config: {} };
            const dispatch = makeRecursiveDispatch(dispatched, () => state);
            const viewer = { id: "mockViewer" } as any;
            const onInit = vi.fn();

            const thunk = initAppFromAppDef(cmd, {
                locale: "en",
                resourceId: "",
                onInit
            }, makeMinimalAppDef(), viewer);
            await thunk(dispatch as any, () => state as any);

            expect(onInit).toHaveBeenCalledWith(viewer);
        });

        it("merges appSettings: appDef settings overwrite options settings", async () => {
            const payload = makeMinimalPayload({ appSettings: { fromAppDef: "appDefValue", shared: "appDefOverride" } });
            const cmd = makeMockCmd(payload);
            const dispatched: any[] = [];
            const state = { config: {} };
            const dispatch = makeRecursiveDispatch(dispatched, () => state);

            const thunk = initAppFromAppDef(cmd, {
                locale: "en",
                resourceId: "",
                appSettings: { fromMount: "mountValue", shared: "mountValue" }
            }, makeMinimalAppDef(), null as any);
            await thunk(dispatch as any, () => state as any);

            const initAction = dispatched.find(a => a.type === ActionType.INIT_APP);
            expect(initAction.payload.appSettings).toEqual({
                fromMount: "mountValue",
                fromAppDef: "appDefValue",
                shared: "appDefOverride"
            });
        });

        it("calls cmd.attachClient when agentUri and agentKind are present in state", async () => {
            const payload = makeMinimalPayload();
            const cmd = makeMockCmd(payload);
            const dispatched: any[] = [];
            const state = { config: { agentUri: "http://server/mapguide", agentKind: "mapagent" } };
            const dispatch = makeRecursiveDispatch(dispatched, () => state);

            const thunk = initAppFromAppDef(cmd, { locale: "en", resourceId: "" }, makeMinimalAppDef(), null as any);
            await thunk(dispatch as any, () => state as any);

            expect(cmd.attachClient).toHaveBeenCalledTimes(1);
        });

        it("does not call cmd.attachClient when agentUri is absent from state", async () => {
            const payload = makeMinimalPayload();
            const cmd = makeMockCmd(payload);
            const dispatched: any[] = [];
            const state = { config: {} };
            const dispatch = makeRecursiveDispatch(dispatched, () => state);

            const thunk = initAppFromAppDef(cmd, { locale: "en", resourceId: "" }, makeMinimalAppDef(), null as any);
            await thunk(dispatch as any, () => state as any);

            expect(cmd.attachClient).not.toHaveBeenCalled();
        });
    });
});
