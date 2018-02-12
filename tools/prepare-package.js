/**
 * prepare-package.js
 *
 * This prepares a copy of package.json for npm packaging. This strips out extraneous nodes
 * from package.json for the prepared copy.
 */
const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");
const copyfiles = require("copyfiles");

const origPackageJson = path.resolve(__dirname, "../package.json");
jsonfile.readFile(origPackageJson, function(err, obj) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    delete obj.scripts;
    delete obj.greenkeeper;
    delete obj.jest;
    delete obj.devDependencies;
    obj.main = "lib/index.js";
    obj.types = "lib/index.d.ts";
    obj.typings = "lib/index.d.ts";
    obj.directories = {
        lib: "lib"
    };

    const packageDir = path.resolve(__dirname, "../package");
    if (!fs.existsSync(packageDir)){
        fs.mkdirSync(packageDir);
    }
    jsonfile.writeFile(path.resolve(__dirname, "../package/package.json"), obj, { spaces: 2 }, function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
});