/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { ImageBuffer } from "./helpers/ImageBuffer.js";
import { createPage } from "./page.js";
import { images } from "./resources.js";

async function main()
{
  let pool = [];
  pool.push(ImageBuffer.load(images.front));
  pool.push(ImageBuffer.load(images.side));
  await Promise.all(pool);
  createPage();


}
main();