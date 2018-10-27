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
    it("renders last panel as expanded", () => {
        const wrapper = mount(<Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} />);
        expect(wrapper.state("openPanel")).toBe("Baz");
    });
    it("clicking collapsed panel expands it and collapses others", () => {
        const wrapper = mount(<Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} />);
        expect(wrapper.state("openPanel")).toBe("Baz");
        const midPanel = wrapper.find(".component-accordion-panel-header").at(1);
        expect(midPanel).not.toBeNull();
        midPanel.simulate("click");
        expect(wrapper.state("openPanel")).toBe("Bar");
    });
    it("clicking expanded panel does not collapse it", () => {
        const wrapper = mount(<Accordion style={{ width: 250, height: 500 }} panels={PANEL_SPEC} />);
        expect(wrapper.state("openPanel")).toBe("Baz");
        const lastPanel = wrapper.find(".component-accordion-panel-header").at(2);
        expect(lastPanel).not.toBeNull();
        lastPanel.simulate("click");
        expect(wrapper.state("openPanel")).toBe("Baz");
    });
});