// Minimal provider – Icon map (Blueprint icon names pass-through)
// No external icon library — all SVG data is bundled inline in svg-icons.tsx.

/**
 * Returns the incoming Blueprint icon name for SVG lookup.
 *
 * @hidden
 * @since 0.15
 */
export function getSvgIconName(blueprintName: string): string | null {
   return blueprintName;
}
