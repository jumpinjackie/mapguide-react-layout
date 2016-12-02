import * as React from "react";
import * as ReactDOM from "react-dom";
import { MenuComponent } from "./menu";
import { FlyoutMenuChildItem } from "./toolbar";
import { IDOMElementMetrics } from "../api/common";

export interface IFlyoutRegionProps {
    flyoutConf: any;
    onCloseFlyout: (id: string) => void;
}

export class FlyoutRegion extends React.Component<IFlyoutRegionProps, any> {
    constructor(props: IFlyoutRegionProps) {
        super(props);
        this.state = {};
    }
    private onChildInvoked(id: string) {
        this.props.onCloseFlyout(id);
    }
    render(): JSX.Element {
        return <div>
            {(() => {
                const children = [] as JSX.Element[];
                for (const flyoutId in this.props.flyoutConf) {
                    const flyout = this.props.flyoutConf[flyoutId];
                    const open = !!flyout.open;
                    if (open) {
                        const items: any[] = flyout.childItems || [];
                        let align = "bottom right";
                        if (flyoutId === "taskpane") {
                            align = "bottom left";
                        }
                        const containerStyle: React.CSSProperties = {};
                        containerStyle.zIndex = 2000; //This should be big enough to be above all possible UI elements
                        if (flyout.metrics) {
                            const met: IDOMElementMetrics = flyout.metrics;
                            if (flyout.metrics.vertical === true) {
                                containerStyle.top = met.posY;
                            } else {
                                containerStyle.top = met.posY + met.height;
                            }
                            if (flyoutId == "taskpane") {
                                containerStyle.right = window.innerWidth - (met.posX + met.width);
                            } else {
                                containerStyle.left = met.posX;
                                if (flyout.metrics.vertical === true) {
                                    containerStyle.left += met.width;
                                }
                            }
                        }
                        const invoked = () => {
                            this.onChildInvoked(flyoutId);
                        };
                        children.push(<div key={flyoutId} className="mg-flyout-menu-container" style={containerStyle}>
                            <MenuComponent items={items} onInvoked={invoked} />
                            {(() => {
                                if (flyoutId === "taskpane") {
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
}