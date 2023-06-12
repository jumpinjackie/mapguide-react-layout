import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
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
        const { container } = render(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(container.querySelectorAll(".selection-panel-toolbar")).toHaveLength(0);
        expect(container.querySelectorAll(".selection-panel-property-grid")).toHaveLength(0);
        const nosel = container.querySelectorAll(".selection-panel-no-selection");
        expect(nosel).toHaveLength(1);
        expect(nosel[0].innerHTML).toBe(tr("NO_SELECTED_FEATURES"));
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
        const { container } = render(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(container.querySelectorAll(".selection-panel-toolbar")).toHaveLength(0);
        expect(container.querySelectorAll(".selection-panel-property-grid")).toHaveLength(0);
        const nosel = container.querySelectorAll(".selection-panel-no-selection");
        expect(nosel).toHaveLength(1);
        expect(nosel[0].innerHTML).toBe(tr("NO_SELECTED_FEATURES"));
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
        const { container } = render(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(container.querySelectorAll(".selection-panel-toolbar")).toHaveLength(0);
        expect(container.querySelectorAll(".selection-panel-property-grid")).toHaveLength(0);
        const nosel = container.querySelectorAll(".selection-panel-no-selection");
        expect(nosel).toHaveLength(1);
        expect(nosel[0].innerHTML).toBe(tr("NO_SELECTED_FEATURES"));
    });
    it("Empty MG and client selection results in empty results message", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(undefined, undefined);
        const { container } = render(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(container.querySelectorAll(".selection-panel-toolbar")).toHaveLength(0);
        expect(container.querySelectorAll(".selection-panel-property-grid")).toHaveLength(0);
        const nosel = container.querySelectorAll(".selection-panel-no-selection");
        expect(nosel).toHaveLength(1);
        expect(nosel[0].innerHTML).toBe(tr("NO_SELECTED_FEATURES"));
    });
    it("Selection should show first feature of first layer when set", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = createSelectionSet();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(set);
        const { getByText, container } = render(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(container.querySelectorAll(".selection-panel-toolbar")).toHaveLength(1);
        expect(container.querySelectorAll(".selection-panel-property-grid")).toHaveLength(1);
        expect(container.querySelectorAll("tr")).toHaveLength(3);
        const el = getByText("Foo / Feature 1");
        expect(el).not.toBeUndefined();
    });
    it("HTML cleaning function is called if given", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = createSelectionSet();
        const cleanHTML = (html: string) => strReplaceAll(html, "Foo", "Cleaned")
        const allowHTMLValues = true;
        const sel = new CompositeSelection(set);
        const { getByText, container } = render(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(container.querySelectorAll(".selection-panel-toolbar")).toHaveLength(1);
        expect(container.querySelectorAll(".selection-panel-property-grid")).toHaveLength(1)
        expect(container.querySelectorAll("tr")).toHaveLength(3);
        const el = getByText("Cleaned / Feature 1");
        expect(el).not.toBeUndefined();
    });
    it("Can scroll forwards/backwards on first selected layer", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = createSelectionSet();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(set);
        const { getByText, container } = render(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(container.querySelectorAll(".selection-panel-toolbar")).toHaveLength(1);
        const btns = container.querySelectorAll(".toolbar-btn");
        expect(btns).toHaveLength(3);
        const back = btns[0];
        const fwd = btns[1];
        fireEvent.click(fwd);
        const res1 = getByText("Foo / Feature 2");
        expect(res1).not.toBeUndefined();
        fireEvent.click(back);
        const res2 = getByText("Foo / Feature 1");
        expect(res2).not.toBeUndefined();
    });
    it("Zoom to current feature raises handler", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set: SelectedFeatureSet = createSelectionSet();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(set);
        const { container } = render(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(container.querySelectorAll(".selection-panel-toolbar")).toHaveLength(1);
        const btns = container.querySelectorAll(".toolbar-btn");
        expect(btns).toHaveLength(3);
        const zoom = btns[2];
        fireEvent.click(zoom);
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
        const { getByText, container } = render(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(container.querySelectorAll(".selection-panel-toolbar")).toHaveLength(1); //, "Has Toolbar");
        const btns = container.querySelectorAll(".toolbar-btn");
        expect(btns).toHaveLength(3); //, "Has Toolbar Buttons");
        const fwd = btns[1];
        const select = container.querySelectorAll("select");
        expect(select).toHaveLength(1); //, "Has Layer Select");
        expect(select[0].querySelectorAll("option")).toHaveLength(2);
        fireEvent.click(fwd);
        const res1 = getByText("Foo / Feature 2");
        expect(res1).not.toBeUndefined();
        fireEvent.change(select[0], { target: { value : 1 } });
        const res2 = getByText("Bar / Feature 1");
        expect(res2).not.toBeUndefined();
    });
    it("Switching selected layer of client selection resets feature index to 0", () => {
        const onZoomRequest = jest.fn();
        const onShowSelectedFeature = jest.fn();
        const set = createClientSelectionSet();
        const cleanHTML = jest.fn();
        const allowHTMLValues = false;
        const sel = new CompositeSelection(undefined, set);
        const { getByText, container } = render(<SelectionPanel cleanHTML={cleanHTML} allowHtmlValues={allowHTMLValues} selection={sel} onRequestZoomToFeature={onZoomRequest} onShowSelectedFeature={onShowSelectedFeature} />);
        expect(container.querySelectorAll(".selection-panel-toolbar")).toHaveLength(1); //, "Has Toolbar");
        const btns = container.querySelectorAll(".toolbar-btn");
        expect(btns).toHaveLength(3); //, "Has Toolbar Buttons");
        const fwd = btns[1];
        const select = container.querySelectorAll("select");
        expect(select).toHaveLength(1); //, "Has Layer Select");
        expect(select[0].querySelectorAll("option")).toHaveLength(2);
        fireEvent.click(fwd);
        const res1 = getByText("Foo");
        expect(res1).not.toBeUndefined();
        fireEvent.change(select[0], { target: { value : 1 } });
        const res2 = getByText("Bar");
        expect(res2).not.toBeUndefined();
    });
});