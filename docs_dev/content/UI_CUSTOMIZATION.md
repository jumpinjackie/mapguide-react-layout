# UI Customization

mapguide-react-layout ships with a **toolkit-agnostic UI element abstraction** that cleanly separates viewer logic from the underlying UI components. This makes it possible to swap the look-and-feel of the viewer without touching any application code, and to integrate the viewer into external web apps that have their own design system.

---

## Overview: The `IElementContext` abstraction

All UI atoms used by the viewer (buttons, dialogs, menus, spinners, etc.) are accessed through a React context called `ElementContext`. The shape of this context is the `IElementContext` interface:

```typescript
import type { IElementContext } from 'mapguide-react-layout';
```

Every component in the viewer that needs a UI atom calls:

```tsx
const { Button, Dialog, Spinner } = useElementContext();
```

The **provider** (the concrete implementation of `IElementContext`) is installed once near the root of the component tree. The provider determines the look, feel, and DOM structure of every UI atom in the entire viewer.

---

## Default provider: `MinimalProvider`

Starting from version 0.15, the default provider is `MinimalProvider` — a lightweight implementation that uses **HTML intrinsic elements** and **plain CSS with CSS custom properties (variables)**. It has no dependency on Blueprint.js or any other large UI toolkit.

Key characteristics of `MinimalProvider`:

- All components are rendered as semantic HTML elements (`<button>`, `<input>`, `<dialog>`, `<table>`, etc.)
- Styling is done entirely via CSS custom properties defined in `mrl-minimal.css`
- The look and feel is professional and clean — suitable for interactive GIS map viewer applications
- All CSS class names use the `mrl-` prefix to avoid collisions with the host application's CSS
- All design tokens are overrideable at the `:root` level or on any ancestor element — making it trivially easy to match an external design system

The `MinimalProvider` also uses a small number of focused third-party libraries for components that require non-trivial DOM behaviour:

| Component | Library | Reason |
|---|---|---|
| `Popover` | `react-tiny-popover` | Viewport-aware repositioning on scroll/resize (~1 kB gzipped) |
| `Toaster` | `react-hot-toast` | Portal-based toast stacking with an imperative `show`/`dismiss` API |

All other components — including `Icon` — are implemented with zero external dependencies. Icons are rendered as inline SVGs using path data embedded directly in the provider, so no icon library is needed.

---

## Swapping the provider

> **Context:** Provider swapping applies to two specific consumer scenarios:
> 1. **Custom viewer bundle** — you are building your own `library.tsx` entry point (as in the [mapguide-react-layout-example](https://github.com/jumpinjackie/mapguide-react-layout-example) repo), giving you full control over which providers are included. Wrap your bundle entry with `<ElementProvider>` before rendering.
> 2. **Direct React integration** — you are embedding the viewer as a React component inside a parent React application that manages its own bundler. In this case you render the component tree yourself and can include `<ElementProvider>` in that tree.
>
> If you are using `Application.mount()` to embed the viewer in a static HTML page from the pre-built `viewer.js` bundle, `MinimalProvider` is permanently baked in. Customisation in that scenario is done through [CSS variable overrides](#overriding-css-variables-design-tokens) only.

### Blueprint.js provider (optional)

`@blueprintjs/core` is an **optional peer dependency**. It is **not** included in the default `viewer.js` bundle, so your users only download it if you explicitly opt in.

> **Bundle impact**: Because Blueprint is excluded from the default bundle, every user of the viewer benefits from a smaller download — even if some deployments choose to enable the Blueprint provider.

**Step 1 — Install the optional dependencies:**

```bash
npm install @blueprintjs/core @blueprintjs/icons
# or
yarn add @blueprintjs/core @blueprintjs/icons
```

**Step 2 — Import Blueprint's CSS** (required for correct Blueprint rendering):

```css
@import '@blueprintjs/core/lib/css/blueprint.css';
@import '@blueprintjs/icons/lib/css/blueprint-icons.css';
```

**Step 3 — Import and activate the Blueprint provider.**

> **Note:** `BpProvider` is **not** exported from the main `mapguide-react-layout` bundle, because including it would unconditionally add Blueprint.js (~120 KB) to every user's download. It is intended for use in **custom bundle scenarios** where you control your own webpack/Rollup configuration. Import it directly from its source path:

```tsx
import { ElementProvider } from 'mapguide-react-layout';
import BpProvider from 'mapguide-react-layout/src/components/elements/providers/blueprint/provider';

// In your custom bundle entry or parent React app render:
function App() {
    return (
        <ElementProvider value={BpProvider}>
            {/* All viewer components inside will use Blueprint.js */}
        </ElementProvider>
    );
}
```

---

## Overriding CSS variables (design tokens)

The `MinimalProvider` exposes every visual attribute as a CSS custom property. You can override any of them globally by targeting `:root`, or locally by targeting any ancestor element.

### Complete variable reference

| Variable | Default | Description |
|---|---|---|
| `--mrl-color-primary` | `#2965CC` | Primary brand colour (buttons, focus rings, active tabs) |
| `--mrl-color-primary-hover` | `#1F4FAA` | Hover state for primary elements |
| `--mrl-color-primary-active` | `#184093` | Active/pressed state for primary elements |
| `--mrl-color-danger` | `#C0392B` | Danger / destructive actions |
| `--mrl-color-danger-hover` | `#A93226` | Hover state for danger elements |
| `--mrl-color-warning` | `#E67E22` | Warning callouts and toasts |
| `--mrl-color-warning-hover` | `#CA6F1E` | Hover state for warning elements |
| `--mrl-color-success` | `#1E8449` | Success callouts and toasts |
| `--mrl-color-success-hover` | `#196F3D` | Hover state for success elements |
| `--mrl-color-bg` | `#FFFFFF` | Primary background colour |
| `--mrl-color-bg-elevated` | `#F5F8FA` | Slightly elevated surfaces (button default background) |
| `--mrl-color-surface` | `#EBEFF2` | Panel and card surface colour |
| `--mrl-color-text` | `#182026` | Primary text colour |
| `--mrl-color-text-muted` | `#5C7080` | Secondary / muted text |
| `--mrl-color-text-inverse` | `#FFFFFF` | Text on coloured backgrounds |
| `--mrl-color-border` | `#CDD5DC` | Default border colour |
| `--mrl-color-border-focus` | `#2965CC` | Focus ring colour |
| `--mrl-radius-sm` | `2px` | Small border radius |
| `--mrl-radius-md` | `4px` | Medium border radius (default for most components) |
| `--mrl-radius-lg` | `8px` | Large border radius (cards, modals) |
| `--mrl-shadow-sm` | `0 1px 3px rgba(16,22,26,0.12)` | Subtle drop shadow |
| `--mrl-shadow-md` | `0 2px 6px rgba(16,22,26,0.2)` | Moderate drop shadow (cards, dialogs) |
| `--mrl-font-size-sm` | `12px` | Small text |
| `--mrl-font-size-base` | `14px` | Default text size |
| `--mrl-font-size-lg` | `16px` | Large text |
| `--mrl-spacing-xs` | `4px` | Extra-small spacing unit |
| `--mrl-spacing-sm` | `8px` | Small spacing unit |
| `--mrl-spacing-md` | `12px` | Medium spacing unit |
| `--mrl-spacing-lg` | `16px` | Large spacing unit |
| `--mrl-spacing-xl` | `24px` | Extra-large spacing unit |
| `--mrl-transition-speed` | `150ms` | Transition duration for animations |

### Global override (match your app's design system)

Add a CSS block to your application's global stylesheet:

```css
:root {
    /* Replace the primary blue with your brand colour */
    --mrl-color-primary: #0A7CFF;
    --mrl-color-primary-hover: #005FCC;
    --mrl-color-primary-active: #0048A8;

    /* Flatten rounded corners for a more structured look */
    --mrl-radius-sm: 0px;
    --mrl-radius-md: 0px;
    --mrl-radius-lg: 2px;

    /* Use your app's font sizes */
    --mrl-font-size-base: 13px;

    /* Adjust spacing density */
    --mrl-spacing-md: 10px;
    --mrl-spacing-lg: 14px;
}
```

### Scoped override (isolate viewer styles from the rest of the page)

If you need the viewer's styles to differ from the surrounding application without touching `:root`, wrap the viewer in a container element and override on that container:

```css
.my-map-viewer-container {
    --mrl-color-primary: #2E7D32;   /* green for your GIS tool */
    --mrl-color-bg: #1A1A2E;        /* dark mode */
    --mrl-color-text: #E0E0E0;
    --mrl-color-border: #3A3A5C;
}
```

```tsx
<div className="my-map-viewer-container">
    <MapViewer ... />
</div>
```

---

## Overriding individual component classes

All component class names use the `mrl-` prefix. You can override specific components with targeted CSS rules, which will take effect regardless of which provider is active (since the class names are consistent):

```css
/* Flat buttons with no border radius */
.mrl-btn {
    border-radius: 0;
}

/* Thicker tab underline */
.mrl-tab--active {
    border-bottom-width: 3px;
}

/* Wider cards */
.mrl-card {
    padding: 20px;
}

/* Denser table rows */
.mrl-table td,
.mrl-table th {
    padding: 4px 8px;
}
```

---

## Full replacement: writing a custom `IElementContext`

If you want to implement the viewer's UI atoms using a completely different component library (e.g. MUI, Ant Design, Radix UI), you can provide a full custom implementation. This is only applicable in the two scenarios described above (custom bundle or direct React integration).

> **Note:** The example below is **abbreviated** — it shows only 2 of the 32 required slots. For a complete reference implementation, see [`src/components/elements/providers/minimal/provider.tsx`](../src/components/elements/providers/minimal/provider.tsx) or the Blueprint provider at [`src/components/elements/providers/blueprint/provider.tsx`](../src/components/elements/providers/blueprint/provider.tsx).

```tsx
import type { IElementContext } from 'mapguide-react-layout';
import { ElementProvider } from 'mapguide-react-layout';
import { Button } from '@mui/material';
// ... other MUI imports

const MyCustomProvider: IElementContext = {
    Button: ({ children, onClick, disabled, variant }) => (
        <Button
            onClick={onClick}
            disabled={disabled}
            color={variant === 'danger' ? 'error' : variant === 'success' ? 'success' : 'primary'}
        >
            {children}
        </Button>
    ),
    // ... implement every other slot (32 slots total)
    Dialog: ({ isOpen, title, onClose, children }) => (
        <MuiDialog open={!!isOpen} onClose={onClose}>
            {title && <MuiDialogTitle>{title}</MuiDialogTitle>}
            <MuiDialogContent>{children}</MuiDialogContent>
        </MuiDialog>
    ),
    // ...
};

// In your custom bundle entry or parent React app render:
function App() {
    return (
        <ElementProvider value={MyCustomProvider}>
            {/* viewer components */}
        </ElementProvider>
    );
}
```

### The `IElementContext` interface contract

Every slot in `IElementContext` must be a React component (or `forwardRef` component for `Toaster`) that accepts the props defined in `element-context.tsx`. Refer to the TypeScript type definitions for the exact prop shapes:

```typescript
import type {
    IElementContext,
    ButtonProps,
    DialogProps,
    ToasterProps,
    IToasterRef,
    // ... etc.
} from 'mapguide-react-layout';
```

The `Toaster` slot is special — it must be a `React.ForwardRefExoticComponent` that exposes an `IToasterRef` imperative API (`show(message)` and `dismiss(key)`) via a ref.

---

## Integration example: embedding in an external web app

Suppose your web app uses a corporate design system with specific brand colours and Roboto as the font. Here is a complete integration pattern:

**Step 1 — Install the viewer:**

```bash
npm install mapguide-react-layout
```

**Step 2 — Import viewer styles AFTER your app's global styles:**

```css
/* app-global.css */
@import 'mapguide-react-layout/dist/viewer.css';
```

**Step 3 — Override CSS variables to match your design system:**

```css
/* map-viewer-theme.css */
:root {
    --mrl-color-primary: var(--brand-blue, #003DA5);
    --mrl-color-danger: var(--brand-red, #D32F2F);
    --mrl-color-bg: var(--surface-primary, #FAFAFA);
    --mrl-color-text: var(--text-primary, #212121);
    --mrl-color-border: var(--border-default, #E0E0E0);
    --mrl-radius-md: var(--border-radius, 4px);
    --mrl-font-size-base: var(--font-size-body, 14px);
}
```

**Step 4 — Mount the viewer inside your page:**

The viewer is mounted imperatively via the `Application` class. Create a container element in your page and call `mount()`:

```html
<!-- Your HTML page -->
<div id="gis-viewer-container"></div>
```

```typescript
import { Application } from 'mapguide-react-layout';

const app = new Application();
app.mount(document.getElementById('gis-viewer-container'), {
    // ... your viewer configuration
});
```

The viewer inherits all `--mrl-*` variable overrides from `:root`, so no additional `ElementProvider` wrapping is required when using the default `MinimalProvider` with CSS variable overrides.
