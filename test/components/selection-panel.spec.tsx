import * as React from "react";
import { mount } from "enzyme";
import { SelectionPanel } from "../../src/components/selection-panel";
import { SelectedFeatureSet, SelectedFeature, SelectedLayer, LayerMetadata } from "../../src/api/contracts/query";
import { tr } from "../../src/api/i18n";
import { createSelectionSet } from "../../test-data";
import { ICompositeSelection, ICompositeSelectionLayer } from "../../src/api/common";

class MockCompositeSelectionLayer implements ICompositeSelectionLayer {
    constructor(private layer: SelectedLayer) { }
    getLayerId(): string | undefined {
        return this.layer["@id"];
    }
    getName(): string {
        return this.layer["@name"];
    }
    getLayerMetadata(): LayerMetadata | undefined {
        return this.layer.LayerMetadata;
    }
    getFeatureAt(featureIndex: number): SelectedFeature {
        return (this.layer.Feature ?? [])[featureIndex];
    }
    getFeatureCount(): number {
        return this.layer.Feature?.length ?? 0;
    }
}

class MockCompositeSelection implements ICompositeSelection {
    constructor(private mgSelection: SelectedFeatureSet) {

    }
    getLayerCount(): number {
        return this.mgSelection.SelectedLayer.length;
    }
    getLayers(): ICompositeSelectionLayer[] {
        return this.mgSelection.SelectedLayer.map(lyr => new MockCompositeSelectionLayer(lyr));
    }
    getLayerAt(layerIndex: number): ICompositeSelectionLayer | undefined {
        const lyr = this.mgSelection.SelectedLayer[layerIndex];
        if (lyr)
            return new MockCompositeSelectionLayer(lyr);
        return undefined;
    }
    getFeatureAt(layerIndex: number, featureIndex: number): SelectedFeature | undefined {
        return this.getLayerAt(layerIndex)?.getFeatureAt(featureIndex);
    }
}

function makeCompositeSelection(set: SelectedFeatureSet): ICompositeSelection {
    return new MockCompositeSelection(set);
}

type ZoomFeatureFunc = (feat: SelectedFeature) => void;

describe("components/selection-panel", () => {
    it("null selection results in empty results message", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = {
            SelectedLayer: []
        };
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = makeCompositeSelection(set);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(0);
        expect(wrapper.find(".selection-panel-property-grid")).toHaveLength(0);
        expect(wrapper.find(".selection-panel-no-selection")).toHaveLength(1);
        expect(wrapper.find(".selection-panel-no-selection").text()).toBe(tr("NO_SELECTED_FEATURES"));
    });
    it("Empty selection results in empty results message", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = {
            SelectedLayer: []
        };
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = makeCompositeSelection(set);
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
        const sel = makeCompositeSelection(set);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(1);
        expect(wrapper.find(".selection-panel-property-grid")).toHaveLength(1);
        expect(wrapper.find({ "data-property-value-for": "Name" }).text()).toBe("Foo / Feature 1");
        expect(wrapper.find("tr")).toHaveLength(3);
    });
    it("Can scroll forwards/backwards on first selected layer", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = createSelectionSet();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = makeCompositeSelection(set);
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
        const sel = makeCompositeSelection(set);
        const wrapper = mount(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(wrapper.find(".selection-panel-toolbar")).toHaveLength(1);
        expect(wrapper.find(".toolbar-btn")).toHaveLength(3);
        const zoom = wrapper.find(".toolbar-btn").at(2);
        zoom.simulate("click");
        expect(onZoomRequest.mock.calls).toHaveLength(1);
        expect(onZoomRequest.mock.calls[0]).toHaveLength(1);
        expect(onZoomRequest.mock.calls[0][0]).toBe(set.SelectedLayer[0].Feature[0]);
    });
    it("Switching selected layer resets feature index to 0", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = createSelectionSet();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = makeCompositeSelection(set);
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
});