import { create, createText } from "../helpers/dom";
import { createButton } from "../helpers/picoCss.js";

export function createInfo()
{
  let mod = create('dialog', document.body);
  let node = create('article', mod);
  createButton('', () => mod.open = false, node, false, 'close', 'secondary');

  createText('h2', node, '');
}