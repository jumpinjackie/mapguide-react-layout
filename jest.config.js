module.exports = {
    testEnvironment: "node",
    transform: {
        ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
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
    setupTestFrameworkScriptFile: "<rootDir>/jest-setup-framework.js",
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
        "__DEV__": true
    }
};