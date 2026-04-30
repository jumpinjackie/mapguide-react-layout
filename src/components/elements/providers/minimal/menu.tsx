// Minimal provider – MenuComponent (plain HTML menu list)
import React from "react";
import type { MenuComponentProps } from "../../element-context";
import type { IItem } from "../../../toolbar";
import { isMenu } from "../../../../utils/type-guards";
import { getText } from "../../../../utils/menu";
import { getEnabled } from "../../../toolbar";
import { ImageIcon } from "../../../icon";
import "./menu.css";

interface IMenuItemsProps {
   items: IItem[];
   onInvoked?: () => void;
}

const MnMenuItems: React.FC<IMenuItemsProps> = ({ items, onInvoked }) => {
   return (
      <>
         {items.map((item, idx) => {
            if (item.isSeparator) {
               return <li key={idx} className="mrl-menu-separator" role="separator" />;
            }
            if (isMenu(item)) {
               return (
                  <li key={idx} className="mrl-submenu" role="none">
                     <div className="mrl-menu-item">
                        {getText(item.label)}
                     </div>
                     <ul className="mrl-menu" role="menu">
                        <MnMenuItems items={item.childItems} onInvoked={onInvoked} />
                     </ul>
                  </li>
               );
            }
            const enabled = getEnabled(item);
            const handleClick = () => {
               if (enabled) {
                  item.invoke?.();
                  onInvoked?.();
               }
            };
            return (
               <li
                  key={idx}
                  className={`mrl-menu-item${!enabled ? " mrl-menu-item--disabled" : ""}`}
                  role="menuitem"
                  aria-disabled={!enabled}
                  onClick={handleClick}
               >
                  {(item.icon || item.iconClass) && (
                     <ImageIcon url={item.icon} spriteClass={item.iconClass} />
                  )}
                  {getText(item.label)}
               </li>
            );
         })}
      </>
   );
};

/**
 * @hidden
 * @since 0.15
 */
export const MnMenuComponent: React.FC<MenuComponentProps> = ({ items, onInvoked }) => {
   return (
      <ul className="mrl-menu" role="menu">
         <MnMenuItems items={items} onInvoked={onInvoked} />
      </ul>
   );
};
