import React from "react";

export const Breadcrumb: React.FC<{ component: string }> = ({ component }) => {
    return <span data-map-component={component} style={{ display: "none" }} />;
}