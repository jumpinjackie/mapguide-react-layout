import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const toolbarMock = vi.hoisted(() => ({
    Toolbar: vi.fn(),
}));

const parseUriMock = vi.hoisted(() => ({
    parseComponentUri: vi.fn(),
}));

const placeholderMock = vi.hoisted(() => ({
    PlaceholderComponent: vi.fn(),
}));

const i18nMock = vi.hoisted(() => ({
    tr: vi.fn((key: string) => key),
}));

vi.mock("../../src/components/toolbar", () => ({
    Toolbar: (props: any) => {
        toolbarMock.Toolbar(props);
        return <div data-testid="toolbar" />;
    },
    DEFAULT_TOOLBAR_SIZE: 32,
    TOOLBAR_BACKGROUND_COLOR: "#ccddee",
}));

vi.mock("../../src/utils/url", () => ({
    parseComponentUri: parseUriMock.parseComponentUri,
}));

vi.mock("../../src/api/registry/component", () => ({
    PlaceholderComponent: (props: any) => {
        placeholderMock.PlaceholderComponent(props);
        return <div data-testid="placeholder-component">{props.id}</div>;
    },
}));

vi.mock("../../src/api/i18n", () => ({
    tr: i18nMock.tr,
}));

vi.mock("../../src/components/elements/element-context", () => ({
    useElementContext: () => ({
        NonIdealState: ({ title, description }: any) => <div data-testid="loading-overlay">{title}:{description}</div>,
        Spinner: () => <div data-testid="spinner" />,
    }),
}));

import { TaskPane } from "../../src/components/task-pane";

describe("components/task-pane", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        parseUriMock.parseComponentUri.mockReturnValue(undefined);
    });

    it("renders toolbars when task bar is enabled and forwards toolbar callbacks", () => {
        const onCloseFlyout = vi.fn();
        const onOpenFlyout = vi.fn();

        render(
            <TaskPane
                locale="en"
                currentUrl=""
                homeAction={{ label: "Home" } as any}
                backAction={{ label: "Back" } as any}
                forwardAction={{ label: "Forward" } as any}
                onUrlLoaded={vi.fn()}
                showTaskBar={true}
                onOpenFlyout={onOpenFlyout}
                onCloseFlyout={onCloseFlyout}
                flyoutStates={{}}
            />
        );

        expect(screen.getAllByTestId("toolbar")).toHaveLength(2);
        const firstToolbarProps = toolbarMock.Toolbar.mock.calls[0][0];
        const secondToolbarProps = toolbarMock.Toolbar.mock.calls[1][0];
        expect(firstToolbarProps.childItems).toHaveLength(4);
        expect(secondToolbarProps.childItems[0].flyoutId).toBe("TaskMenu");

        firstToolbarProps.onCloseFlyout("x1");
        secondToolbarProps.onOpenFlyout("x2", { posX: 1, posY: 2, width: 3, height: 4 });
        expect(onCloseFlyout).toHaveBeenCalledWith("x1");
        expect(onOpenFlyout).toHaveBeenCalledWith("x2", { posX: 1, posY: 2, width: 3, height: 4 });
    });

    it("renders a placeholder component when currentUrl is a component URI", () => {
        parseUriMock.parseComponentUri.mockReturnValue({
            name: "SampleComponent",
            props: { id: 5 },
        });

        render(
            <TaskPane
                locale="en"
                currentUrl="component://sample?id=5"
                homeAction={{ label: "Home" } as any}
                backAction={{ label: "Back" } as any}
                forwardAction={{ label: "Forward" } as any}
                onUrlLoaded={vi.fn()}
                showTaskBar={false}
                onOpenFlyout={vi.fn()}
                onCloseFlyout={vi.fn()}
            />
        );

        expect(screen.getByTestId("placeholder-component").textContent).toContain("SampleComponent");
        expect(placeholderMock.PlaceholderComponent).toHaveBeenCalledWith(expect.objectContaining({
            id: "SampleComponent",
            componentProps: { id: 5 },
            locale: "en",
        }));
    });

    it("loads iframe URL and reports loaded URL when frame load event fires", async () => {
        vi.useFakeTimers();
        const replace = vi.fn();
        const onUrlLoaded = vi.fn();

        const { container } = render(
            <TaskPane
                locale="en"
                currentUrl="https://example.test/task?mapname=Map1"
                mapName="Map1"
                homeAction={{ label: "Home" } as any}
                backAction={{ label: "Back" } as any}
                forwardAction={{ label: "Forward" } as any}
                onUrlLoaded={onUrlLoaded}
                showTaskBar={false}
                onOpenFlyout={vi.fn()}
                onCloseFlyout={vi.fn()}
                lastUrlPushed={false}
            />
        );

        const frame = container.querySelector("iframe[name='taskPaneFrame']") as HTMLIFrameElement;
        Object.defineProperty(frame, "contentWindow", {
            value: {
                location: {
                    href: "https://example.test/task?mapname=Map1",
                    replace,
                },
            },
            configurable: true,
        });

        vi.runAllTimers();
        expect(replace).toHaveBeenCalledWith("https://example.test/task?mapname=Map1");
        expect(screen.getByTestId("loading-overlay")).toBeTruthy();

        fireEvent.load(frame);
        expect(onUrlLoaded).toHaveBeenCalledWith("https://example.test/task?mapname=Map1");

        vi.useRealTimers();
    });
});