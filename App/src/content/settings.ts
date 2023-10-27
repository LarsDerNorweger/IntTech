import { vektor } from "../helpers/Vektor.js";
import { create, createText, role } from "../helpers/dom.js";
import { createButton } from "../helpers/picoCss.js";

export interface settings
{
  ratio: vektor,
  obstaclewitdth: number,
  obstacleCount: number,
}

export function createSettings(onSave: (val: settings) => void, preVal: settings)
{
  let mod = create('dialog', document.body);

  let a = create('article', mod);

  createButton('', () => mod.open = false, a, false, 'close', 'secondary');

  let sl = createObstacleSlider(a, preVal.obstacleCount);
  create('input', a);
  let g = create('footer', a, 'grid');
  createButton('Abbrechen', () => mod.open = false, g, false, 'secondary');
  createButton('Anwenden', () =>
  {
    mod.open = false;
    onSave({ ...preVal, ...{ obstacleCount: Number.parseInt(sl.value) } });
  }, g
  );

  return mod;
}

function createObstacleSlider(a: HTMLElement, val: number)
{
  let l = create('label', a);
  l.setAttribute('for', 'obstacles');
  let s = create('input', a);
  s.type = 'range';
  s.id = 'obstacles';
  s.min = '5';
  s.max = '50';
  s.value = val + '';
  l.innerText = 'Anzahl der Hindernisse ' + s.value;
  s.oninput = () => { l.innerText = 'Anzahl der Hindernisse ' + s.value; };
  return s;
}
