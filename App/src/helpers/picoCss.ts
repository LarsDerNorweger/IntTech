import { create, createText, role } from "./dom.js";

export
{
  createButton,
  createSlider,
  createAcordion,
};


function createButton(text: string, onclick: (btn: HTMLElement, event: MouseEvent) => void, target?: HTMLElement, big?: boolean, ...classes: string[])
{
  let res = create(big ? 'button' : 'a', target, ...classes);
  if (res instanceof HTMLAnchorElement)
  {
    res.href = '#';
    role(res, 'button');
  }
  res.innerText = text;
  res.onclick = e => onclick(res, e);
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
  s.oninput = () =>
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

function createAcordion(text: string, target: HTMLElement)
{
  let res = create('details', target);
  createText('summary', res, text);
  return res;
}

let id = 0;
