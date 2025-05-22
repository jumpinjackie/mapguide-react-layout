import * as React from "react";
import { getViewer, getFusionRoot } from "../api/runtime";
import { tr as xlate, tr } from "../api/i18n";
import { RuntimeMap } from "../api/contracts/runtime-map";
import {
    GenericEvent,
    IMapView,
    IConfigurationReducerState,
    IExternalBaseLayer,
    IMapViewer,
    Size,
    isVisualBaseLayer
} from "../api/common";
import { MapCapturerContext, IMapCapturerContextCallback } from "./map-capturer-context";
import { useActiveMapName, useActiveMapView, useActiveMapExternalBaseLayers, useViewerLocale, useAvailableMaps, usePrevious } from './hooks';
import { setViewRotation, setViewRotationEnabled } from '../actions/map';
import { debug } from '../utils/logger';
import { useActiveMapState } from './hooks-mapguide';
import { useReduxDispatch } from "../components/map-providers/context";
import { useElementContext } from "../components/elements/element-context";

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

function getPrintSize(viewer: IMapViewer, showAdvanced: boolean, paperSize: string, orientation: "P" | "L"): Size {
    const value = paperSize.split(",");
    let size: Size;
    if (orientation === "P") {
        size = { w: parseFloat(value[0]), h: parseFloat(value[1]) };
    } else {
        size = { w: parseFloat(value[1]), h: parseFloat(value[0]) };
    }

    if (!showAdvanced) {
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

function toggleMapCapturerLayer(locale: string,
    mapNames: string[] | undefined,
    activeMapName: string,
    showAdvanced: boolean,
    paperSize: string,
    orientation: "P" | "L",
    scale: string,
    rotation: number,
    updateBoxCoords: (box: string, normalizedBox: string) => void,
    setViewRotationEnabled: (flag: boolean) => void,
    setViewRotation: (rot: number) => void) {
    const bVisible: boolean = showAdvanced;
    const viewer = getViewer();
    if (viewer && mapNames) {
        const activeCapturer = getActiveCapturer(viewer, mapNames, activeMapName);
        if (activeCapturer) {
            if (bVisible) {
                const ppSize = getPrintSize(viewer, showAdvanced, paperSize, orientation);
                const cb: IMapCapturerContextCallback = {
                    updateBoxCoords
                }
                activeCapturer.activate(cb, ppSize, parseFloat(scale), rotation);
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

export const QuickPlotContainer = () => {
    const { Slider, Callout, Button } = useElementContext();
    const [title, setTitle] = React.useState(""); ``
    const [subTitle, setSubTitle] = React.useState("");
    const [showLegend, setShowLegend] = React.useState(false);
    const [showNorthBar, setShowNorthBar] = React.useState(false);
    const [showCoordinates, setShowCoordinates] = React.useState(false);
    const [showScaleBar, setShowScaleBar] = React.useState(false);
    const [showDisclaimer, setShowDisclaimer] = React.useState(false);
    const [showAdvanced, setShowAdvanced] = React.useState(false);
    const [orientation, setOrientation] = React.useState<"L" | "P">("P");
    const [paperSize, setPaperSize] = React.useState("210.0,297.0,A4");
    const [scale, setScale] = React.useState("5000");
    const [dpi, setDpi] = React.useState("96");
    const [rotation, setRotation] = React.useState(0);
    const [box, setBox] = React.useState("");
    const [normalizedBox, setNormalizedBox] = React.useState("");

    const locale = useViewerLocale();
    const activeMapName = useActiveMapName();
    const mapNames = useAvailableMaps()?.map(m => m.value);
    const map = useActiveMapState();
    const view = useActiveMapView();
    const externalBaseLayers = useActiveMapExternalBaseLayers()?.filter(ebl => isVisualBaseLayer(ebl));
    const dispatch = useReduxDispatch();
    const setViewRotationAction = (rotation: number) => dispatch(setViewRotation(rotation));
    const setViewRotationEnabledAction = (enabled: boolean) => dispatch(setViewRotationEnabled(enabled));

    const onTitleChanged = (e: GenericEvent) => {
        setTitle(e.target.value);
    };
    const onSubTitleChanged = (e: GenericEvent) => {
        setSubTitle(e.target.value);
    };
    const onShowLegendChanged = () => {
        setShowLegend(!showLegend);
    };
    const onShowNorthArrowChanged = () => {
        setShowNorthBar(!showNorthBar);
    };
    const onShowCoordinatesChanged = () => {
        setShowCoordinates(!showCoordinates);
    };
    const onShowScaleBarChanged = () => {
        setShowScaleBar(!showScaleBar);
    };
    const onShowDisclaimerChanged = () => {
        setShowDisclaimer(!showDisclaimer);
    };
    const onDpiChanged = (e: GenericEvent) => {
        setDpi(e.target.value);
    };
    const onAdvancedOptionsChanged = () => {
        setShowAdvanced(!showAdvanced);
    };
    const onScaleChanged = (e: GenericEvent) => {
        setScale(e.target.value);
    };
    const onPaperSizeChanged = (e: GenericEvent) => {
        setPaperSize(e.target.value);
    };
    const onOrientationChanged = (e: GenericEvent) => {
        setOrientation(e.target.value);
    };
    const onRotationChanged = (value: number) => {
        setRotation(value);
    };
    const onGeneratePlot = () => { };
    const updateBoxCoords = (box: string, normalizedBox: string): void => {
        setBox(box);
        setNormalizedBox(normalizedBox);
    };
    //Side-effect that emulates the old componentWillUnmount lifecyle method to tear down
    //the active map capturer
    React.useEffect(() => {
        return () => {
            //Tear down all active capture box layers
            const viewer = getViewer();
            if (viewer && mapNames) {
                for (const activeMapName of mapNames) {
                    const activeCapturer = getActiveCapturer(viewer, mapNames, activeMapName);
                    if (activeCapturer) {
                        debug(`De-activating map capturer for: ${activeMapName}`);
                        activeCapturer.deactivate();
                    }
                }
            }
        };
    }, []);
    //Although the dep array arg of React.useEffect() has effectively rendered the need to
    //track previous values obsolete, we still need to track the previous advanced flag to
    //verify that the flag is amongst the actual values in the dep array that has changed
    const prevShowAdvanced = usePrevious(showAdvanced);
    //Side-effect that toggles/updates associated map capturers
    React.useEffect(() => {
        if (activeMapName && mapNames) {
            if (showAdvanced != prevShowAdvanced) {
                toggleMapCapturerLayer(locale,
                    mapNames,
                    activeMapName,
                    showAdvanced,
                    paperSize,
                    orientation,
                    scale,
                    rotation,
                    updateBoxCoords,
                    setViewRotationEnabledAction,
                    setViewRotationAction);
            }
            if (showAdvanced) {
                const v = getViewer();
                if (v) {
                    const capturer = getActiveCapturer(v, mapNames, activeMapName);
                    if (capturer) {
                        const ppSize = getPrintSize(v, showAdvanced, paperSize, orientation);
                        debug(`Updating map capturer for: ${activeMapName}`);
                        capturer.updateBox(ppSize, parseFloat(scale), rotation);
                    }
                }
            }
        }
    }, [mapNames, activeMapName, showAdvanced, scale, paperSize, orientation, rotation, locale]);
    const viewer = getViewer();
    if (!viewer || !map || !view) {
        return <noscript />;
    }
    let hasExternalBaseLayers = false;
    if (externalBaseLayers) {
        hasExternalBaseLayers = externalBaseLayers.length > 0;
    }
    let normBox = normalizedBox;
    let theBox = box;
    if (!showAdvanced) {
        const extent = viewer.getCurrentExtent();
        theBox = `${extent[0]}, ${extent[1]}, ${extent[2]}, ${extent[1]}, ${extent[2]}, ${extent[3]}, ${extent[0]}, ${extent[3]}, ${extent[0]}, ${extent[1]}`;
        normBox = theBox;
    }
    let ppSize: string;
    let prSize: string;
    const tokens = paperSize.split(",");
    if (orientation === "L") {
        prSize = `${tokens[1]},${tokens[0]}`;
        ppSize = `${prSize},${tokens[2]}`;
    } else { // P
        prSize = `${tokens[0]},${tokens[1]}`;
        ppSize = `${prSize},${tokens[2]}`;
    }
    const url = `${getFusionRoot()}/widgets/QuickPlot/PlotAsPDF.php`
    return <div className="component-quick-plot">
        <form id="Form1" name="Form1" target="_blank" method="post" action={url}>
            <input type="hidden" id="printId" name="printId" value={`${Math.random() * 1000}`} />
            <div className="Title FixWidth">{xlate("QUICKPLOT_HEADER", locale)}</div>
            <label className="bp3-label">
                {xlate("QUICKPLOT_TITLE", locale)}
                <input type="text" className="bp3-input bp3-fill" dir="auto" name="{field:title}" id="title" maxLength={100} value={title} onChange={onTitleChanged} />
            </label>
            <label className="bp3-label">
                {xlate("QUICKPLOT_SUBTITLE", locale)}
                <input type="text" className="bp3-input bp3-fill" dir="auto" name="{field:sub_title}" id="subtitle" maxLength={100} value={subTitle} onChange={onSubTitleChanged} />
            </label>
            <label className="bp3-label">
                {xlate("QUICKPLOT_PAPER_SIZE", locale)}
                <div className="bp3-select bp3-fill">
                    {/*
                            The pre-defined paper size list. The value for each "option" item is in this format: [width,height]. The unit is in millimeter.
                            We can change the html code to add more paper size or remove some ones.
                        */}
                    <select className="FixWidth" id="paperSizeSelect" name="paperSizeSelect" value={paperSize} onChange={onPaperSizeChanged}>
                        <option value="210.0,297.0,A4">A4 (210x297 mm; 8.27x11.69 In) </option>
                        <option value="297.0,420.0,A3">A3 (297x420 mm; 11.69x16.54 In) </option>
                        <option value="148.0,210.0,A5">A5 (148x210 mm; 5.83x8.27 in) </option>
                        <option value="216.0,279.0,Letter">Letter (216x279 mm; 8.50x11.00 In) </option>
                        <option value="216.0,356.0,Legal">Legal (216x356 mm; 8.50x14.00 In) </option>
                    </select>
                </div>
            </label>
            <label className="bp3-label">
                {xlate("QUICKPLOT_ORIENTATION", locale)}
                {/*
                        The pre-defined paper orientations
                    */}
                <div className="bp3-select bp3-fill">
                    <select className="FixWidth" id="orientation" name="orientation" value={orientation} onChange={onOrientationChanged}>
                        <option value="P">{xlate("QUICKPLOT_ORIENTATION_P", locale)}</option>
                        <option value="L">{xlate("QUICKPLOT_ORIENTATION_L", locale)}</option>
                    </select>
                </div>
            </label>
            <input type="hidden" id="paperSize" name="paperSize" value={ppSize} />
            <input type="hidden" id="printSize" name="printSize" value={prSize} />
            <fieldset>
                <legend>{xlate("QUICKPLOT_SHOWELEMENTS", locale)}</legend>
                <label className="bp3-control bp3-checkbox">
                    <input type="checkbox" id="ShowLegendCheckBox" name="ShowLegend" checked={showLegend} onChange={onShowLegendChanged} />
                    <span className="bp3-control-indicator" />
                    {xlate("QUICKPLOT_SHOWLEGEND", locale)}
                </label>
                <label className="bp3-control bp3-checkbox">
                    <input type="checkbox" id="ShowNorthArrowCheckBox" name="ShowNorthArrow" checked={showNorthBar} onChange={onShowNorthArrowChanged} />
                    <span className="bp3-control-indicator" />
                    {xlate("QUICKPLOT_SHOWNORTHARROW", locale)}
                </label>
                <label className="bp3-control bp3-checkbox">
                    <input type="checkbox" id="ShowCoordinatesCheckBox" name="ShowCoordinates" checked={showCoordinates} onChange={onShowCoordinatesChanged} />
                    <span className="bp3-control-indicator" />
                    {xlate("QUICKPLOT_SHOWCOORDINTES", locale)}
                </label>
                <label className="bp3-control bp3-checkbox">
                    <input type="checkbox" id="ShowScaleBarCheckBox" name="ShowScaleBar" checked={showScaleBar} onChange={onShowScaleBarChanged} />
                    <span className="bp3-control-indicator" />
                    {xlate("QUICKPLOT_SHOWSCALEBAR", locale)}
                </label>
                <label className="bp3-control bp3-checkbox">
                    <input type="checkbox" id="ShowDisclaimerCheckBox" name="ShowDisclaimer" checked={showDisclaimer} onChange={onShowDisclaimerChanged} />
                    <span className="bp3-control-indicator" />
                    {xlate("QUICKPLOT_SHOWDISCLAIMER", locale)}
                </label>
            </fieldset>
            <div className="HPlaceholder5px"></div>
            <div>
                <label className="bp3-control bp3-checkbox">
                    <input type="checkbox" id="AdvancedOptionsCheckBox" onChange={onAdvancedOptionsChanged} />
                    <span className="bp3-control-indicator" />
                    {xlate("QUICKPLOT_ADVANCED_OPTIONS", locale)}
                </label>
            </div>
            {(() => {
                if (showAdvanced) {
                    return <div>
                        <label className="bp3-label">
                            {xlate("QUICKPLOT_SCALING", locale)}
                            {/*
                                    The pre-defined scales. The value for each "option" item is the scale denominator.
                                    We can change the html code to extend the pre-defined scales
                                */}
                            <div className="bp3-select bp3-fill">
                                <select className="FixWidth" id="scaleDenominator" name="scaleDenominator" value={scale} onChange={onScaleChanged}>
                                    <option value="500">1: 500</option>
                                    <option value="1000">1: 1000</option>
                                    <option value="2500">1: 2500</option>
                                    <option value="5000">1: 5000</option>
                                </select>
                            </div>
                        </label>
                        <label className="bp3-label">
                            {xlate("QUICKPLOT_DPI", locale)}
                            {/*
                                    The pre-defined print DPI.
                                    We can change the html code to extend the pre-defined values
                                */}
                            <div className="bp3-select bp3-fill">
                                <select className="FixWidth" id="dpi" name="dpi" value={dpi} onChange={onDpiChanged}>
                                    <option value="96">96</option>
                                    <option value="150">150</option>
                                    <option value="300">300</option>
                                    <option value="600">600</option>
                                </select>
                            </div>
                        </label>
                        <label className="bp3-label noselect">
                            {xlate("QUICKPLOT_BOX_ROTATION", locale)}
                            <div style={{ paddingLeft: 16, paddingRight: 16 }}>
                                <Slider min={0} max={360} labelStepSize={90} stepSize={1} value={rotation} onChange={onRotationChanged} />
                            </div>
                        </label>
                    </div>;
                } else {
                    return <div>
                        <input type="hidden" id="scaleDenominator" name="scaleDenominator" value={`${view.scale}`} />
                        <input type="hidden" id="dpi" name="dpi" value={dpi} />
                    </div>;
                }
            })()}
            <div className="HPlaceholder5px"></div>
            {(() => {
                if (hasExternalBaseLayers) {
                    return <Callout variant="primary" icon="info-sign">
                        {xlate("QUICKPLOT_COMMERCIAL_LAYER_WARNING", locale)}
                    </Callout>;
                }
            })()}
            <div className="ButtonContainer FixWidth">
                <Button type="submit" variant="primary" icon="print" onClick={onGeneratePlot}>{xlate("QUICKPLOT_GENERATE", locale)}</Button>
            </div>
            <input type="hidden" id="margin" name="margin" />
            <input type="hidden" id="normalizedBox" name="normalizedBox" value={normBox} />
            <input type="hidden" id="rotation" name="rotation" value={-(rotation || 0)} />
            <input type="hidden" id="sessionId" name="sessionId" value={map.SessionId} />
            <input type="hidden" id="mapName" name="mapName" value={map.Name} />
            <input type="hidden" id="box" name="box" value={theBox} />
            <input type="hidden" id="legalNotice" name="legalNotice" />
        </form>
    </div>;
}