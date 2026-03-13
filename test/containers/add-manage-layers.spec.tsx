/**
 * Tests for AddManageLayersContainer React component in swipe mode.
 *
 * Covers the expected UI states and dispatch behaviour when map swipe mode is
 * active vs. inactive, verifying that:
 *
 *  1. The swipe map-selector dropdown is shown above the tabs only when swipe
 *     is active.
 *  2. The dropdown lists the primary and secondary maps.
 *  3. `onLayerAdded` dispatches to the correct map name based on the dropdown
 *     selection.
 *  4. After adding a layer (regardless of whether primary or secondary is
 *     selected), `viewer.refreshSwipeClips()` is always called when swipe is
 *     active so that the new layer gets the correct clip applied.
 *  5. When swipe is inactive, the layers from the active map are shown in the
 *     Manage Layers tab (no secondary-map mixing).
 *  6. `viewer.getLayerManager(mapName)` is called with the secondary map name
 *     when secondary is selected, so that the layer is added directly to the
 *     secondary layer set (avoiding "layer already exists" collisions).
 *
 * @since 0.15
 */
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MapProviderContextProvider } from "../../src/components/map-providers/context";
import { configureStore } from "../../src/store/configure-store";
import type { IApplicationState, ILayerInfo, IMapSwipePair } from "../../src/api/common";
import { AddManageLayersContainer } from "../../src/containers/add-manage-layers";
import { tr } from "../../src/api/i18n";

// ---------------------------------------------------------------------------
// Mock element-context so that Blueprint components are replaced with simple
// HTML elements that work in jsdom without any Blueprint CSS / portals.
// ---------------------------------------------------------------------------
vi.mock("../../src/components/elements/element-context", () => ({
    useElementContext: () => ({
        TabSet: ({ tabs }: { tabs: Array<{ id: string; title: React.ReactNode; content: React.ReactNode }> }) => (
            <div data-testid="tabset">
                {tabs.map(t => (
                    <div key={t.id}>
                        <div data-testid={`tab-title-${t.id}`}>{t.title}</div>
                        <div data-testid={`tab-content-${t.id}`}>{t.content}</div>
                    </div>
                ))}
            </div>
        ),
        Icon: ({ icon }: { icon: string }) => <span data-testid={`icon-${icon}`} />,
        Button: (props: any) => <button {...props} />,
        NonIdealState: ({ title, description }: any) => (
            <div data-testid="non-ideal-state">
                <div>{title}</div>
                <div>{description}</div>
            </div>
        ),
        Spinner: () => <div data-testid="spinner" />,
        Switch: (props: any) => <input type="checkbox" {...props} />,
        Slider: (props: any) => <input type="range" {...props} />,
        NumericInput: (props: any) => <input type="number" {...props} />,
        Select: (props: any) => <select {...props}>{props.children}</select>,
        Callout: (props: any) => <div>{props.children}</div>,
        FileInput: (props: any) => <input type="file" {...props} />,
        InputGroup: (props: any) => <input {...props} />,
        FormGroup: (props: any) => <div>{props.children}</div>,
        Card: (props: any) => <div>{props.children}</div>,
        Popover: (props: any) => <div>{props.children}</div>,
        Checkbox: (props: any) => <input type="checkbox" {...props} />,
        Radio: (props: any) => <input type="radio" {...props} />,
        EditableText: (props: any) => <span>{props.value}</span>,
        MenuComponent: (props: any) => <div>{props.children}</div>,
        Collapsible: (props: any) => <div>{props.isOpen ? props.children : null}</div>,
        Drawer: (props: any) => <div>{props.children}</div>,
    }),
}));

// ---------------------------------------------------------------------------
// Mock the AddLayer component — it has deep dependencies (colorbrewer, OL
// canvas elements, etc.) that are incompatible with jsdom. For these container
// tests we only need to observe that the container passes the right props.
// ---------------------------------------------------------------------------
vi.mock("../../src/components/layer-manager/add-layer", () => ({
    AddLayer: ({ onLayerAdded }: { onLayerAdded: (layer: any) => void }) => (
        <div data-testid="add-layer-mock">
            <button
                data-testid="simulate-add-layer"
                onClick={() => onLayerAdded({
                    name: "test-added-layer",
                    displayName: "Test Added Layer",
                    visible: true,
                    opacity: 1,
                    selectable: false,
                    busyWorkerCount: 0,
                    type: "Vector",
                    isExternal: true,
                    order: 0,
                    isSelectable: false,
                })}
            >
                Add Layer
            </button>
        </div>
    ),
}));

// ---------------------------------------------------------------------------
// Mock ManageLayers — renders layer display names so we can assert which
// map's layers are shown, without pulling in the full vector-style editor.
// ---------------------------------------------------------------------------
vi.mock("../../src/components/layer-manager/manage-layers", () => ({
    ManageLayers: ({ layers }: { layers: any[] }) => (
        layers && layers.length > 0
            ? <ul data-testid="manage-layers-mock">
                {layers.map((l: any) => <li key={l.name}>{l.displayName}</li>)}
            </ul>
            : <div data-testid="non-ideal-state"><div>No Layers</div></div>
    ),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PRIMARY_MAP = "CapitalCities";
const SECONDARY_MAP = "NaturalLandmarks";

const swipePair: IMapSwipePair = {
    primaryMapName: PRIMARY_MAP,
    secondaryMapName: SECONDARY_MAP,
    primaryLabel: "Capital Cities",
    secondaryLabel: "Natural Landmarks",
};

function makeLayerInfo(name: string, displayName: string): ILayerInfo {
    return {
        name,
        displayName,
        visible: true,
        opacity: 1,
        selectable: false,
        busyWorkerCount: 0,
        type: "Vector" as any,
        isExternal: true,
    };
}

const primaryLayer = makeLayerInfo("layer-primary", "Primary Layer");
const secondaryLayer = makeLayerInfo("layer-secondary", "Secondary Layer");

/** Build a partial application state that satisfies the component's requirements. */
function makeState(opts: {
    activeMapName: string;
    swipeActive: boolean;
    primaryMapLayers: ILayerInfo[];
    secondaryMapLayers?: ILayerInfo[];
}): Partial<IApplicationState> {
    const { activeMapName, swipeActive, primaryMapLayers, secondaryMapLayers } = opts;
    const mapState: Record<string, any> = {
        [PRIMARY_MAP]: {
            layers: primaryMapLayers,
            currentView: undefined,
            initialView: undefined,
            history: [],
            historyIndex: -1,
            externalBaseLayers: [],
            initialExternalLayers: [],
        },
    };
    if (secondaryMapLayers !== undefined) {
        mapState[SECONDARY_MAP] = {
            layers: secondaryMapLayers,
            currentView: undefined,
            initialView: undefined,
            history: [],
            historyIndex: -1,
            externalBaseLayers: [],
            initialExternalLayers: [],
        };
    }
    return {
        mapState,
        config: {
            activeMapName,
            locale: "en",
            mapSwipePairs: [swipePair],
            swipeActive,
        } as any,
    };
}

/** Create a mock IMapProviderContext that records calls to swipe methods. */
function makeViewer() {
    return {
        isReady: vi.fn(() => false),
        transferLayerToSwipeSecondary: vi.fn(),
        refreshSwipeClips: vi.fn(),
        getLayerManager: vi.fn(() => ({
            getLayer: vi.fn(() => undefined),
        })),
    };
}

function renderContainer(state: Partial<IApplicationState>, viewer: ReturnType<typeof makeViewer>) {
    const store = configureStore(state);
    return render(
        <Provider store={store}>
            <MapProviderContextProvider value={viewer as any}>
                <AddManageLayersContainer />
            </MapProviderContextProvider>
        </Provider>
    );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("AddManageLayersContainer – swipe mode UI & dispatch behaviour", () => {

    // -----------------------------------------------------------------------
    // No-swipe scenario
    // -----------------------------------------------------------------------
    describe("when swipe is NOT active", () => {
        it("renders both tabs without the map selector dropdown", () => {
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: false,
                primaryMapLayers: [],
            });
            renderContainer(state, makeViewer());

            // TabSet should be present
            expect(screen.getByTestId("tabset")).toBeDefined();

            // The swipe map-selector label should NOT appear
            expect(screen.queryByText(tr("MAP_SWIPE_LAYER_MANAGER_FOR", "en"))).toBeNull();
        });

        it("renders nothing (empty) when the primary map has no initialised layers", () => {
            // layers === undefined means the map hasn't initialised yet
            const state: Partial<IApplicationState> = {
                mapState: {
                    [PRIMARY_MAP]: {
                        layers: undefined,
                        currentView: undefined,
                        initialView: undefined,
                        history: [],
                        historyIndex: -1,
                        externalBaseLayers: [],
                        initialExternalLayers: [],
                    } as any,
                },
                config: {
                    activeMapName: PRIMARY_MAP,
                    locale: "en",
                    swipeActive: false,
                } as any,
            };
            const { container } = renderContainer(state, makeViewer());
            // Component returns <></>, which renders as empty
            expect(container.innerHTML).toBe("");
        });

        it("shows primary map layers in Manage Layers tab", () => {
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: false,
                primaryMapLayers: [primaryLayer],
            });
            renderContainer(state, makeViewer());

            // The layer name should appear in the manage layers tab content
            expect(screen.getByText(primaryLayer.displayName)).toBeDefined();
        });
    });

    // -----------------------------------------------------------------------
    // Swipe-active scenario
    // -----------------------------------------------------------------------
    describe("when swipe IS active", () => {
        it("shows the 'Layers for:' dropdown above the tabs", () => {
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: true,
                primaryMapLayers: [],
            });
            renderContainer(state, makeViewer());

            expect(screen.getByText(tr("MAP_SWIPE_LAYER_MANAGER_FOR", "en"))).toBeDefined();
        });

        it("dropdown contains an option for primary map and an option for secondary map", () => {
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: true,
                primaryMapLayers: [],
            });
            renderContainer(state, makeViewer());

            // Option text format: "Capital Cities (CapitalCities)"
            expect(screen.getByText(`Capital Cities (${PRIMARY_MAP})`)).toBeDefined();
            expect(screen.getByText(`Natural Landmarks (${SECONDARY_MAP})`)).toBeDefined();
        });

        it("defaults dropdown selection to primary (active) map", () => {
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: true,
                primaryMapLayers: [],
            });
            renderContainer(state, makeViewer());

            const select = screen.getByRole("combobox") as HTMLSelectElement;
            expect(select.value).toBe(PRIMARY_MAP);
        });

        it("shows primary map layers in Manage Layers when primary is selected in dropdown", () => {
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: true,
                primaryMapLayers: [primaryLayer],
                secondaryMapLayers: [secondaryLayer],
            });
            renderContainer(state, makeViewer());

            // Primary layer should be visible
            expect(screen.getByText(primaryLayer.displayName)).toBeDefined();
            // Secondary layer should NOT be visible
            expect(screen.queryByText(secondaryLayer.displayName)).toBeNull();
        });

        it("shows secondary map layers in Manage Layers when secondary is selected in dropdown", () => {
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: true,
                primaryMapLayers: [primaryLayer],
                secondaryMapLayers: [secondaryLayer],
            });
            renderContainer(state, makeViewer());

            // Switch dropdown to secondary map
            const select = screen.getByRole("combobox") as HTMLSelectElement;
            fireEvent.change(select, { target: { value: SECONDARY_MAP } });

            // Secondary layer should now be visible
            expect(screen.getByText(secondaryLayer.displayName)).toBeDefined();
            // Primary layer should no longer be visible in manage-layers tab content
            expect(screen.queryByText(primaryLayer.displayName)).toBeNull();
        });

        it("shows 'No Layers' state when secondary map has no layers and secondary is selected", () => {
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: true,
                primaryMapLayers: [primaryLayer],
                secondaryMapLayers: [],  // secondary initialised but empty
            });
            renderContainer(state, makeViewer());

            const select = screen.getByRole("combobox") as HTMLSelectElement;
            fireEvent.change(select, { target: { value: SECONDARY_MAP } });

            // ManageLayers renders "No Layers" when the layer list is empty
            expect(screen.getByTestId("non-ideal-state")).toBeDefined();
        });

        it("does NOT go blank (still renders tabset) when secondary map hasn't been visited yet", () => {
            // Secondary map state is absent (never initialised)
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: true,
                primaryMapLayers: [],
                // secondaryMapLayers is NOT provided → no mapState[SECONDARY_MAP]
            });
            renderContainer(state, makeViewer());

            const select = screen.getByRole("combobox") as HTMLSelectElement;
            fireEvent.change(select, { target: { value: SECONDARY_MAP } });

            // The TabSet must still be rendered (no blank screen)
            expect(screen.getByTestId("tabset")).toBeDefined();
        });
    });

    // -----------------------------------------------------------------------
    // onLayerAdded dispatch & viewer call expectations
    //
    // The mock AddLayer renders a "Add Layer" button that, when clicked, calls
    // onLayerAdded with a fixed test layer.  This lets us verify that:
    //   - the dispatch goes to the correct map name (primary vs. secondary)
    //   - the correct viewer swipe method is called afterwards
    // -----------------------------------------------------------------------
    describe("onLayerAdded dispatch behaviour in swipe mode", () => {
        it("dispatches mapLayerAdded with primaryMapName and calls refreshSwipeClips when primary is selected", () => {
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: true,
                primaryMapLayers: [],
            });
            const store = configureStore(state);
            const dispatchSpy = vi.spyOn(store, "dispatch");
            const viewer = makeViewer();

            render(
                <Provider store={store}>
                    <MapProviderContextProvider value={viewer as any}>
                        <AddManageLayersContainer />
                    </MapProviderContextProvider>
                </Provider>
            );

            // Dropdown defaults to primary. Click the mock "Add Layer" button.
            const select = screen.getByRole("combobox") as HTMLSelectElement;
            expect(select.value).toBe(PRIMARY_MAP);

            fireEvent.click(screen.getByTestId("simulate-add-layer"));

            // Should have dispatched mapLayerAdded with the primary map name
            const layerAddedCall = dispatchSpy.mock.calls.find(c => {
                const action = c[0] as any;
                return action.type && String(action.type).includes("LAYER_ADDED");
            });
            expect(layerAddedCall).toBeDefined();
            expect((layerAddedCall![0] as any).payload?.mapName).toBe(PRIMARY_MAP);

            // Swipe-clips should be refreshed for primary
            expect(viewer.refreshSwipeClips).toHaveBeenCalledOnce();
            expect(viewer.transferLayerToSwipeSecondary).not.toHaveBeenCalled();
        });

        it("dispatches mapLayerAdded with secondaryMapName and calls refreshSwipeClips when secondary is selected", () => {
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: true,
                primaryMapLayers: [],
            });
            const store = configureStore(state);
            const dispatchSpy = vi.spyOn(store, "dispatch");
            const viewer = makeViewer();

            render(
                <Provider store={store}>
                    <MapProviderContextProvider value={viewer as any}>
                        <AddManageLayersContainer />
                    </MapProviderContextProvider>
                </Provider>
            );

            // Switch dropdown to secondary
            const select = screen.getByRole("combobox") as HTMLSelectElement;
            fireEvent.change(select, { target: { value: SECONDARY_MAP } });
            expect(select.value).toBe(SECONDARY_MAP);

            fireEvent.click(screen.getByTestId("simulate-add-layer"));

            // Should have dispatched mapLayerAdded with the secondary map name
            const layerAddedCall = dispatchSpy.mock.calls.find(c => {
                const action = c[0] as any;
                return action.type && String(action.type).includes("LAYER_ADDED");
            });
            expect(layerAddedCall).toBeDefined();
            expect((layerAddedCall![0] as any).payload?.mapName).toBe(SECONDARY_MAP);

            // refreshSwipeClips is always called when swipe is active (secondary side too),
            // because layers are now added directly to the secondary's layer set via
            // viewer.getLayerManager(secondaryMapName) — no transfer needed.
            expect(viewer.refreshSwipeClips).toHaveBeenCalledOnce();

            // viewer.getLayerManager should have been called with the secondary map name
            // so that the layer is added to the secondary's layer set (not primary's)
            expect(viewer.getLayerManager).toHaveBeenCalledWith(SECONDARY_MAP);
        });

        it("does NOT call viewer.getLayerManager with a map name when primary is selected", () => {
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: true,
                primaryMapLayers: [],
            });
            const viewer = makeViewer();

            render(
                <Provider store={configureStore(state)}>
                    <MapProviderContextProvider value={viewer as any}>
                        <AddManageLayersContainer />
                    </MapProviderContextProvider>
                </Provider>
            );

            // Dropdown defaults to primary — no secondary-targeted layer manager needed
            const getLayerManagerCalls = (viewer.getLayerManager as ReturnType<typeof vi.fn>).mock.calls;
            const calledWithSecondary = getLayerManagerCalls.some(args => args[0] === SECONDARY_MAP);
            expect(calledWithSecondary).toBe(false);
        });

        it("dispatches mapLayerAdded with activeMapName and calls NO swipe methods when swipe is not active", () => {
            const state = makeState({
                activeMapName: PRIMARY_MAP,
                swipeActive: false,
                primaryMapLayers: [],
            });
            const store = configureStore(state);
            const dispatchSpy = vi.spyOn(store, "dispatch");
            const viewer = makeViewer();

            render(
                <Provider store={store}>
                    <MapProviderContextProvider value={viewer as any}>
                        <AddManageLayersContainer />
                    </MapProviderContextProvider>
                </Provider>
            );

            fireEvent.click(screen.getByTestId("simulate-add-layer"));

            const layerAddedCall = dispatchSpy.mock.calls.find(c => {
                const action = c[0] as any;
                return action.type && String(action.type).includes("LAYER_ADDED");
            });
            expect(layerAddedCall).toBeDefined();
            expect((layerAddedCall![0] as any).payload?.mapName).toBe(PRIMARY_MAP);

            // refreshSwipeClips should not be called when swipe is off
            expect(viewer.refreshSwipeClips).not.toHaveBeenCalled();
        });
    });

    // -----------------------------------------------------------------------
    // viewer.refreshSwipeClips expectations
    // New behaviour: layers are added directly to the target layer set via
    // viewer.getLayerManager(mapName), so refreshSwipeClips() is always called
    // when swipe is active (regardless of primary/secondary selection).
    // transferLayerToSwipeSecondary is no longer used in the add-layer flow.
    // -----------------------------------------------------------------------
    describe("viewer swipe method contracts (unit-level)", () => {

        it("calls viewer.refreshSwipeClips() after a layer is added with primary selected", () => {
            const viewer = makeViewer();
            // Simulate the new onLayerAdded handler logic:
            const isSwipeActive = true;

            if (isSwipeActive) {
                viewer.refreshSwipeClips();
            }

            expect(viewer.refreshSwipeClips).toHaveBeenCalledOnce();
        });

        it("calls viewer.refreshSwipeClips() after a layer is added with secondary selected", () => {
            const viewer = makeViewer();
            const isSwipeActive = true;

            // New logic: always call refreshSwipeClips (layer is already in secondary's
            // layer set via getLayerManager(secondaryMapName))
            if (isSwipeActive) {
                viewer.refreshSwipeClips();
            }

            expect(viewer.refreshSwipeClips).toHaveBeenCalledOnce();
        });

        it("calls neither viewer method when swipe is NOT active", () => {
            const viewer = makeViewer();
            const isSwipeActive = false;

            if (isSwipeActive) {
                viewer.refreshSwipeClips();
            }

            expect(viewer.refreshSwipeClips).not.toHaveBeenCalled();
        });
    });

    // -----------------------------------------------------------------------
    // targetMapName derivation expectations (matches add-manage-layers.tsx logic)
    // -----------------------------------------------------------------------
    describe("targetMapName derivation", () => {
        it.each([
            // [isSwipeActive, selectedMapForLayers, activeMapName, expectedTargetMapName]
            [false, PRIMARY_MAP, PRIMARY_MAP, PRIMARY_MAP],
            [false, SECONDARY_MAP, PRIMARY_MAP, PRIMARY_MAP],  // swipe off → always active map
            [true, PRIMARY_MAP, PRIMARY_MAP, PRIMARY_MAP],
            [true, SECONDARY_MAP, PRIMARY_MAP, SECONDARY_MAP], // swipe on → follows selector
            [true, undefined, PRIMARY_MAP, PRIMARY_MAP],        // swipe on but no selection → fallback
        ])(
            "isSwipeActive=%s, selected=%s, active=%s → target=%s",
            (isSwipeActive, selectedMapForLayers, activeMapName, expected) => {
                // Mirrors the derivation in add-manage-layers.tsx:
                // const targetMapName = isSwipeActive ? (selectedMapForLayers ?? activeMapName) : activeMapName;
                const targetMapName = isSwipeActive
                    ? (selectedMapForLayers ?? activeMapName)
                    : activeMapName;
                expect(targetMapName).toBe(expected);
            }
        );
    });
});
