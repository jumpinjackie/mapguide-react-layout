import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { SelectedFeatureCount } from "../../src/components/selected-feature-count";
import { FeatureSet } from "../../src/api/contracts/query";
import { tr } from "../../src/api/i18n";
import { countSelection } from "../../src/api/selection-count";

function createSelectionSet(): FeatureSet {
    return {
        Layer: [
            {
                "@id": "foo",
                "@name": "FooLayer",
                Class: {
                    "@id": "1",
                    ID: [
                        "abc",
                        "def",
                        "ghi"
                    ]
                }
            },
            {
                "@id": "bar",
                "@name": "BarLayer",
                Class: {
                    "@id": "2",
                    ID: [
                        "1234"
                    ]
                }
            }
        ]
    };
}

describe("components/selected-feature-count", () => {
    it("Empty selection results in no text", () => {
        const set: FeatureSet = {
            Layer: []
        };
        const summary = countSelection(set);
        const { container } = render(<SelectedFeatureCount summary={summary} />);
        const el = container.querySelectorAll(".component-selected-feature-count")[0];
        expect(el.innerHTML).toBe("");
    });
    it("Non-empty selection results in count displayed", async () => {
        const set = createSelectionSet();
        const summary = countSelection(set);
        const wrapper = render(<SelectedFeatureCount summary={summary} locale="en" />);
        const el = await wrapper.findByText(tr("FMT_SELECTION_COUNT", "en", { total: 4, layerCount: 2 }));
        expect(el).not.toBeUndefined();
    });
    it("Non-empty selection results with unsupported locale results in localization key", async () => {
        const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
        const set = createSelectionSet();
        const summary = countSelection(set);
        const wrapper = render(<SelectedFeatureCount summary={summary} locale="zh" />);
        const el = await wrapper.findByText("FMT_SELECTION_COUNT");
        expect(el).not.toBeUndefined();
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockReset();
    });
    it("Non-empty selection with custom format results in count displayed in specified format", async () => {
        const set = createSelectionSet();
        const summary = countSelection(set);
        const wrapper = render(<SelectedFeatureCount summary={summary} locale="en" format="Selected {total}/{layerCount}" />);
        const el = await wrapper.findByText("Selected 4/2");
        expect(el).not.toBeUndefined();
    });
    it("Non-empty selection with custom format containing invalid placeholders results in count displayed in specified format with unresolved placeholders remaining", async () => {
        const set = createSelectionSet();
        const summary = countSelection(set);
        const wrapper = render(<SelectedFeatureCount summary={summary} locale="en" format="Selected {total}/{layerCount} on {map}" />);
        const el = await wrapper.findByText("Selected 4/2 on {map}");
        expect(el).not.toBeUndefined();
    });
    it("Empty selection with custom format still results in no text", () => {
        const set: FeatureSet = {
            Layer: []
        };
        const summary = countSelection(set);
        const { container } = render(<SelectedFeatureCount summary={summary} format="Selected {total}/{layerCount}" />);
        const el = container.querySelectorAll(".component-selected-feature-count")[0];
        expect(el.innerHTML).toBe("");
    });
});