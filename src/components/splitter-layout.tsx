/*

react-splitter-layout

Copyright (c) 2016 Yang Liu <hi@zesik.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */

// Copied and ported to TypeScript by Jackie Ng

import React from 'react';

type PaneProps = {
    size: number | null;
    primary: boolean;
    vertical?: boolean;
    percentage?: boolean;
};

const Pane: React.FC<React.PropsWithChildren<PaneProps>> = (props) => {
    const size = props.size || 0;
    const unit = props.percentage ? '%' : 'px';
    let classes = 'layout-pane';
    const style: React.CSSProperties = {};
    if (!props.primary) {
        if (props.vertical) {
            style.height = `${size}${unit}`;
        } else {
            style.width = `${size}${unit}`;
        }
    } else {
        classes += ' layout-pane-primary';
    }
    return (
        <div className={classes} style={style}>{props.children}</div>
    );
}

function clearSelection() {
    if (window.getSelection) {
        const sel = window.getSelection();
        if (sel) {
            if (sel.empty) {
                sel.empty();
            } else if (sel.removeAllRanges) {
                sel.removeAllRanges();
            }
        }
    }
}

const DEFAULT_SPLITTER_SIZE = 4;

/**
 * @hidden
 */
export type SplitterLayoutProps = React.PropsWithChildren<{
    customClassName?: string;
    vertical?: boolean;
    percentage?: boolean;
    primaryIndex?: number;
    primaryMinSize?: number;
    secondaryInitialSize?: number;
    secondaryMinSize?: number;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    onSecondaryPaneSizeChange?: (size: number) => void;
}>;

/**
 * @hidden
 */
export const SplitterLayout: React.FC<SplitterLayoutProps> = (props) => {
    const [resizing, setResizing] = React.useState(false);
    const [secondaryPaneSize, setSecondaryPaneSize] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const splitterRef = React.useRef<HTMLDivElement | null>(null);

    // Helper for getSecondaryPaneSize
    const getSecondaryPaneSize = React.useCallback((containerRect: DOMRect, splitterRect: { width: number, height: number }, clientPosition: { top: number, left: number }, offsetMouse: boolean) => {
        let totalSize;
        let splitterSize;
        let offset;
        if (props.vertical) {
            totalSize = containerRect.height;
            splitterSize = splitterRect.height;
            offset = clientPosition.top - containerRect.top;
        } else {
            totalSize = containerRect.width;
            splitterSize = splitterRect.width;
            offset = clientPosition.left - containerRect.left;
        }
        if (offsetMouse) {
            offset -= splitterSize / 2;
        }
        if (offset < 0) {
            offset = 0;
        } else if (offset > totalSize - splitterSize) {
            offset = totalSize - splitterSize;
        }
        let secondaryPaneSize;
        if (props.primaryIndex === 1) {
            secondaryPaneSize = offset;
        } else {
            secondaryPaneSize = totalSize - splitterSize - offset;
        }
        let primaryPaneSize = totalSize - splitterSize - secondaryPaneSize;
        if (props.percentage) {
            secondaryPaneSize = (secondaryPaneSize * 100) / totalSize;
            primaryPaneSize = (primaryPaneSize * 100) / totalSize;
            splitterSize = (splitterSize * 100) / totalSize;
            totalSize = 100;
        }
        const pMinSize = props.primaryMinSize ?? 0;
        const sMinSize = props.secondaryMinSize ?? 0;
        if (primaryPaneSize < pMinSize) {
            secondaryPaneSize = Math.max(secondaryPaneSize - (pMinSize - primaryPaneSize), 0);
        } else if (secondaryPaneSize < sMinSize) {
            secondaryPaneSize = Math.min(totalSize - splitterSize - pMinSize, sMinSize);
        }
        return secondaryPaneSize;
    }, [props.vertical, props.primaryIndex, props.percentage, props.primaryMinSize, props.secondaryMinSize]);

    // Initial secondaryPaneSize
    React.useEffect(() => {
        let secondaryPaneSizeInit = 0;
        if (typeof props.secondaryInitialSize !== 'undefined') {
            secondaryPaneSizeInit = props.secondaryInitialSize;
        } else if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            let splitterRect;
            if (splitterRef.current) {
                splitterRect = splitterRef.current.getBoundingClientRect();
            } else {
                splitterRect = { width: DEFAULT_SPLITTER_SIZE, height: DEFAULT_SPLITTER_SIZE };
            }
            secondaryPaneSizeInit = getSecondaryPaneSize(containerRect, splitterRect, {
                left: containerRect.left + ((containerRect.width - splitterRect.width) / 2),
                top: containerRect.top + ((containerRect.height - splitterRect.height) / 2)
            }, false);
        }
        setSecondaryPaneSize(secondaryPaneSizeInit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Resize event
    React.useEffect(() => {
        function handleResize() {
            if (splitterRef.current && containerRef.current && !props.percentage) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const splitterRect = splitterRef.current.getBoundingClientRect();
                const newSize = getSecondaryPaneSize(containerRect, splitterRect, {
                    left: splitterRect.left,
                    top: splitterRect.top
                }, false);
                setSecondaryPaneSize(newSize);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getSecondaryPaneSize, props.percentage]);

    // Mouse/touch event handlers
    React.useEffect(() => {
        function handleMouseMove(e: MouseEvent | Touch) {
            if (resizing && containerRef.current && splitterRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const splitterRect = splitterRef.current.getBoundingClientRect();
                const newSize = getSecondaryPaneSize(containerRect, splitterRect, {
                    left: (e as MouseEvent).clientX ?? (e as Touch).clientX,
                    top: (e as MouseEvent).clientY ?? (e as Touch).clientY
                }, true);
                clearSelection();
                setSecondaryPaneSize(newSize);
            }
        }
        function handleTouchMove(e: TouchEvent) {
            handleMouseMove(e.changedTouches[0]);
        }
        function handleMouseUp() {
            setResizing(false);
        }
        function handleTouchEnd() {
            setResizing(false);
        }
        document.addEventListener('mousemove', handleMouseMove as any);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleTouchMove as any);
        document.addEventListener('touchend', handleTouchEnd);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove as any);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove as any);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [resizing, getSecondaryPaneSize]);

    // onSecondaryPaneSizeChange
    React.useEffect(() => {
        if (props.onSecondaryPaneSizeChange) {
            props.onSecondaryPaneSizeChange(secondaryPaneSize);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondaryPaneSize]);

    // onDragStart/onDragEnd
    React.useEffect(() => {
        if (resizing && props.onDragStart) {
            props.onDragStart();
        } else if (!resizing && props.onDragEnd) {
            props.onDragEnd();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resizing]);

    const handleSplitterMouseDown = React.useCallback(() => {
        clearSelection();
        setResizing(true);
    }, []);

    let containerClasses = 'splitter-layout';
    if (props.customClassName) {
        containerClasses += ` ${props.customClassName}`;
    }
    if (props.vertical) {
        containerClasses += ' splitter-layout-vertical';
    }
    if (resizing) {
        containerClasses += ' layout-changing';
    }

    const children = React.Children.toArray(props.children).slice(0, 2);
    if (children.length === 0) {
        children.push(<div />);
    }
    const wrappedChildren = [];
    const primaryIndex = (props.primaryIndex !== 0 && props.primaryIndex !== 1) ? 0 : props.primaryIndex;
    for (let i = 0; i < children.length; ++i) {
        let primary = true;
        let size = null;
        if (children.length > 1 && i !== primaryIndex) {
            primary = false;
            size = secondaryPaneSize;
        }
        wrappedChildren.push(
            <Pane vertical={props.vertical} percentage={props.percentage} primary={primary} size={size} key={i}>
                {children[i]}
            </Pane>
        );
    }

    return (
        <div className={containerClasses} ref={containerRef}>
            {wrappedChildren[0]}
            {wrappedChildren.length > 1 && (
                <div
                    role="separator"
                    className="layout-splitter"
                    ref={splitterRef}
                    onMouseDown={handleSplitterMouseDown}
                    onTouchStart={handleSplitterMouseDown}
                />
            )}
            {wrappedChildren.length > 1 && wrappedChildren[1]}
        </div>
    );
};