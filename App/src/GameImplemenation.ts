/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { Orientation } from "./game/interfaces.js";
import { Manager } from "./game/Manager.js";
import { ImageBuffer } from "./helpers/ImageBuffer.js";
import { vektor, Vektor } from "./helpers/Vektor.js";
import { images } from "./resources.js";


export function createGame(target: HTMLElement, ratio: vektor, obstacleCount: number, obstacleWidth: number) {
  let man = new Manager(target, ratio);

  man.addScene((g, c) => {
    c.fillStyle = "#3095A1";
    c.fillRect(g.start[0], g.start[1], g.size[0], g.size[1]);
  });

  man.addPlayer((g, c) => {
    switch (g.orientation) {
      case Orientation.left:
        c.save()
        c.scale(-1, 1)
        c.drawImage(ImageBuffer.get(images.side), -g.start[0], g.start[1], g.size[0] + 10, g.size[1]);
        c.restore()
        break;
      case Orientation.right:
        c.drawImage(ImageBuffer.get(images.side), g.start[0], g.start[1], g.size[0] + 10, g.size[1]);
        break;
      case Orientation.none:
        c.drawImage(ImageBuffer.get(images.front), g.start[0], g.start[1], g.size[0] + 10, g.size[1]);
        break;
    }
  }, Vektor.create(15, 25));

  man.addObstacele((g, c) => {
    c.fillStyle = "#EEE";
    c.fillRect(g.start[0], g.start[1], g.size[0], g.size[1]);
    c.fillStyle = "#000";
    c.fillText(g.id + '', g.start[0], g.start[1] + g.size[1]);
  }, obstacleCount, Vektor.create(obstacleWidth, 10));

  return man;
}

