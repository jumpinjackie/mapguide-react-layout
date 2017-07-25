import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { MenuComponent } from "../src/components/menu";
import { IItem } from "../src/components/toolbar";

describe("components/menu", () => {
    it("Renders", () => {
        const items: IItem[] = [
            { label: "Foo" },
            { label: "Bar" }
        ];
        const fnInvoke = jest.fn();
        const wrapper = mount(<MenuComponent items={items} onInvoked={fnInvoke} />);
        const eItems = wrapper.find("a.pt-menu-item");
        expect(eItems.length).toBe(2);
    });
    it("Raises onInvoke if a child item is clicked", () => {
        const items: IItem[] = [
            { label: "Foo" }
        ];
        const fnInvoke = jest.fn();
        const wrapper = mount(<MenuComponent items={items} onInvoked={fnInvoke} />);
        const eItems = wrapper.find("a.pt-menu-item");
        eItems.at(0).simulate("click");
        expect(fnInvoke.mock.calls).toHaveLength(1);
    });
    it("Raises onInvoke and item's invoke handler if a child item is clicked", () => {
        const fnInvoke = jest.fn();
        const fnInvoke2 = jest.fn();
        const items: IItem[] = [
            { label: "Foo", invoke: fnInvoke2 }
        ];
        const wrapper = mount(<MenuComponent items={items} onInvoked={fnInvoke} />);
        const eItems = wrapper.find("a.pt-menu-item");
        eItems.at(0).simulate("click");
        expect(fnInvoke.mock.calls).toHaveLength(1);
        expect(fnInvoke2.mock.calls).toHaveLength(1);
    });
});