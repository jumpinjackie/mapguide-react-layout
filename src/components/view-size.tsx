import * as React from "react";
import { IMapView, UnitOfMeasure } from "../api/common";
import { getUnitOfMeasure } from "../utils/units";

export interface IViewSizeProps {
    /**
     * Width in pixels
     * 
     * @type {number}
     * @memberof IViewSizeProps
     */
    width: number;
    /**
     * Height in pixels
     * 
     * @type {number}
     * @memberof IViewSizeProps
     */
    height: number;
    /**
     * Meters per unit
     * 
     * @type {number}
     * @memberof IViewSizeProps
     */
    metersPerUnit: number;
    /**
     * Decimal precision to display
     * 
     * @type {number}
     * @memberof IViewSizeProps
     */
    precision?: number;
    /**
     * The map view
     * 
     * @type {IMapView}
     * @memberof IViewSizeProps
     */
    view: IMapView;
    /**
     * The desired unit of measure to display the size in
     * 
     * @type {UnitOfMeasure}
     * @memberof IViewSizeProps
     */
    units: UnitOfMeasure;
}

export const ViewSize = (props: IViewSizeProps) => {
    const { width, height, view, metersPerUnit, units, precision } = props;
    const uom = getUnitOfMeasure(units);
    let gw = width;
    let gh = height;
    if (view.resolution && units != UnitOfMeasure.Pixels) {
        gw = view.resolution * width;
        gh = view.resolution * height;
        if (units != UnitOfMeasure.Unknown) {
            gw = uom.unitsPerMeter * gw * metersPerUnit;
            gh = uom.unitsPerMeter * gh * metersPerUnit;
        }
        let prec = precision || 2;
        if (prec >= 0) {
            const factor = Math.pow(10, prec);
            gw = Math.round(gw * factor) / factor;
            gh = Math.round(gh * factor) / factor;
        }
    }
    //TODO: Support format string extension parameter from fusion widget
    return <div className="component-view-size">{gw} x {gh} ({uom.abbreviation})</div>;
};