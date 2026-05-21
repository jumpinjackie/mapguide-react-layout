/**
 * Comparison overlay controls and hooks.
 */

import * as React from "react";
import { setComparisonMode, setSpyCursorRadius, setSwipePosition } from "../actions/map";
import type { ComparisonMode, IComparisonPair } from "../api/common";
import { tr } from "../api/i18n";
import { useAppState, useMapProviderContext, useReduxDispatch } from "./map-providers/context";

export const DEFAULT_SWIPE_POSITION = 50;
export const DEFAULT_SPY_CURSOR_RADIUS = 75;
export const MIN_SPY_CURSOR_RADIUS = 25;
export const MAX_SPY_CURSOR_RADIUS = 150;
export const SPY_CURSOR_RADIUS_STEP = 5;

export interface IMapComparisonInfo {
    pair: IComparisonPair;
    isComparisonPrimary: boolean;
}

type ISpyCursorState = {
    pixel: [number, number];
    visible: boolean;
}

function clampSpyCursorRadius(radius: number) {
    return Math.max(MIN_SPY_CURSOR_RADIUS, Math.min(MAX_SPY_CURSOR_RADIUS, radius));
}

export function useMapComparisonInfo(): IMapComparisonInfo | undefined {
    const pairs = useAppState(state => state.config.comparisonPairs ?? state.config.mapSwipePairs);
    const activeMapName = useAppState(state => state.config.activeMapName);

    return React.useMemo(() => {
        if (!pairs || !activeMapName) {
            return undefined;
        }
        const pair = pairs.find(p => p.primaryMapName === activeMapName || p.secondaryMapName === activeMapName);
        if (!pair) {
            return undefined;
        }
        return {
            pair,
            isComparisonPrimary: pair.primaryMapName === activeMapName
        };
    }, [pairs, activeMapName]);
}

export function useComparisonMode(): ComparisonMode {
    return useAppState(state => {
        if (state.config.comparisonMode) {
            return state.config.comparisonMode;
        }
        return state.config.swipeActive ? "swipe" : "none";
    });
}

export function useIsComparisonActive(): boolean {
    return useComparisonMode() !== "none";
}

function useComparisonState() {
    const mode = useComparisonMode();
    const swipePosition = useAppState(state => state.config.swipePosition);
    const spyCursorRadius = useAppState(state => state.config.spyCursorRadius);
    const locale = useAppState(state => state.config.locale);

    return {
        mode,
        swipePosition: swipePosition ?? DEFAULT_SWIPE_POSITION,
        spyCursorRadius: spyCursorRadius ?? DEFAULT_SPY_CURSOR_RADIUS,
        locale
    };
}

function ComparisonLabels({ pair, locale }: { pair: IComparisonPair; locale: string; }) {
    return <>
        <div
            style={{
                position: "absolute",
                top: 8,
                left: 8,
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: 4,
                padding: "2px 8px",
                fontSize: 12,
                fontWeight: "bold",
                pointerEvents: "none",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                whiteSpace: "nowrap",
                zIndex: 12
            }}
        >
            {pair.primaryLabel ?? tr("MAP_SWIPE_PRIMARY_LABEL", locale)}
        </div>
        <div
            style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: 4,
                padding: "2px 8px",
                fontSize: 12,
                fontWeight: "bold",
                pointerEvents: "none",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                whiteSpace: "nowrap",
                zIndex: 12
            }}
        >
            {pair.secondaryLabel ?? tr("MAP_SWIPE_SECONDARY_LABEL", locale)}
        </div>
    </>;
}

export const MapComparisonControl: React.FC = () => {
    const dispatch = useReduxDispatch();
    const viewer = useMapProviderContext();
    const comparisonInfo = useMapComparisonInfo();
    const { mode, swipePosition, spyCursorRadius, locale } = useComparisonState();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [spyCursor, setSpyCursor] = React.useState<ISpyCursorState | undefined>(undefined);

    React.useEffect(() => {
        if (!viewer.isReady()) {
            return;
        }
        if (!comparisonInfo?.pair || mode === "none") {
            viewer.deactivateMapComparison();
            return () => {
                viewer.deactivateMapComparison();
            };
        }

        const secondaryMapName = comparisonInfo.pair.secondaryMapName;
        const activated = mode === "swipe"
            ? viewer.activateMapComparisonSwipe(secondaryMapName, swipePosition)
            : viewer.activateMapComparisonSpy(secondaryMapName, spyCursorRadius);
        if (!activated) {
            dispatch(setComparisonMode("none"));
        }
        return () => {
            viewer.deactivateMapComparison();
        };
    }, [comparisonInfo, dispatch, mode, spyCursorRadius, swipePosition, viewer]);

    React.useEffect(() => {
        if (!viewer.isReady()) {
            return;
        }
        if (mode === "swipe") {
            viewer.updateComparisonSwipePosition(swipePosition);
        } else if (mode === "spy") {
            viewer.updateSpyCursorRadius(spyCursorRadius);
        }
    }, [mode, spyCursorRadius, swipePosition, viewer]);

    React.useEffect(() => {
        if (mode !== "spy" || !viewer.isReady()) {
            viewer.updateSpyCursor(undefined);
            return;
        }
        viewer.updateSpyCursor(spyCursor?.visible ? spyCursor.pixel : undefined);
    }, [mode, spyCursor, viewer]);

    React.useEffect(() => {
        if (mode !== "spy") {
            setSpyCursor(undefined);
            return;
        }
        const overlayEl = containerRef.current;
        const host = overlayEl?.parentElement;
        if (!overlayEl || !host) {
            return;
        }

        const onPointerMove = (event: PointerEvent) => {
            const rect = host.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setSpyCursor({
                pixel: [x, y],
                visible: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
            });
        };
        const onPointerLeave = () => {
            setSpyCursor(undefined);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (document.activeElement !== host) {
                return;
            }
            if (event.key === "ArrowUp") {
                dispatch(setSpyCursorRadius(clampSpyCursorRadius(spyCursorRadius + SPY_CURSOR_RADIUS_STEP)));
                event.preventDefault();
            } else if (event.key === "ArrowDown") {
                dispatch(setSpyCursorRadius(clampSpyCursorRadius(spyCursorRadius - SPY_CURSOR_RADIUS_STEP)));
                event.preventDefault();
            }
        };

        host.addEventListener("pointermove", onPointerMove);
        host.addEventListener("pointerleave", onPointerLeave);
        host.addEventListener("keydown", onKeyDown);
        return () => {
            host.removeEventListener("pointermove", onPointerMove);
            host.removeEventListener("pointerleave", onPointerLeave);
            host.removeEventListener("keydown", onKeyDown);
        };
    }, [dispatch, mode, spyCursorRadius]);

    if (mode === "none" || !comparisonInfo?.pair) {
        return null;
    }

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(setComparisonMode("none"));
    };

    const closeButton = <button
        onClick={handleClose}
        title={tr("MAP_SWIPE_CLOSE", locale)}
        style={{
            position: "absolute",
            top: 8,
            right: mode === "spy" ? 110 : undefined,
            left: mode === "swipe" ? `${swipePosition}%` : undefined,
            transform: mode === "swipe" ? "translateX(-50%)" : undefined,
            background: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(0,0,0,0.3)",
            borderRadius: 4,
            padding: "2px 8px",
            cursor: "pointer",
            fontSize: 12,
            pointerEvents: "all",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            whiteSpace: "nowrap",
            zIndex: 12
        }}
    >
        ✕ {tr("MAP_SWIPE_CLOSE", locale)}
    </button>;

    return (
        <div
            ref={containerRef}
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 10
            }}
        >
            {mode === "swipe" && (
                <div
                    onPointerDown={(e) => {
                        e.currentTarget.setPointerCapture(e.pointerId);
                        setIsDragging(true);
                        e.stopPropagation();
                    }}
                    onPointerMove={(e) => {
                        if (!isDragging || !containerRef.current) {
                            return;
                        }
                        const rect = containerRef.current.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const nextPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
                        dispatch(setSwipePosition(Math.round(nextPosition)));
                        e.stopPropagation();
                    }}
                    onPointerUp={(e) => {
                        e.currentTarget.releasePointerCapture(e.pointerId);
                        setIsDragging(false);
                        e.stopPropagation();
                    }}
                    style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `calc(${swipePosition}% - 16px)`,
                        width: 32,
                        cursor: "ew-resize",
                        pointerEvents: "all",
                        zIndex: 11
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: "50%",
                            width: 3,
                            background: "rgba(255,255,255,0.9)",
                            boxShadow: "0 0 4px rgba(0,0,0,0.5)",
                            transform: "translateX(-50%)",
                            pointerEvents: "none"
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
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
                </div>
            )}
            {mode === "spy" && spyCursor?.visible && (
                <div
                    style={{
                        position: "absolute",
                        left: spyCursor.pixel[0] - spyCursorRadius,
                        top: spyCursor.pixel[1] - spyCursorRadius,
                        width: spyCursorRadius * 2,
                        height: spyCursorRadius * 2,
                        borderRadius: "50%",
                        border: "4px solid rgba(0,0,0,0.5)",
                        boxShadow: "0 0 0 2px rgba(255,255,255,0.85)",
                        pointerEvents: "none",
                        zIndex: 12
                    }}
                />
            )}
            {closeButton}
            <ComparisonLabels pair={comparisonInfo.pair} locale={locale} />
        </div>
    );
};

export type IMapSwipeInfo = IMapComparisonInfo;
export const useMapSwipeInfo = useMapComparisonInfo;
export function useIsMapSwipeActive(): boolean {
    return useComparisonMode() === "swipe";
}
export const MapSwipeControl = MapComparisonControl;
