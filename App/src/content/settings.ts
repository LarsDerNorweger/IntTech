import { Manager } from "../game/Manager.js";
import { keyMap } from "../game/interfaces.js";
import { SelectionManager } from "../helpers/SelectionManager.js";
import { Vektor, vektor } from "../helpers/Vektor.js";
import { create, createText, role } from "../helpers/dom.js";
import { createAcordion, createButton, createSlider } from "../helpers/picoCss.js";

export interface settings
{
  ratio: vektor,
  keys: keyMap,
  obstaclewitdth: number,
  obstacleCount: number,
}

export function createSettings(onSave: (val: settings) => void, preVal: settings)
{
  let mod = create('dialog', document.body);
  let manager = new SelectionManager<HTMLDetailsElement>(e =>
  {
    e.open = true;
  }, e => e.open = false, true);

  let node = create('article', mod);

  createButton('', () => mod.open = false, node, false, 'close', 'secondary');

  let setObstc = createAcordion('Hindernisse', node);
  manager.add(setObstc);

  let oCount = createSlider('Anzahl der Hindernisse', (x) => { }, 5, 50, setObstc);
  oCount.setValue(preVal.obstacleCount);
  let oSize = createSlider('Breite der Hindernisse', (x) => { }, 50, 500, setObstc);
  oSize.setValue(preVal.obstaclewitdth);

  let setRatio = createAcordion('Spielfeld', node);
  manager.add(setRatio);
  let heigh = createSlider('Höhe', renderAndCalculateRatio, 1, 16, setRatio);
  heigh.setValue(16);
  let width = createSlider('Breite', renderAndCalculateRatio, 1, 16, setRatio);
  width.setValue(9);
  let p = create('p', setRatio);

  let setKeys = createAcordion('Tasten', node);
  manager.add(setKeys);

  let keys = new SelectionManager<HTMLButtonElement>(
    e =>
    {
      node.onkeydown = ev => handleKeyDown(e, ev);
      e.classList.remove('outline');
    },
    e => e.classList.add('outline')
  );
  for (let i of Object.keys(preVal.keys))
  {
    let x = createButton(`${i} => "${preVal.keys[<keyof keyMap>i]}"`, _ => { }, setKeys, true, "secondary", "outline") as HTMLButtonElement;
    keys.add(x);
    x.setAttribute('_data', i);
  }

  function handleKeyDown(element: HTMLButtonElement, event: KeyboardEvent)
  {
    let i = <keyof keyMap | undefined>element.getAttribute('_data');
    console.log(element, event, typeof i);
    if (!i)
      return console.warn('No key is stored on Button');

    let k = event.key.toLowerCase();

    if (Object.values(preVal.keys).find(x => x == k))
      return;
    node.onkeydown = () => { };
    preVal.keys[i] = k;
    element.innerText = `${i} => "${preVal.keys[<keyof keyMap>i]}"`;
    element.classList.add('outline');
    event.preventDefault();
  };
  let g = create('footer', node);
  createButton('Abbrechen', () => mod.open = false, g, false, 'secondary');
  createButton('Anwenden', () =>
  {
    mod.open = false;
    onSave({
      obstaclewitdth: oSize.value(), obstacleCount: oCount.value(), ratio: renderAndCalculateRatio(), keys: preVal.keys
    });
  }, g
  );

  function renderAndCalculateRatio()
  {
    let h = heigh.value();
    let w = width.value();
    p.innerText = `Seitenverhältniss: ${h}:${w}`;
    if (h > w)
    {
      let aw = Math.floor(1024 * w / h);
      oSize.max(aw);
      return Vektor.create(aw, 1024);
    }
    else
    {
      let ah = Math.floor(1024 * h / w);
      oSize.max(1024);
      return Vektor.create(1024, ah);
    }
  }

  return mod;
}


