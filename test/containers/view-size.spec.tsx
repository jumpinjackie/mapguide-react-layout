import React from "react";
import { Provider } from "react-redux";
import { IApplicationState } from "../../src/api/common";
import { ViewSizeContainer } from "../../src/containers/view-size";
import { configureStore } from "../../src/store/configure-store";
import { render } from "@testing-library/react";

describe("ViewSizeContainer", () => {
    it("renders for stateless", () => {
        const initState: Partial<IApplicationState> = {};
        const store = configureStore(initState);
        const screen = render(<Provider store={store}>
            <ViewSizeContainer />
        </Provider>);
        expect(screen.container.innerHTML).toContain("<noscript></noscript>");
    });
});