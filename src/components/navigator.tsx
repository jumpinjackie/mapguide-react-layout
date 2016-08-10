import * as React from "react";

interface INavigatorProps extends React.Props<any> {
    style?: React.CSSProperties
}

export class Navigator extends React.Component<INavigatorProps, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        return <div id="Navigator" style={this.props.style}>
            <map name="Navigator_ImageMap" id="Navigator_ImageMap">
                <area shape="poly" alt="Pan East" title="Pan East" coords="27,176, 27,177, 40,190, 44,182, 44,159" />
                <area shape="poly" alt="Pan West" title="Pan West" coords="24,177, 24,176, 7,159, 7,182, 11,190" />
                <area shape="poly" alt="Pan South" title="Pan South" coords="25,178, 12,191, 21,197, 30,197, 39,191, 26,178" />
                <area shape="poly" alt="Pan North" title="Pan North" coords="26,175, 43,158, 8,158, 25,175" />
                <area shape="circle" alt="Zoom Out" title="Zoom Out" coords="25,142,8" />
                <area shape="circle" alt="Zoom In" title="Zoom In" coords="25,34,8" />
            </map>
            <img src="stdicons/sliderscale.png" class="png24" width="51" height="201" usemap="#Navigator_ImageMap" style={{ position: "absolute", left: 0, top: 0 }} />
            <div style={{ position: "absolute", top: 6, left: 6, width: 39, height: 16 }}>
                <img src="stdicons/spinner.gif" width="18" height="6" style={{ position: "absolute", top: 3, right: 4, visibility: "hidden" }} />
            </div>
            <div style={{ position: "absolute", top: 44, left: 0, width: 51, height: 85 }}>
                <img src="stdicons/slider.png" class="png24" width="29" height="12" style={{ position: "relative", left: 11, top: 28 }} />
            </div>
        </div>;
    }
}