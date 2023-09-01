const run = require('../Make/.out/make')

run.run({
    tsconfig: "tsconfig",
    finalResult: ".dist",
    typescript: "src/main.ts",
    css: "css",
    module: true,
    minify: false,
    singleFile: false,
}, __dirname)