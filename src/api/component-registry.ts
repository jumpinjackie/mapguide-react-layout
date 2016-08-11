import * as React from "react";
import { MgError } from "./error";

export interface IComponentFactory {
    render(props: any): JSX.Element
}

export function getComponentFactory(id: string): IComponentFactory {
    throw new MgError(`No such component registered with id: ${id}`);
}