module.exports = {
    testEnvironment: "node",
    transform: {
        ".(ts|tsx)": "ts-jest"
    },
    testRegex: "(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json"
    ],
    setupFiles: [
        "raf/polyfill"
    ],
    setupFilesAfterEnv: [
        "<rootDir>/jest-setup-framework.js"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|cur|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
        "\\.(css|less)$": "<rootDir>/mocks/styleMock.js"
    },
    modulePathIgnorePatterns: [
        "<rootDir>[/\\\\](build|docs|node_modules|package)[/\\\\]"
    ],
    coveragePathIgnorePatterns: [
        "<rootDir>/test-data/",
        "<rootDir>/node_modules/"
    ],
    globals: {
        "__DEV__": true,
        "__COMMITHASH__": "abcd1234"
    }
};