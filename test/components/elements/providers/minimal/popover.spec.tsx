import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MnPopover } from "../../../../../src/components/elements/providers/minimal/popover";

describe("components/elements/providers/minimal/popover", () => {
    it("renders a portal container with the mrl-popover-container class when opened", async () => {
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
        // z-index is applied via the mrl-popover-container CSS class (synchronously at
        // element creation), avoiding a useEffect timing gap that would cause the
        // container to render at z-index:auto before the first browser paint.
        expect(container?.classList.contains("mrl-popover-container")).toBe(true);
    });
});
