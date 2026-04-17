import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { OLMapContextProvider, useOLMap } from "../../../src/components/compact-map-viewer/context";

describe("components/compact-map-viewer/context", () => {
    it("OLMapContextProvider provides map context to children", () => {
        const testMap = {} as any;
        const testDomElement = document.createElement("div");
        let capturedContext: any;

        const TestConsumer = () => {
            capturedContext = useOLMap();
            return <div>Context accessed</div>;
        };

        render(
            <OLMapContextProvider map={testMap} domElement={testDomElement} renderDomBreadcrumbs={true}>
                <TestConsumer />
            </OLMapContextProvider>
        );

        expect(capturedContext.map).toBe(testMap);
        expect(capturedContext.domElement).toBe(testDomElement);
        expect(capturedContext.renderDomBreadcrumbs).toBe(true);
    });

    it("OLMapContextProvider passes renderDomBreadcrumbs as false", () => {
        const testMap = {} as any;
        const testDomElement = document.createElement("div");
        let capturedContext: any;

        const TestConsumer = () => {
            capturedContext = useOLMap();
            return <div>Context accessed</div>;
        };

        render(
            <OLMapContextProvider map={testMap} domElement={testDomElement} renderDomBreadcrumbs={false}>
                <TestConsumer />
            </OLMapContextProvider>
        );

        expect(capturedContext.renderDomBreadcrumbs).toBe(false);
    });

    it("useOLMap throws when used outside of context provider", () => {
        const TestConsumer = () => {
            useOLMap();
            return <div>Should not render</div>;
        };

        expect(() => {
            render(<TestConsumer />);
        }).toThrow("No OLMapContext found in parent");
    });
});
