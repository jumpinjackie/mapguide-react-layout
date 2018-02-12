import * as React from "react";
import { tr } from "../../api/i18n";
import { GenericEvent, GenericEventHandler } from "../../api/common";
import { AddWmsLayer } from "./add-wms-layer";

export interface IAddLayerProps {
    locale: string | undefined;
}

export interface IAddLayerState {
    selectedType: string;
}

interface AddLayerConf {
    label: string;
    content: (locale: string | undefined) => JSX.Element;
}

const ADD_LAYER_TYPES: { [key: string]: AddLayerConf } = {
    "WMS": {
        label: "WMS",
        content: (locale: string | undefined) => <AddWmsLayer locale={locale} />
    }
};

export class AddLayer extends React.Component<IAddLayerProps, Partial<IAddLayerState>> {
    constructor(props: IAddLayerProps) {
        super(props);
        this.state = {};
    }
    private onLayerTypeChanged = (e: GenericEvent) => {
        this.setState({ selectedType: e.target.value });
    }
    render(): JSX.Element {
        const { locale } = this.props;
        const { selectedType } = this.state;
        const items = Object.keys(ADD_LAYER_TYPES).map(lt => ({ value: lt, label: ADD_LAYER_TYPES[lt].label }))
        return <div>
            <label className="pt-label .modifier">
                {tr("LAYER_TYPE", locale)}
                <div className="pt-select">
                    <select value={selectedType || ""} onChange={this.onLayerTypeChanged}>
                        <option>{tr("SELECT_LAYER_TYPE", locale)}</option>
                        {items.map(it => <option key={it.value} value={it.value}>{it.value}</option>)}
                    </select>
                </div>
            </label>
            {(() => {
                if (selectedType && ADD_LAYER_TYPES[selectedType]) {
                    return ADD_LAYER_TYPES[selectedType].content(locale);
                }
            })()}
        </div>;
    }
}