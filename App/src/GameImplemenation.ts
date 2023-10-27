/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { Orientation } from "./game/interfaces.js";
import { Manager } from "./game/Manager.js";
import { vektor, Vektor } from "./helpers/Vektor.js";


export function createGame(target: HTMLElement, ratio: vektor, obstacleCount: number, obstacleWidth: number)
{
  let man = new Manager(target, ratio);

  man.addScene((g, c) =>
  {
    c.fillStyle = "#3095A1";
    c.fillRect(g.start[0], g.start[1], g.size[0], g.size[1]);
  });

  man.addPlayer((g, c) =>
  {
    switch (g.orientation)
    {
      case Orientation.left: c.fillStyle = "#F0F"; break;
      case Orientation.right: c.fillStyle = "#FfF"; break;
      case Orientation.none: c.fillStyle = "#Ff0"; break;
    }

    c.fillRect(g.start[0], g.start[1], g.size[0], g.size[1]);
  }, Vektor.create(10, 20));

  man.addObstacele((g, c) =>
  {
    c.fillStyle = "#EEE";
    c.fillRect(g.start[0], g.start[1], g.size[0], g.size[1]);
    c.fillStyle = "#000";
    c.fillText(g.id + '', g.start[0], g.start[1] + g.size[1]);
  }, obstacleCount, Vektor.create(obstacleWidth, 10));

  return man;
}

