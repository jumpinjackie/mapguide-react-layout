import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const elementMock = vi.hoisted(() => ({
    MenuComponent: vi.fn(),
}));

const placeholderMock = vi.hoisted(() => ({
    PlaceholderComponent: vi.fn(),
}));

vi.mock("../../src/components/elements/element-context", () => ({
    useElementContext: () => ({
        MenuComponent: (props: any) => {
            elementMock.MenuComponent(props);
            return <button data-testid="flyout-menu" onClick={() => props.onInvoked?.()}>menu</button>;
        },
    }),
}));

vi.mock("../../src/api/registry/component", () => ({
    PlaceholderComponent: (props: any) => {
        placeholderMock.PlaceholderComponent(props);
        return <div data-testid="flyout-component">{props.id}</div>;
    },
}));

import { FlyoutRegion } from "../../src/components/flyout-region";

describe("components/flyout-region", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders a context menu flyout and closes when invoked", () => {
        const onCloseFlyout = vi.fn();
        const { container } = render(
            <FlyoutRegion
                locale="en"
                onCloseFlyout={onCloseFlyout}
                flyoutConf={{
                    MapContextMenu: {
                        open: true,
                        childItems: [{ label: "A" } as any],
                        metrics: { posX: 100, posY: 200, width: 20, height: 30 },
                    },
                }}
            />
        );

        const flyoutContainer = container.querySelector(".mg-flyout-menu-container") as HTMLElement;
        expect(flyoutContainer).toBeTruthy();
        expect(flyoutContainer.style.top).toBe("160px");
        expect(flyoutContainer.style.left).toBe("120px");
        fireEvent.click(screen.getByTestId("flyout-menu"));
        expect(onCloseFlyout).toHaveBeenCalledWith("MapContextMenu");
    });

    it("renders task menu with right alignment and IE iframe hack", () => {
        const { container } = render(
            <FlyoutRegion
                locale="en"
                onCloseFlyout={vi.fn()}
                flyoutConf={{
                    TaskMenu: {
                        open: true,
                        childItems: [{ label: "Tasks" } as any],
                        metrics: { posX: 250, posY: 120, width: 50, height: 24 },
                    },
                }}
            />
        );

        const flyoutContainer = container.querySelector(".mg-flyout-menu-container") as HTMLElement;
        expect(flyoutContainer).toBeTruthy();
        expect(flyoutContainer.style.top).toBe("144px");
        expect(flyoutContainer.style.right).not.toBe("");
        expect(container.querySelector("iframe.iframe-iehack-zindex")).toBeTruthy();
    });

    it("renders component flyout and skips closed flyouts", () => {
        const { container } = render(
            <FlyoutRegion
                locale="fr"
                onCloseFlyout={vi.fn()}
                flyoutConf={{
                    ClosedMenu: {
                        open: false,
                        childItems: [{ label: "Ignored" } as any],
                    },
                    CustomFlyout: {
                        open: true,
                        componentName: "Inspector",
                        componentProps: { id: 7 },
                        metrics: { posX: 30, posY: 40, width: 100, height: 20, vertical: true },
                    },
                }}
            />
        );

        expect(screen.getByTestId("flyout-component").textContent).toContain("Inspector");
        expect(placeholderMock.PlaceholderComponent).toHaveBeenCalledWith(expect.objectContaining({
            id: "Inspector",
            componentProps: { id: 7 },
            locale: "fr",
        }));

        const flyoutContainer = container.querySelector(".mg-flyout-component-container") as HTMLElement;
        expect(flyoutContainer).toBeTruthy();
        expect(flyoutContainer.style.top).toBe("40px");
        expect(flyoutContainer.style.left).toBe("130px");
        expect(elementMock.MenuComponent).not.toHaveBeenCalledWith(expect.objectContaining({ items: [{ label: "Ignored" }] }));
    });
});