const run = require('../Make/.out/make')

run.run({
    tsconfig: "tsconfig",
    typescript: "src/main.ts",
    singleFile: true,
    sass: "css/main.sass",
    minify: true,
}, __dirname)