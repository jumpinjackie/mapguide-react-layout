import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ViewerOptions } from "../../src/containers/viewer-options";
import { configureStore } from "../../src/store/configure-store";
import { Provider } from "react-redux";
import { tr } from "../../src/api/i18n";
import { IApplicationState } from "../../src/api/common";

describe("ViewerOptions", () => {
    it("renders for stateless", () => {
        const initState: Partial<IApplicationState> = {};
        const store = configureStore(initState);
        const screen = render(<Provider store={store}>
            <ViewerOptions />
        </Provider>);
        //expect(screen.getByLabelText(tr("FEATURE_TOOLTIPS"))).toBeInTheDocument();
        //expect(screen.getByLabelText(tr("MANUAL_FEATURE_TOOLTIPS"))).toBeInTheDocument();
        expect(screen.getByLabelText(tr("ENABLE_SELECT_DRAGPAN"))).toBeInTheDocument();
        expect(screen.getByLabelText(tr("MAP_SIZE_DISPLAY_UNITS"))).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toHaveTextContent("Meters");
    });

    /*
    it("calls onManualFeatureTooltipsChanged when toggled", () => {
        const initState: Partial<IApplicationState> = {};
        const store = configureStore(initState);
        const { getByLabelText } = render(<Provider store={store}>
            <ViewerOptions />
        </Provider>);
        const checkbox = getByLabelText(tr("MANUAL_FEATURE_TOOLTIPS")) as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
        fireEvent.click(checkbox);
    });
    */
});