import * as React from "react";
import {
    GenericEvent,
    GenericEventHandler,
    IMapView
} from "../api/common";
import { tr } from "../api/i18n";
import { getFiniteScaleIndexForScale } from "../utils/number";

/**
 * ScaleDisplay component props
 *
 * @export
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
 *
 * @export
 * @class ScaleDisplay
 * @extends {React.Component<IScaleDisplayProps, any>}
 */
export class ScaleDisplay extends React.Component<IScaleDisplayProps, any> {
    constructor(props: IScaleDisplayProps) {
        super(props);
        this.state = {};
    }
    private onFiniteScaleChanged = (e: GenericEvent) => {
        if (this.props.onScaleChanged) {
            this.props.onScaleChanged(parseFloat(e.target.value));
        }
    }
    private onScaleKeyPressed = (e: GenericEvent) => {
        if (e.key == 'Enter' && this.props.onScaleChanged) {
            this.props.onScaleChanged(this.state.localScale);
        }
    }
    private onScaleInputChanged = (e: GenericEvent) => {
        this.setState({ localScale: parseFloat(e.target.value) });
    }
    private updateLocalScale(props: IScaleDisplayProps) {
        const { finiteScales, view } = props;
        if (!finiteScales && view && view.scale != this.state.localScale) {
            this.setState({ localScale: view.scale });
        }
    }
    componentDidMount() {
        this.updateLocalScale(this.props);
    }
    componentDidUpdate(prevProps: IScaleDisplayProps) {
        this.updateLocalScale(this.props);
    }
    render(): JSX.Element {
        const { view, style, locale, finiteScales } = this.props;
        const label = tr("FMT_SCALE_DISPLAY", locale, {
            scale: ""
        });
        if (finiteScales) {
            const fi = getFiniteScaleIndexForScale(finiteScales, view.scale);
            const fiScale = finiteScales[fi];
            return <div className="component-scale-display" style={style}>
                {label} <select className="scale-input" value={fiScale} onChange={this.onFiniteScaleChanged}>
                    {finiteScales.map(s => {
                        return <option key={s} value={s}>{s}</option>;
                    })}
                </select>
            </div>;
        } else {
            return <div className="component-scale-display" style={style}>
                {label} <input className="scale-input" type="number" value={this.state.localScale || ""} onChange={this.onScaleInputChanged} onKeyPress={this.onScaleKeyPressed} />
            </div>;
        }
    }
}