import * as React from "react";

/**
 * @since 0.13
 */
export enum MapGuideMockMode {
    /**
     * Render a placeholder image showing the key mapagent parameters
     */
    RenderPlaceholder,
    /**
     * Do not render anything
     */
    DoNotRender
}

/**
 * The map debug context, used to check if request mocking should be enabled or not
 * @since 0.13
 */
export interface IMapDebugContext {
    mock?: MapGuideMockMode;
}

export const MapDebugContext = React.createContext<IMapDebugContext>({});