import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ColorPicker } from "../../src/components/color-picker";
import { describe, it, expect, vi } from 'vitest';

// Mock the element context provider to supply simple components
const mockCollapsible = ({ isOpen, children }: any) => (isOpen ? <div data-testid="collapsible">{children}</div> : null);
const mockButton = ({ children, ...props }: any) => (<button {...props}>{children}</button>);
const mockCard = ({ children }: any) => (<div data-testid="card">{children}</div>);

vi.mock("../../src/components/elements/element-context", () => {
  return {
    useElementContext: () => ({
      Collapsible: mockCollapsible,
      Button: mockButton,
      Card: mockCard,
    }),
  };
});

describe('ColorPicker component', () => {
  it('renders button with initial color and opens picker on click', () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#ff0000" locale="en" onChange={handleChange} />);

    const btn = screen.getByRole("button");
    expect(btn).toHaveStyle({ backgroundColor: "#ff0000" });

    fireEvent.click(btn);
    expect(screen.getByTestId("collapsible")).toBeInTheDocument();
  });

  it('calls onChange when color picker value changes', () => {
    const handleChange = vi.fn();
    render(<ColorPicker locale="en" onChange={handleChange} />);

    fireEvent.click(screen.getByRole("button"));
    // react-colorful emits hex string without '#'
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "00ff00" } });
    expect(handleChange).toHaveBeenCalledWith("00ff00");
  });

  it('does not open picker when disabled', () => {
    const handleChange = vi.fn();
    render(<ColorPicker disabled locale="en" onChange={handleChange} />);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(screen.queryByTestId("collapsible")).not.toBeInTheDocument();
  });
});
