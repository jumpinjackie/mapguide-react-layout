import * as React from "react";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";
import { About } from "../src/components/about";

describe("components/about", () => {
    it("renders a <h4> title", () => {
        const wrapper = shallow(<About />);
        const h4 = wrapper.find("h4");
        expect(h4).to.have.length(1);
        expect(h4.text()).to.be.equal("mapguide-react-layout");
    });
    it("renders a <hr>", () => {
        const wrapper = shallow(<About />);
        const hr = wrapper.find("hr");
        expect(hr).to.have.length(1);
    });
    it("renders 2 <a> links", () => {
        const wrapper = shallow(<About />);
        const anchors = wrapper.find("a"); 
        expect(anchors).to.have.length(2);
        expect(anchors.at(0).text()).to.be.equal("GitHub");
        expect(anchors.at(1).text()).to.be.equal("Issues");
    });
});