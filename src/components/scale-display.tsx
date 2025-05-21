import * as React from "react";
import {
    GenericEvent,
    IMapView
} from "../api/common";
import { tr } from "../api/i18n";
import { getFiniteScaleIndexForScale } from "../utils/number";

/**
 * ScaleDisplay component props
 *
 * @interface IScaleDisplayProps
 */
export interface IScaleDisplayProps {
    style?: React.CSSProperties;
    view: IMapView;
    finiteScales?: number[] | null;
    locale: string;
    onScaleChanged: (scale: number) => void;
}

/**
 * A component that displays the map scale
 * @param props 
 */
export const ScaleDisplay = (props: IScaleDisplayProps) => {
    const { view, style, locale, finiteScales, onScaleChanged } = props;
    const [localScale, setLocalScale] = React.useState<number | undefined>(undefined);
    const onFiniteScaleChanged = (e: GenericEvent) => onScaleChanged?.(parseFloat(e.target.value));
    const onScaleKeyPressed = (e: GenericEvent) => {
        if (e.key == 'Enter' && localScale) {
            onScaleChanged?.(localScale);
        }
    };
    const onScaleInputChanged = (e: GenericEvent) => setLocalScale(parseFloat(e.target.value));
    React.useEffect(() => {
        if (!finiteScales && view && view.scale != localScale) {
            setLocalScale(view.scale);
        }
    }, [finiteScales, view]);
    const label = tr("FMT_SCALE_DISPLAY", locale, {
        scale: ""
    });
    if (finiteScales) {
        const fi = getFiniteScaleIndexForScale(finiteScales, view.scale);
        const fiScale = finiteScales[fi];
        //NOTE: Not using BP styled HTML select as the size imposed is not acceptable
        return <div className="status-bar-component component-scale-display" style={style}>
            {label} <select className="scale-input" value={fiScale} onChange={onFiniteScaleChanged}>
                {finiteScales.map(s => {
                    return <option key={s} value={s}>{s}</option>;
                })}
            </select>
        </div>;
    } else {
        return <div className="status-bar-component component-scale-display" style={style}>
            {label} <input className="scale-input" type="number" value={localScale || ""} onChange={onScaleInputChanged} onKeyPress={onScaleKeyPressed} />
        </div>;
    }
}