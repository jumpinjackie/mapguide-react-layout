import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import {
  contrast,
  NumberExprEditor,
  StringExprEditor,
  BooleanExprEditor,
  ColorExprEditor,
  SliderExprEditor,
} from "../../../src/components/layer-manager/common";

// Mocks for useElementContext and ColorPicker
/*
vi.mock("../elements/element-context", () => ({
  useElementContext: () => ({
    Button: (props: any) => <button {...props} />,
    Collapsible: (props: any) =>
      props.isOpen ? <div>{props.children}</div> : null,
    Card: (props: any) => <div>{props.children}</div>,
    Radio: (props: any) => (
      <label>
        <input
          type="radio"
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={props.onChange}
          disabled={props.disabled}
        />
        {props.label}
      </label>
    ),
    InputGroup: (props: any) => (
      <div>
        <input
          readOnly={props.readOnly}
          value={props.value}
          style={props.style}
        />
        {props.rightElement}
      </div>
    ),
    NumericInput: (props: any) => (
      <input
        type="number"
        min={props.min}
        max={props.max}
        value={props.value}
        disabled={props.disabled}
        onChange={(e) => props.onChange(Number(e.target.value))}
      />
    ),
    Slider: (props: any) => (
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        disabled={props.disabled}
        onChange={(e) => props.onChange(Number(e.target.value))}
      />
    ),
    Switch: (props: any) => (
      <input
        type="checkbox"
        checked={props.checked}
        disabled={props.disabled}
        onChange={props.onChange}
      />
    ),
  }),
}));
vi.mock("../color-picker", () => ({
  ColorPicker: (props: any) => (
    <input
      type="color"
      value={props.value}
      disabled={props.disabled}
      onChange={(e) => props.onChange(e.target.value)}
    />
  ),
}));
*/

describe("contrast", () => {
  it("returns #000 for undefined", () => {
    expect(contrast(undefined)).toBe("#000");
  });
  it("returns #000 for invalid hex", () => {
    expect(contrast("not-a-color")).toBe("#000");
  });
  it("returns #000 for light color", () => {
    expect(contrast("#ffffff")).toBe("#000");
  });
  it("returns #fff for dark color", () => {
    expect(contrast("#000000")).toBe("#fff");
  });
  it("respects threshold", () => {
    expect(contrast("#888888", 200)).toBe("#fff");
    expect(contrast("#888888", 100)).toBe("#000");
  });
});

/*
describe("NumberExprEditor", () => {  
  it("renders and calls onChange", () => {
    const handleChange = vi.fn();
    const { getByRole } = render(
      <NumberExprEditor
        locale="en"
        value={5}
        onChange={handleChange}
        min={0}
        max={10}
      />
    );
    const editBtn = getByRole("button");
    fireEvent.click(editBtn);
    const input = getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "7" } });
    // Apply button
    const applyBtn = getByRole("button", { name: /apply/i });
    fireEvent.click(applyBtn);
    expect(handleChange).toHaveBeenCalledWith(7);
  });
});
*/
describe("StringExprEditor", () => {
  it("renders and calls onChange", () => {
    const handleChange = vi.fn();
    const { getByRole, getAllByRole } = render(
      <StringExprEditor locale="en" value="foo" onChange={handleChange} />
    );
    const editBtn = getByRole("button");
    fireEvent.click(editBtn);
    const textInputs = getAllByRole("textbox");
    fireEvent.change(textInputs[1], { target: { value: "bar" } });
    const applyBtn = getByRole("button", { name: /apply/i });
    fireEvent.click(applyBtn);
    expect(handleChange).toHaveBeenCalledWith("bar");
  });
});

describe("BooleanExprEditor", () => {
  it("renders and calls onChange", () => {
    const handleChange = vi.fn();
    const { getByRole, getByLabelText } = render(
      <BooleanExprEditor locale="en" value={true} onChange={handleChange} />
    );
    const editBtn = getByRole("button");
    fireEvent.click(editBtn);
    const checkbox = getByLabelText("");
    fireEvent.click(checkbox);
    const applyBtn = getByRole("button", { name: /apply/i });
    fireEvent.click(applyBtn);
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});

/*
describe("ColorExprEditor", () => {
  it("renders and calls onChange", () => {
    const handleChange = vi.fn();
    const { getByRole, getByDisplayValue } = render(
      <ColorExprEditor locale="en" value="#ff0000" onChange={handleChange} />
    );
    const editBtn = getByRole("button");
    fireEvent.click(editBtn);
    const colorInput = getByDisplayValue("#ff0000");
    fireEvent.change(colorInput, { target: { value: "#00ff00" } });
    const applyBtn = getByRole("button", { name: /apply/i });
    fireEvent.click(applyBtn);
    expect(handleChange).toHaveBeenCalledWith("#00ff00");
  });
});

describe("SliderExprEditor", () => {
  it("renders and calls onChange", () => {
    const handleChange = vi.fn();
    const { getByRole } = render(
      <SliderExprEditor
        locale="en"
        value={3}
        onChange={handleChange}
        min={0}
        max={10}
        labelStepSize={1}
      />
    );
    const editBtn = getByRole("button");
    fireEvent.click(editBtn);
    const slider = getByRole("slider");
    fireEvent.change(slider, { target: { value: "5" } });
    const applyBtn = getByRole("button", { name: /apply/i });
    fireEvent.click(applyBtn);
    expect(handleChange).toHaveBeenCalledWith(5);
  });
});
*/