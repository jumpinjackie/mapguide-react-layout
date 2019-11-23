import * as React from "react";
import { shallow, mount, render } from "enzyme";
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
        const handler = jest.fn();
        const wrapper = mount(<Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} onActivePanelChanged={handler} />);
        const midPanel = wrapper.find(".component-accordion-panel-header").at(1);
        expect(midPanel).not.toBeNull();
        midPanel.simulate("click");
        //1 call
        expect(handler.mock.calls.length).toBe(1);
        //1 argument
        expect(handler.mock.calls[0].length).toBe(1);
        //argument is the id of the panel we clicked
        expect(handler.mock.calls[0][0]).toBe("Bar");
    });
    it("clicking expanded panel does not collapse it", () => {
        const handler = jest.fn();
        const wrapper = mount(<Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} />);
        const lastPanel = wrapper.find(".component-accordion-panel-header").at(2);
        expect(lastPanel).not.toBeNull();
        lastPanel.simulate("click");
        //Expect handler to not be called as the panel clicked is already expanded
        expect(handler.mock.calls.length).toBe(0);
    });
});