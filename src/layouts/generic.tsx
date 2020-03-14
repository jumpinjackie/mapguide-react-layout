import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component"
import ViewerApiShim from '../containers/viewer-shim';
import ModalLauncher from '../containers/modal-launcher';
import FlyoutRegionContainer from '../containers/flyout-region';
import InitWarningDisplay from '../containers/init-warning-display';
import { useCommonTemplateState } from './hooks';
import { ButtonGroup, Button, Intent, Drawer, Position, Popover, PopoverInteractionKind, IPopoverProps, Card, Elevation } from '@blueprintjs/core';
import { useDispatch } from 'react-redux';
import { ICommand, ActiveMapTool } from '../api/common';
import { invokeCommand, setActiveTool } from '../actions/map';
import { getCommand, DefaultCommands } from '../api/registry/command';
import { useViewerActiveTool } from '../containers/hooks';

const GenericLayout = () => {
    const {
        locale,
    } = useCommonTemplateState();
    const dispatch = useDispatch();
    const activeTool = useViewerActiveTool();
    const [isLayerManagerOpen, setIsLayerManagerOpen] = React.useState(false);
    const invokeCommandAction = (cmd: ICommand | undefined, parameters?: any) => {
        if (cmd) {
            dispatch(invokeCommand(cmd, parameters));
        }
    };
    const zoomIn = () => invokeCommandAction(getCommand(DefaultCommands.ZoomIn));
    const zoomOut = () => invokeCommandAction(getCommand(DefaultCommands.ZoomOut));
    const pan = () => dispatch(setActiveTool(ActiveMapTool.Pan));
    const zoomExtents = () => invokeCommandAction(getCommand(DefaultCommands.ZoomExtents));
    const select = () => dispatch(setActiveTool(ActiveMapTool.WmsQueryFeatures));
    const onToggleLayerManager = () => setIsLayerManagerOpen(!isLayerManagerOpen);
    return <div style={{ width: "100%", height: "100%" }}>
        <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
        <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />
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
        </ButtonGroup>
        <ViewerApiShim />
        <Drawer size={Drawer.SIZE_SMALL} canOutsideClickClose={true} onClose={() => setIsLayerManagerOpen(false)} title="External Layer Manager" position={Position.LEFT} usePortal={false} isOpen={isLayerManagerOpen}>
            <PlaceholderComponent id={DefaultComponentNames.AddManageLayers} locale={locale} />
        </Drawer>
        <ModalLauncher />
        <FlyoutRegionContainer />
        <InitWarningDisplay />
    </div>
};

export default GenericLayout;