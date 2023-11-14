/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { createGame } from "./GameImplemenation.js";
import { createInfo } from "./content/info.js";
import { createSettings, Settings } from "./content/settings.js";
import { Vektor } from "./helpers/Vektor.js";
import { clear, create, createText } from "./helpers/dom.js";
import { LocalStorage } from "./helpers/localStorage.js";
import { createButton } from "./helpers/picoCss.js";



export function createPage()
{
  let s = LocalStorage.load("GameSettings", {
    obstacleCount: 10, obstaclewitdth: 50, ratio: Vektor.create(600, 900), keys: {
      jump: ' ',
      left: 'a',
      right: 'd'
    }
  });
  let sett = createSettings(openGame, s);
  let cinfo = createInfo();
  let header = create('nav', document.body, 'container-fluid');

  let grp = create('ul', header);
  createText('b', create('li', grp), "Jumper");
  createText('small', create('li', grp), "Beleg für BA-Glauchau");

  let btnGrp = create('ul', header);

  let page = create('main', document.body, 'container');
  let grid = create('div', page);
  grid.id = "GameGrid";

  let trg = create('div', grid);
  trg.id = 'Game';
  let info = create('div', grid);
  info.id = "GameInfo";


  let btnInfo = createButton('Info', () =>
  {
    cinfo.open = true;
  }, btnGrp, false);

  let btnSet = create('button', info, 'outline', 'secondary');
  btnSet.innerText = 'Einstellungen';

  btnSet.onclick = () =>
  {
    sett.open = true;
    sett.focus();
  };
  let btn = createButton('Start', () => { }, info, true) as HTMLButtonElement;
  btn.focus();

  let cb = create('div', grid);
  cb.id = 'GameButton';
  let pg = create('progress', cb);
  let points = create('p', cb);

  openGame(s);

  function openGame(settings: Settings)
  {
    clear(trg);
    let game = createGame(trg, settings.ratio, settings.obstacleCount, settings.obstaclewitdth);
    game.keyMap = settings.keys;
    let h = LocalStorage.load('highscore', 0);
    pg.max = h;
    btn.onclick = () =>
    {
      btn.blur();
      game.startGameLoop();
      btn.disabled = true;
      btnSet.disabled = true;
    };

    game.handleGameOver = () =>
    {
      btn.disabled = false;
      btnSet.disabled = false;
      LocalStorage.save('highscore', h);
      pg.max = h;
      btn.innerText = 'neu Starten';
      btn.focus();
    };
    game.handleScoreChange = x =>
    {
      if (x > h)
      {
        h = x;
        pg.max = h;
        points.innerText = `Punkte: ${x} Highscore: ${pg.value}`;
      }
      else
      {
        pg.value = x;
        points.innerText = `Punkte: ${x} Highscore: ${h}`;
      }
    };
  }
}
