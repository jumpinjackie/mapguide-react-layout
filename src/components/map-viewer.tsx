import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ol from "openlayers";

export interface IMapViewerProps {
    size?: { width: number, height: number };
}

export class MapViewer extends React.Component<IMapViewerProps, any> {
    private _map: ol.Map;
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        this._map = new ol.Map({
            target: el,
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: [0, 0],
                zoom: 2
            })
        });
    }
    componentWillUnmount() {
        
    }
    render(): JSX.Element {
        const { size } = this.props;
        const style: any = {};
        if (size != null) {
            style.width = size.width;
            style.height = size.height;
        } else {
            style.width = "100%";
            style.height = "100%";
        }
        return <div style={style}></div>;
    }
}