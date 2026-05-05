// Minimal provider – TabSet component
import React from "react";
import type { TabSetProps } from "../../element-context";
import "./tab-set.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnTabSet: React.FC<TabSetProps> = ({ id, className, tabs, activeTabId, onTabChanged }) => {
   const [localActive, setLocalActive] = React.useState<string | number | undefined>(
      activeTabId ?? tabs[0]?.id
   );
   const activeId = activeTabId ?? localActive;

   const handleTabClick = (tabId: string | number) => {
      setLocalActive(tabId);
      onTabChanged?.(tabId);
   };

   const cls = ["mrl-tab-set", className].filter(Boolean).join(" ");

   return (
      <div id={id} className={cls}>
         <div className="mrl-tab-list" role="tablist">
            {tabs.map(tab => (
               <button
                  key={`mrl-tab-${tab.id}`}
                  role="tab"
                  aria-selected={tab.id === activeId}
                  className={`mrl-tab${tab.id === activeId ? " mrl-tab--active" : ""}`}
                  onClick={() => handleTabClick(tab.id)}
               >
                  {tab.title}
               </button>
            ))}
         </div>
         {tabs.map(tab => (
            <div
               key={`mrl-tab-panel-${tab.id}`}
               role="tabpanel"
               className="mrl-tab-panel"
               hidden={tab.id !== activeId}
            >
               {tab.content}
            </div>
         ))}
      </div>
   );
};
