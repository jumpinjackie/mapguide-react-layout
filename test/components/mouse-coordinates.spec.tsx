import * as React from "react";
import { render } from "enzyme";
import { MouseCoordinates } from "../../src/components/mouse-coordinates";

describe("components/mouse-coordinates", () => {
    it("renders with no props", () => {
        const wrapper = render(<MouseCoordinates />).find("span");
        expect(wrapper.html()).toBeNull();
    });
    it("renders coords in default format if none specified", () => {
        const wrapper = render(<MouseCoordinates coords={[1, 2]} />).find("span");
        expect(wrapper.html()).toBe("X: 1, Y: 2");
    });
    it("renders coords in specified format if provided", () => {
        const wrapper = render(<MouseCoordinates coords={[1, 2]} format="Lng: {x}, Lat: {y}" />).find("span");
        expect(wrapper.html()).toBe("Lng: 1, Lat: 2");
    });
    it("renders coords with padding if under decimal limit", () => {
        const wrapper = render(<MouseCoordinates coords={[1.23, 2.43]} decimals={3} />).find("span");
        expect(wrapper.html()).toBe("X: 1.230, Y: 2.430");
    });
    it("renders coords with truncation if over decimal limit", () => {
        const wrapper = render(<MouseCoordinates coords={[1.23343, 2.43234]} decimals={2} />).find("span");
        expect(wrapper.html()).toBe("X: 1.23, Y: 2.43");
    });
    it("renders coords and fill in as much of the format string if it contains unknonw placeholders", () => {
        const wrapper = render(<MouseCoordinates coords={[1, 2]} format="Lng: {x}, Lat: {lat}" />).find("span");
        expect(wrapper.html()).toBe("Lng: 1, Lat: {lat}");
    });
});