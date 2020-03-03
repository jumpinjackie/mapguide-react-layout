import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component"
import ViewerApiShim from '../containers/viewer-shim';
import ModalLauncher from '../containers/modal-launcher';
import FlyoutRegionContainer from '../containers/flyout-region';
import InitWarningDisplay from '../containers/init-warning-display';
import { useCommonTemplateState } from './hooks';
import { ButtonGroup, Button, Intent } from '@blueprintjs/core';
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
    const invokeCommandAction = (cmd: ICommand | undefined, parameters?: any) => {
        if (cmd) {
            dispatch(invokeCommand(cmd, parameters));
        }
    };
    const zoomIn = () => invokeCommandAction(getCommand(DefaultCommands.ZoomIn));
    const zoomOut = () => invokeCommandAction(getCommand(DefaultCommands.ZoomOut));
    const zoomExtents = () => invokeCommandAction(getCommand(DefaultCommands.ZoomExtents));
    const select = () => dispatch(setActiveTool(ActiveMapTool.WmsQueryFeatures));
    return <div style={{ width: "100%", height: "100%" }}>
        <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
        <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />
        <ButtonGroup vertical style={{ position: "absolute", left: 30, top: 30 }}>
            <Button icon="plus" onClick={zoomIn} />
            <Button icon="minus" onClick={zoomOut} />
            <Button icon="zoom-to-fit" onClick={zoomExtents} />
            <Button icon="select" intent={activeTool == ActiveMapTool.WmsQueryFeatures ? Intent.PRIMARY : Intent.NONE} onClick={select} />
        </ButtonGroup>
        <ViewerApiShim />
        <ModalLauncher />
        <FlyoutRegionContainer />
        <InitWarningDisplay />
    </div>
};

export default GenericLayout;