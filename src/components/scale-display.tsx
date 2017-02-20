import * as React from "react";
import {
    IMapView
} from "../api/common";
import { tr } from "../api/i18n";

export interface IScaleDisplayProps {
    style?: React.CSSProperties;
    view: IMapView;
    finiteScales?: number[] | null;
    locale: string;
    onScaleChanged: (scale: number) => void;
}

export class ScaleDisplay extends React.Component<IScaleDisplayProps, any> {
    private fnFiniteScaleChanged: GenericEventHandler;
    private fnScaleKeyPressed: GenericEventHandler;
    private fnScaleInputChanged: GenericEventHandler;
    constructor(props: IScaleDisplayProps) {
        super(props);
        this.fnFiniteScaleChanged = this.onFiniteScaleChanged.bind(this);
        this.fnScaleKeyPressed = this.onScaleKeyPressed.bind(this);
        this.fnScaleInputChanged = this.onScaleInputChanged.bind(this);
        this.state = {};
    }
    private onFiniteScaleChanged(e: GenericEvent) {
        if (this.props.onScaleChanged) {
            this.props.onScaleChanged(parseFloat(e.target.value));
        }
    }
    private onScaleKeyPressed(e: GenericEvent) {
        if (e.key == 'Enter' && this.props.onScaleChanged) {
            this.props.onScaleChanged(this.state.localScale);
        }
    }
    private onScaleInputChanged(e: GenericEvent) {
        this.setState({ localScale: parseFloat(e.target.value) });
    }
    private updateLocalScale(props: IScaleDisplayProps) {
        const { finiteScales, view } = props;
        if (!finiteScales && view) {
            this.setState({ localScale: view.scale });
        }
    }
    componentDidMount() {
        this.updateLocalScale(this.props);
    }
    componentWillReceiveProps(nextProps: IScaleDisplayProps) {
        this.updateLocalScale(nextProps);
    }
    render(): JSX.Element {
        const { view, style, locale, finiteScales } = this.props;
        const label = tr("FMT_SCALE_DISPLAY", locale, {
            scale: ""
        });
        if (finiteScales) {
            return <div className="component-scale-display" style={style}>
                {label} <select className="scale-input" value={view.scale} onChange={this.fnFiniteScaleChanged}>
                    {finiteScales.map(s => {
                        return <option key={s} value={s}>{s}</option>;
                    })}
                </select>
            </div>;
        } else {
            return <div className="component-scale-display" style={style}>
                {label} <input className="scale-input" type="number" value={this.state.localScale || ""} onChange={this.fnScaleInputChanged} onKeyPress={this.fnScaleKeyPressed} />
            </div>;
        }
    }
}