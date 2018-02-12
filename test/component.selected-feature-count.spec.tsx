import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { SelectedFeatureCount } from "../src/components/selected-feature-count";
import { FeatureSet } from "../src/api/contracts/query";
import { tr } from "../src/api/i18n";

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
        const wrapper = shallow(<SelectedFeatureCount selection={set} />);
        expect(wrapper.text()).toBe("");
    });
    it("Non-empty selection results in count displayed", () => {
        const set = createSelectionSet();
        const wrapper = shallow(<SelectedFeatureCount selection={set} locale="en" />);
        expect(wrapper.text()).toBe(tr("FMT_SELECTION_COUNT", "en", { total: 4, layerCount: 2 }));
    });
    it("Non-empty selection results with unsupported locale results in localization key", () => {
        const spy = jest.spyOn(console, "warn").mockImplementation(() => {});
        const set = createSelectionSet();
        const wrapper = shallow(<SelectedFeatureCount selection={set} locale="zh" />);
        expect(wrapper.text()).toBe("FMT_SELECTION_COUNT");
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockReset();
    });
    it("Non-empty selection with custom format results in count displayed in specified format", () => {
        const set = createSelectionSet();
        const wrapper = shallow(<SelectedFeatureCount selection={set} locale="en" format="Selected {total}/{layerCount}" />);
        expect(wrapper.text()).toBe("Selected 4/2");
    });
    it("Non-empty selection with custom format containing invalid placeholders results in count displayed in specified format with unresolved placeholders remaining", () => {
        const set = createSelectionSet();
        const wrapper = shallow(<SelectedFeatureCount selection={set} locale="en" format="Selected {total}/{layerCount} on {map}" />);
        expect(wrapper.text()).toBe("Selected 4/2 on {map}");
    });
    it("Empty selection with custom format still results in no text", () => {
        const set: FeatureSet = {
            Layer: []
        };
        const wrapper = shallow(<SelectedFeatureCount selection={set} format="Selected {total}/{layerCount}" />);
        expect(wrapper.text()).toBe("");
    });
});