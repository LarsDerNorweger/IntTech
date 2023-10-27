/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { createGame } from "./GameImplemenation.js";
import { createSettings, settings } from "./content/settings.js";
import { Vektor, vektor } from "./helpers/Vektor.js";
import { clear, create, role } from "./helpers/dom.js";



export function createPage()
{
  let sett = createSettings(openGame, { obstacleCount: 10, obstaclewitdth: 50, ratio: Vektor.create(600, 900) });

  let page = create('main', document.body, 'container');
  let grid = create('div', page);
  grid.id = "GameGrid";

  let trg = create('div', grid);
  trg.id = 'Game';
  let info = create('div', grid);
  info.id = "GameInfo";

  let header = create('nav', info, 'container-fluid');
  let grp = create('hgroup', header);
  create('h3', grp).innerText = "Jumper";
  create('p', grp).innerText = "Beleg für BA-Glauchau";

  let points = create('p', info);
  let btnInfo = create('button', info, 'outline', 'secondary');
  btnInfo.innerText = 'Info';

  let btnSet = create('button', info, 'outline', 'secondary');
  btnSet.innerText = 'Einstellungen';
  btnSet.onclick = () => sett.open = true;


  let cb = create('div', grid);
  cb.id = 'GameButton';

  let btn = create('button', cb, 'primary', 'outline');
  btn.innerText = 'Start';

  openGame({ obstacleCount: 10, obstaclewitdth: 50, ratio: Vektor.create(600, 900) });

  function openGame(settings: settings)
  {
    clear(trg);
    let game = createGame(trg, settings.ratio, settings.obstacleCount, settings.obstaclewitdth);

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

      btn.innerText = 'neu Starten';
      btn.focus();
    };
    game.handleScoreChange = x => points.innerText = `${x} Punkte`;
  }
}


function createHeader() { }