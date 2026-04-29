import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const hooksMock = vi.hoisted(() => ({
   useActiveMapName: vi.fn(),
   useViewerFeatureTooltipsEnabled: vi.fn(),
   useConfiguredManualFeatureTooltips: vi.fn(),
   useViewerSizeUnits: vi.fn(),
   useViewerLocale: vi.fn(),
   useActiveMapExternalBaseLayers: vi.fn(),
   useViewerIsStateless: vi.fn(),
   useViewerSelectCanDragPan: vi.fn(),
}));

const hooksMgMock = vi.hoisted(() => ({
   useActiveMapLayerTransparency: vi.fn(),
   useActiveMapState: vi.fn(),
}));

const mapProviderMock = vi.hoisted(() => ({
   useReduxDispatch: vi.fn(),
}));

const mapActionsMock = vi.hoisted(() => ({
   setManualFeatureTooltipsEnabled: vi.fn(),
   setFeatureTooltipsEnabled: vi.fn(),
   setLayerTransparency: vi.fn(),
   setViewSizeUnits: vi.fn(),
   enableSelectDragPan: vi.fn(),
}));

vi.mock("../../src/containers/hooks", () => hooksMock);
vi.mock("../../src/containers/hooks-mapguide", () => hooksMgMock);
vi.mock("../../src/components/map-providers/context", () => mapProviderMock);
vi.mock("../../src/actions/map", () => mapActionsMock);

vi.mock("../../src/api/i18n", () => ({
   tr: (key: string) => key,
}));

vi.mock("../../src/utils/units", () => ({
   getUnitsOfMeasure: () => [0, 1],
   getUnitOfMeasure: (uom: number) => ({ localizedName: () => (uom === 0 ? "Meters" : "Feet") }),
}));

vi.mock("../../src/components/elements/element-context", () => ({
   useElementContext: () => ({
      Heading: ({ children }: React.PropsWithChildren<{}>) => <h5>{children}</h5>,
      Slider: ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
         <input data-testid="slider" type="range" value={value} onChange={(e) => onChange(Number((e.target as HTMLInputElement).value))} />
      ),
      Select: ({ value, items, onChange }: any) => (
         <select aria-label="MAP_SIZE_DISPLAY_UNITS" value={String(value)} onChange={(e) => onChange(e.target.value)}>
            {items.map((i: any) => <option key={i.value} value={i.value}>{i.label}</option>)}
         </select>
      ),
      Switch: ({ checked, onChange, label }: any) => (
         <label><input type="checkbox" checked={checked} onChange={onChange} />{label}</label>
      ),
      FormGroup: ({ label, children }: React.PropsWithChildren<{ label?: string }>) => (
         <div><label>{label}</label>{children}</div>
      ),
   }),
}));

import { ViewerOptions } from "../../src/containers/viewer-options";

describe("ViewerOptions interactions", () => {
   beforeEach(() => {
      vi.clearAllMocks();

      hooksMock.useActiveMapName.mockReturnValue("Map1");
      hooksMock.useViewerFeatureTooltipsEnabled.mockReturnValue(true);
      hooksMock.useConfiguredManualFeatureTooltips.mockReturnValue(true);
      hooksMock.useViewerSizeUnits.mockReturnValue(0);
      hooksMock.useViewerLocale.mockReturnValue("en");
      hooksMock.useActiveMapExternalBaseLayers.mockReturnValue([{ kind: "XYZ" }]);
      hooksMock.useViewerIsStateless.mockReturnValue(false);
      hooksMock.useViewerSelectCanDragPan.mockReturnValue(true);

      hooksMgMock.useActiveMapLayerTransparency.mockReturnValue({
         base: 0.8,
         mg_base: 0.7,
         mg_dynamic_overlay: 0.6,
         mg_sel_overlay: 0.5,
      });
      hooksMgMock.useActiveMapState.mockReturnValue({
         FiniteDisplayScale: [1000],
      });

      const dispatch = vi.fn();
      mapProviderMock.useReduxDispatch.mockReturnValue(dispatch);
      mapActionsMock.setManualFeatureTooltipsEnabled.mockImplementation((enabled: boolean) => ({ type: "SET_MANUAL", payload: enabled }));
      mapActionsMock.setFeatureTooltipsEnabled.mockImplementation((enabled: boolean) => ({ type: "SET_TIPS", payload: enabled }));
      mapActionsMock.setLayerTransparency.mockImplementation((mapName: string, id: string, opacity: number) => ({ type: "SET_OPACITY", payload: { mapName, id, opacity } }));
      mapActionsMock.setViewSizeUnits.mockImplementation((units: number) => ({ type: "SET_UNITS", payload: units }));
      mapActionsMock.enableSelectDragPan.mockImplementation((enabled: boolean) => ({ type: "SET_DRAGPAN", payload: enabled }));
   });

   it("dispatches checkbox and slider actions", () => {
      const dispatch = mapProviderMock.useReduxDispatch();
      render(<ViewerOptions />);

      const checkboxes = screen.getAllByRole("checkbox");
      fireEvent.click(checkboxes[0]);
      fireEvent.click(checkboxes[1]);
      fireEvent.click(checkboxes[2]);

      expect(mapActionsMock.setFeatureTooltipsEnabled).toHaveBeenCalledWith(false);
      expect(mapActionsMock.setManualFeatureTooltipsEnabled).toHaveBeenCalledWith(false);
      expect(mapActionsMock.enableSelectDragPan).toHaveBeenCalledWith(false);

      const sliders = screen.getAllByTestId("slider");
      fireEvent.change(sliders[0], { target: { value: "0.9" } });
      fireEvent.change(sliders[1], { target: { value: "0.4" } });
      fireEvent.change(sliders[2], { target: { value: "0.3" } });
      fireEvent.change(sliders[3], { target: { value: "0.2" } });
      expect(mapActionsMock.setLayerTransparency).toHaveBeenCalledTimes(4);
      expect(dispatch).toHaveBeenCalled();
   });

   it("dispatches view-size unit action and renders stateless branches", () => {
      const { rerender, queryByText } = render(<ViewerOptions />);
      fireEvent.change(screen.getByLabelText("MAP_SIZE_DISPLAY_UNITS"), { target: { value: "1" } });
      expect(mapActionsMock.setViewSizeUnits).toHaveBeenCalledWith(1);

      hooksMock.useViewerIsStateless.mockReturnValue(true);
      hooksMgMock.useActiveMapState.mockReturnValue(undefined);
      rerender(<ViewerOptions />);
      expect(queryByText("FEATURE_TOOLTIPS")).toBeNull();
   });
});
