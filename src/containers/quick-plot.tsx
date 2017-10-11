import * as React from "react";
import { connect } from "react-redux";
import { getViewer, getFusionRoot } from "../api/runtime";
import { tr as xlate, tr, DEFAULT_LOCALE } from "../api/i18n";
import { RuntimeMap } from "../api/contracts/runtime-map";
import {
    GenericEvent,
    GenericEventHandler,
    IMapView,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState,
    IExternalBaseLayer,
    getRuntimeMap,
    getCurrentView,
    getExternalBaseLayers,
    IMapViewer
} from "../api/common";
import * as MapActions from "../actions/map";
import olFeature from "ol/feature";
import olVectorSource from "ol/source/vector";
import olVectorLayer from "ol/layer/vector";
import { MapCapturerContext, Size, IMapCapturerContextCallback } from "./map-capturer-context";
import { Slider, Intent } from "@blueprintjs/core";

function getMargin() {
    /*
    var widget = getParent().Fusion.getWidgetsByType("QuickPlot")[0];
    var margin;
    
    if(!!widget.margin){
         margin = widget.margin;
    }else{
        //the default margin
        margin = {top: 25.4, buttom: 12.7, left: 12.7, right: 12.7};
    }
    return margin;
    */
    return { top: 25.4, buttom: 12.7, left: 12.7, right: 12.7 };
}

function getPrintSize(viewer: IMapViewer, state: any): Size {
    const value = state.paperSize.split(",");
    let size: Size;
    const orientation: "P" | "L" = state.orientation;
    if (orientation === "P") {
        size = { w: parseFloat(value[0]), h: parseFloat(value[1]) };
    } else {
        size = { w: parseFloat(value[1]), h: parseFloat(value[0]) };
    }

    if (!state.showAdvanced) {
        // Calculate the paper size to make sure it has a same ratio with the viweport
        const paperRatio = size.w / size.h;
        var viewSize = viewer.getSize();
        let vs: Size | undefined;
        if (orientation === "P") {
            vs = {
                w: viewSize[1],
                h: viewSize[0]
            };
        } else {
            vs = {
                w: viewSize[0],
                h: viewSize[1]
            };
        }
        if (vs) {
            const viewRatio = vs.w / vs.h;
            if (paperRatio > viewRatio) {
                size.w = size.h * viewRatio;
            } else {
                size.h = size.w / viewRatio;
            }
        }
    }

    const margins = getMargin();
    size.h = size.h - margins.top - margins.buttom;
    size.w = size.w - margins.left - margins.right;

    return size;
}

const _mapCapturers: MapCapturerContext[] = [];

function getActiveCapturer(viewer: IMapViewer, mapNames: string[], activeMapName: string): MapCapturerContext | undefined {
    let activeCapturer: MapCapturerContext | undefined;
    if (_mapCapturers.length == 0) {
        if (mapNames.length) {
            for (const mapName of mapNames) {
                const context = new MapCapturerContext(viewer, mapName);
                _mapCapturers.push(context);
                if (activeMapName == mapName) {
                    activeCapturer = context;
                }
            }
        }
    } else {
        activeCapturer = _mapCapturers.filter(m => m.getMapName() === activeMapName)[0];
    }
    return activeCapturer;
}

export interface IQuickPlotContainerOwnProps {

}

export interface IQuickPlotContainerConnectedState {
    config: IConfigurationReducerState;
    map: RuntimeMap;
    view: IMapView;
    externalBaseLayers: IExternalBaseLayer[];
    mapNames: string[];
}

export interface IQuickPlotContainerDispatch {
    setViewRotation: (rotation: number) => void;
    setViewRotationEnabled: (enabled: boolean) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IQuickPlotContainerConnectedState> {
    return {
        config: state.config,
        map: getRuntimeMap(state),
        view: getCurrentView(state),
        externalBaseLayers: getExternalBaseLayers(state),
        mapNames: Object.keys(state.mapState)
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IQuickPlotContainerDispatch> {
    return {
        setViewRotation: (rotation) => dispatch(MapActions.setViewRotation(rotation)),
        setViewRotationEnabled: (enabled) => dispatch(MapActions.setViewRotationEnabled(enabled))
    };
}

export interface IQuickPlotContainerState {
    title: string;
    subTitle: string;
    showLegend: boolean;
    showNorthBar: boolean;
    showCoordinates: boolean;
    showScaleBar: boolean;
    showDisclaimer: boolean;
    showAdvanced: boolean;
    orientation: "P" | "L";
    paperSize: string;
    scale: string;
    dpi: string;
    rotation: number;
    box: string;
    normalizedBox: string;
}

export type QuickPlotProps = IQuickPlotContainerOwnProps & Partial<IQuickPlotContainerConnectedState> & Partial<IQuickPlotContainerDispatch>;

export class QuickPlotContainer extends React.Component<QuickPlotProps, Partial<IQuickPlotContainerState>> implements IMapCapturerContextCallback {
    private fnTitleChanged: GenericEventHandler;
    private fnSubTitleChanged: GenericEventHandler;
    private fnShowLegendChanged: GenericEventHandler;
    private fnShowNorthArrowChanged: GenericEventHandler;
    private fnShowCoordinatesChanged: GenericEventHandler;
    private fnShowScaleBarChanged: GenericEventHandler;
    private fnShowDisclaimerChanged: GenericEventHandler;
    private fnDpiChanged: GenericEventHandler;
    private fnAdvancedOptionsChanged: GenericEventHandler;
    private fnScaleChanged: GenericEventHandler;
    private fnPaperSizeChanged: GenericEventHandler;
    private fnOrientationChanged: GenericEventHandler;
    private fnGeneratePlot: GenericEventHandler;
    private fnRotationChanged: (value: number) => void;
    private mapCapturerSource: olVectorSource;
    private mapCapturerLayer: olVectorLayer;
    constructor(props: QuickPlotProps) {
        super(props);
        this.fnTitleChanged = this.onTitleChanged.bind(this);
        this.fnSubTitleChanged = this.onSubTitleChanged.bind(this);
        this.fnShowLegendChanged = this.onShowLegendChanged.bind(this);
        this.fnShowNorthArrowChanged = this.onShowNorthArrowChanged.bind(this);
        this.fnShowCoordinatesChanged = this.onShowCoordinatesChanged.bind(this);
        this.fnShowScaleBarChanged = this.onShowScaleBarChanged.bind(this);
        this.fnShowDisclaimerChanged = this.onShowDisclaimerChanged.bind(this);
        this.fnDpiChanged = this.onDpiChanged.bind(this);
        this.fnAdvancedOptionsChanged = this.onAdvancedOptionsChanged.bind(this);
        this.fnScaleChanged = this.onScaleChanged.bind(this);
        this.fnRotationChanged = this.onRotationChanged.bind(this);
        this.fnPaperSizeChanged = this.onPaperSizeChanged.bind(this);
        this.fnOrientationChanged = this.onOrientationChanged.bind(this);
        this.fnGeneratePlot = this.onGeneratePlot.bind(this);
        this.state = {
            title: "",
            subTitle: "",
            showLegend: false,
            showNorthBar: false,
            showCoordinates: false,
            showScaleBar: false,
            showDisclaimer: false,
            showAdvanced: false,
            orientation: "P",
            paperSize: "210.0,297.0,A4",
            scale: "5000",
            dpi: "96",
            rotation: 0,
            box: "",
            normalizedBox: ""
        };
    }
    private onTitleChanged(e: GenericEvent) {
        this.setState({ title: e.target.value });
    }
    private onSubTitleChanged(e: GenericEvent) {
        this.setState({ subTitle: e.target.value });
    }
    private onShowLegendChanged(e: GenericEvent) {
        this.setState({ showLegend: !!!this.state.showLegend });
    }
    private onShowNorthArrowChanged(e: GenericEvent) {
        this.setState({ showNorthBar: !!!this.state.showNorthBar });
    }
    private onShowCoordinatesChanged(e: GenericEvent) {
        this.setState({ showCoordinates: !!!this.state.showCoordinates });
    }
    private onShowScaleBarChanged(e: GenericEvent) {
        this.setState({ showScaleBar: !!!this.state.showScaleBar });
    }
    private onShowDisclaimerChanged(e: GenericEvent) {
        this.setState({ showDisclaimer: !!!this.state.showDisclaimer });
    }
    private onDpiChanged(e: GenericEvent) {
        this.setState({ dpi: e.target.value });
    }
    private onAdvancedOptionsChanged(e: GenericEvent) {
        this.setState({ showAdvanced: !!!this.state.showAdvanced });
    }
    private onScaleChanged(e: GenericEvent) {
        this.setState({ scale: e.target.value });
    }
    private onPaperSizeChanged(e: GenericEvent) {
        this.setState({ paperSize: e.target.value });
    }
    private onOrientationChanged(e: GenericEvent) {
        this.setState({ orientation: e.target.value });
    }
    private onRotationChanged(value: number) {
        this.setState({ rotation: value });
    }
    private onGeneratePlot(e: GenericEvent) {

    }
    private getLocale(): string {
        return this.props.config ? this.props.config.locale : DEFAULT_LOCALE;
    }
    private toggleMapCapturerLayer(props: QuickPlotProps, activeMapName: string, state: IQuickPlotContainerState) {
        const { mapNames, setViewRotation, setViewRotationEnabled, config } = props;
        const locale = this.getLocale();
        const bVisible: boolean = state.showAdvanced;
        const viewer = getViewer();
        if (viewer && mapNames && setViewRotation && setViewRotationEnabled) {
            const activeCapturer = getActiveCapturer(viewer, mapNames, activeMapName);
            if (activeCapturer) {
                if (bVisible) {
                    const paperSize = getPrintSize(viewer, state);
                    activeCapturer.activate(this, paperSize, parseFloat(state.scale), state.rotation);
                    //For simplicity, reset rotation to 0 and prevent the ability to rotate while the map capture box
                    //is active
                    setViewRotationEnabled(false);
                    setViewRotation(0);
                    viewer.toastPrimary("info-sign", tr("QUICKPLOT_BOX_INFO", locale));
                } else {
                    activeCapturer.deactivate();
                    setViewRotationEnabled(true);
                }
            }
        }
    }
    updateBoxCoords(box: string, normalizedBox: string): void {
        this.setState({ box: box, normalizedBox: normalizedBox });
    }
    componentWillUnmount() {
        //Tear down the capture box layer
        const { mapNames, config } = this.props;
        const viewer = getViewer();
        if (viewer && mapNames && config && config.activeMapName) {
            const activeCapturer = getActiveCapturer(viewer, mapNames, config.activeMapName);
            if (activeCapturer) {
                activeCapturer.deactivate();
            }
        }
    }
    componentWillUpdate(nextProps: QuickPlotProps, nextState: IQuickPlotContainerState) {
        const config = nextProps.config;
        if (config && config.activeMapName && nextProps.mapNames) {
            if (this.state.showAdvanced != nextState.showAdvanced) {
                this.toggleMapCapturerLayer(nextProps, config.activeMapName, nextState);
            }
            if (nextState.showAdvanced &&
                ((nextState.scale != this.state.scale) ||
                (nextState.paperSize != this.state.paperSize) ||
                (nextState.orientation != this.state.orientation) ||
                (nextState.rotation != this.state.rotation))) {
                const viewer = getViewer();
                if (viewer) {
                    const capturer = getActiveCapturer(viewer, nextProps.mapNames, config.activeMapName);
                    if (capturer) {
                        const paperSize = getPrintSize(viewer, nextState);
                        capturer.updateBox(paperSize, parseFloat(nextState.scale), nextState.rotation);
                    }
                }
            }
        }
    }
    render(): JSX.Element {
        const { map, view, externalBaseLayers } = this.props;
        const viewer = getViewer();
        if (!viewer || !map || !view || !this.state.paperSize) {
            return <noscript />;
        }
        let hasExternalBaseLayers = false;
        if (externalBaseLayers) {
            hasExternalBaseLayers = externalBaseLayers.length > 0;
        }
        let box = this.state.box;
        if (!this.state.showAdvanced) {
            const extent = viewer.getCurrentExtent();
            box = `${extent[0]}, ${extent[1]}, ${extent[2]}, ${extent[1]}, ${extent[2]}, ${extent[3]}, ${extent[0]}, ${extent[3]}, ${extent[0]}, ${extent[1]}`;
        }
        let paperSize: string;
        let printSize: string;
        const tokens = this.state.paperSize.split(",");
        if (this.state.orientation === "L") {
            printSize = `${tokens[1]},${tokens[0]}`;
            paperSize = `${printSize},${tokens[2]}`;
        } else { // P
            printSize = `${tokens[0]},${tokens[1]}`;
            paperSize = `${printSize},${tokens[2]}`;
        }
        const locale = this.getLocale();
        const url = `${getFusionRoot()}/widgets/QuickPlot/PlotAsPDF.php`
        return <div className="component-quick-plot">
            <form id="Form1" name="Form1" target="_blank" method="post" action={url}>
                <input type="hidden" id="printId" name="printId" value={`${Math.random() * 1000}`} />
                <div className="Title FixWidth">{xlate("QUICKPLOT_HEADER", locale)}</div>
                <label className="pt-label">
                    {xlate("QUICKPLOT_TITLE", locale)}
                    <input type="text" className="pt-input pt-fill" dir="auto" name="{field:title}" id="title" maxLength={100} value={this.state.title} onChange={this.fnTitleChanged} />
                </label>
                <label className="pt-label">
                    {xlate("QUICKPLOT_SUBTITLE", locale)}
                    <input type="text" className="pt-input pt-fill" dir="auto" name="{field:sub_title}" id="subtitle" maxLength={100} value={this.state.subTitle} onChange={this.fnSubTitleChanged} />
                </label>
                <label className="pt-label">
                    {xlate("QUICKPLOT_PAPER_SIZE", locale)}
                    <div className="pt-select pt-fill">
                        {/*
                            The pre-defined paper size list. The value for each "option" item is in this format: [width,height]. The unit is in millimeter.
                            We can change the html code to add more paper size or remove some ones.
                        */}
                        <select className="FixWidth" id="paperSizeSelect" name="paperSizeSelect" value={this.state.paperSize} onChange={this.fnPaperSizeChanged}>
                            <option value="210.0,297.0,A4">A4 (210x297 mm; 8.27x11.69 In) </option>
                            <option value="297.0,420.0,A3">A3 (297x420 mm; 11.69x16.54 In) </option>
                            <option value="148.0,210.0,A5">A5 (148x210 mm; 5.83x8.27 in) </option>
                            <option value="216.0,279.0,Letter">Letter (216x279 mm; 8.50x11.00 In) </option>
                            <option value="216.0,356.0,Legal">Legal (216x356 mm; 8.50x14.00 In) </option>
                        </select>
                    </div>
                </label>
                <label className="pt-label">
                    {xlate("QUICKPLOT_ORIENTATION", locale)}
                    {/*
                        The pre-defined paper orientations
                    */}
                    <div className="pt-select pt-fill">
                        <select className="FixWidth" id="orientation" name="orientation" value={this.state.orientation} onChange={this.fnOrientationChanged}>
                            <option value="P">{xlate("QUICKPLOT_ORIENTATION_P", locale)}</option>
                            <option value="L">{xlate("QUICKPLOT_ORIENTATION_L", locale)}</option>
                        </select>
                    </div>
                </label>
                <input type="hidden" id="paperSize" name="paperSize" value={paperSize} />
                <input type="hidden" id="printSize" name="printSize" value={printSize} />
                <fieldset>
                    <legend>{xlate("QUICKPLOT_SHOWELEMENTS", locale)}</legend>
                    <label className="pt-control pt-checkbox">
                        <input type="checkbox" id="ShowLegendCheckBox" name="ShowLegend" checked={this.state.showLegend} onChange={this.fnShowLegendChanged} />
                        <span className="pt-control-indicator" />
                        {xlate("QUICKPLOT_SHOWLEGEND", locale)}
                    </label>
                    <label className="pt-control pt-checkbox">
                        <input type="checkbox" id="ShowNorthArrowCheckBox" name="ShowNorthArrow" checked={this.state.showNorthBar} onChange={this.fnShowNorthArrowChanged} />
                        <span className="pt-control-indicator" />
                        {xlate("QUICKPLOT_SHOWNORTHARROW", locale)}
                    </label>
                    <label className="pt-control pt-checkbox">
                        <input type="checkbox" id="ShowCoordinatesCheckBox" name="ShowCoordinates" checked={this.state.showCoordinates} onChange={this.fnShowCoordinatesChanged} />
                        <span className="pt-control-indicator" />
                        {xlate("QUICKPLOT_SHOWCOORDINTES", locale)}
                    </label>
                    <label className="pt-control pt-checkbox">
                        <input type="checkbox" id="ShowScaleBarCheckBox" name="ShowScaleBar" checked={this.state.showScaleBar} onChange={this.fnShowScaleBarChanged} />
                        <span className="pt-control-indicator" />
                        {xlate("QUICKPLOT_SHOWSCALEBAR", locale)}
                    </label>
                    <label className="pt-control pt-checkbox">
                        <input type="checkbox" id="ShowDisclaimerCheckBox" name="ShowDisclaimer" checked={this.state.showDisclaimer} onChange={this.fnShowDisclaimerChanged} />
                        <span className="pt-control-indicator" />
                        {xlate("QUICKPLOT_SHOWDISCLAIMER", locale)}
                    </label>
                </fieldset>
                <div className="HPlaceholder5px"></div>
                <div>
                    <label className="pt-control pt-checkbox">
                        <input type="checkbox" id="AdvancedOptionsCheckBox" onChange={this.fnAdvancedOptionsChanged} />
                        <span className="pt-control-indicator" />
                        {xlate("QUICKPLOT_ADVANCED_OPTIONS", locale)}
                    </label>
                </div>
                {(() => {
                    if (this.state.showAdvanced) {
                        return <div>
                            <label className="pt-label">
                                {xlate("QUICKPLOT_SCALING", locale)}
                                {/*
                                    The pre-defined scales. The value for each "option" item is the scale denominator.
                                    We can change the html code to extend the pre-defined scales
                                */}
                                <div className="pt-select pt-fill">
                                    <select className="FixWidth" id="scaleDenominator" name="scaleDenominator" value={this.state.scale} onChange={this.fnScaleChanged}>
                                        <option value="500">1: 500</option>
                                        <option value="1000">1: 1000</option>
                                        <option value="2500">1: 2500</option>
                                        <option value="5000">1: 5000</option>
                                    </select>
                                </div>
                            </label>
                            <label className="pt-label">
                                {xlate("QUICKPLOT_DPI", locale)}
                                {/*
                                    The pre-defined print DPI.
                                    We can change the html code to extend the pre-defined values
                                */}
                                <div className="pt-select pt-fill">
                                    <select className="FixWidth" id="dpi" name="dpi" value={this.state.dpi} onChange={this.fnDpiChanged}>
                                        <option value="96">96</option>
                                        <option value="150">150</option>
                                        <option value="300">300</option>
                                        <option value="600">600</option>
                                    </select>
                                </div>
                            </label>
                            <label className="pt-label noselect">
                                {xlate("QUICKPLOT_BOX_ROTATION", locale)}
                                <div style={{ paddingLeft: 16, paddingRight: 16 }}>
                                    <Slider min={0} max={360} labelStepSize={90} stepSize={1} value={this.state.rotation} onChange={this.fnRotationChanged} />
                                </div>
                            </label>
                        </div>;
                    } else {
                        return <div>
                            <input type="hidden" id="scaleDenominator" name="scaleDenominator" value={`${view.scale}`} />
                            <input type="hidden" id="dpi" name="dpi" value={this.state.dpi} />
                        </div>;
                    }
                })()}
                <div className="HPlaceholder5px"></div>
                {(() => {
                    if (hasExternalBaseLayers) {
                        return <div id="commercialLayerWarning" className="pt-callout pt-intent-primary pt-icon-info-sign">
                            {xlate("QUICKPLOT_COMMERCIAL_LAYER_WARNING", locale)}
                        </div>;
                    }
                })()}
                <div className="ButtonContainer FixWidth">
                    <button type="submit" className="pt-button pt-icon-print pt-intent-primary" onClick={this.fnGeneratePlot}>{xlate("QUICKPLOT_GENERATE", locale)}</button>
                </div>
                <input type="hidden" id="margin" name="margin" />
                <input type="hidden" id="normalizedBox" name="normalizedBox" value={this.state.normalizedBox} />
                <input type="hidden" id="rotation" name="rotation" value={-(this.state.rotation || 0)} />
                <input type="hidden" id="sessionId" name="sessionId" value={map.SessionId} />
                <input type="hidden" id="mapName" name="mapName" value={map.Name} />
                <input type="hidden" id="box" name="box" value={box} />
                <input type="hidden" id="legalNotice" name="legalNotice" />
            </form>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickPlotContainer);