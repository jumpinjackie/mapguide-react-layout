import * as React from "react";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";
import { SessionExpired } from "../src/components/session-expired";

describe("components/session-expired", () => {
    it("renders", () => {
        const wrapper = shallow(<SessionExpired locale="en" />);
        const div = wrapper.find("div");
        expect(div).to.have.length(1);
        const p = div.find("p");
        const ul = div.find("ul");
        expect(p).to.have.length(2);
        expect(ul).to.have.length(1);
        const li = ul.find("li");
        expect(li).to.have.length(1);
    });
});