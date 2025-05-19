import { SlateTemplate } from "./page-models/slate-template";
import { AjaxViewerTemplate } from "./page-models/ajax-template";
import { AquaTemplate } from "./page-models/aqua-template";
import { LimeGoldTemplate } from "./page-models/limegold-template";
import { MaroonTemplate } from "./page-models/maroon-template";
import { SidebarTemplate } from "./page-models/sidebar-template";
import { TurquoiseYellowTemplate } from "./page-models/turquoiseyellow-template";
import { BaseTemplate } from "./page-models/base-template";

export const BASE_URL = "http://localhost/mapguide/react";
export const LAYOUT_ID = "Library://Samples/e2e_test/MultiMap.ApplicationDefinition";
export const DESKTOP_VIEWPORT = [1280, 800];

export const TEMPLATES = [
    { testToolbarActions: true, template: "slate", pageFactory: t => new SlateTemplate(t) },
    { testToolbarActions: false, template: "ajax-viewer", page: "index", pageFactory: t => new AjaxViewerTemplate(t) },
    { testToolbarActions: true, template: "aqua", pageFactory: t => new AquaTemplate(t) },
    { testToolbarActions: true, template: "limegold", pageFactory: t => new LimeGoldTemplate(t) },
    { testToolbarActions: true, template: "maroon", pageFactory: t => new MaroonTemplate(t) },
    { testToolbarActions: false, template: "sidebar", pageFactory: t => new SidebarTemplate(t) },
    { testToolbarActions: true, template: "turquoiseyellow", pageFactory: t => new TurquoiseYellowTemplate(t) }
] as { testToolbarActions: boolean, template: string, page?: string, pageFactory: (t: TestController) => BaseTemplate }[];