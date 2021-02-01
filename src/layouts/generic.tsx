import * as React from "react";
import * as ReactDOM from "react-dom";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component"
import { ViewerApiShim } from '../containers/viewer-shim';
import { ModalLauncher } from '../containers/modal-launcher';
import { FlyoutRegionContainer } from '../containers/flyout-region';
import { InitWarningDisplay } from '../containers/init-warning-display';
import { useCommonTemplateState } from './hooks';
import { ButtonGroup, Button, Intent, Drawer, Position, Popover, PopoverInteractionKind, IPopoverProps, Card, Elevation } from '@blueprintjs/core';
import { useDispatch } from 'react-redux';
import { ICommand, ActiveMapTool } from '../api/common';
import { invokeCommand, setActiveTool } from '../actions/map';
import { getCommand, DefaultCommands } from '../api/registry/command';
import { useViewerActiveTool, useViewerLocale } from '../containers/hooks';
import { MapProviderContext } from '../components/map-providers/context';

interface IPrintViewProps {
    imageUrl: string;
}

const PrintView = (props: IPrintViewProps) => {
    return <img src={props.imageUrl} alt="Map Image" />;
}

const MapToolbar = () => {
    const context = React.useContext(MapProviderContext);
    const dispatch = useDispatch();
    const [isLayerManagerOpen, setIsLayerManagerOpen] = React.useState(false);
    const [isExportingImage, setIsExportingImage] = React.useState(false);
    const invokeCommandAction = (cmd: ICommand | undefined, parameters?: any) => {
        if (cmd) {
            dispatch(invokeCommand(cmd, parameters));
        }
    };
    const locale = useViewerLocale();
    const activeTool = useViewerActiveTool();
    const zoomIn = () => invokeCommandAction(getCommand(DefaultCommands.ZoomIn));
    const zoomOut = () => invokeCommandAction(getCommand(DefaultCommands.ZoomOut));
    const pan = () => dispatch(setActiveTool(ActiveMapTool.Pan));
    const zoomExtents = () => invokeCommandAction(getCommand(DefaultCommands.ZoomExtents));
    const select = () => dispatch(setActiveTool(ActiveMapTool.WmsQueryFeatures));
    const onToggleLayerManager = () => setIsLayerManagerOpen(!isLayerManagerOpen);
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
    return <>
        <ButtonGroup vertical style={{ position: "absolute", left: 30, top: 30 }}>
            <Button icon="plus" onClick={zoomIn} />
            <Button icon="minus" onClick={zoomOut} />
            <Button icon="hand" intent={activeTool == ActiveMapTool.Pan ? Intent.PRIMARY : Intent.NONE} onClick={pan} />
            <Button icon="zoom-to-fit" onClick={zoomExtents} />
            <Button icon="select" intent={activeTool == ActiveMapTool.WmsQueryFeatures ? Intent.PRIMARY : Intent.NONE} onClick={select} />
            <Button icon="layers" intent={isLayerManagerOpen ? Intent.PRIMARY : Intent.NONE} onClick={onToggleLayerManager} />
            <Popover usePortal={false} position="right" minimal={false}>
                <Button icon="cog" />
                <Card interactive={true} elevation={Elevation.TWO} style={{ minWidth: 200 }}>
                    <h5 className="bp3-heading"><a href="#">Active Base Layer</a></h5>
                    <PlaceholderComponent id={DefaultComponentNames.BaseMapSwitcher} locale={locale} />
                    <h5 className="bp3-heading"><a href="#">Current Map</a></h5>
                    <PlaceholderComponent id={DefaultComponentNames.MapMenu} locale={locale} />
                </Card>
            </Popover>
            <Button icon="print" onClick={onPrint} />
        </ButtonGroup>
        <Drawer size={Drawer.SIZE_SMALL} canOutsideClickClose={true} onClose={() => setIsLayerManagerOpen(false)} title="External Layer Manager" position={Position.LEFT} usePortal={false} isOpen={isLayerManagerOpen}>
            <div style={{ overflowY: "auto" }}>
                <PlaceholderComponent id={DefaultComponentNames.AddManageLayers} locale={locale} />
            </div>
        </Drawer>
    </>
}

export const GenericLayout = () => {
    const {
        locale,
    } = useCommonTemplateState();
    return <div style={{ width: "100%", height: "100%" }}>
        <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} componentProps={{ children: <MapToolbar /> }} />
        <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />
        <ViewerApiShim />
        <ModalLauncher />
        <FlyoutRegionContainer />
        <InitWarningDisplay />
    </div>
};