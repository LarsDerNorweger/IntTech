/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { Orientation } from "./game/interfaces.js";
import { Manager } from "./game/Manager.js";
import { create } from "./helpers/dom.js";
import { Vektor } from "./helpers/Vektor.js";


/*
TODO Oskar : 
- Benutzerobefläche
- Graphik => base64 im js
- css
*/
/*
TODO Colin:
- Punktestand
- id für Obstacle
- makeskript => Singlepage
- minifiy js / css
*/

let c = create('div', document.body);
create('h1', c, "Ein komisches Spiel");
c.classList.add('container');
let man = new Manager(c, Vektor.create(400, 900));


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
}, 10, Vektor.create(50, 10));

man.handleGameOver = () => { console.log("You have Lost"); };
man.handleScoreChange = (s) => { console.log("score:", s); };
man.startGameLoop();
