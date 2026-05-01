// Minimal provider – Inline SVG icon renderer (no external icon library)
import React from "react";

// Each icon is represented as an array of [tagName, attributes] tuples.
type SvgNode = [string, Record<string, string>];
type SvgNodeList = SvgNode[];

/**
 * @hidden
 * @since 0.15
 */
export type InlineSvgIcon = SvgNodeList;

/**
 * All icon path data, keyed by a logical name.
 * SVG paths are extracted directly from lucide-react source to stay bundle-free.
 * @hidden
 * @since 0.15
 */
export const SVG_ICONS: Record<string, InlineSvgIcon> = {
   AlertCircle: [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
      ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }],
   ],
   AlertTriangle: [
      ["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }],
      ["path", { d: "M12 9v4" }],
      ["path", { d: "M12 17h.01" }],
   ],
   AppWindow: [
      ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }],
      ["path", { d: "M10 4v4" }],
      ["path", { d: "M2 8h20" }],
      ["path", { d: "M6 4v4" }],
   ],
   ArrowLeft: [
      ["path", { d: "m12 19-7-7 7-7" }],
      ["path", { d: "M19 12H5" }],
   ],
   ArrowLeftRight: [
      ["path", { d: "M8 3 4 7l4 4" }],
      ["path", { d: "M4 7h16" }],
      ["path", { d: "m16 21 4-4-4-4" }],
      ["path", { d: "M20 17H4" }],
   ],
   ArrowRight: [
      ["path", { d: "M5 12h14" }],
      ["path", { d: "m12 5 7 7-7 7" }],
   ],
   Ban: [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M4.929 4.929 19.07 19.071" }],
   ],
   Check: [
      ["path", { d: "M20 6 9 17l-5-5" }],
   ],
   ChevronDown: [
      ["path", { d: "m6 9 6 6 6-6" }],
   ],
   ChevronRight: [
      ["path", { d: "m9 18 6-6-6-6" }],
   ],
   ChevronUp: [
      ["path", { d: "m18 15-6-6-6 6" }],
   ],
   ChevronsUpDown: [
      ["path", { d: "m7 15 5 5 5-5" }],
      ["path", { d: "m7 9 5-5 5 5" }],
   ],
   CircleArrowUp: [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "m16 12-4-4-4 4" }],
      ["path", { d: "M12 16V8" }],
   ],
   Folder: [
      ["path", { d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" }],
   ],
   Hand: [
      ["path", { d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" }],
      ["path", { d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" }],
      ["path", { d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" }],
      ["path", { d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" }],
   ],
   Home: [
      ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }],
      ["path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }],
   ],
   Image: [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
      ["circle", { cx: "9", cy: "9", r: "2" }],
      ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }],
   ],
   Info: [
      ["circle", { cx: "12", cy: "12", r: "10" }],
      ["path", { d: "M12 16v-4" }],
      ["path", { d: "M12 8h.01" }],
   ],
   Layers: [
      ["path", { d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" }],
      ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" }],
      ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" }],
   ],
   Layers2: [
      ["path", { d: "M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z" }],
      ["path", { d: "m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845" }],
   ],
   LayersPlus: [
      ["path", { d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z" }],
      ["path", { d: "M16 17h6" }],
      ["path", { d: "M19 14v6" }],
      ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178" }],
      ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962" }],
   ],
   List: [
      ["path", { d: "M3 5h.01" }],
      ["path", { d: "M3 12h.01" }],
      ["path", { d: "M3 19h.01" }],
      ["path", { d: "M8 5h13" }],
      ["path", { d: "M8 12h13" }],
      ["path", { d: "M8 19h13" }],
   ],
   ListChecks: [
      ["path", { d: "M13 5h8" }],
      ["path", { d: "M13 12h8" }],
      ["path", { d: "M13 19h8" }],
      ["path", { d: "m3 17 2 2 4-4" }],
      ["path", { d: "m3 7 2 2 4-4" }],
   ],
   Map: [
      ["path", { d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" }],
      ["path", { d: "M15 5.764v15" }],
      ["path", { d: "M9 3.236v15" }],
   ],
   MapPinSearch: [
      ["path", { d: "M 12.248 21.969 a 1 1 0 0 1 -0.849 -0.17 C 9.539 20.193 4 14.993 4 10 a 8 8 0 0 1 16 0 C 20 10.42 19.961 10.841 19.888 11.262" }],
      ["path", { d: "m22 22-1.88-1.88" }],
      ["circle", { cx: "12", cy: "10", r: "3" }],
      ["circle", { cx: "18", cy: "18", r: "3" }],
   ],
   Menu: [
      ["path", { d: "M4 5h16" }],
      ["path", { d: "M4 12h16" }],
      ["path", { d: "M4 19h16" }],
   ],
   MessageSquareMore: [
      ["path", { d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" }],
      ["path", { d: "M12 11h.01" }],
      ["path", { d: "M16 11h.01" }],
      ["path", { d: "M8 11h.01" }],
   ],
   Minus: [
      ["path", { d: "M5 12h14" }],
   ],
   MousePointer: [
      ["path", { d: "M12.586 12.586 19 19" }],
      ["path", { d: "M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z" }],
   ],
   PanelLeftClose: [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M9 3v18" }],
      ["path", { d: "m16 15-3-3 3-3" }],
   ],
   PanelLeftOpen: [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M9 3v18" }],
      ["path", { d: "m14 9 3 3-3 3" }],
   ],
   Pencil: [
      ["path", { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" }],
      ["path", { d: "m15 5 4 4" }],
   ],
   Play: [
      ["path", { d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" }],
   ],
   Plus: [
      ["path", { d: "M5 12h14" }],
      ["path", { d: "M12 5v14" }],
   ],
   Printer: [
      ["path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }],
      ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" }],
      ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1" }],
   ],
   Route: [
      ["circle", { cx: "6", cy: "19", r: "3" }],
      ["path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" }],
      ["circle", { cx: "18", cy: "5", r: "3" }],
   ],
   Scaling: [
      ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }],
      ["path", { d: "M14 15H9v-5" }],
      ["path", { d: "M16 3h5v5" }],
      ["path", { d: "M21 3 9 15" }],
   ],
   ScanSearch: [
      ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
      ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
      ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
      ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
      ["circle", { cx: "12", cy: "12", r: "3" }],
      ["path", { d: "m16 16-1.9-1.9" }],
   ],
   Search: [
      ["path", { d: "m21 21-4.34-4.34" }],
      ["circle", { cx: "11", cy: "11", r: "8" }],
   ],
   Settings: [
      ["path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }],
      ["circle", { cx: "12", cy: "12", r: "3" }],
   ],
   Square: [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
   ],
   SquareStack: [
      ["path", { d: "M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" }],
      ["path", { d: "M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" }],
      ["rect", { width: "8", height: "8", x: "14", y: "14", rx: "2" }],
   ],
   Table: [
      ["path", { d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" }],
   ],
   Tag: [
      ["path", { d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" }],
      ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" }],
   ],
   Trash2: [
      ["path", { d: "M10 11v6" }],
      ["path", { d: "M14 11v6" }],
      ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
      ["path", { d: "M3 6h18" }],
      ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }],
   ],
   X: [
      ["path", { d: "M18 6 6 18" }],
      ["path", { d: "m6 6 12 12" }],
   ],
};

/**
 * Renders an inline SVG icon from the SVG_ICONS registry.
 *
 * @since 0.15
 * @hidden
 */
export const SvgIcon: React.FC<{ name: string; size?: number; style?: React.CSSProperties }> = ({ name, size = 16, style }) => {
   const nodes = SVG_ICONS[name];
   if (!nodes) {
      return null;
   }
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         style={style}
         aria-hidden="true"
      >
         {nodes.map(([tag, attrs], i) => React.createElement(tag, { ...attrs, key: i }))}
      </svg>
   );
};
