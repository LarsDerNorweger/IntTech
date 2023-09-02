"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileTypescript = exports.readTsConfig = void 0;
const ts = require("typescript");
const path = require("path");
const fs = require("fs");
const helper_1 = require("./helper");
function readTsConfig(path) {
    if (!path.endsWith('.json'))
        path += ".json";
    if (!fs.existsSync(path))
        throw Error("Cant find tsconfig");
    try {
        let res = new TextDecoder().decode(fs.readFileSync(path));
        return JSON.parse(res)["compilerOptions"];
    }
    catch (e) {
        throw Error("Cant read tsconfig");
    }
}
exports.readTsConfig = readTsConfig;
function compileTypescript(base, opt, tsconfig) {
    if (tsconfig.outDir)
        (0, helper_1.cleanUp)(path.join(base, tsconfig.outDir));
    const host = createCompilerHost(tsconfig, [], base);
    const program = ts.createProgram([path.join(base, opt.typescript)], tsconfig, host);
    program.emit();
}
exports.compileTypescript = compileTypescript;
function createCompilerHost(options, moduleSearchLocations, base) {
    options.module = ts.ModuleKind[options.module];
    options.target = ts.ScriptTarget[options.target];
    console.log(options.module);
    return {
        getSourceFile,
        getDefaultLibFileName: () => "lib.d.ts",
        writeFile,
        getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
        getDirectories: path => ts.sys.getDirectories(path),
        getCanonicalFileName: fileName => ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
        getNewLine: () => ts.sys.newLine,
        useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
        fileExists,
        readFile,
        resolveModuleNames
    };
    function writeFile(fileName, content) {
        let tg = path.join(base, fileName);
        ts.sys.writeFile(tg, content);
    }
    function fileExists(fileName) {
        return ts.sys.fileExists(fileName);
    }
    function readFile(fileName) {
        return ts.sys.readFile(fileName);
    }
    function getSourceFile(fileName, languageVersion, onError) {
        const sourceText = ts.sys.readFile(fileName);
        return sourceText !== undefined
            ? ts.createSourceFile(fileName, sourceText, languageVersion)
            : undefined;
    }
    function resolveModuleNames(moduleNames, containingFile) {
        const resolvedModules = [];
        for (const moduleName of moduleNames) {
            let result = ts.resolveModuleName(moduleName, containingFile, options, {
                fileExists,
                readFile
            });
            if (result.resolvedModule) {
                resolvedModules.push(result.resolvedModule);
            }
            else {
                for (const location of moduleSearchLocations) {
                    const modulePath = path.join(location, moduleName + ".d.ts");
                    if (fileExists(modulePath)) {
                        resolvedModules.push({ resolvedFileName: modulePath });
                    }
                }
            }
        }
        return resolvedModules;
    }
    function compile(sourceFiles, moduleSearchLocations) {
        const options = {
            module: ts.ModuleKind.AMD,
            target: ts.ScriptTarget.ES5
        };
    }
}
