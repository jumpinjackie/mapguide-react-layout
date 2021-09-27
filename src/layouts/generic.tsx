import * as React from "react";
import * as ReactDOM from "react-dom";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component"
import { ViewerApiShim } from '../containers/viewer-shim';
import { ModalLauncher } from '../containers/modal-launcher';
import { FlyoutRegionContainer } from '../containers/flyout-region';
import { InitWarningDisplay } from '../containers/init-warning-display';
import { ButtonGroup, Button, Intent, Drawer, Position, Popover, Card, Elevation, DrawerSize } from '@blueprintjs/core';
import { ICommand, ActiveMapTool } from '../api/common';
import { invokeCommand, setActiveTool, setFeatureTooltipsEnabled } from '../actions/map';
import { getCommand, DefaultCommands } from '../api/registry/command';
import { useReducedToolbarAppState, useViewerActiveTool, useViewerLocale } from '../containers/hooks';
import { useMapProviderContext, useReduxDispatch } from '../components/map-providers/context';
import { useActiveMapState } from "../containers/hooks-mapguide";
import { tr } from "../api/i18n";
import { RuntimeMap } from "../api/contracts/runtime-map";
import { useCommonTemplateState } from "./hooks";

interface IPrintViewProps {
    imageUrl: string;
}

const PrintView = (props: IPrintViewProps) => {
    return <img src={props.imageUrl} alt="Map Image" />;
}

type MapToolbarProps = {
    locale: string;
    featureTooltipsEnabled: boolean;
    hasSelection: boolean;
    map: RuntimeMap | undefined;
    activeTool: ActiveMapTool;
    isLayerManagerOpen: boolean;
    setIsLayerManagerOpen: (f: boolean) => void;
    setIsLegendOpen: (f: boolean) => void;
    setIsSelectionPanelOpen: (f: boolean) => void;
    onInvokeCommand: (name: string) => void;
    onSetActiveTool: (tool: ActiveMapTool) => void;
    onSetFeatureTooltips: (enabled: boolean) => void;
    onPrint: () => void;
};

const MapToolbar: React.FC<MapToolbarProps> = (props) => {
    const { locale, featureTooltipsEnabled, hasSelection, map, onPrint, onInvokeCommand, onSetActiveTool, activeTool, isLayerManagerOpen, setIsLayerManagerOpen, setIsLegendOpen, setIsSelectionPanelOpen, onSetFeatureTooltips } = props;
    return <>
        <ButtonGroup vertical style={{ position: "absolute", left: 30, top: 30 }}>
            <Button icon="plus" title={tr("NAVIGATOR_ZOOM_IN")} onClick={() => onInvokeCommand(DefaultCommands.ZoomIn)} />
            <Button icon="minus" title={tr("NAVIGATOR_ZOOM_OUT")} onClick={() => onInvokeCommand(DefaultCommands.ZoomOut)} />
            <Button icon="hand" intent={activeTool == ActiveMapTool.Pan ? Intent.PRIMARY : Intent.NONE} onClick={() => onInvokeCommand(DefaultCommands.Pan)} />
            <Button icon="zoom-to-fit" title={tr("LAYER_MANAGER_TT_ZOOM_EXTENTS")} onClick={() => onInvokeCommand(DefaultCommands.ZoomExtents)} />
            <Button icon="select" intent={activeTool == ActiveMapTool.Select ? Intent.PRIMARY : Intent.NONE} onClick={() => onSetActiveTool(ActiveMapTool.Select)} />
            <Button icon="layers" title={tr("MANAGE_LAYERS", locale)} intent={isLayerManagerOpen ? Intent.PRIMARY : Intent.NONE} onClick={() => setIsLayerManagerOpen(!isLayerManagerOpen)} />
            {map && <Button icon="comment" title={tr("FEATURE_TOOLTIPS", locale)} intent={featureTooltipsEnabled ? Intent.PRIMARY : Intent.NONE} onClick={() => onSetFeatureTooltips(!featureTooltipsEnabled)} />}
            <Button icon="th" intent={hasSelection ? Intent.SUCCESS : Intent.NONE} title={tr("TPL_TITLE_SELECTION_PANEL", locale)} onClick={() => setIsSelectionPanelOpen(true)} />
            {map && <Button icon="properties" title={tr("TPL_TITLE_LEGEND", locale)} onClick={() => setIsLegendOpen(true)} />}
            <Popover usePortal={false} position="right" minimal={false}>
                <Button icon="map" />
                <Card interactive={true} elevation={Elevation.TWO} style={{ minWidth: 200 }}>
                    <h5 className="bp3-heading"><a href="#">Active Base Layer</a></h5>
                    <PlaceholderComponent id={DefaultComponentNames.BaseMapSwitcher} locale={locale} />
                    <h5 className="bp3-heading"><a href="#">Current Map</a></h5>
                    <PlaceholderComponent id={DefaultComponentNames.MapMenu} locale={locale} />
                </Card>
            </Popover>
            <Popover usePortal={false} position="right" minimal={false}>
                <Button icon="cog" title={tr("VIEWER_OPTIONS", locale)} />
                <PlaceholderComponent id={DefaultComponentNames.ViewerOptions} />
            </Popover>
            <Button icon="print" onClick={onPrint} />
        </ButtonGroup>
    </>
}

export const GenericLayout = () => {
    const [isLayerManagerOpen, setIsLayerManagerOpen] = React.useState(false);
    const [isLegendOpen, setIsLegendOpen] = React.useState(false);
    const [isSelectionPanelOpen, setIsSelectionPanelOpen] = React.useState(false);
    const [isExportingImage, setIsExportingImage] = React.useState(false);
    const {
        locale,
        dispatch
    } = useCommonTemplateState();
    const context = useMapProviderContext();
    const map = useActiveMapState();
    const tbState = useReducedToolbarAppState();
    //console.log("tbState", tbState.hasClientSelection, tbState.hasSelection);
    const activeTool = useViewerActiveTool();
    const onInvokeCommand = (name: string) => {
        const cmd = getCommand(name);
        if (cmd) {
            dispatch(invokeCommand(cmd));
        }
    };
    const onSetActiveTool = (tool: ActiveMapTool) => {
        dispatch(setActiveTool(ActiveMapTool.Select));
    };
    const onPrint = () => {
        setIsExportingImage(true);
        context.exportImage({
            callback: (image) => {
                setIsExportingImage(false);
                const el = <PrintView imageUrl={image} />;
                const printWindow = window.open();
                if (printWindow) {
                    // Open and immediately close the document. This works around a problem in Firefox that is
                    // captured here: https://bugzilla.mozilla.org/show_bug.cgi?id=667227.
                    // Essentially, when we first create an iframe, it has no document loaded and asynchronously
                    // starts a load of "about:blank". If we access the document object and start manipulating it
                    // before that async load completes, a new document will be automatically created. But then
                    // when the async load completes, the original, automatically-created document gets unloaded
                    // and the new "about:blank" gets swapped in. End result: everything we add to the DOM before
                    // the async load complete gets lost and Firefox ends up printing a blank page.
                    // Explicitly opening and then closing a new document _seems_ to avoid this.
                    printWindow.document.open();
                    printWindow.document.close();

                    printWindow.document.head.innerHTML = `
                            <meta charset="UTF-8">
                            <title>Print View</title>
                            `;
                    printWindow.document.body.innerHTML = '<div id="print"></div>';
                    ReactDOM.render(el, printWindow.document.getElementById("print"));
                }
            }
        });
    };
    const onSetFeatureTooltips = (flag: boolean) => {
        dispatch(setFeatureTooltipsEnabled(flag));
    };
    return <div style={{ width: "100%", height: "100%" }}>
        <ModalLauncher />
        <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
        <MapToolbar
            locale={locale}
            featureTooltipsEnabled={tbState.featureTooltipsEnabled}
            hasSelection={tbState.hasClientSelection || tbState.hasSelection}
            map={map}
            activeTool={activeTool}
            isLayerManagerOpen={isLayerManagerOpen}
            setIsLegendOpen={f => setIsLegendOpen(f)}
            setIsSelectionPanelOpen={f => setIsSelectionPanelOpen(f)}
            setIsLayerManagerOpen={f => setIsLayerManagerOpen(f)}
            onInvokeCommand={onInvokeCommand}
            onSetActiveTool={onSetActiveTool}
            onSetFeatureTooltips={onSetFeatureTooltips}
            onPrint={onPrint} />
        <Drawer icon="layers" size={DrawerSize.SMALL} canOutsideClickClose={true} onClose={() => setIsLayerManagerOpen(false)} title={tr("MANAGE_LAYERS", locale)} position={Position.LEFT} usePortal={false} isOpen={isLayerManagerOpen}>
            <div style={{ overflowY: "auto" }}>
                <PlaceholderComponent id={DefaultComponentNames.AddManageLayers} locale={locale} />
            </div>
        </Drawer>
        <Drawer icon="properties" size={DrawerSize.SMALL} canOutsideClickClose={true} onClose={() => setIsLegendOpen(false)} title={tr("TPL_TITLE_LEGEND", locale)} position={Position.LEFT} usePortal={false} isOpen={isLegendOpen}>
            <div style={{ overflowY: "auto" }}>
                <PlaceholderComponent id={DefaultComponentNames.Legend} locale={locale} />
            </div>
        </Drawer>
        <Drawer icon="th" size={DrawerSize.SMALL} canOutsideClickClose={true} onClose={() => setIsSelectionPanelOpen(false)} title={tr("TPL_TITLE_SELECTION_PANEL", locale)} position={Position.LEFT} usePortal={false} isOpen={isSelectionPanelOpen}>
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
                <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} locale={locale} />
            </div>
        </Drawer>
        <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />
        <ViewerApiShim />
        <FlyoutRegionContainer />
        <InitWarningDisplay />
        <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
    </div>
};