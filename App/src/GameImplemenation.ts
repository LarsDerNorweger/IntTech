/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { commands } from "./commandList.js";
import { Orientation } from "./game/interfaces.js";
import { Manager } from "./game/Manager.js";
import { ImageBuffer } from "./helpers/ImageBuffer.js";
import { vektor, Vektor } from "./helpers/Vektor.js";
import { images } from "./resources.js";


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
      case Orientation.left:
        c.save();
        c.scale(-1, 1);
        c.drawImage(ImageBuffer.get(images.side), -g.start[0], g.start[1] - 20, g.size[0] + 10, g.size[1] + 20);
        c.restore();
        break;
      case Orientation.right:
        c.drawImage(ImageBuffer.get(images.side), g.start[0], g.start[1] - 20, g.size[0] + 10, g.size[1] + 20);
        break;
      case Orientation.none:
        c.drawImage(ImageBuffer.get(images.front), g.start[0], g.start[1] - 20, g.size[0] + 10, g.size[1] + 20);
        break;
    }
  }, Vektor.create(15, 25));

  man.addObstacele((g, c) =>
  {
    c.save();
    c.fillStyle = "#EEE";
    c.fillRect(g.start[0], g.start[1], g.size[0], g.size[1]);
    c.fillStyle = "#000";
    c.font = '15pt Calibri monospace';
    c.fillText(commands[g.id % commands.length], g.start[0], g.start[1] + g.size[1]);
    c.restore();
  }, obstacleCount, Vektor.create(obstacleWidth, 15));

  return man;
}

