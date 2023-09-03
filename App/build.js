const run = require('../Make/.out/make')

run.run({
    tsconfig: "tsconfig",
    typescript: "src/main.ts",
    singleFile: false,
    sass: "css/main.sass",
    minify: false,
}, __dirname)