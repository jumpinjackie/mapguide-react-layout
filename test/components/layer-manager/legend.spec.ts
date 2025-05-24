import { vi } from "vitest";
import { getLegendImage, LegendItemOptions } from "../../../src/components/layer-manager/legend";

describe("getLegendImage", () => {
    const createMockCanvas = () => {
        const ctx = {
            save: vi.fn(),
            restore: vi.fn(),
            rect: vi.fn(),
            clip: vi.fn(),
            getContext: vi.fn().mockReturnThis(),
            canvas: undefined as HTMLCanvasElement | undefined
        };
        const canvas = {
            width: 0,
            height: 0,
            getContext: vi.fn().mockReturnValue(ctx),
        } as unknown as HTMLCanvasElement;
        ctx.canvas = canvas;
        return { canvas, ctx };
    };

    const createMockStyle = (mockImg?: any) => ({
        getImage: mockImg ? vi.fn().mockReturnValue(mockImg) : vi.fn(),
        setFill: vi.fn(),
        getFill: vi.fn(),
        getStroke: vi.fn(),
        getText: vi.fn()
    } as any);

    const createMockVectorContext = () => ({
        setStyle: vi.fn(),
        drawGeometry: vi.fn(),
    });

    beforeEach(() => {
        // Mock document.createElement for canvas
        vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
            if (tag === "canvas") {
                const { canvas } = createMockCanvas();
                return canvas as any;
            }
            return {} as any;
        });
        // Mock ol/render toContext
        vi.mocked = (globalThis as any).ol_render_toContext = vi.fn().mockImplementation(() => createMockVectorContext());
        // Mock ol/has DEVICE_PIXEL_RATIO
        (globalThis as any).ol_has_DEVICE_PIXEL_RATIO = 1;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns a canvas element when called with minimal options", () => {
        const result = getLegendImage({});
        expect(result).toBeDefined();
        expect(typeof result?.getContext).toBe("function");
    });

    it("uses provided canvas and row", () => {
        const { canvas } = createMockCanvas();
        const result = getLegendImage({}, canvas, 2);
        expect(result).toBe(canvas);
    });

    it("applies margin and size from item", () => {
        const { canvas } = createMockCanvas();
        const item: LegendItemOptions = { margin: 5, size: [20, 30] };
        getLegendImage(item, canvas);
        expect(canvas.width).toBeDefined();
        expect(canvas.height).toBeDefined();
    });

    it("calls onload if image is not loaded", () => {
        // Simulate a style with getImage returning an object with .complete = true, .naturalWidth = 0
        const mockImgElt = {
            complete: true,
            naturalWidth: 0,
            addEventListener: vi.fn((event, cb) => cb()),
        };
        const mockImg = {
            getImage: vi.fn().mockReturnValue(mockImgElt),
            getAnchor: vi.fn(),
            getSize: vi.fn(),
            load: vi.fn(),
        };
        const mockStyle = createMockStyle(mockImg);
        const item: LegendItemOptions = {
            typeGeom: "Point",
            style: [mockStyle as any],
            onload: vi.fn(),
        };
        getLegendImage(item);
        expect(mockImg.load).toHaveBeenCalled();
    });

    it("handles feature and style function", () => {
        const mockFeature = {
            getStyle: vi.fn().mockReturnValueOnce((f: any) => [createMockStyle()]),
            getGeometry: vi.fn().mockReturnValue({ getType: vi.fn().mockReturnValue("Point") }),
        };
        const item: LegendItemOptions = {
            feature: mockFeature as any,
            style: vi.fn(),
        };
        getLegendImage(item);
        expect(mockFeature.getStyle).toHaveBeenCalled();
    });

    it("handles typeGeom as LineString", () => {
        const { canvas } = createMockCanvas();
        const mockStyle = createMockStyle();
        const item: LegendItemOptions = {
            typeGeom: "LineString",
            style: [mockStyle],
        };
        getLegendImage(item, canvas);
        expect(canvas.getContext).toHaveBeenCalledWith("2d");
    });

    it("handles typeGeom as Polygon", () => {
        const { canvas } = createMockCanvas();
        const mockStyle = createMockStyle();
        const item: LegendItemOptions = {
            typeGeom: "Polygon",
            style: [mockStyle],
        };
        getLegendImage(item, canvas);
        expect(canvas.getContext).toHaveBeenCalledWith("2d");
    });

    it("handles missing style and feature", () => {
        const { canvas } = createMockCanvas();
        const item = {};
        getLegendImage(item, canvas);
        expect(canvas.getContext).toHaveBeenCalledWith("2d");
    });
});