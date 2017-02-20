import * as logger from "../src/utils/logger";

describe("utils/logger", () => {
    describe("info", () => {
        it("calls console.info when __DEV__ == true", () => {
            spyOn(console, "info");
            logger.info("test");
            expect(console.info).toHaveBeenCalledTimes(1);
        });
        it("is a no-op when __DEV__ == false", () => {
            (global as any)["__DEV__"] = false;
            spyOn(console, "info");
            logger.info("test");
            expect(console.info).toHaveBeenCalledTimes(0);
            (global as any)["__DEV__"] = true;
        });
    });
    describe("warn", () => {
        it("calls console.warn when __DEV__ == true", () => {
            spyOn(console, "warn");
            logger.warn("test");
            expect(console.warn).toHaveBeenCalledTimes(1);
        });
        it("is a no-op when __DEV__ == false", () => {
            (global as any)["__DEV__"] = false;
            spyOn(console, "warn");
            logger.warn("test");
            expect(console.warn).toHaveBeenCalledTimes(0);
            (global as any)["__DEV__"] = true;
        });
    });
    describe("error", () => {
        it("calls console.error when __DEV__ == true", () => {
            spyOn(console, "error");
            logger.error("test");
            expect(console.error).toHaveBeenCalledTimes(1);
        });
        it("is a no-op when __DEV__ == false", () => {
            (global as any)["__DEV__"] = false;
            spyOn(console, "error");
            logger.error("test");
            expect(console.error).toHaveBeenCalledTimes(0);
            (global as any)["__DEV__"] = true;
        });
    });
});