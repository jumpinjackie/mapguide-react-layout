/**
 * map-viewer-swipe.tsx
 *
 * Provides the map swipe (layer compare) UI control. When swipe mode is active,
 * this component renders an interactive vertical slider that reveals two map layers
 * side by side for visual comparison.
 */

import * as React from "react";
import { useAppState, useReduxDispatch } from "./map-providers/context";
import { useMapProviderContext } from "./map-providers/context";
import { updateMapSwipePosition, setMapSwipeMode } from "../actions/map";
import { IMapSwipePair } from "../api/common";
import { tr } from "../api/i18n";

/**
 * Returns the swipe pair that involves the currently active map, if one exists.
 *
 * @since 0.15
 */
export function useActiveSwipePair(): IMapSwipePair | undefined {
    return useAppState(state => {
        const pairs = state.config.mapSwipePairs;
        const activeMapName = state.config.activeMapName;
        if (!pairs || !activeMapName) {
            return undefined;
        }
        return pairs.find(p => p.primaryMapName === activeMapName || p.secondaryMapName === activeMapName);
    });
}

/**
 * Returns the current swipe state from Redux.
 *
 * @hidden
 */
function useSwipeState() {
    return useAppState(state => ({
        active: state.config.swipeActive === true,
        position: state.config.swipePosition ?? 50,
        locale: state.config.locale
    }));
}

/**
 * The MapSwipeControl renders an interactive vertical slider that enables comparison
 * between two map layers. It is rendered as an absolute-positioned overlay on top
 * of the map viewer when map swipe mode is active.
 *
 * @remarks
 * The component automatically activates/deactivates the OL-level swipe when
 * the Redux swipe state changes. It also provides drag interaction to update
 * the swipe position.
 *
 * @example
 * ```tsx
 * // Typically used inside a MapViewer as a child component:
 * <MapSwipeControl />
 * ```
 *
 * @since 0.15
 */
export const MapSwipeControl: React.FC = () => {
    const dispatch = useReduxDispatch();
    const viewer = useMapProviderContext();
    const { active, position, locale } = useSwipeState();
    const swipePair = useActiveSwipePair();

    // Activate / deactivate the OL-level swipe when Redux state changes
    React.useEffect(() => {
        if (!viewer.isReady()) {
            return;
        }
        if (active && swipePair) {
            // Activate at the current Redux position
            viewer.activateMapSwipe(swipePair.secondaryMapName, position);
        } else {
            viewer.deactivateMapSwipe();
        }
        return () => {
            viewer.deactivateMapSwipe();
        };
        // We only re-run when the active flag or swipePair changes - position changes
        // are handled separately via updateSwipePosition
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, swipePair]);

    // Sync swipe position changes to the OL provider
    React.useEffect(() => {
        if (active && viewer.isReady()) {
            viewer.updateSwipePosition(position);
        }
    }, [active, position, viewer]);

    if (!active || !swipePair) {
        return null;
    }

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPosition = parseInt(e.target.value, 10);
        dispatch(updateMapSwipePosition(newPosition));
    };

    const handleClose = () => {
        dispatch(setMapSwipeMode(false));
    };

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
                zIndex: 10
            }}
        >
            {/* Vertical divider line */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: `${position}%`,
                    width: 3,
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: "0 0 4px rgba(0,0,0,0.5)",
                    pointerEvents: "none",
                    transform: "translateX(-50%)"
                }}
            />
            {/* Drag handle */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: `${position}%`,
                    transform: "translate(-50%, -50%)",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "ew-resize",
                    pointerEvents: "none",
                    userSelect: "none"
                }}
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 4L3 10L7 16M13 4L17 10L13 16" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            {/* Range slider (invisible but interactive) */}
            <input
                type="range"
                min={0}
                max={100}
                value={position}
                onChange={handleSliderChange}
                title={tr("MAP_SWIPE_SLIDER_TITLE", locale)}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "ew-resize",
                    pointerEvents: "all",
                    margin: 0,
                    WebkitAppearance: "none"
                }}
            />
            {/* Close button */}
            <button
                onClick={handleClose}
                title={tr("MAP_SWIPE_CLOSE", locale)}
                style={{
                    position: "absolute",
                    top: 8,
                    left: `${position}%`,
                    transform: "translateX(-50%)",
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(0,0,0,0.3)",
                    borderRadius: 4,
                    padding: "2px 8px",
                    cursor: "pointer",
                    fontSize: 12,
                    pointerEvents: "all",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                    whiteSpace: "nowrap"
                }}
            >
                ✕ {tr("MAP_SWIPE_CLOSE", locale)}
            </button>
        </div>
    );
};
