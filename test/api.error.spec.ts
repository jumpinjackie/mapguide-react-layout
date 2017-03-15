import { MgError, isSessionExpiredError } from "../src/api/error";

describe("api/error", () => {
    describe("isSessionExpiredError", () => {
        it("returns true for MgSessionExpiredException", () => {
            expect(isSessionExpiredError(new MgError("MgSessionExpiredException"))).toBe(true);
        });
        it("returns false for non-session-expiry", () => {
            expect(isSessionExpiredError(new MgError("asdgdsifdf"))).toBe(false);
        });
    });
});