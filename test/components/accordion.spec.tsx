import * as React from "react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Accordion, IAccordionPanelSpec, IAccordionPanelContentDimensions } from "../../src/components/accordion";

const PANEL_SPEC: IAccordionPanelSpec[] = [
    {
        id: "Foo",
        title: "Foo",
        contentRenderer: (dim: IAccordionPanelContentDimensions) => {
            return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                <p>Foo Content</p>
            </div>;
        }
    },
    {
        id: "Bar",
        title: "Bar",
        contentRenderer: (dim: IAccordionPanelContentDimensions) => {
            return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                <p>Bar Content</p>
            </div>;
        }
    },
    {
        id: "Baz",
        title: "Baz",
        contentRenderer: (dim: IAccordionPanelContentDimensions) => {
            return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                <p>Baz Content</p>
            </div>;
        }
    }
];

describe("components/accordion", () => {
    beforeEach(() => {
        delete (window as any).ResizeObserver;
        window.ResizeObserver = vi.fn().mockImplementation(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
    });
    afterEach(() => {
        window.ResizeObserver = ResizeObserver;
        vi.restoreAllMocks();
    });
    it("clicking collapsed panel expands it and collapses others", () => {
        const handler = vi.fn();
        const wrapper = render(<Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} onActivePanelChanged={handler} />);
        const midPanel = wrapper.container.querySelectorAll(".component-accordion-panel-header")[1];
        expect(midPanel).not.toBeUndefined();
        fireEvent.click(midPanel);
        //1 call
        expect(handler.mock.calls.length).toBe(1);
        //1 argument
        expect(handler.mock.calls[0].length).toBe(1);
        //argument is the id of the panel we clicked
        expect(handler.mock.calls[0][0]).toBe("Bar");
    });
    it("clicking expanded panel does not collapse it", () => {
        const handler = vi.fn();
        const wrapper = render(<Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} />);
        const lastPanel = wrapper.container.querySelectorAll(".component-accordion-panel-header")[2];
        expect(lastPanel).not.toBeUndefined();
        fireEvent.click(lastPanel);
        //Expect handler to not be called as the panel clicked is already expanded
        expect(handler.mock.calls.length).toBe(0);
    });
    it("renders with the last panel open by default if no activePanelId is provided", () => {
        const wrapper = render(<Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} />);
        const panelHeaders = wrapper.container.querySelectorAll(".component-accordion-panel-header");
        expect(panelHeaders.length).toBe(3);
        // The last panel should be open, so its content should be visible
        expect(wrapper.getByText("Baz Content")).toBeInTheDocument();
    });
    it("renders with the specified activePanelId open", () => {
        const wrapper = render(<Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} activePanelId="Foo" />);
        // The Foo panel content should be visible
        expect(wrapper.getByText("Foo Content")).toBeInTheDocument();
    });
    it("calls onActivePanelChanged only when switching to a different panel", () => {
        const handler = vi.fn();
        const wrapper = render(<Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} onActivePanelChanged={handler} />);
        const firstPanel = wrapper.container.querySelectorAll(".component-accordion-panel-header")[0];
        fireEvent.click(firstPanel);
        expect(handler).toHaveBeenCalledWith("Foo");
        // Clicking again should not call handler again
        fireEvent.click(firstPanel);
        expect(handler).toHaveBeenCalledTimes(1);
    });
    it("updates openPanel when activePanelId prop changes", () => {
        const { rerender, getByText } = render(
            <Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} activePanelId="Foo" />
        );
        expect(getByText("Foo Content")).toBeInTheDocument();
        rerender(<Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} activePanelId="Bar" />);
        expect(getByText("Bar Content")).toBeInTheDocument();
    });
    it("handles missing or invalid activePanelId gracefully", () => {
        // activePanelId is undefined
        const { getByText, rerender } = render(
            <Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} />
        );
        expect(getByText("Baz Content")).toBeInTheDocument();
        // activePanelId is invalid
        rerender(<Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} activePanelId="DoesNotExist" />);
        expect(getByText("Baz Content")).toBeInTheDocument();
    });
    it("passes isResizing prop to contentRenderer", () => {
        let receivedIsResizing: boolean | undefined = undefined;
        const panels: IAccordionPanelSpec[] = [
            {
                id: "Resize",
                title: "Resize",
                contentRenderer: (_dim, isResizing) => {
                    receivedIsResizing = isResizing;
                    return <div>Resize</div>;
                }
            }
        ];
        render(<Accordion style={{ width: 100, height: 100 }} panels={panels} isResizing={true} />);
        expect(receivedIsResizing).toBe(true);
    });
});