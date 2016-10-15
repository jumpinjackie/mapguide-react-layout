import * as React from "react";
import * as ReactDOM from "react-dom";
import FlyoutWrapper from "@aneves/react-flyout";
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
                    const items: any[] = flyout.childItems || [];
                    const align = "bottom right";
                    const open = !!flyout.open;
                    const containerStyle: React.CSSProperties = {};
                    if (flyout.metrics) {
                        const met: IDOMElementMetrics = flyout.metrics;
                        containerStyle.left = met.posX;
                        containerStyle.top = met.posY;
                    }
                    children.push(<div key={flyoutId} className="mg-flyout-menu-container" style={containerStyle}>
                        <FlyoutWrapper id={`flyout-${flyoutId}`} open={open} options={{ type: "dropdown", align: align }}>
                            <ul className="mg-flyout-menu-content">
                            {items.map((item, index) => {
                                if (item.isSeparator) {
                                    return <hr key={index} />;
                                } else {
                                    const invoked = () => {
                                        this.onChildInvoked(flyoutId);
                                    };
                                    return <FlyoutMenuChildItem key={index} item={item} onInvoked={invoked} />;
                                }
                            })}
                            {(() => {
                                if (flyoutId === "taskpane") {
                                    return <li><iframe src="about:blank" className="iframe-iehack-zindex" /></li>;
                                }
                            })()}
                            </ul>
                        </FlyoutWrapper>
                    </div>);
                }
                return children;
            })()}
        </div>;
    }
}