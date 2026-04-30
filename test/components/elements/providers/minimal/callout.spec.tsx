// Minimal provider – Callout tests
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../../../src/components/elements/providers/minimal/icon", () => ({
    MnIcon: ({ icon }: { icon?: string }) => <span data-testid="callout-icon">{icon}</span>,
}));

import { MnCallout } from "../../../../../src/components/elements/providers/minimal/callout";

describe("components/elements/providers/minimal/callout", () => {
    it.each([
        ["primary", "info-sign"],
        ["warning", "warning-sign"],
        ["success", "tick"],
        ["danger", "error"],
    ] as const)("renders the %s variant with the expected default icon", (variant, expectedIcon) => {
        const { container } = render(
            <MnCallout variant={variant} title="Attention!">
                <p>Body</p>
            </MnCallout>
        );

        expect(container.firstChild).toHaveClass("mrl-callout", `mrl-callout--${variant}`);
        expect(screen.getByText("Attention!")).toHaveClass("mrl-callout-title");
        expect(screen.getByTestId("callout-icon").textContent).toBe(expectedIcon);
    });

    it("prefers an explicit icon over the variant default", () => {
        render(
            <MnCallout variant="success" icon="error" title="Attention!">
                <p>Body</p>
            </MnCallout>
        );

        expect(screen.getByTestId("callout-icon").textContent).toBe("error");
    });
});