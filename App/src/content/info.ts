import { create, createText, role } from "../helpers/dom.js";
import { createAcordion, createButton } from "../helpers/picoCss.js";

export function createInfo()
{
  let mod = create('dialog', document.body);
  let node = create('article', mod);
  createButton('', () => mod.open = false, node, false, 'close', 'secondary');
  createText('h2', node, 'Infomation');
  createText("p", node, 'Das ist ein Projekt von Studenten der BA Glauchau für Internettechnologieen');
  createText("p", node, 'Die Autoren sind:');
  let list = create('ul', node);
  createText('li', list, 'Colin Böttger');
  createText('li', list, 'Oskar Wolny');

  let acc = createAcordion('Benutzte bibliotheken', node);
  createButton('Benutzte Bibliotheken', () => { window.open('https://picocss.com/'); }, acc, true);

  createButton('Github', () => { window.open("https://github.com/LarsDerNorweger/IntTech"); }, node, true);

  let foo = create('footer', node);
  createButton('Schließen', () => { mod.open = false; }, foo);
  return mod;
}