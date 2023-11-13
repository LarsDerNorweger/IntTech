/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

export class ImageBuffer
{
  static async load(url: string)
  {
    if (this.buffer.has(url))
      return;
    return new Promise<void>((res, rej) =>
    {
      let img = new Image();
      img.onload = () =>
      {
        this.buffer.set(url, img);
        res();
      };
      img.onerror = rej;
    });
  }
  static get(url: string)
  {
    let res = this.buffer.get(url);
    if (res)
      return res;
    throw Error(`url :${url}not yet loaded`);
  }
  static buffer: Map<string, HTMLImageElement>;
}
