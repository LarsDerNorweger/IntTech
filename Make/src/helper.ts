/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/
import { watch, existsSync, rmSync, mkdirSync, statSync, WatchEventType, readdirSync } from 'fs'
import { platform } from 'os'
import { isAbsolute, join } from 'path'

export { cleanUp, getAbsoluteOrResolve, fileWatcher }

function cleanUp(directory: string) {
  if (!isAbsolute(directory))
    throw Error("Only Absolut path could be processed")
  if (existsSync(directory))
    rmSync(directory, { recursive: true })
  mkdirSync(directory)
}

function getAbsoluteOrResolve(base: string, path: string) {
  return isAbsolute(path) ? path : join(base, path)
}

type FileChangeEvent = (type: WatchEventType, filename: string) => void

function fileWatcher(path: string, handleChange: FileChangeEvent) {
  // nur directorys werden überwacht => resourcenschonung für Linux
  if (!statSync(path).isDirectory())
    return

  console.log('WATCH DIRECTORY' + path)

  let last = ''
  let timer: NodeJS.Timeout | null = null
  // Kann nur unter windows rekursiv benutzt werden, da inotify nur meldungen auf directory ebene unterstützt
  watch(path, { recursive: process.platform == 'win32' }, (e, f) => handler(e, f ?? ''))
  if (process.platform == 'win32')
    return

  for (let i of readdirSync(path))
    fileWatcher(join(path, i), handleChange)

  function handler(type: WatchEventType, filename: string) {
    if (last != filename || timer == null) {
      if (timer)
        clearTimeout(timer)
      handleChange(type, filename)
      timer = setTimeout(() => { timer = null }, 50)
      last = filename
    }
  }
}

