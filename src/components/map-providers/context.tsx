import * as React from "react";
import { GenericMapProviderContext } from './generic';
import { IMapProviderContext } from './base';

/**
 * @since 0.14
 */
export const MapProviderContext = React.createContext<IMapProviderContext>(new GenericMapProviderContext());