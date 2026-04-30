# Style Customization

This guide explains how to customize the visual appearance of the viewer when integrating it into a host application that has its own design system or style guide.

Customization is structured in five tiers, from zero-code overrides up to full component replacement.

---

## Tier 1 — CSS custom property overrides (zero viewer code changes)

The native UI provider declares all of its visual tokens as CSS custom properties on `:root`. Because custom properties cascade normally, any stylesheet loaded after the viewer's CSS can redefine these variables and the change takes effect everywhere they are consumed.

```css
/* Your app's stylesheet, or a <style> tag injected by your host app */
:root {
    --mrl-color-primary:    #0078d4;   /* brand blue */
    --mrl-color-danger:     #a4262c;   /* brand red */
    --mrl-bg-surface:       #faf9f8;   /* near-white surface */
    --mrl-border-radius-md: 2px;       /* tighter radii (Fluent-style) */
    --mrl-font-size-md:     14px;
}
```

This single block reshapes every button, callout, card, dialog, tab, and spinner to match your palette and geometry without touching the viewer's source code.

This approach covers roughly 80 % of design-system alignment needs.

---

## Tier 2 — Class-name overrides (zero viewer code changes)

Every native component emits stable, namespaced class names (for example `mrl-btn`, `mrl-btn--primary`, `mrl-card`, `mrl-dialog-overlay`). Target these in your host stylesheet to override any property that is not driven by a CSS variable.

```css
/* Pill-shaped buttons in the viewer */
.mrl-btn { border-radius: 999px; }

/* Dark sidebar drawer */
.mrl-drawer { background: #1a1d23; color: #f0f0f0; }
```

---

## Tier 3 — Scoped overrides (partial embedding)

When the viewer is embedded inside a container element rather than taking the full page, scope your CSS variable and class overrides to that container. Because the native provider's components inherit CSS variables through the DOM hierarchy, scoped variables are picked up automatically.

```css
/* Only affect viewer elements inside #my-viewer-root */
#my-viewer-root {
    --mrl-color-primary: #0078d4;
    --mrl-bg-surface:    #faf9f8;
}

#my-viewer-root .mrl-btn { border-radius: 999px; }
```

---

## Tier 4 — Swap the element provider (deep design-system integration)

If your design system already ships its own React components (for example Ant Design, MUI, or Chakra UI), you can wrap those components in a thin adapter that satisfies the `IElementContext` interface and inject it at the viewer root via `ElementProvider`.

```tsx
import { ElementProvider } from 'mapguide-react-layout';
import type { IElementContext } from 'mapguide-react-layout';

// Build a provider object whose properties are thin wrappers
// around your own design-system components.
const myProvider: IElementContext = {
    Button: MyDSButton,
    Callout: MyDSCallout,
    Card: MyDSCard,
    // … one entry for every member of IElementContext
};

// Mount the provider near the root of the viewer subtree.
<ElementProvider value={myProvider}>
    <MapGuideViewer ... />
</ElementProvider>
```

This gives you complete control over every UI atom without forking the viewer. You can also return to the default Blueprint provider at any time by omitting `ElementProvider` or passing `BpProvider` as the value.

Refer to the TypeScript definition of `IElementContext` (exported from `mapguide-react-layout`) for the full list of components that a provider must implement.

---

## Tier 5 — Use the Blueprint provider in a Blueprint host app

If your host application already uses Blueprint.js, the viewer's built-in Blueprint provider will match your existing theme automatically. No custom CSS or provider swap is needed; just ensure that your Blueprint theme stylesheet is loaded and that you are not overriding Blueprint CSS variables unintentionally.

```tsx
import BpProvider from 'mapguide-react-layout/lib/components/elements/providers/blueprint/provider';
import { ElementProvider } from 'mapguide-react-layout';

<ElementProvider value={BpProvider}>
    <MapGuideViewer ... />
</ElementProvider>
```

The viewer inherits the host app's Blueprint theme. There is no style duplication and no visual conflict.

---

## Decision guide

| Your situation | Recommended tier |
|----------------|-----------------|
| Minor palette or typography adjustment | Tier 1 — CSS variable overrides |
| Structural CSS differences (spacing, shape) not covered by variables | Tier 2 — class-name overrides |
| Viewer is embedded inside a scoped container | Tier 3 — scoped overrides |
| Host app already has its own React component library | Tier 4 — custom `IElementContext` provider |
| Host app already uses Blueprint.js | Tier 5 — pass `BpProvider` to `ElementProvider` |

---

## What CSS variable overrides do not cover

| Scenario | Recommended approach |
|----------|---------------------|
| Completely different HTML structure for a component (for example, your design system renders tabs differently) | Tier 4: implement that component in a custom `IElementContext` provider |
| Using CSS Modules or Shadow DOM in the host app | CSS variables cascade across Shadow DOM boundaries when passed explicitly; for non-shadow scenarios there is no conflict |
