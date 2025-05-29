import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { IItem } from "../../src/components/toolbar";
import { MenuComponentProps, useElementContext } from "../../src/components/elements/element-context";

const MenuImpl: React.FC<MenuComponentProps> = (props) => {
    const { MenuComponent } = useElementContext();
    return <MenuComponent {...props} />;
}

describe("components/menu", () => {
    it("Renders", () => {
        const items: IItem[] = [
            { label: "Foo" },
            { label: "Bar" }
        ];
        const fnInvoke = vi.fn();
        const { container } = render(<MenuImpl items={items} onInvoked={fnInvoke} />);
        const eItems = container.querySelectorAll("a.bp3-menu-item");
        expect(eItems).toHaveLength(2);
    });
    it("Raises onInvoke if a child item is clicked", () => {
        const items: IItem[] = [
            { label: "Foo" }
        ];
        const fnInvoke = vi.fn();
        const { container } = render(<MenuImpl items={items} onInvoked={fnInvoke} />);
        const eItems = container.querySelectorAll("a.bp3-menu-item");
        fireEvent.click(eItems[0]);
        expect(fnInvoke.mock.calls).toHaveLength(1);
    });
    it("Raises onInvoke and item's invoke handler if a child item is clicked", () => {
        const fnInvoke = vi.fn();
        const fnInvoke2 = vi.fn();
        const items: IItem[] = [
            { label: "Foo", invoke: fnInvoke2 }
        ];
        const { container } = render(<MenuImpl items={items} onInvoked={fnInvoke} />);
        const eItems = container.querySelectorAll("a.bp3-menu-item");
        fireEvent.click(eItems[0]);
        expect(fnInvoke.mock.calls).toHaveLength(1);
        expect(fnInvoke2.mock.calls).toHaveLength(1);
    });
});