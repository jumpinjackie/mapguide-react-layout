// Minimal provider – Icon map (Blueprint icon names → inline SVG icon keys)
// No external icon library — all SVG data is bundled inline in svg-icons.tsx.

/**
 * Maps Blueprint icon-name strings to keys in the SVG_ICONS registry.
 * Returns `null` for icon names that have no known mapping.
 *
 * @hidden
 * @since 0.15
 */
export const BLUEPRINT_TO_SVG_MAP: Record<string, string | null> = {
   "arrow-left": "ArrowLeft",
   "arrow-right": "ArrowRight",
   "arrows-horizontal": "Scaling",
   "application": "AppWindow",
   "caret-down": "ChevronDown",
   "caret-up": "ChevronUp",
   "chevron-down": "ChevronDown",
   "chevron-right": "ChevronRight",
   "chevron-up": "ChevronUp",
   "cog": "Settings",
   "comment": "MessageSquareMore",
   "cross": "X",
   "delete": "Trash2",
   "disable": "Ban",
   "double-caret-vertical": "ChevronsUpDown",
   "edit": "Pencil",
   "error": "AlertCircle",
   "folder-close": "Folder",
   "geosearch": "MapPinSearch",
   "hand": "Hand",
   "home": "Home",
   "info-sign": "Info",
   "issue": "AlertTriangle",
   "layer": "Layers2",
   "layers": "Layers",
   "map": "Map",
   "media": "Image",
   "menu-closed": "PanelLeftClose",
   "menu-open": "PanelLeftOpen",
   "minus": "Minus",
   "multi-select": "SquareStack",
   "new-layer": "LayersPlus",
   "path-search": "Route",
   "play": "Play",
   "plus": "Plus",
   "print": "Printer",
   "properties": "List",
   "search": "Search",
   "select": "MousePointer",
   "small-cross": "X",
   "stop": "Square",
   "tag": "Tag",
   "th": "Table",
   "tick": "Check",
   "trash": "Trash2",
   "upload": "CircleArrowUp",
   "warning-sign": "AlertTriangle",
   "zoom-to-fit": "ScanSearch",
};

/**
 * Returns the SVG_ICONS key for a given Blueprint icon name, or `null` if not mapped.
 *
 * @hidden
 * @since 0.15
 */
export function getSvgIconName(blueprintName: string): string | null {
   return BLUEPRINT_TO_SVG_MAP[blueprintName] ?? null;
}
