import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MnPopover } from "../../../../../src/components/elements/providers/minimal/popover";

describe("components/elements/providers/minimal/popover", () => {
    it("renders an elevated portal container when opened", async () => {
        render(
            <MnPopover position="right">
                <button type="button">Open popover</button>
                <div>Popover content</div>
            </MnPopover>
        );

        fireEvent.click(screen.getByRole("button", { name: "Open popover" }));

        await waitFor(() => {
            expect(screen.getByText("Popover content")).toBeInTheDocument();
        });

        const container = document.body.querySelector<HTMLElement>(".react-tiny-popover-container");
        expect(container).not.toBeNull();
        expect(container?.style.zIndex).toBe("1002");
    });
});
