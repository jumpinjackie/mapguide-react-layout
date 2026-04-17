import React from "react";
import { describe, expect, it } from "vitest";
import { registerMapGuideComponents } from "../../src/api/mapguide-components";
import { DefaultComponentNames, getComponentFactory } from "../../src/api/registry/component";
import { PoweredByMapGuide } from "../../src/components/pbmg";
import { SessionExpired } from "../../src/components/session-expired";
import { LegendContainer } from "../../src/containers/legend";
import { QuickPlotContainer } from "../../src/containers/quick-plot";
import { SelectedFeatureCountContainer } from "../../src/containers/selected-feature-count";
import { SelectionPanelContainer } from "../../src/containers/selection-panel";
import { ViewerOptions } from "../../src/containers/viewer-options";

describe("api/mapguide-components", () => {
    it("registers factories for MapGuide component names", () => {
        registerMapGuideComponents();

        const cases: Array<[DefaultComponentNames, React.ComponentType<any>]> = [
            [DefaultComponentNames.Legend, LegendContainer],
            [DefaultComponentNames.SelectionPanel, SelectionPanelContainer],
            [DefaultComponentNames.SelectedFeatureCount, SelectedFeatureCountContainer],
            [DefaultComponentNames.PoweredByMapGuide, PoweredByMapGuide],
            [DefaultComponentNames.SessionExpired, SessionExpired],
            [DefaultComponentNames.ViewerOptions, ViewerOptions],
            [DefaultComponentNames.QuickPlot, QuickPlotContainer],
        ];

        for (const [componentName, expectedType] of cases) {
            const factory = getComponentFactory(componentName);
            expect(factory).toBeTypeOf("function");
            const el = factory ? factory({ id: "test-component" }) : null;
            expect(React.isValidElement(el)).toBe(true);
            expect(el?.type).toBe(expectedType);
        }
    });
});