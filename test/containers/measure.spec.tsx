import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const hooksMock = vi.hoisted(() => ({
   useActiveMapName: vi.fn(),
   useViewerLocale: vi.fn(),
   useAvailableMaps: vi.fn(),
}));

const hooksMgMock = vi.hoisted(() => ({
   useActiveMapIsArbitraryCoordSys: vi.fn(),
   useActiveMapProjectionUnits: vi.fn(),
}));

const mapProviderMock = vi.hoisted(() => ({
   useReduxDispatch: vi.fn(),
   useMapProviderContext: vi.fn(),
}));

const actionMapMock = vi.hoisted(() => ({
   setActiveTool: vi.fn(),
}));

const measureClassMock = vi.hoisted(() => ({
   instances: [] as any[],
   MeasureContext: vi.fn().mockImplementation((_viewer: any, mapName: string, parent: any) => {
      const instance = {
         mapName,
         parent,
         getMapName: () => mapName,
         startMeasure: vi.fn(),
         endMeasure: vi.fn(),
         clearMeasurements: vi.fn(),
         handleDrawTypeChange: vi.fn(),
         setParent: vi.fn(),
         detachParent: vi.fn(),
         activate: vi.fn(),
         deactivate: vi.fn(),
      };
      measureClassMock.instances.push(instance);
      return instance;
   }),
}));

vi.mock("../../src/containers/hooks", () => hooksMock);
vi.mock("../../src/containers/hooks-mapguide", () => hooksMgMock);
vi.mock("../../src/components/map-providers/context", () => mapProviderMock);
vi.mock("../../src/actions/map", () => actionMapMock);
vi.mock("../../src/containers/measure-context", () => ({
   MeasureContext: measureClassMock.MeasureContext,
}));

vi.mock("../../src/api/i18n", () => ({
   tr: (key: string, _locale?: string, args?: Record<string, unknown>) => {
      if (args?.value !== undefined) {
         return `${key}:${String(args.value)}`;
      }
      if (args?.segment !== undefined) {
         return `${key}:${String(args.segment)}`;
      }
      return key;
   },
   DEFAULT_LOCALE: "en",
}));

vi.mock("../../src/components/elements/element-context", () => ({
   ElementGroup: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
   TypedSelect: ({ value, onChange, items }: any) => (
      <select data-testid="measure-type" value={value} onChange={(e) => onChange(e.target.value)}>
         {items.map((i: any) => <option key={i.value} value={i.value}>{i.label}</option>)}
      </select>
   ),
   useElementContext: () => ({
      Callout: ({ children }: React.PropsWithChildren) => <div data-testid="measuring-callout">{children}</div>,
      Button: ({ children, onClick, disabled }: any) => <button type="button" disabled={disabled} onClick={onClick}>{children}</button>,
   }),
}));

import { MeasureContainer } from "../../src/containers/measure";

describe("MeasureContainer", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      measureClassMock.instances.length = 0;

      hooksMock.useActiveMapName.mockReturnValue("Map1");
      hooksMock.useViewerLocale.mockReturnValue("en");
      hooksMock.useAvailableMaps.mockReturnValue([
         { name: "Map1", value: "Map1" },
         { name: "Map2", value: "Map2" },
      ]);
      hooksMgMock.useActiveMapIsArbitraryCoordSys.mockReturnValue(false);
      hooksMgMock.useActiveMapProjectionUnits.mockReturnValue(undefined);

      const dispatch = vi.fn();
      mapProviderMock.useReduxDispatch.mockReturnValue(dispatch);
      mapProviderMock.useMapProviderContext.mockReturnValue({
         isReady: () => true,
      });
      actionMapMock.setActiveTool.mockImplementation((tool: number) => ({ type: "SET_TOOL", payload: tool }));
   });

   it("creates/activates contexts and drives start/end/clear actions", async () => {
      const dispatch = mapProviderMock.useReduxDispatch();
      const { unmount } = render(<MeasureContainer />);

      await waitFor(() => {
         expect(measureClassMock.MeasureContext).toHaveBeenCalledTimes(2);
      });
      const active = measureClassMock.instances.find(i => i.mapName === "Map1");
      expect(active.activate).toHaveBeenCalled();

      fireEvent.click(screen.getByText("MEASUREMENT_START"));
      expect(actionMapMock.setActiveTool).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({ type: "SET_TOOL", payload: 3 });
      expect(active.startMeasure).toHaveBeenCalledWith("LineString");

      fireEvent.click(screen.getByText("MEASUREMENT_END"));
      expect(active.endMeasure).toHaveBeenCalled();

      fireEvent.click(screen.getByText("MEASUREMENT_CLEAR"));
      expect(active.clearMeasurements).toHaveBeenCalled();

      unmount();
      expect(active.detachParent).toHaveBeenCalled();
      expect(active.deactivate).toHaveBeenCalled();
   });

   it("updates draw type while measuring and renders segment totals from callback", async () => {
      render(<MeasureContainer />);
      await waitFor(() => {
         expect(measureClassMock.instances.length).toBeGreaterThan(0);
      });

      const active = measureClassMock.instances.find(i => i.mapName === "Map1");

      fireEvent.click(screen.getByText("MEASUREMENT_START"));
      fireEvent.change(screen.getByTestId("measure-type"), { target: { value: "Polygon" } });
      expect(active.handleDrawTypeChange).toHaveBeenCalledWith("Polygon");

      active.parent.updateSegments("Area", 25.1234, [{ segment: 1, length: 12.5 }]);
      await waitFor(() => {
         expect(screen.getByText("MEASURE_TOTAL_AREA")).toBeTruthy();
      });
      expect(screen.getByText("MEASURE_SEGMENT_PART:1")).toBeTruthy();
   });
});
