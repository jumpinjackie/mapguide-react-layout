import * as React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SessionExpired } from "../../src/components/session-expired";

describe("components/session-expired", () => {
    it("renders", () => {
        const { container } = render(<SessionExpired locale="en" />);
        const div = container.getElementsByTagName("div");
        expect(div).toHaveLength(1);
        const p = div[0].getElementsByTagName("p");
        const ul = div[0].getElementsByTagName("ul");
        expect(p).toHaveLength(2);
        expect(ul).toHaveLength(1);
        const li = ul[0].getElementsByTagName("li");
        expect(li).toHaveLength(1);
    });
});