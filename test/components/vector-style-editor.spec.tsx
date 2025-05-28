import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VectorStyleEditor } from '../../src/components/vector-style-editor';
import type { IBasicVectorPointStyle, IBasicVectorLineStyle, IBasicVectorPolygonStyle, IVectorFeatureStyle, IVectorLayerStyle } from '../../src/api/ol-style-contracts';
import React from 'react';
import { tr } from '../../src/api/i18n';
import { VectorLayerStyleEditor } from '../../src/components/vector-style-editor';

describe('VectorStyleEditor', () => {
    const defaultPoint: IBasicVectorPointStyle = {
        type: 'Circle',
        fill: { color: '#ff0000', alpha: 255 },
        stroke: { color: '#000000', width: 1, alpha: 255 },
        radius: 5
    };
    const defaultLine: IBasicVectorLineStyle = {
        color: '#00ff00',
        width: 2,
        alpha: 255
    };
    const defaultPoly: IBasicVectorPolygonStyle = {
        fill: { color: '#0000ff', alpha: 255 },
        stroke: { color: '#ffffff', width: 1, alpha: 255 }
    };
    const defaultStyle: IVectorFeatureStyle = {
        point: defaultPoint,
        line: defaultLine,
        polygon: defaultPoly
    };
/*
    const mockContext = {
        NonIdealState: (props: any) => <div data-testid="non-ideal">{props.title}</div>,
        Radio: (props: any) => <input type="radio" {...props} />,
        Button: (props: any) => <button {...props} />,
        Switch: (props: any) => <input type="checkbox" {...props} />,
        NumericInput: (props: any) => <input type="number" {...props} />
    };

    vi.mock('./elements/element-context', () => ({
        useElementContext: () => mockContext
    }));
*/
    it('renders NonIdealState if all style types are disabled', () => {
        render(
            <VectorStyleEditor
                style={defaultStyle}
                enablePoint={false}
                enableLine={false}
                enablePolygon={false}
                locale="en"
            />
        );
        expect(screen.getByText(tr("VSED_NO_STYLES_TITLE", "en"))).toBeInTheDocument();
        expect(screen.getByText(tr("VSED_NO_STYLES_DESC", "en"))).toBeInTheDocument();
    });

    it('renders point tab if enablePoint is true', () => {
        render(
            <VectorStyleEditor
                style={defaultStyle}
                enablePoint={true}
                enableLine={false}
                enablePolygon={false}
                locale="en"
            />
        );
        expect(screen.getByText(tr("VSED_TAB_POINT", "en"))).toBeInTheDocument();
    });

    it('renders line tab if enableLine is true', () => {
        render(
            <VectorStyleEditor
                style={defaultStyle}
                enablePoint={false}
                enableLine={true}
                enablePolygon={false}
                locale="en"
            />
        );
        expect(screen.getByText(tr("VSED_TAB_LINE", "en"))).toBeInTheDocument();
    });

    it('renders polygon tab if enablePolygon is true', () => {
        render(
            <VectorStyleEditor
                style={defaultStyle}
                enablePoint={false}
                enableLine={false}
                enablePolygon={true}
                locale="en"
            />
        );
        expect(screen.getByText(tr("VSED_TAB_POLY", "en"))).toBeInTheDocument();
    });

    it('calls onChange with updated style when a style editor changes', () => {
        const handleChange = vi.fn();
        render(
            <VectorStyleEditor
                style={defaultStyle}
                enablePoint={true}
                enableLine={true}
                enablePolygon={true}
                locale="en"
                onChange={handleChange}
            />
        );
        // Simulate a change in the point style editor
        const radio = screen.getByLabelText(/Circle/i);
        fireEvent.click(radio);
        expect(handleChange).toHaveBeenCalled();
    });

    it('renders all enabled tabs', () => {
        render(
            <VectorStyleEditor
                style={defaultStyle}
                enablePoint={true}
                enableLine={true}
                enablePolygon={true}
                locale="en"
            />
        );
        expect(screen.getByText(tr("VSED_TAB_POINT", "en"))).toBeInTheDocument();
        expect(screen.getByText(tr("VSED_TAB_LINE", "en"))).toBeInTheDocument();
        expect(screen.getByText(tr("VSED_TAB_POLY", "en"))).toBeInTheDocument();
    });
});

describe('VectorLayerStyleEditor', () => {
    const defaultStyle: IVectorFeatureStyle = {
        point: {
            type: 'Circle',
            fill: { color: '#ff0000', alpha: 255 },
            stroke: { color: '#000000', width: 1, alpha: 255 },
            radius: 5
        },
        line: {
            color: '#00ff00',
            width: 2,
            alpha: 255
        },
        polygon: {
            fill: { color: '#0000ff', alpha: 255 },
            stroke: { color: '#ffffff', width: 1, alpha: 255 }
        }
    };

    const style: IVectorLayerStyle = {
        default: defaultStyle,
        filter1: {
            point: {
                type: 'Circle',
                fill: { color: '#00ff00', alpha: 255 },
                stroke: { color: '#000000', width: 1, alpha: 255 },
                radius: 10
            },
            line: {
                color: '#ff00ff',
                width: 3,
                alpha: 255
            },
            polygon: {
                fill: { color: '#00ffff', alpha: 255 },
                stroke: { color: '#000000', width: 2, alpha: 255 }
            }
        }
    };

    it('renders a table with filter rows and default style row', () => {
        render(
            <VectorLayerStyleEditor
                style={style}
                enablePoint={true}
                enableLine={true}
                enablePolygon={true}
                locale="en"
            />
        );
        // There should be two rows with a button (edit/cross) for each filter + default
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(2);
        // Default style row should have "Default Style" text
        expect(screen.getByText(/Default Style/i)).toBeInTheDocument();
    });
/*
    it('calls onChange when a filter style is changed', () => {
        const handleChange = vi.fn();
        render(
            <VectorLayerStyleEditor
                style={style}
                enablePoint={true}
                enableLine={true}
                enablePolygon={true}
                locale="en"
                onChange={handleChange}
            />
        );
        // Simulate clicking the edit button for the first filter
        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[0]);
        // After clicking, the style editor should be visible (look for a tab label)
        expect(screen.getByText(/Point/i)).toBeInTheDocument();
    });
*/
    it('renders only enabled geometry columns', () => {
        render(
            <VectorLayerStyleEditor
                style={style}
                enablePoint={false}
                enableLine={true}
                enablePolygon={false}
                locale="en"
            />
        );
        // Only "Line" column should be present
        expect(screen.queryByText(/Point/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Polygon/i)).not.toBeInTheDocument();
    });
/*
    it('opens and closes the style editor for a filter', () => {
        render(
            <VectorLayerStyleEditor
                style={style}
                enablePoint={true}
                enableLine={true}
                enablePolygon={true}
                locale="en"
            />
        );
        const buttons = screen.getAllByRole('button');
        // Open editor
        fireEvent.click(buttons[0]);
        expect(screen.getByText(/Point/i)).toBeInTheDocument();
        // Close editor
        fireEvent.click(buttons[0]);
        expect(screen.queryByText(/Point/i)).not.toBeInTheDocument();
    });
*/
});