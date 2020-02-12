import PluggableMap from 'ol/PluggableMap';

/**
 * Sets up key dependencies needed by the viewer
 *
 * @export
 */
export function bootstrap() {

    PluggableMap.prototype.handleMapBrowserEvent = function (mapBrowserEvent: any) {
        if (!this.frameState_) {
            // With no view defined, we cannot translate pixels into geographical
            // coordinates so interactions cannot be used.
            return;
        }
        var target = /** @type {Node} */ (mapBrowserEvent.originalEvent.target);
        if (!mapBrowserEvent.dragging) {
            // <========= Patch is here ==========> //
            if (!this.viewport_.contains(target)) {
                // Abort if the event target is a child of the container that doesn't allow
                // event propagation or is no longer in the page. It's possible for the target to no longer
                // be in the page if it has been removed in an event listener, this might happen in a Control
                // that recreates it's content based on user interaction either manually or via a render
                // in something like https://reactjs.org/
                return;
            }
        }
        mapBrowserEvent.frameState = this.frameState_;
        var interactionsArray = this.getInteractions().getArray();
        if (this.dispatchEvent(mapBrowserEvent) !== false) {
            for (var i = interactionsArray.length - 1; i >= 0; i--) {
                var interaction = interactionsArray[i];
                if (!interaction.getActive()) {
                    continue;
                }
                var cont = interaction.handleEvent(mapBrowserEvent);
                if (!cont) {
                    break;
                }
            }
        }
    };
}