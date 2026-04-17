import React from "react";
import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FormFrameShim } from "../../src/components/form-frame-shim";

describe("components/form-frame-shim", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders a hidden form with no fields initially", () => {
        const { container } = render(<FormFrameShim />);
        const form = container.querySelector("form");

        expect(form).toBeTruthy();
        expect(form?.getAttribute("method")).toBe("post");
        expect(form?.getAttribute("target")).toBe("");
        expect(form?.getAttribute("action")).toBe("");
        expect(container.querySelectorAll("input[type='hidden']")).toHaveLength(0);
    });

    it("updates state and submits the form with generated hidden fields", () => {
        const submitSpy = vi.spyOn(HTMLFormElement.prototype, "submit").mockImplementation(() => undefined);
        const ref = React.createRef<FormFrameShim>();
        const { container } = render(<FormFrameShim ref={ref} />);

        act(() => {
            ref.current?.submit("https://example.test/submit", ["MAPNAME", "Map1", "SESSION", "S1"], "TaskPane");
        });

        const form = container.querySelector("form");
        const fields = Array.from(container.querySelectorAll("input[type='hidden']"));
        expect(form?.getAttribute("target")).toBe("TaskPane");
        expect(form?.getAttribute("action")).toBe("https://example.test/submit");
        expect(fields).toHaveLength(2);
        expect(fields[0].getAttribute("name")).toBe("MAPNAME");
        expect(fields[0].getAttribute("value")).toBe("Map1");
        expect(fields[1].getAttribute("name")).toBe("SESSION");
        expect(fields[1].getAttribute("value")).toBe("S1");
        expect(submitSpy).toHaveBeenCalledTimes(1);
    });
});