import * as React from "react";
import { FakeApp } from "./fake-app";
import { MapGuideMockMode } from "../components/mapguide-debug-context";
import { AjaxViewerLayout } from "../layouts/ajax-viewer";
import { AquaTemplateLayout } from "../layouts/aqua";
import { GenericLayout } from "../layouts/generic";
import { LimeGoldTemplateLayout } from "../layouts/limegold";
import { MaroonTemplateLayout } from "../layouts/maroon";
import { SidebarLayout } from "../layouts/sidebar";
import { SlateTemplateLayout } from "../layouts/slate";
import { TurquoiseYellowTemplateLayout } from "../layouts/turquoise-yellow";
import layoutsDocs from "./docs/layouts.md";

import "../../viewer/css/ajax-viewer.css";
import "../../viewer/css/aqua.css";
import "../../viewer/css/generic.css";
import "../../viewer/css/limegold.css";
import "../../viewer/css/maroon.css";
import "../../viewer/css/sidebar.css";
import "../../viewer/css/slate.css";
import "../../viewer/css/turquoise-yellow.css";

const FULL_CAPS = { hasTaskPane: true };
const NO_TASK_PANE_CAPS = { hasTaskPane: false };

/**
 * Storybook group covering every built-in viewer template under `src/layouts`.
 *
 * Each story renders the complete template inside a {@link FakeApp} that provides a mocked
 * MapGuide environment and loads the corresponding viewer CSS from `viewer/css`.
 *
 * @since 0.15
 */
export default {
    title: "Viewer Templates",
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: layoutsDocs,
            },
        },
    },
};

/**
 * The AJAX Viewer layout — a classic split-pane template that mirrors the look and feel
 * of the original MapGuide AJAX viewer.
 *
 * @since 0.15
 */
export const AjaxViewer = {
    render: () => (
        <FakeApp
            mgMockMode={MapGuideMockMode.RenderPlaceholder}
            templateLayout={{ factory: AjaxViewerLayout, capabilities: FULL_CAPS }}
        />
    ),
    name: "AJAX Viewer",
    parameters: { layout: "fullscreen" },
};

/**
 * The Aqua template — a floating-dialog based layout that resembles the Aqua Fusion template.
 *
 * @since 0.15
 */
export const Aqua = {
    render: () => (
        <FakeApp
            mgMockMode={MapGuideMockMode.RenderPlaceholder}
            templateLayout={{ factory: AquaTemplateLayout, capabilities: FULL_CAPS }}
        />
    ),
    name: "Aqua",
    parameters: { layout: "fullscreen" },
};

/**
 * The Generic layout — a general-purpose template built on Blueprint UI drawers and an
 * icon-based floating toolbar. Does not include a task pane.
 *
 * @since 0.15
 */
export const Generic = {
    render: () => (
        <FakeApp
            mgMockMode={MapGuideMockMode.RenderPlaceholder}
            templateLayout={{ factory: GenericLayout, capabilities: NO_TASK_PANE_CAPS }}
        />
    ),
    name: "Generic",
    parameters: { layout: "fullscreen" },
};

/**
 * The Lime Gold template — a tabbed sidebar layout with a lime and gold colour scheme.
 *
 * @since 0.15
 */
export const LimeGold = {
    render: () => (
        <FakeApp
            mgMockMode={MapGuideMockMode.RenderPlaceholder}
            templateLayout={{ factory: LimeGoldTemplateLayout, capabilities: FULL_CAPS }}
        />
    ),
    name: "Lime Gold",
    parameters: { layout: "fullscreen" },
};

/**
 * The Maroon template — a tabbed sidebar layout with a maroon colour scheme.
 *
 * @since 0.15
 */
export const Maroon = {
    render: () => (
        <FakeApp
            mgMockMode={MapGuideMockMode.RenderPlaceholder}
            templateLayout={{ factory: MaroonTemplateLayout, capabilities: FULL_CAPS }}
        />
    ),
    name: "Maroon",
    parameters: { layout: "fullscreen" },
};

/**
 * The Sidebar layout — a collapsible sidebar template inspired by the Sidebar Map Layout
 * project, with tabbed access to the legend, task pane, and selection panel.
 *
 * @since 0.15
 */
export const Sidebar = {
    render: () => (
        <FakeApp
            mgMockMode={MapGuideMockMode.RenderPlaceholder}
            templateLayout={{ factory: SidebarLayout, capabilities: FULL_CAPS }}
        />
    ),
    name: "Sidebar",
    parameters: { layout: "fullscreen" },
};

/**
 * The Slate template — a tabbed sidebar layout with a slate grey colour scheme.
 *
 * @since 0.15
 */
export const Slate = {
    render: () => (
        <FakeApp
            mgMockMode={MapGuideMockMode.RenderPlaceholder}
            templateLayout={{ factory: SlateTemplateLayout, capabilities: FULL_CAPS }}
        />
    ),
    name: "Slate",
    parameters: { layout: "fullscreen" },
};

/**
 * The Turquoise Yellow template — a tabbed sidebar layout with a turquoise and yellow
 * colour scheme.
 *
 * @since 0.15
 */
export const TurquoiseYellow = {
    render: () => (
        <FakeApp
            mgMockMode={MapGuideMockMode.RenderPlaceholder}
            templateLayout={{ factory: TurquoiseYellowTemplateLayout, capabilities: FULL_CAPS }}
        />
    ),
    name: "Turquoise Yellow",
    parameters: { layout: "fullscreen" },
};
