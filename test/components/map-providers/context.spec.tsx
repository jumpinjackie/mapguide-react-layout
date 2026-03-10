import * as React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
    MapProviderContextProvider,
    MapContextProvider,
    useMapProviderContext,
    ReduxProvider
} from "../../../src/components/map-providers/context";
import type { IMapProviderContext } from "../../../src/components/map-providers/base";
import { configureStore } from "../../../src/store/configure-store";
import { createInitialState } from "../../../test-data";

const mockMapProviderContext: IMapProviderContext = {} as IMapProviderContext;

describe("components/map-providers/context", () => {
    describe("MapProviderContextProvider", () => {
        it("renders children", () => {
            const { getByText } = render(
                <MapProviderContextProvider value={mockMapProviderContext}>
                    <span>Test Child</span>
                </MapProviderContextProvider>
            );
            expect(getByText("Test Child")).toBeDefined();
        });
    });

    describe("useMapProviderContext", () => {
        it("returns the context from MapProviderContextProvider", () => {
            let contextValue: any = null;
            const Tester = () => {
                contextValue = useMapProviderContext();
                return <div />;
            };
            render(
                <MapProviderContextProvider value={mockMapProviderContext}>
                    <Tester />
                </MapProviderContextProvider>
            );
            expect(contextValue).toBe(mockMapProviderContext);
        });
    });

    describe("MapContextProvider", () => {
        it("renders children without a store", () => {
            const { getByText } = render(
                <MapContextProvider value={mockMapProviderContext}>
                    <span>No Store</span>
                </MapContextProvider>
            );
            expect(getByText("No Store")).toBeDefined();
        });

        it("renders children with a store", () => {
            const store = configureStore(createInitialState());
            const { getByText } = render(
                <MapContextProvider value={mockMapProviderContext} store={store}>
                    <span>With Store</span>
                </MapContextProvider>
            );
            expect(getByText("With Store")).toBeDefined();
        });
    });
});
