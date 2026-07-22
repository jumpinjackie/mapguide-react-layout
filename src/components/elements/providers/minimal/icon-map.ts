// Minimal provider – Icon map (icon name pass-through)
// All SVG data is bundled inline in svg-icons.tsx.

/**
 * Returns the incoming icon name for SVG lookup.
 *
 * @hidden
 * @since 0.15
 */
export function getSvgIconName(iconName: string): string | null {
   return iconName;
}
