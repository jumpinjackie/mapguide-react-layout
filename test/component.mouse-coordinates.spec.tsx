import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { MouseCoordinates } from "../src/components/mouse-coordinates";

describe("components/mouse-coordinates", () => {
    it("renders with no props", () => {
        const wrapper = shallow(<MouseCoordinates />);
        expect(wrapper.text()).toBe("");
    });
    it("renders coords in default format if none specified", () => {
        const wrapper = shallow(<MouseCoordinates coords={[1, 2]} />);
        expect(wrapper.text()).toBe("X: 1, Y: 2");
    });
    it("renders coords in specified format if provided", () => {
        const wrapper = shallow(<MouseCoordinates coords={[1, 2]} format="Lng: {x}, Lat: {y}" />);
        expect(wrapper.text()).toBe("Lng: 1, Lat: 2");
    });
    it("renders coords with padding if under decimal limit", () => {
        const wrapper = shallow(<MouseCoordinates coords={[1.23, 2.43]} decimals={3} />);
        expect(wrapper.text()).toBe("X: 1.230, Y: 2.430");
    });
    it("renders coords with truncation if over decimal limit", () => {
        const wrapper = shallow(<MouseCoordinates coords={[1.23343, 2.43234]} decimals={2} />);
        expect(wrapper.text()).toBe("X: 1.23, Y: 2.43");
    });
    it("renders coords and fill in as much of the format string if it contains unknonw placeholders", () => {
        const wrapper = shallow(<MouseCoordinates coords={[1, 2]} format="Lng: {x}, Lat: {lat}" />);
        expect(wrapper.text()).toBe("Lng: 1, Lat: {lat}");
    });
});