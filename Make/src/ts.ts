import * as ts from "typescript";
import * as path from "path";
import * as fs from "fs";
import { cleanUp } from "./helper";
import { Options } from "./interfaces";


export function readTsConfig(path: string): ts.CompilerOptions {
  if (!path.endsWith('.json'))
      path += ".json";
  if (!fs.existsSync(path))
      throw Error("Cant find tsconfig")
  try {
      let res = new TextDecoder().decode(fs.readFileSync(path))
      return JSON.parse(res)["compilerOptions"] as ts.CompilerOptions
  }
  catch (e) {
      throw Error("Cant read tsconfig")
  }
}

export function compileTypescript(base :string,opt:Options,tsconfig: ts.CompilerOptions) {
  if(tsconfig.outDir)
      cleanUp(path.join(base,tsconfig.outDir))

  const host = createCompilerHost(tsconfig, [],base);
  const program = ts.createProgram([path.join(base,opt.typescript)], tsconfig, host);
  program.emit()
}

function createCompilerHost(options: ts.CompilerOptions, moduleSearchLocations: string[],base:string): ts.CompilerHost {
  options.module = ts.ModuleKind[options.module!] as unknown as ts.ModuleKind
  options.target = ts.ScriptTarget[options.target!] as unknown as ts.ScriptTarget
  console.log(options.module)
  return {
    getSourceFile,
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile,
    getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
    getDirectories: path => ts.sys.getDirectories(path),
    getCanonicalFileName: fileName =>
      ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
    getNewLine: () => ts.sys.newLine,
    useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
    fileExists,
    readFile,
    resolveModuleNames
  };

  function writeFile(fileName:string, content:string){
    let tg = path.join(base,fileName)
    ts.sys.writeFile(tg,content)
  }

  function fileExists(fileName: string): boolean {
    return ts.sys.fileExists(fileName);
  }

  function readFile(fileName: string): string | undefined {
    return ts.sys.readFile(fileName);
  }

  function getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) {
    const sourceText = ts.sys.readFile(fileName);
    return sourceText !== undefined
      ? ts.createSourceFile(fileName, sourceText, languageVersion)
      : undefined;
  }

  function resolveModuleNames(
    moduleNames: string[],
    containingFile: string
  ): ts.ResolvedModule[] {
    const resolvedModules: ts.ResolvedModule[] = [];
    for (const moduleName of moduleNames) {
      // try to use standard resolution
      let result = ts.resolveModuleName(moduleName, containingFile, options, {
        fileExists,
        readFile
      });
      if (result.resolvedModule) {
        resolvedModules.push(result.resolvedModule);
      } else {
        // check fallback locations, for simplicity assume that module at location
        // should be represented by '.d.ts' file
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
  
  function compile(sourceFiles: string[], moduleSearchLocations: string[]): void {
      const options: ts.CompilerOptions = {
          module: ts.ModuleKind.AMD,
          target: ts.ScriptTarget.ES5
        };
    }
}
 