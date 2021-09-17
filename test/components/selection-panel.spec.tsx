import * as React from "react";
import { mount } from "enzyme";
import { SelectionPanel } from "../../src/components/selection-panel";
import { SelectedFeatureSet } from "../../src/api/contracts/query";
import { tr } from "../../src/api/i18n";
import { createClientSelectionSet, createSelectionSet } from "../../test-data";
import { CompositeSelection } from "../../src/api/composite-selection";
import { ClientSelectionSet } from "../../src/api/contracts/common";
import { strReplaceAll } from "../../src/utils/string";

describe("components/selection-panel", () => {
    it("null selection results in empty results message", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = {
            SelectedLayer: []
        };
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(set);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(0);
        expect(wrapper.find(".selection-panel-property-grid")).toHaveLength(0);
        expect(wrapper.find(".selection-panel-no-selection")).toHaveLength(1);
        expect(wrapper.find(".selection-panel-no-selection").text()).toBe(tr("NO_SELECTED_FEATURES"));
    });
    it("Empty MG selection results in empty results message", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = {
            SelectedLayer: []
        };
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(set);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(0);
        expect(wrapper.find(".selection-panel-property-grid")).toHaveLength(0);
        expect(wrapper.find(".selection-panel-no-selection")).toHaveLength(1);
        expect(wrapper.find(".selection-panel-no-selection").text()).toBe(tr("NO_SELECTED_FEATURES"));
    });
    it("Empty client selection results in empty results message", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const csel: ClientSelectionSet = {
            layers: []
        };
        const sel = new CompositeSelection(undefined, csel);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(0);
        expect(wrapper.find(".selection-panel-property-grid")).toHaveLength(0);
        expect(wrapper.find(".selection-panel-no-selection")).toHaveLength(1);
        expect(wrapper.find(".selection-panel-no-selection").text()).toBe(tr("NO_SELECTED_FEATURES"));
    });
    it("Empty MG and client selection results in empty results message", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(undefined, undefined);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(0);
        expect(wrapper.find(".selection-panel-property-grid")).toHaveLength(0);
        expect(wrapper.find(".selection-panel-no-selection")).toHaveLength(1);
        expect(wrapper.find(".selection-panel-no-selection").text()).toBe(tr("NO_SELECTED_FEATURES"));
    });
    it("Selection should show first feature of first layer when set", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = createSelectionSet();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(set);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(1);
        expect(wrapper.find(".selection-panel-property-grid")).toHaveLength(1);
        expect(wrapper.find({ "data-property-value-for": "Name" }).text()).toBe("Foo / Feature 1");
        expect(wrapper.find("tr")).toHaveLength(3);
    });
    it("HTML cleaning function is called if given", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = createSelectionSet();
        const cleanHTML = (html: string) => strReplaceAll(html, "Foo", "Cleaned")
        const allowHTMLValues = true;
        const sel = new CompositeSelection(set);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(1);
        expect(wrapper.find(".selection-panel-property-grid")).toHaveLength(1);
        expect(wrapper.find({ "data-property-value-for": "Name" }).text()).toBe("Cleaned / Feature 1");
        expect(wrapper.find("tr")).toHaveLength(3);
    });
    it("Can scroll forwards/backwards on first selected layer", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = createSelectionSet();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(set);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(1);
        expect(wrapper.find(".toolbar-btn")).toHaveLength(3);
        const back = wrapper.find(".toolbar-btn").at(0);
        const fwd = wrapper.find(".toolbar-btn").at(1);
        fwd.simulate("click");
        expect(wrapper.find({ "data-property-value-for": "Name" }).text()).toBe("Foo / Feature 2");
        back.simulate("click");
        expect(wrapper.find({ "data-property-value-for": "Name" }).text()).toBe("Foo / Feature 1");
    });
    it("Zoom to current feature raises handler", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = createSelectionSet();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(set);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(1);
        expect(wrapper.find(".toolbar-btn")).toHaveLength(3);
        const zoom = wrapper.find(".toolbar-btn").at(2);
        zoom.simulate("click");
        expect(onZoomRequest.mock.calls).toHaveLength(1);
        expect(onZoomRequest.mock.calls[0]).toHaveLength(1);
        expect(onZoomRequest.mock.calls[0][0]).toBe(set.SelectedLayer[0].Feature[0]);
    });
    it("Switching selected layer of MG selection resets feature index to 0", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = createSelectionSet();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(set);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(1); //, "Has Toolbar");
        expect(wrapper.find(".toolbar-btn")).toHaveLength(3); //, "Has Toolbar Buttons");
        const fwd = wrapper.find(".toolbar-btn").at(1);
        const select = wrapper.find("select");
        expect(select).toHaveLength(1); //, "Has Layer Select");
        expect(select.find("option")).toHaveLength(2);
        fwd.simulate("click");
        expect(wrapper.find({ "data-property-value-for": "Name" }).text()).toBe("Foo / Feature 2");
        select.simulate('change', { target: { value : 1 } })
        expect(wrapper.find({ "data-property-value-for": "Name" }).text()).toBe("Bar / Feature 1");
    });
    it("Switching selected layer of client selection resets feature index to 0", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set = createClientSelectionSet();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(undefined, set);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(1); //, "Has Toolbar");
        expect(wrapper.find(".toolbar-btn")).toHaveLength(3); //, "Has Toolbar Buttons");
        const fwd = wrapper.find(".toolbar-btn").at(1);
        const select = wrapper.find("select");
        expect(select).toHaveLength(1); //, "Has Layer Select");
        expect(select.find("option")).toHaveLength(2);
        fwd.simulate("click");
        expect(wrapper.find({ "data-property-value-for": "name" }).text()).toBe("Foo");
        select.simulate('change', { target: { value : 1 } })
        expect(wrapper.find({ "data-property-value-for": "description" }).text()).toBe("Bar");
    });
});