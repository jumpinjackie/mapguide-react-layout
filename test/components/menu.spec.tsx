import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { MenuComponent } from "../../src/components/menu";
import { IItem } from "../../src/components/toolbar";

describe("components/menu", () => {
    it("Renders", () => {
        const items: IItem[] = [
            { label: "Foo" },
            { label: "Bar" }
        ];
        const fnInvoke = jest.fn();
        const { container } = render(<MenuComponent items={items} onInvoked={fnInvoke} />);
        const eItems = container.querySelectorAll("a.bp3-menu-item");
        expect(eItems).toHaveLength(2);
    });
    it("Raises onInvoke if a child item is clicked", () => {
        const items: IItem[] = [
            { label: "Foo" }
        ];
        const fnInvoke = jest.fn();
        const { container } = render(<MenuComponent items={items} onInvoked={fnInvoke} />);
        const eItems = container.querySelectorAll("a.bp3-menu-item");
        fireEvent.click(eItems[0]);
        expect(fnInvoke.mock.calls).toHaveLength(1);
    });
    it("Raises onInvoke and item's invoke handler if a child item is clicked", () => {
        const fnInvoke = jest.fn();
        const fnInvoke2 = jest.fn();
        const items: IItem[] = [
            { label: "Foo", invoke: fnInvoke2 }
        ];
        const { container } = render(<MenuComponent items={items} onInvoked={fnInvoke} />);
        const eItems = container.querySelectorAll("a.bp3-menu-item");
        fireEvent.click(eItems[0]);
        expect(fnInvoke.mock.calls).toHaveLength(1);
        expect(fnInvoke2.mock.calls).toHaveLength(1);
    });
});