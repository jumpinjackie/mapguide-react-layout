import olOverlay from "ol/Overlay";
import olMap from "ol/Map";
import OverlayPositioning from 'ol/OverlayPositioning';
import { GenericEvent } from '../../api/common';

const HIDDEN_CLASS_NAME = "tooltip-hidden";

export class MouseTrackingTooltip {
    private tooltip: olOverlay;
    private tooltipElement: HTMLElement;
    private map: olMap;
    private text: string | null;
    private isContextMenuOpen: () => boolean;
    constructor(map: olMap, contextMenuTest: () => boolean) {
        this.map = map;
        this.isContextMenuOpen = contextMenuTest;
        this.map.getViewport().addEventListener("mouseout", this.onMouseOut.bind(this));
        this.tooltipElement = document.createElement("div");
        this.tooltipElement.className = 'tooltip';
        this.tooltip = new olOverlay({
            element: this.tooltipElement,
            offset: [15, 0],
            positioning: OverlayPositioning.CENTER_LEFT
        })
        this.map.addOverlay(this.tooltip);
        this.text = null;
        this.tooltipElement.classList.add(HIDDEN_CLASS_NAME);
    }
    public dispose() {
        this.tooltip.dispose();
    }
    public onMouseMove(e: GenericEvent) {
        if (this.isContextMenuOpen())
            return;
        this.tooltip.setPosition(e.coordinate);
        if (this.text)
            this.tooltipElement.classList.remove(HIDDEN_CLASS_NAME);
        else
            this.tooltipElement.classList.add(HIDDEN_CLASS_NAME);
    }
    private onMouseOut() {
        this.tooltipElement.classList.add(HIDDEN_CLASS_NAME);
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