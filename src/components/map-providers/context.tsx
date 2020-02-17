import * as React from "react";
import { GENERIC_PROVIDER } from './generic';

/**
 * Defines a mapping provider
 * 
 * @since 0.14
 */
export interface IMapProviderContext {
    providerName: string;
}

/**
 * @since 0.14
 */
export const MapProviderContext = React.createContext<IMapProviderContext>(GENERIC_PROVIDER);