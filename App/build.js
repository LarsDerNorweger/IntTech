const run = require('../Make/.out/make')

run.run({
    tsconfig: "tsconfig",
    typescript: "src/main.ts",
    singleFile: true,
    css: "css",
    minify: false,
}, __dirname)