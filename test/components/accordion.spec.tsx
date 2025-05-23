import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Accordion, IAccordionPanelSpec, IAccordionPanelContentDimensions } from "../../src/components/accordion";

const PANEL_SPEC: IAccordionPanelSpec[] = [
    {
        id: "Foo",
        title: "Foo",
        contentRenderer: (dim: IAccordionPanelContentDimensions) => {
            return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                <p>Foo</p>
            </div>;
        }
    },
    {
        id: "Bar",
        title: "Bar",
        contentRenderer: (dim: IAccordionPanelContentDimensions) => {
            return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                <p>Bar</p>
            </div>;
        }
    },
    {
        id: "Baz",
        title: "Baz",
        contentRenderer: (dim: IAccordionPanelContentDimensions) => {
            return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                <p>Baz</p>
            </div>;
        }
    }
];

describe("components/accordion", () => {
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
});