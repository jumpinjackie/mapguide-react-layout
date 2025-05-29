import { Tab, Tabs } from "@blueprintjs/core";
import { TabSetProps } from "../../element-context";
import React from "react";

export const BpTabSet: React.FC<TabSetProps> = (props) => {
    const { id, className, onTabChanged, tabs, activeTabId } = props;
    return <Tabs className={className} id={id} onChange={tabId => onTabChanged?.(tabId)} selectedTabId={activeTabId}>
        {tabs.map(tab => <Tab key={`bp-tab-${tab.id}`} id={tab.id} title={tab.title} panel={tab.content} />)}
    </Tabs>
}