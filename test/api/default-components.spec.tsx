import React from "react";
import { describe, expect, it } from "vitest";
import { registerDefaultComponents } from "../../src/api/default-components";
import { DefaultComponentNames, getComponentFactory } from "../../src/api/registry/component";
import { About } from "../../src/components/about";
import { AddManageLayersContainer } from "../../src/containers/add-manage-layers";
import { BaseLayerSwitcherContainer } from "../../src/containers/base-layer-switcher";
import { CoordinateTrackerContainer } from "../../src/containers/coordinate-tracker";
import { MapMenuContainer } from "../../src/containers/map-menu";
import { MeasureContainer } from "../../src/containers/measure";
import { MouseCoordinatesContainer } from "../../src/containers/mouse-coordinates";
import { NavigatorContainer } from "../../src/containers/navigator";
import { ScaleDisplayContainer } from "../../src/containers/scale-display";
import { ShareLinkToViewContainer } from "../../src/containers/share-link-to-view";
import { TaskPaneContainer } from "../../src/containers/task-pane";
import { ViewSizeContainer } from "../../src/containers/view-size";

describe("api/default-components", () => {
    it("registers factories for all default components", () => {
        registerDefaultComponents();

        const cases: Array<[DefaultComponentNames, React.ComponentType<any>]> = [
            [DefaultComponentNames.Navigator, NavigatorContainer],
            [DefaultComponentNames.MouseCoordinates, MouseCoordinatesContainer],
            [DefaultComponentNames.ScaleDisplay, ScaleDisplayContainer],
            [DefaultComponentNames.TaskPane, TaskPaneContainer],
            [DefaultComponentNames.About, About],
            [DefaultComponentNames.Measure, MeasureContainer],
            [DefaultComponentNames.BaseMapSwitcher, BaseLayerSwitcherContainer],
            [DefaultComponentNames.MapMenu, MapMenuContainer],
            [DefaultComponentNames.ViewSize, ViewSizeContainer],
            [DefaultComponentNames.CoordinateTracker, CoordinateTrackerContainer],
            [DefaultComponentNames.AddManageLayers, AddManageLayersContainer],
            [DefaultComponentNames.ShareLinkToView, ShareLinkToViewContainer],
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