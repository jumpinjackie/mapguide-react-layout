import { describe, it, expect } from "vitest";
import { immutableUpdate } from "../../src/utils/immutable";

describe("utils/immutable", () => {
    describe("immutableUpdate", () => {
        it("returns state unchanged for empty spec", () => {
            const state = { a: 1, b: 2 };
            const result = immutableUpdate(state, {});
            expect(result).toEqual(state);
        });

        describe("$merge", () => {
            it("merges new properties into an object at top level", () => {
                const state = { a: 1, b: 2 };
                const result = immutableUpdate(state, { "$merge": { b: 3, c: 4 } });
                expect(result).toEqual({ a: 1, b: 3, c: 4 });
            });

            it("does not mutate the original object", () => {
                const state = { a: 1, b: 2 };
                immutableUpdate(state, { "$merge": { b: 3 } });
                expect(state).toEqual({ a: 1, b: 2 });
            });

            it("merges nested one level deep", () => {
                const state = {
                    flyouts: {
                        "flyoutA": { open: true, metrics: { posX: 0, posY: 0 } }
                    }
                };
                const spec = {
                    flyouts: {
                        "flyoutA": {
                            "$merge": { open: false, metrics: null }
                        }
                    }
                };
                const result = immutableUpdate(state, spec);
                expect(result).toEqual({
                    flyouts: {
                        "flyoutA": { open: false, metrics: null }
                    }
                });
            });

            it("handles $merge on nested key that did not previously exist", () => {
                const state: any = {};
                const spec = {
                    flyouts: {
                        "flyoutB": {
                            "$merge": { open: true }
                        }
                    }
                };
                const result = immutableUpdate(state, spec);
                expect(result).toEqual({
                    flyouts: {
                        "flyoutB": { open: true }
                    }
                });
            });
        });

        describe("$set", () => {
            it("replaces the value entirely at top level", () => {
                const state = { a: 1, b: 2 };
                const result = immutableUpdate(state, { "$set": { x: 10, y: 20 } });
                expect(result).toEqual({ x: 10, y: 20 });
            });

            it("does not mutate the original object", () => {
                const state = { a: 1 };
                immutableUpdate(state, { "$set": { b: 2 } });
                expect(state).toEqual({ a: 1 });
            });

            it("replaces nested value entirely", () => {
                const state = {
                    flyouts: {
                        "flyoutA": { open: true }
                    }
                };
                const spec = {
                    flyouts: {
                        "flyoutA": {
                            "$set": { open: false, metrics: null, componentName: "X" }
                        }
                    }
                };
                const result = immutableUpdate(state, spec);
                expect(result).toEqual({
                    flyouts: {
                        "flyoutA": { open: false, metrics: null, componentName: "X" }
                    }
                });
            });

            it("creates the key if it does not exist", () => {
                const state: any = {};
                const spec = {
                    flyouts: {
                        "newFlyout": {
                            "$set": { open: true, componentName: "Hello" }
                        }
                    }
                };
                const result = immutableUpdate(state, spec);
                expect(result).toEqual({
                    flyouts: {
                        "newFlyout": { open: true, componentName: "Hello" }
                    }
                });
            });
        });

        describe("combined spec (multiple keys)", () => {
            it("applies multiple commands to different keys at once", () => {
                const state = {
                    flyouts: {
                        "flyoutA": { open: true, metrics: { posX: 0, posY: 0 } },
                        "flyoutB": { open: false, metrics: null }
                    }
                };
                const spec = {
                    flyouts: {
                        "flyoutA": {
                            "$merge": { open: false }
                        },
                        "flyoutB": {
                            "$merge": { open: true, metrics: { posX: 50, posY: 25 } }
                        }
                    }
                };
                const result = immutableUpdate(state, spec);
                expect(result).toEqual({
                    flyouts: {
                        "flyoutA": { open: false, metrics: { posX: 0, posY: 0 } },
                        "flyoutB": { open: true, metrics: { posX: 50, posY: 25 } }
                    }
                });
            });

            it("does not mutate original when applying multiple commands", () => {
                const state = {
                    flyouts: {
                        "flyoutA": { open: true },
                        "flyoutB": { open: false }
                    }
                };
                immutableUpdate(state, {
                    flyouts: {
                        "flyoutA": { "$merge": { open: false } },
                        "flyoutB": { "$merge": { open: true } }
                    }
                });
                expect(state).toEqual({
                    flyouts: {
                        "flyoutA": { open: true },
                        "flyoutB": { open: false }
                    }
                });
            });
        });

        describe("modal use-case ($merge on modal sub-key)", () => {
            it("applies $merge to a nested modal property", () => {
                const state = {
                    "Google": {
                        modal: { title: "Google", backdrop: true, size: [400, 500], position: [100, 100] },
                        name: "Google"
                    }
                };
                const spec = {
                    "Google": {
                        modal: {
                            "$merge": { size: [800, 600], position: [120, 140] }
                        }
                    }
                };
                const result = immutableUpdate(state, spec);
                expect(result).toEqual({
                    "Google": {
                        modal: { title: "Google", backdrop: true, size: [800, 600], position: [120, 140] },
                        name: "Google"
                    }
                });
            });
        });
    });
});
