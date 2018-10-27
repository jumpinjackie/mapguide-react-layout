import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { About } from "../../src/components/about";

describe("components/about", () => {
    it("renders a <h4> title", () => {
        const wrapper = shallow(<About />);
        const h4 = wrapper.find("h4");
        expect(h4).toHaveLength(1);
        expect(h4.text()).toBe("mapguide-react-layout");
    });
    it("renders a <hr>", () => {
        const wrapper = shallow(<About />);
        const hr = wrapper.find("hr");
        expect(hr).toHaveLength(1);
    });
    it("renders 3 <a> links", () => {
        const wrapper = shallow(<About />);
        const anchors = wrapper.find("a");
        expect(anchors).toHaveLength(3);
        expect(anchors.at(0).text()).toBe("GitHub");
        expect(anchors.at(1).text()).toBe("Issues");
        expect(anchors.at(2).text()).toBe("Fugue icon set by Yusuke Kamiyamane");
    });
});