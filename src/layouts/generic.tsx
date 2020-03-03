import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component"
import ViewerApiShim from '../containers/viewer-shim';
import ModalLauncher from '../containers/modal-launcher';
import FlyoutRegionContainer from '../containers/flyout-region';
import InitWarningDisplay from '../containers/init-warning-display';
import { useCommonTemplateState } from './hooks';

const GenericLayout = () => {
    const {
        locale,
        capabilities,
    } = useCommonTemplateState();
    return <div style={{ width: "100%", height: "100%" }}>
        <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
        <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />
        <ViewerApiShim />
        <ModalLauncher />
        <FlyoutRegionContainer />
        <InitWarningDisplay />
    </div>
};

export default GenericLayout;