import React from "react";
import type { HtmlTableProps } from "../../element-context";

/**
 * @hidden
 * @since 0.15
 */
export const BpHtmlTable: React.FC<React.PropsWithChildren<HtmlTableProps>> = ({ condensed, bordered, className, style, children }) => {
    const classes = ["bp3-html-table"];
    if (condensed) {
        classes.push("bp3-html-table-condensed");
    }
    if (bordered) {
        classes.push("bp3-html-table-bordered");
    }
    if (className) {
        classes.push(className);
    }
    return <table className={classes.join(" ")} style={style}>{children}</table>;
};
