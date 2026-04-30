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
| `Icon` | `lucide-react` | Provides tree-shakeable SVG icons mapped from Blueprint icon names |
| `Popover` | `react-tiny-popover` | Viewport-aware repositioning on scroll/resize (~1 kB gzipped) |
| `Toaster` | `react-hot-toast` | Portal-based toast stacking with an imperative `show`/`dismiss` API |

---

## Swapping the provider

### Restoring the Blueprint.js provider globally

If you prefer the Blueprint.js look and feel, or if your application already uses Blueprint.js, you can restore the original provider at the top of your app:

```tsx
import { ElementProvider, BpProvider } from 'mapguide-react-layout';

function App() {
    return (
        <ElementProvider value={BpProvider}>
            {/* All viewer components inside will use Blueprint.js */}
        </ElementProvider>
    );
}
```

### Scoping a provider to a subtree

You can also wrap only a portion of the component tree:

```tsx
import { ElementProvider, BpProvider, MinimalProvider } from 'mapguide-react-layout';

function MyLayout() {
    return (
        <div>
            {/* This section uses the Minimal provider */}
            <MinimalProvider>
                <Sidebar />
            </MinimalProvider>

            {/* This section uses Blueprint */}
            <ElementProvider value={BpProvider}>
                <MapPanel />
            </ElementProvider>
        </div>
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

If you want to implement the viewer's UI atoms using a completely different component library (e.g. MUI, Ant Design, Radix UI), you can provide a full custom implementation:

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
    // ... implement every other slot
    Dialog: ({ isOpen, title, onClose, children }) => (
        <MuiDialog open={!!isOpen} onClose={onClose}>
            {title && <MuiDialogTitle>{title}</MuiDialogTitle>}
            <MuiDialogContent>{children}</MuiDialogContent>
        </MuiDialog>
    ),
    // ... all 31 slots must be provided
};

function App() {
    return (
        <ElementProvider value={MyCustomProvider}>
            <MapViewer ... />
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

**Step 4 — Render the viewer inside your layout:**

```tsx
import { Viewer } from 'mapguide-react-layout';

export function GisPage() {
    return (
        <div className="gis-page-layout">
            <header>My App Header</header>
            <main>
                {/* The viewer inherits all --mrl-* variable overrides from :root */}
                <Viewer ... />
            </main>
        </div>
    );
}
```

No `ElementProvider` wrapping is necessary in this case because you are using the default `MinimalProvider` and have simply restyled it via CSS variables.
