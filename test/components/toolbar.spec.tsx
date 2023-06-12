import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { IItem, FlyoutMenuChildItem } from "../../src/components/toolbar";

describe("components/toolbar", () => {
    describe("FlyoutMenuChildItem", () => {
        it("renders item w/ static labels and tooltip", () => {
            const item: IItem = {
                label: "Foo",
                tooltip: "Bar"
            };
            const { getByText, container } = render(<FlyoutMenuChildItem item={item} />);
            const li = container.querySelectorAll("li");
            expect(li).toHaveLength(1);
            expect(li[0].classList.contains("noselect")).toBe(true);
            expect(li[0].classList.contains("flyout-menu-child-item")).toBe(true);
            expect(li[0].getAttribute("title")).toBe("Bar");
            const div = container.querySelectorAll("div");
            expect(div).toHaveLength(1);
            const img = container.querySelectorAll("img");
            expect(img).toHaveLength(0); //Because we have no icon settings
            const res = getByText("Foo");
            expect(res).not.toBeUndefined();
        });
        it("renders item w/ dynamic tooltip", () => {
            let tt = "Bar";
            const item: IItem = {
                label: "Foo",
                tooltip: () => tt
            };
            {
                const { container } = render(<FlyoutMenuChildItem item={item} />);
                const li = container.querySelectorAll("li");
                expect(li).toHaveLength(1);
                expect(li[0].getAttribute("title")).toBe("Bar");
            }
            tt = "Bazz";
            {
                const { container } = render(<FlyoutMenuChildItem item={item} />);
                const li = container.querySelectorAll("li");
                expect(li).toHaveLength(1);
                expect(li[0].getAttribute("title")).toBe("Bazz");
            }
        });
        it("renders select item w/ appropriate styles", () => {
            const item: IItem = {
                label: "Foo",
                selected: true
            };
            const { container } = render(<FlyoutMenuChildItem item={item} />);
            const li = container.querySelectorAll("li");
            expect(li).toHaveLength(1);
            const div = li[0].getElementsByTagName("div");
            expect(div).toHaveLength(1);
            const style = div[0].style;
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
            const { container } = render(<FlyoutMenuChildItem item={item} onInvoked={handler} />);
            const li = container.querySelectorAll("li");
            expect(li).toHaveLength(1);
            fireEvent.click(li[0]);
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
            const { container } = render(<FlyoutMenuChildItem item={item} onInvoked={handler} />);
            const li = container.querySelectorAll("li");
            expect(li).toHaveLength(1);
            fireEvent.click(li[0]);
            expect(handler.mock.calls).toHaveLength(1);
            expect(invoker.mock.calls).toHaveLength(1);
        });
    });
});