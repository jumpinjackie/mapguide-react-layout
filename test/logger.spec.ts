import * as logger from "../src/utils/logger";

describe("utils/logger", () => {
    describe("info", () => {
        it("calls console.info when __DEV__ == true", () => {
            const spy = jest.spyOn(console, "info").mockImplementation(() => {});
            logger.info("test");
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockReset();
        });
        it("is a no-op when __DEV__ == false", () => {
            (global as any)["__DEV__"] = false;
            const spy = jest.spyOn(console, "info").mockImplementation(() => {});
            logger.info("test");
            expect(spy).toHaveBeenCalledTimes(0);
            (global as any)["__DEV__"] = true;
            spy.mockReset();
        });
    });
    describe("warn", () => {
        it("calls console.warn when __DEV__ == true", () => {
            const spy = jest.spyOn(console, "warn").mockImplementation(() => {});
            logger.warn("test");
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockReset();
        });
        it("is a no-op when __DEV__ == false", () => {
            (global as any)["__DEV__"] = false;
            const spy = jest.spyOn(console, "warn").mockImplementation(() => {});
            logger.warn("test");
            expect(spy).toHaveBeenCalledTimes(0);
            (global as any)["__DEV__"] = true;
            spy.mockReset();
        });
    });
    describe("error", () => {
        it("calls console.error when __DEV__ == true", () => {
            const spy = jest.spyOn(console, "error").mockImplementation(() => {});
            logger.error("test");
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockReset();
        });
        it("is a no-op when __DEV__ == false", () => {
            (global as any)["__DEV__"] = false;
            const spy = jest.spyOn(console, "error").mockImplementation(() => {});
            logger.error("test");
            expect(spy).toHaveBeenCalledTimes(0);
            (global as any)["__DEV__"] = true;
            spy.mockReset();
        });
    });
});