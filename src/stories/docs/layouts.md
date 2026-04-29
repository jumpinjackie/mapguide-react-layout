This group showcases every built-in viewer template available under `src/layouts`.

Each story renders the complete template inside a `FakeApp` that provides a mocked MapGuide
environment, and loads the corresponding viewer CSS from `viewer/css` so that the visual
appearance closely mirrors what end-users see in production.

## Templates included

| Story | Template component | CSS file |
|---|---|---|
| AJAX Viewer | `AjaxViewerLayout` | `ajax-viewer.css` |
| Aqua | `AquaTemplateLayout` | `aqua.css` |
| Generic | `GenericLayout` | `generic.css` |
| Lime Gold | `LimeGoldTemplateLayout` | `limegold.css` |
| Maroon | `MaroonTemplateLayout` | `maroon.css` |
| Sidebar | `SidebarLayout` | `sidebar.css` |
| Slate | `SlateTemplateLayout` | `slate.css` |
| Turquoise Yellow | `TurquoiseYellowTemplateLayout` | `turquoise-yellow.css` |

## Environment notes

Stories run with `MapGuideMockMode.RenderPlaceholder` so that MapGuide tile requests are
intercepted and rendered as visual placeholders, keeping each story deterministic while still
reflecting real template layout structure and CSS.
