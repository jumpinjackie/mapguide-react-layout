import olMap from "ol/Map";
import olOverlay from "ol/Overlay";
import OverlayPositioning from 'ol/OverlayPositioning';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import { tr } from '../../api/i18n';

export class SelectedFeaturesTooltip {
    private map: olMap;
    private featureTooltipElement: HTMLElement;
    private featureTooltip: olOverlay;
    private enabled: boolean;
    private isMouseOverTooltip: boolean;
    constructor(map: olMap) {
        this.featureTooltipElement = document.createElement("div");
        this.featureTooltipElement.addEventListener("mouseover", () => this.isMouseOverTooltip = true);
        this.featureTooltipElement.addEventListener("mouseout", () => this.isMouseOverTooltip = false);
        this.featureTooltipElement.className = 'feature-tooltip';
        this.featureTooltip = new olOverlay({
            element: this.featureTooltipElement,
            offset: [15, 0],
            positioning: OverlayPositioning.CENTER_LEFT // "center-left" /* ol.OverlayPositioning.CENTER_LEFT */
        })
        this.map = map;
        this.map.addOverlay(this.featureTooltip);
        this.enabled = true;
        this.isMouseOverTooltip = false;
    }
    public isEnabled(): boolean {
        return this.enabled;
    }
    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        if (!this.enabled) {
            this.featureTooltipElement.innerHTML = "";
            this.featureTooltipElement.classList.add("tooltip-hidden");
        }
    }
    public hide() {
        this.featureTooltipElement.innerHTML = "";
        this.featureTooltipElement.classList.add("tooltip-hidden");
    }
    public showSelectedVectorFeatures(features: Collection<Feature>, pixel: [number, number], locale?: string) {
        const coords = this.map.getCoordinateFromPixel(pixel);
        if (features.getLength() > 0) {
            this.featureTooltip.setPosition(coords);
            let html = "";
            html += "<h3>" + tr("SEL_FEATURE_PROPERTIES", locale) + "</h3>";
            var table = "<table>";
            const feat = features.item(0);
            const f = feat.getProperties();
            let pc = 0;
            for (const key in f) {
                if (key == feat.getGeometryName()) {
                    continue;
                }
                table += "<tr>";
                table += "<td><strong>" + key + "</strong></td>";
                table += "<td>" + f[key] + "</td>";
                table += "</tr>";
                pc++;
            }
            table += "</table>";
            if (pc > 0) {
                html += table;
            } else {
                html += "<p>" + tr("SEL_FEATURE_PROPERTIES_NONE", locale) + "</p>";
            }
            this.featureTooltipElement.innerHTML = html;
            if (html == "") {
                this.featureTooltipElement.classList.add("tooltip-hidden");
            } else {
                this.featureTooltipElement.classList.remove("tooltip-hidden");
            }
        } else {
            this.featureTooltipElement.innerHTML = "";
            this.featureTooltipElement.classList.add("tooltip-hidden");
        }
    }
}