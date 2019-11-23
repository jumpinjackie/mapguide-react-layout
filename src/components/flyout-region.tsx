import * as React from "react";
import * as Constants from "../constants";
import { MenuComponent } from "./menu";
import { IDOMElementMetrics } from "../api/common";
import { PlaceholderComponent } from "../api/registry/component";
import { IItem } from "../components/toolbar";

export interface IFlyoutConfiguration {
    open?: boolean;
    childItems?: IItem[];
    metrics?: IDOMElementMetrics;
    componentName?: string;
    componentProps?: any;
}

export interface IFlyoutConfigurationSet {
    [flyoutId: string]: IFlyoutConfiguration;
}

/**
 * FlyoutRegion component props
 *
 * @export
 * @interface IFlyoutRegionProps
 */
export interface IFlyoutRegionProps {
    flyoutConf: IFlyoutConfigurationSet;
    locale: string;
    onCloseFlyout: (id: string) => void;
}

/**
 * A FlyoutRegion component defines a region where flyout menus can be displayed
 *
 * @export
 * @class FlyoutRegion
 * @extends {React.Component<IFlyoutRegionProps, any>}
 */
export const FlyoutRegion = (props: IFlyoutRegionProps) => {
    return <div>
        {(() => {
            const children = [] as JSX.Element[];
            for (const flyoutId in props.flyoutConf) {
                const flyout = props.flyoutConf[flyoutId];
                const open = !!flyout.open;
                if (open) {
                    const items = flyout.childItems || [];
                    const containerStyle: React.CSSProperties = {};
                    containerStyle.zIndex = 2000; //This should be big enough to be above all possible UI elements
                    if (flyout.metrics) {
                        const met = flyout.metrics;
                        if (flyoutId == Constants.WEBLAYOUT_CONTEXTMENU) {
                            // TODO: Refine the layout positioning so that it better behaves like it did
                            // previously when the blueprint context menu worked (ie. If right-clicking near
                            // the bottom, the menu should be shown "above" the cursor)
                            containerStyle.top = met.posY - 40;
                            containerStyle.left = met.posX + 20;
                        } else {
                            if (flyout.metrics.vertical === true) {
                                containerStyle.top = met.posY;
                            } else {
                                containerStyle.top = met.posY + met.height;
                            }
                            if (flyoutId == Constants.WEBLAYOUT_TASKMENU) {
                                containerStyle.right = window.innerWidth - (met.posX + met.width);
                            } else {
                                containerStyle.left = met.posX;
                                if (flyout.metrics.vertical === true) {
                                    containerStyle.left += met.width;
                                }
                            }
                        }
                    }
                    const invoked = () => {
                        props.onCloseFlyout(flyoutId);
                    };
                    let className = "mg-flyout-menu-container";
                    if (flyout.componentName) {
                        className = "mg-flyout-component-container";
                    }

                    children.push(<div key={flyoutId} className={className} style={containerStyle}>
                        {(() => {
                            if (flyout.componentName) {
                                return <PlaceholderComponent id={flyout.componentName} componentProps={flyout.componentProps} locale={props.locale} />;
                            } else {
                                return <MenuComponent items={items} onInvoked={invoked} />;
                            }
                        })()}
                        {(() => {
                            if (flyoutId === Constants.WEBLAYOUT_TASKMENU) {
                                //HACK: In order for this flyout to show properly over the task pane iframe
                                //when it contains embedded content (eg. An ActiveX/Flash/etc control) in IE
                                //we have to stick an iframe into this flyout
                                return <iframe src="about:blank" className="iframe-iehack-zindex" />;
                            }
                        })()}
                    </div>);
                }
            }
            return children;
        })()}
    </div>;
}