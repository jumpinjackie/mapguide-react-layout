import React from "react";

/**
 * A breadcrumb component that is used to render an invisible DOM element as evidence a given component was mounted.
 * 
 * @since 0.15
 */
export const Breadcrumb: React.FC<{ component: string }> = ({ component }) => {
    return <span data-map-component={component} style={{ display: "none" }} />;
}