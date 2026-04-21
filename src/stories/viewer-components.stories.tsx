import * as React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { Error as ErrorComponent } from "../components/error";
import { SessionExpired } from "../components/session-expired";
import { PoweredByMapGuide } from "../components/pbmg";
import { MapLoadIndicator } from "../components/map-load-indicator";
import { ImageIcon } from "../components/icon";
import { Toolbar } from "../components/toolbar";
import type { IItem } from "../components/toolbar";
import { RndModalDialog } from "../components/modal-dialog";
import { FlyoutRegion } from "../components/flyout-region";
import { SplitterLayout } from "../components/splitter-layout";
import type { MapLoadIndicatorPositioning } from "../api/common";
import { DEFAULT_LOCALE } from "../api/i18n";

import "../styles/index.css";

export default {
   title: "Viewer Components",
   decorators: [withKnobs],
};

export const _Error = {
   render: () => {
      const variant = select("Error type", ["string", "Error object"], "string");
      if (variant === "string") {
         return <ErrorComponent error="Something went wrong: could not connect to the server." />;
      }
      const err = window.Error("Unexpected error occurred");
      err.stack = "Error: Unexpected error occurred\n    at Object.<anonymous> (app.js:42)\n    at Module._compile (module.js:569)";
      return <ErrorComponent error={err} />;
   },
   name: "Error",
};

export const _SessionExpired = {
   render: () => {
      const locale = select("Locale", ["en", "fr"], "en");
      return <SessionExpired locale={locale} />;
   },
   name: "Session Expired",
};

export const _PoweredByMapGuide = {
   render: () => {
      return <PoweredByMapGuide />;
   },
   name: "Powered By MapGuide",
};

export const _MapLoadIndicatorLoading = {
   render: () => {
      const loaded = number("Loaded tiles", 3);
      const loading = number("Total tiles", 10);
      const color = text("Color", "#ff0000");
      const position = select<MapLoadIndicatorPositioning>("Position", ["top", "bottom"], "top");
      return (
         <div style={{ position: "relative", width: 400, height: 40, background: "#eee" }}>
            <MapLoadIndicator
               loaded={loaded}
               loading={loading}
               color={color}
               position={position}
            />
            <div style={{ padding: 8 }}>Map area (indicator shown above)</div>
         </div>
      );
   },
   name: "Map Load Indicator (Loading)",
};

export const _MapLoadIndicatorComplete = {
   render: () => {
      const color = text("Color", "#00aa00");
      const position = select<MapLoadIndicatorPositioning>("Position", ["top", "bottom"], "top");
      return (
         <div style={{ position: "relative", width: 400, height: 40, background: "#eee" }}>
            <MapLoadIndicator
               loaded={10}
               loading={10}
               color={color}
               position={position}
            />
            <div style={{ padding: 8 }}>Map area (indicator hidden – fully loaded)</div>
         </div>
      );
   },
   name: "Map Load Indicator (Complete)",
};

export const _ImageIconSprite = {
   render: () => {
      return (
         <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <ImageIcon spriteClass="icon-zoom-in" />
            <ImageIcon spriteClass="icon-zoom-out" />
            <ImageIcon spriteClass="icon-select" />
            <ImageIcon spriteClass="icon-pan" />
         </div>
      );
   },
   name: "ImageIcon (sprite)",
};

const TOOLBAR_ITEMS: IItem[] = [
   {
      label: "Home",
      tooltip: "Go to home view",
      bpIconName: "home",
      invoke: action("Home invoked"),
   },
   {
      label: "Search",
      tooltip: "Search features",
      bpIconName: "search",
      invoke: action("Search invoked"),
   },
   {
      label: "Print",
      tooltip: "Print map",
      bpIconName: "print",
      invoke: action("Print invoked"),
   },
   { isSeparator: true },
   {
      label: "Select",
      tooltip: "Select features",
      bpIconName: "select",
      invoke: action("Select invoked"),
   },
   {
      label: "Clear",
      tooltip: "Clear selection",
      bpIconName: "delete",
      enabled: false,
      invoke: action("Clear invoked"),
   },
];

export const _Toolbar = {
   render: () => {
      const vertical = boolean("Vertical", false);
      const hideLabels = boolean("Hide vertical labels", false);
      return (
         <Toolbar
            childItems={TOOLBAR_ITEMS}
            containerStyle={{ height: 32, background: "#f0f0f0" }}
            vertical={vertical}
            hideVerticalLabels={hideLabels}
         />
      );
   },
   name: "Toolbar",
};

export const _RndModalDialog = {
   render: () => {
      const [isOpen, setIsOpen] = React.useState(true);
      const title = text("Title", "My Dialog");
      const enableInteractionMask = boolean("Enable interaction mask", true);
      return (
         <div style={{ position: "relative", width: 640, height: 480, background: "#ddd" }}>
            {!isOpen && (
               <button onClick={() => setIsOpen(true)} style={{ margin: 8 }}>
                  Open dialog
               </button>
            )}
            <RndModalDialog
               x={50}
               y={50}
               width={320}
               height={240}
               title={title}
               isOpen={isOpen}
               icon="info-sign"
               locale={DEFAULT_LOCALE}
               enableInteractionMask={enableInteractionMask}
               onClose={() => setIsOpen(false)}
               onChange={action("dialog changed")}
            >
               {([w, h]) => (
                  <div style={{ width: w, height: h, padding: 8 }}>
                     <p>Dialog content ({w}×{h})</p>
                     <p>Drag the title bar to move, drag the corners to resize.</p>
                  </div>
               )}
            </RndModalDialog>
         </div>
      );
   },
   name: "Rnd Modal Dialog",
};

export const _FlyoutRegion = {
   render: () => {
      const [flyoutConf, setFlyoutConf] = React.useState<React.ComponentProps<typeof FlyoutRegion>["flyoutConf"]>({
         "menu1": {
            open: true,
            metrics: { posX: 10, posY: 40, width: 120, height: 32 },
            childItems: [
               { label: "Item One", invoke: action("Item One invoked") },
               { label: "Item Two", invoke: action("Item Two invoked") },
               { isSeparator: true },
               { label: "Item Three (disabled)", enabled: false, invoke: action("Item Three invoked") },
            ],
         },
      });
      const onCloseFlyout = (id: string) => {
         action("close flyout")(id);
         setFlyoutConf(prev => ({
            ...prev,
            [id]: { ...prev[id], open: false },
         }));
      };
      return (
         <div style={{ position: "relative", width: 400, height: 200, background: "#eee" }}>
            <button
               style={{ position: "absolute", left: 10, top: 8 }}
               onClick={() => setFlyoutConf(prev => ({ ...prev, menu1: { ...prev["menu1"], open: true } }))}
            >
               Open flyout
            </button>
            <FlyoutRegion
               flyoutConf={flyoutConf}
               locale={DEFAULT_LOCALE}
               onCloseFlyout={onCloseFlyout}
            />
         </div>
      );
   },
   name: "Flyout Region",
};

export const _SplitterLayout = {
   render: () => {
      const vertical = boolean("Vertical", false);
      const secondaryInitialSize = number("Secondary initial size (px)", 200);
      return (
         <div style={{ width: 600, height: 400 }}>
            <SplitterLayout
               vertical={vertical}
               secondaryInitialSize={secondaryInitialSize}
               onSecondaryPaneSizeChange={action("secondary pane size changed")}
            >
               <div style={{ background: "#b3d9ff", width: "100%", height: "100%", padding: 8 }}>
                  Primary pane
               </div>
               <div style={{ background: "#ffd9b3", width: "100%", height: "100%", padding: 8 }}>
                  Secondary pane
               </div>
            </SplitterLayout>
         </div>
      );
   },
   name: "Splitter Layout",
};
