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
type SplitterLayoutState = {
    resizing: boolean;
    secondaryPaneSize: number;
};

/**
 * @hidden
 */
export class SplitterLayout extends React.Component<SplitterLayoutProps, SplitterLayoutState> {
    private container: HTMLDivElement | null;
    private splitter: HTMLDivElement | null;
    constructor(props: SplitterLayoutProps) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleSplitterMouseDown = this.handleSplitterMouseDown.bind(this);
        this.state = {
            secondaryPaneSize: 0,
            resizing: false
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('mouseup', this.handleMouseUp);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('touchend', this.handleMouseUp);
        document.addEventListener('touchmove', this.handleTouchMove);

        let secondaryPaneSize;
        if (typeof this.props.secondaryInitialSize !== 'undefined') {
            secondaryPaneSize = this.props.secondaryInitialSize;
        } else {
            const containerRect = this.container!.getBoundingClientRect();
            let splitterRect;
            if (this.splitter) {
                splitterRect = this.splitter.getBoundingClientRect();
            } else {
                // Simulate a splitter
                splitterRect = { width: DEFAULT_SPLITTER_SIZE, height: DEFAULT_SPLITTER_SIZE };
            }
            secondaryPaneSize = this.getSecondaryPaneSize(containerRect, splitterRect, {
                left: containerRect.left + ((containerRect.width - splitterRect.width) / 2),
                top: containerRect.top + ((containerRect.height - splitterRect.height) / 2)
            }, false);
        }
        this.setState({ secondaryPaneSize });
    }

    componentDidUpdate(prevProps: SplitterLayoutProps, prevState: SplitterLayoutState) {
        if (prevState.secondaryPaneSize !== this.state.secondaryPaneSize && this.props.onSecondaryPaneSizeChange) {
            this.props.onSecondaryPaneSizeChange(this.state.secondaryPaneSize);
        }
        if (prevState.resizing !== this.state.resizing) {
            if (this.state.resizing) {
                if (this.props.onDragStart) {
                    this.props.onDragStart();
                }
            } else if (this.props.onDragEnd) {
                this.props.onDragEnd();
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('touchend', this.handleMouseUp);
        document.removeEventListener('touchmove', this.handleTouchMove);
    }

    getSecondaryPaneSize(containerRect: DOMRect, splitterRect: { width: number, height: number }, clientPosition: { top: number, left: number }, offsetMouse: boolean) {
        let totalSize;
        let splitterSize;
        let offset;
        if (this.props.vertical) {
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
        if (this.props.primaryIndex === 1) {
            secondaryPaneSize = offset;
        } else {
            secondaryPaneSize = totalSize - splitterSize - offset;
        }
        let primaryPaneSize = totalSize - splitterSize - secondaryPaneSize;
        if (this.props.percentage) {
            secondaryPaneSize = (secondaryPaneSize * 100) / totalSize;
            primaryPaneSize = (primaryPaneSize * 100) / totalSize;
            splitterSize = (splitterSize * 100) / totalSize;
            totalSize = 100;
        }

        const pMinSize = this.props.primaryMinSize ?? 0;
        const sMinSize = this.props.secondaryMinSize ?? 0;
        if (primaryPaneSize < pMinSize) {
            secondaryPaneSize = Math.max(secondaryPaneSize - (pMinSize - primaryPaneSize), 0);
        } else if (secondaryPaneSize < sMinSize) {
            secondaryPaneSize = Math.min(totalSize - splitterSize - pMinSize, sMinSize);
        }

        return secondaryPaneSize;
    }

    handleResize() {
        if (this.splitter && this.container && !this.props.percentage) {
            const containerRect = this.container.getBoundingClientRect();
            const splitterRect = this.splitter.getBoundingClientRect();
            const secondaryPaneSize = this.getSecondaryPaneSize(containerRect, splitterRect, {
                left: splitterRect.left,
                top: splitterRect.top
            }, false);
            this.setState({ secondaryPaneSize });
        }
    }

    handleMouseMove(e: MouseEvent | Touch) {
        if (this.state.resizing && this.container && this.splitter) {
            const containerRect = this.container.getBoundingClientRect();
            const splitterRect = this.splitter.getBoundingClientRect();
            const secondaryPaneSize = this.getSecondaryPaneSize(containerRect, splitterRect, {
                left: e.clientX,
                top: e.clientY
            }, true);
            clearSelection();
            this.setState({ secondaryPaneSize });
        }
    }

    handleTouchMove(e: TouchEvent) {
        this.handleMouseMove(e.changedTouches[0]);
    }

    handleSplitterMouseDown() {
        clearSelection();
        this.setState({ resizing: true });
    }

    handleMouseUp() {
        this.setState(prevState => (prevState.resizing ? { resizing: false } : null));
    }

    render() {
        let containerClasses = 'splitter-layout';
        if (this.props.customClassName) {
            containerClasses += ` ${this.props.customClassName}`;
        }
        if (this.props.vertical) {
            containerClasses += ' splitter-layout-vertical';
        }
        if (this.state.resizing) {
            containerClasses += ' layout-changing';
        }

        const children = React.Children.toArray(this.props.children).slice(0, 2);
        if (children.length === 0) {
            children.push(<div />);
        }
        const wrappedChildren = [];
        const primaryIndex = (this.props.primaryIndex !== 0 && this.props.primaryIndex !== 1) ? 0 : this.props.primaryIndex;
        for (let i = 0; i < children.length; ++i) {
            let primary = true;
            let size = null;
            if (children.length > 1 && i !== primaryIndex) {
                primary = false;
                size = this.state.secondaryPaneSize;
            }
            wrappedChildren.push(
                <Pane vertical={this.props.vertical} percentage={this.props.percentage} primary={primary} size={size}>
                    {children[i]}
                </Pane>
            );
        }

        return (
            <div className={containerClasses} ref={(c) => { this.container = c; }}>
                {wrappedChildren[0]}
                {wrappedChildren.length > 1 &&
                    (
                        <div
                            role="separator"
                            className="layout-splitter"
                            ref={(c) => { this.splitter = c; }}
                            onMouseDown={this.handleSplitterMouseDown}
                            onTouchStart={this.handleSplitterMouseDown}
                        />
                    )
                }
                {wrappedChildren.length > 1 && wrappedChildren[1]}
            </div>
        );
    }
}