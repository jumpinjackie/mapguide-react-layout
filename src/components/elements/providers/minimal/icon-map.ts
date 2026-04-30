// Minimal provider – Icon map (Blueprint icon names → Lucide React components)
import {
   AlertCircle,
   AlertTriangle,
   AppWindow,
   ArrowLeft,
   ArrowLeftRight,
   ArrowRight,
   Ban,
   ChevronDown,
   ChevronRight,
   ChevronUp,
   ChevronsUpDown,
   Folder,
   Home,
   Image,
   Info,
   LayoutGrid,
   Layers,
   ListChecks,
   Menu,
   MousePointer,
   Play,
   Printer,
   Plus,
   PlusSquare,
   Route,
   Search,
   Square,
   Tag,
   Trash2,
   X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * @hidden
 * @since 0.15
 */
export const ICON_MAP: Record<string, LucideIcon | null> = {
   "arrow-left": ArrowLeft,
   "arrow-right": ArrowRight,
   "arrows-horizontal": ArrowLeftRight,
   "application": AppWindow,
   "caret-down": ChevronDown,
   "caret-up": ChevronUp,
   "chevron-down": ChevronDown,
   "chevron-right": ChevronRight,
   "chevron-up": ChevronUp,
   "cross": X,
   "delete": Trash2,
   "disable": Ban,
   "double-caret-vertical": ChevronsUpDown,
   "error": AlertCircle,
   "folder-close": Folder,
   "geosearch": Search,
   "home": Home,
   "info-sign": Info,
   "issue": AlertTriangle,
   "layer": Layers,
   "layers": Layers,
   "media": Image,
   "menu-closed": Menu,
   "menu-open": Menu,
   "multi-select": ListChecks,
   "new-layer": PlusSquare,
   "path-search": Route,
   "play": Play,
   "print": Printer,
   "search": Search,
   "select": MousePointer,
   "small-cross": X,
   "stop": Square,
   "tag": Tag,
   "th": LayoutGrid,
   "warning-sign": AlertTriangle,
};

/**
 * @hidden
 * @since 0.15
 */
export function getIconComponent(name: string): LucideIcon | null {
   return ICON_MAP[name] ?? null;
}
