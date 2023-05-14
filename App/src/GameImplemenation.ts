/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { Orientation } from "./game/interfaces.js";
import { Manager } from "./game/Manager.js";
import { Vektor } from "./helpers/Vektor.js";

let man = new Manager(document.body, Vektor.create(900, 300));

man.addScene((g, c) =>
{
  c.fillStyle = "#0F0";
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
man.addObstacele((g, c) => { }, 1);

man.handleGameOver = () => { console.log("You have Lost"); };

man.startGameLoop();
