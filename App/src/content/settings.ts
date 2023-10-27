import { vektor } from "../helpers/Vektor.js";
import { create, createText, role } from "../helpers/dom.js";
import { createButton, createSlider } from "../helpers/picoCss.js";

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

  let oCount = createSlider('Anzahl der Hindernisse', (x) => { }, 5, 50, a);
  oCount.setValue(preVal.obstacleCount);
  let oSize = createSlider('Breite der Hindernisse', (x) => { }, 50, 500, a);
  oSize.setValue(preVal.obstaclewitdth);

  create('input', a);
  let g = create('footer', a);
  createButton('Abbrechen', () => mod.open = false, g, false, 'secondary');
  createButton('Anwenden', () =>
  {
    mod.open = false;
    onSave({ ...preVal, ...{ obstaclewitdth: oSize.value(), obstacleCount: oCount.value() } });
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
