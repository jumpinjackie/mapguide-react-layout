import * as React from "react";
import { IMapProviderContext } from './context';

/**
 * Generic map context provider. This is the default provider if no
 * specific map context provider is specified.
 * 
 * @since 0.14
 */
export const GENERIC_PROVIDER: IMapProviderContext = {
    providerName: "Generic"
}