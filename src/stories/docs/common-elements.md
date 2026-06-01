This group documents the abstract UI element layer used across the application.

Abstract UI elements are backed by a particular UI toolkit implementation of this abstraction. The default toolkit is `MinimalProvider`, a lightweight implementation using semantic HTML and CSS custom properties.

## What these stories validate
- Element contracts exposed by the element context
- Visual consistency across providers
- Common interaction states (active, disabled, loading)
- Composition patterns for forms, menus, and layout primitives

## Usage guidance
Use these stories as the baseline reference when building new UI so feature screens stay aligned with shared element behavior and styling.
