import { create, role } from "./dom.js";

export
{
  createButton,
  createSlider
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

function createSlider(text: string, oninput: (value: number) => void, min: number, max: number, target: HTMLElement)
{
  let node = create('div', target);
  let l = create('label', node);
  let i = id++ + '_slider';
  l.setAttribute('for', i);
  let s = create('input', node);
  s.type = 'range';
  s.id = i;
  s.min = min + '';
  s.max = max + '';
  setText();
  s.onchange = () =>
  {
    setText();
    oninput(Number.parseInt(s.value));
  };

  return {
    node: node,
    value: () => Number.parseInt(s.value),
    setValue: (x: number) =>
    {
      s.value = x + '';
      setText();
    },
    min: (x: number) => s.min = x + '',
    max: (x: number) => s.max = x + ''
  };

  function setText()
  {
    l.innerText = text + ' ' + s.value;
  }
}

let id = 0;
