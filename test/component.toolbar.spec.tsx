import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { IItem, FlyoutMenuChildItem } from "../src/components/toolbar";

describe("components/toolbar", () => {
    describe("FlyoutMenuChildItem", () => {
        it("renders item w/ static labels and tooltip", () => {
            const item: IItem = {
                label: "Foo",
                tooltip: "Bar"
            };
            const wrapper = mount(<FlyoutMenuChildItem item={item} />);
            const li = wrapper.find("li");
            expect(li).toHaveLength(1);
            expect(li.at(0).hasClass("noselect")).toBe(true);
            expect(li.at(0).hasClass("flyout-menu-child-item")).toBe(true);
            expect((li.at(0).props() as any).title).toBe("Bar");
            const div = wrapper.find("div");
            expect(div).toHaveLength(1);
            const img = wrapper.find("img");
            expect(img).toHaveLength(1);
            expect(div.text().trim()).toBe("Foo");
        });
        it("renders item w/ dynamic tooltip", () => {
            let tt = "Bar";
            const item: IItem = {
                label: "Foo",
                tooltip: () => tt
            };
            let wrapper = mount(<FlyoutMenuChildItem item={item} />);
            let li = wrapper.find("li");
            expect(li).toHaveLength(1);
            expect((li.at(0).props() as any).title).toBe("Bar");

            tt = "Bazz";
            wrapper = mount(<FlyoutMenuChildItem item={item} />);
            li = wrapper.find("li");
            expect(li).toHaveLength(1);
            expect((li.at(0).props() as any).title).toBe("Bazz");
        });
        it("renders select item w/ appropriate styles", () => {
            const item: IItem = {
                label: "Foo",
                selected: true
            };
            let wrapper = mount(<FlyoutMenuChildItem item={item} />);
            let li = wrapper.find("li");
            expect(li).toHaveLength(1);
            let div = li.find("div");
            expect(div).toHaveLength(1);
            const style = div.at(0).props().style;
            expect(style).not.toBeNull();
            if (style) {
                expect(style.cursor).toBe("pointer");
                expect(style.border).not.toBeNull();
                expect(style.paddingLeft).not.toBeNull();
                expect(style.paddingRight).not.toBeNull();
                expect(style.paddingTop).not.toBeNull();
                expect(style.paddingBottom).not.toBeNull();
            }
        });
        it("Does not trigger onInvoked if disabled", () => {
            const handler = jest.fn();
            const invoker = jest.fn();
            const item: IItem = {
                enabled: false,
                invoke: invoker
            };
            let wrapper = mount(<FlyoutMenuChildItem item={item} onInvoked={handler} />);
            let li = wrapper.find("li");
            expect(li).toHaveLength(1);
            li.simulate("click");
            expect(handler.mock.calls).toHaveLength(0);
            expect(invoker.mock.calls).toHaveLength(0);
        });
        it("Does trigger onInvoked if enabled", () => {
            const handler = jest.fn();
            const invoker = jest.fn();
            const item: IItem = {
                enabled: true,
                invoke: invoker
            };
            let wrapper = mount(<FlyoutMenuChildItem item={item} onInvoked={handler} />);
            let li = wrapper.find("li");
            expect(li).toHaveLength(1);
            li.simulate("click");
            expect(handler.mock.calls).toHaveLength(1);
            expect(invoker.mock.calls).toHaveLength(1);
        });
    });
});