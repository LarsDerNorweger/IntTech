import { Vektor, vektor } from "../helpers/Vektor.js";
import { create, createText, role } from "../helpers/dom.js";
import { createAcordion, createButton, createSlider } from "../helpers/picoCss.js";

export interface settings
{
  ratio: vektor,
  obstaclewitdth: number,
  obstacleCount: number,
}

export function createSettings(onSave: (val: settings) => void, preVal: settings)
{
  let mod = create('dialog', document.body);

  let node = create('article', mod);

  createButton('', () => mod.open = false, node, false, 'close', 'secondary');

  let setObstc = createAcordion('Hindernisse', node);

  let oCount = createSlider('Anzahl der Hindernisse', (x) => { }, 5, 50, setObstc);
  oCount.setValue(preVal.obstacleCount);
  let oSize = createSlider('Breite der Hindernisse', (x) => { }, 50, 500, setObstc);
  oSize.setValue(preVal.obstaclewitdth);

  let setRatio = createAcordion('Spielfeld', node);
  let heigh = createSlider('Höhe', renderAndCalculateRatio, 1, 16, setRatio);
  let width = createSlider('Breite', renderAndCalculateRatio, 1, 16, setRatio);
  let p = create('p', setRatio);

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
  let setKeys = createAcordion('Tasten', node);

  let g = create('footer', node);
  createButton('Abbrechen', () => mod.open = false, g, false, 'secondary');
  createButton('Anwenden', () =>
  {
    mod.open = false;
    onSave({ obstaclewitdth: oSize.value(), obstacleCount: oCount.value(), ratio: renderAndCalculateRatio() });
  }, g
  );
  return mod;
}
