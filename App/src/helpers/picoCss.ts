import { create, role } from "./dom.js";

export
{
  createButton
};


function createButton(text: string, onclick: () => void, target?: HTMLElement, big?: boolean, ...classes: string[]): HTMLAnchorElement | HTMLButtonElement
{
  let res = create(big ? 'button' : 'a', target, ...classes);
  if (res instanceof HTMLAnchorElement)
  {
    res.href = '#';
    role(res, 'button');
  }
  res.innerText = text;
  res.onclick = onclick;
  return res;
}
