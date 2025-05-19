import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Navigator, PanDirection, ZoomDirection } from "../../src/components/navigator";

describe("components/navigator", () => {
    it("renders spinner shown when busy", () => {
        const onPan = vi.fn();
        const onRequestZoomToScale = vi.fn();
        const onZoom = vi.fn();
        const { container } = render(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={true} scale={5000} />);
        const spin = container.querySelectorAll("img.navigator-spinner");
        expect(spin).toHaveLength(1);
        expect((spin.item(0) as HTMLElement).style.visibility).toBe("visible");
    });
    it("renders spinner hidden when not busy", () => {
        const onPan = vi.fn();
        const onRequestZoomToScale = vi.fn();
        const onZoom = vi.fn();
        const { container } = render(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        const spin = container.querySelectorAll("img.navigator-spinner");
        expect(spin).toHaveLength(1);
        expect((spin.item(0) as HTMLElement).style.visibility).toBe("hidden");
    });
    it("clicking right raises pan east", () => {
        const onPan = vi.fn();
        const onRequestZoomToScale = vi.fn();
        const onZoom = vi.fn();
        const { container } = render(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        const area = container.getElementsByTagName("area")[0];
        fireEvent.click(area);
        expect(onPan.mock.calls).toHaveLength(1);
        expect(onPan.mock.calls[0]).toHaveLength(1);
        expect(onPan.mock.calls[0][0]).toBe(PanDirection.East);
    });
    it("clicking left raises pan west", () => {
        const onPan = vi.fn();
        const onRequestZoomToScale = vi.fn();
        const onZoom = vi.fn();
        const { container } = render(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        const area = container.getElementsByTagName("area")[1];
        fireEvent.click(area);
        expect(onPan.mock.calls).toHaveLength(1);
        expect(onPan.mock.calls[0]).toHaveLength(1);
        expect(onPan.mock.calls[0][0]).toBe(PanDirection.West);
    });
    it("clicking down raises pan south", () => {
        const onPan = vi.fn();
        const onRequestZoomToScale = vi.fn();
        const onZoom = vi.fn();
        const { container } = render(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        const area = container.getElementsByTagName("area")[2];
        fireEvent.click(area);
        expect(onPan.mock.calls).toHaveLength(1);
        expect(onPan.mock.calls[0]).toHaveLength(1);
        expect(onPan.mock.calls[0][0]).toBe(PanDirection.South);
    });
    it("clicking up raises pan north", () => {
        const onPan = vi.fn();
        const onRequestZoomToScale = vi.fn();
        const onZoom = vi.fn();
        const { container } = render(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        const area = container.getElementsByTagName("area")[3];
        fireEvent.click(area);
        expect(onPan.mock.calls).toHaveLength(1);
        expect(onPan.mock.calls[0]).toHaveLength(1);
        expect(onPan.mock.calls[0][0]).toBe(PanDirection.North);
    });
    it("clicking - raises zoom out", () => {
        const onPan = vi.fn();
        const onRequestZoomToScale = vi.fn();
        const onZoom = vi.fn();
        const { container } = render(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        const area = container.getElementsByTagName("area")[4];
        fireEvent.click(area);
        expect(onZoom.mock.calls).toHaveLength(1);
        expect(onZoom.mock.calls[0]).toHaveLength(1);
        expect(onZoom.mock.calls[0][0]).toBe(ZoomDirection.Out);
    });
    it("clicking + raises zoom in", () => {
        const onPan = vi.fn();
        const onRequestZoomToScale = vi.fn();
        const onZoom = vi.fn();
        const { container } = render(<Navigator onPan={onPan} onRequestZoomToScale={onRequestZoomToScale} onZoom={onZoom} busy={false} scale={5000} />);
        const area = container.getElementsByTagName("area")[5];
        fireEvent.click(area);
        expect(onZoom.mock.calls).toHaveLength(1);
        expect(onZoom.mock.calls[0]).toHaveLength(1);
        expect(onZoom.mock.calls[0][0]).toBe(ZoomDirection.In);
    });
});
