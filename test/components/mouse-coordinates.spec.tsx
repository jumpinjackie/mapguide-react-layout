import * as React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MouseCoordinates } from "../../src/components/mouse-coordinates";
import { getUnitOfMeasure, getUnitsOfMeasure } from '../../src/utils/units';
import { UnitOfMeasure } from '../../src/api/common';

describe("components/mouse-coordinates", () => {
    it("renders with no props", () => {
        const { container } = render(<MouseCoordinates />);
        expect(container.getElementsByTagName("span")).toHaveLength(0);
    });
    it("renders coords in default format if none specified", () => {
        const wrapper = render(<MouseCoordinates coords={[1, 2]} />);
        const el = wrapper.getByText("X: 1, Y: 2");
        expect(el).not.toBeUndefined();
    });
    it("renders coords in specified format if provided", () => {
        const wrapper = render(<MouseCoordinates coords={[1, 2]} format="Lng: {x}, Lat: {y}" />);
        const el = wrapper.getByText("Lng: 1, Lat: 2");
        expect(el).not.toBeUndefined();
    });
    it("renders coords with padding if under decimal limit", () => {
        const wrapper = render(<MouseCoordinates coords={[1.23, 2.43]} decimals={3} />);
        const el = wrapper.getByText("X: 1.230, Y: 2.430");
        expect(el).not.toBeUndefined();
    });
    it("renders coords with truncation if over decimal limit", () => {
        const wrapper = render(<MouseCoordinates coords={[1.23343, 2.43234]} decimals={2} />);
        const el = wrapper.getByText("X: 1.23, Y: 2.43");
        expect(el).not.toBeUndefined();
    });
    it("renders coords and fill in as much of the format string if it contains unknonw placeholders", () => {
        const wrapper = render(<MouseCoordinates coords={[1, 2]} format="Lng: {x}, Lat: {lat}" />);
        const el = wrapper.getByText("Lng: 1, Lat: {lat}");
        expect(el).not.toBeUndefined();
    });
    it("renders coords with correct localized units for applicable units", () => {
        const uoms = [
            UnitOfMeasure.Degrees,
            UnitOfMeasure.Pixels,
            UnitOfMeasure.Meters,
            UnitOfMeasure.Feet
        ];
        for (const uom of uoms) {
            const units = getUnitOfMeasure(UnitOfMeasure.Degrees).abbreviation();
            const wrapper = render(<MouseCoordinates coords={[1.23343, 2.43234]} decimals={2} units={units} />);
            const expEl = render(<span dangerouslySetInnerHTML={{ __html: `X: 1.23, Y: 2.43 ${units}` }} />)
            expect(expEl.container.innerHTML).toBe(wrapper.container.getElementsByTagName("span")[0].outerHTML);
        }
    });
});