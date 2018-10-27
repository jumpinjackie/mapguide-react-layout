import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { SessionExpired } from "../../src/components/session-expired";

describe("components/session-expired", () => {
    it("renders", () => {
        const wrapper = shallow(<SessionExpired locale="en" />);
        const div = wrapper.find("div");
        expect(div).toHaveLength(1);
        const p = div.find("p");
        const ul = div.find("ul");
        expect(p).toHaveLength(2);
        expect(ul).toHaveLength(1);
        const li = ul.find("li");
        expect(li).toHaveLength(1);
    });
});