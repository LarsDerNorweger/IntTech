/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

export class ImageBuffer {
  static async load(url: string) {
    if (this.buffer.has(url))
      return;
    return new Promise<void>((res, rej) => {
      let img = new Image(100, 100);
      img.onload = () => {
        this.buffer.set(url, img);
        res();
      };
      img.onerror = e => rej(`Failed load Image: ${url}`);
      img.src = url;
    });
  }
  static get(url: string) {
    let res = this.buffer.get(url);
    if (res)
      return res;
    throw Error(`url :${url}not yet loaded`);
  }
  static buffer: Map<string, HTMLImageElement> = new Map();
}
