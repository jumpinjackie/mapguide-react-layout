import PointerInteraction from "ol/interaction/Pointer";
import MapBrowserEventType from "ol/MapBrowserEventType";

/**
 * Sets up key dependencies needed by the viewer
 *
 * @export
 */
export function bootstrap() {
    //HACK: Monkey-patch the handleEvent method with the proper fix for this:
    // https://github.com/openlayers/openlayers/issues/10232
    //
    //Remove this patch once OL 6.1.2 or newer is available
    PointerInteraction.prototype.handleEvent = function (mapBrowserEvent: any) {
        if (!( /** @type {import("../MapBrowserPointerEvent.js").default} */(mapBrowserEvent).pointerEvent)) {
            return true;
        }
        var stopEvent = false;
        this.updateTrackedPointers_(mapBrowserEvent);
        if (this.handlingDownUpSequence) {
            if (mapBrowserEvent.type == MapBrowserEventType.POINTERDRAG) {
                this.handleDragEvent(mapBrowserEvent);
            }
            else if (mapBrowserEvent.type == MapBrowserEventType.POINTERUP) {
                var handledUp = this.handleUpEvent(mapBrowserEvent);
                this.handlingDownUpSequence = handledUp && this.targetPointers.length > 0;
            }
        }
        else {
            if (mapBrowserEvent.type == MapBrowserEventType.POINTERDOWN) {
                var handled = this.handleDownEvent(mapBrowserEvent);
                //=== This is the fix in question === //
                //if (handled) {
                //    mapBrowserEvent.preventDefault();
                //}
                this.handlingDownUpSequence = handled;
                stopEvent = this.stopDown(handled);
            }
            else if (mapBrowserEvent.type == MapBrowserEventType.POINTERMOVE) {
                this.handleMoveEvent(mapBrowserEvent);
            }
        }
        return !stopEvent;
    };
}