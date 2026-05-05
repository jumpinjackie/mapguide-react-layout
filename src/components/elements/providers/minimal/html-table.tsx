// Minimal provider – HtmlTable component
import React from "react";
import type { HtmlTableProps } from "../../element-context";
import "./html-table.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnHtmlTable: React.FC<React.PropsWithChildren<HtmlTableProps>> = ({ condensed, bordered, className, style, children }) => {
   const cls = [
      "mrl-table",
      condensed ? "mrl-table--condensed" : null,
      bordered ? "mrl-table--bordered" : null,
      className ?? null,
   ].filter(Boolean).join(" ");

   return (
      <table className={cls} style={style}>
         {children}
      </table>
   );
};
