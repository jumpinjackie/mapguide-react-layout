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
                        if (flyout.metrics) {
                            const met: IDOMElementMetrics = flyout.metrics;
                            containerStyle.top = met.posY + met.height;
                            if (flyoutId == "taskpane") {
                                //containerStyle.left += met.width;
                                containerStyle.right = window.innerWidth - (met.posX + met.width);
                                containerStyle.zIndex = 150;
                            } else {
                                containerStyle.left = met.posX;
                            }
                        }
                        const invoked = () => {
                            this.onChildInvoked(flyoutId);
                        };
                        children.push(<div key={flyoutId} className="mg-flyout-menu-container" style={containerStyle}>
                            <MenuComponent items={items} onInvoked={invoked} />
                        </div>);
                    }
                }
                return children;
            })()}
        </div>;
    }
}