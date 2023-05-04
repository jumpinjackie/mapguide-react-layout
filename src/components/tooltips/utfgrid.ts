import olOverlay from "ol/Overlay";
import olMap from "ol/Map";
import UTFGridSource from "ol/source/UTFGrid";
import { GenericEvent } from '../../api/common';
import { sanitize } from "dompurify";

export class UTFGridTrackingTooltip {
    private tooltip: olOverlay;
    private tooltipElement: HTMLElement;
    private text: string | null;
    constructor(private map: olMap,
        private gridSource: UTFGridSource,
        private isContextMenuOpen: () => boolean) {
        this.map.getViewport().addEventListener("mouseout", this.onMouseOut.bind(this));
        this.tooltipElement = document.createElement("div");
        this.tooltipElement.className = 'feature-tooltip';
        this.tooltip = new olOverlay({
            element: this.tooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        })
        this.map.addOverlay(this.tooltip);
        this.text = null;
    }
    public dispose() {
        this.tooltip.dispose();
    }
    public onMouseMove(e: GenericEvent) {
        if (this.isContextMenuOpen())
            return;
        //this.tooltip.setPosition(e.coordinate);
        const viewResolution = /** @type {number} */ (this.map.getView().getResolution());
        if (viewResolution) {
            this.gridSource.forDataAtCoordinateAndResolution(e.coordinate, viewResolution, (data) => {
                // If you want to use the template from the TileJSON,
                //  load the mustache.js library separately and call
                //
                //mapElement.style.cursor = data ? 'pointer' : '';
                if (data) {
                    var html = "";
                    if (data.MG_TOOLTIP)
                        html += sanitize(data.MG_TOOLTIP.replace(/(\\n)+/g, '<br />'));
                    if (data.MG_URL) {
                        html += "<br/><br/>";
                        html += "<strong>CTRL + Click for more information</strong>";
                    }
                    this.tooltipElement.innerHTML = html
                }
                this.tooltip.setPosition(data ? e.coordinate : undefined);
            });
        }
    }
    private onMouseOut() {

    }
    public setText(prompt: string) {
        this.text = prompt;
        this.tooltipElement.innerHTML = this.text;
    }
    public clear() {
        this.text = null;
        this.tooltipElement.innerHTML = "";
    }
    public destroy() {
        if (this.tooltipElement && this.tooltipElement.parentNode) {
            this.tooltipElement.parentNode.removeChild(this.tooltipElement);
        }
    }
}