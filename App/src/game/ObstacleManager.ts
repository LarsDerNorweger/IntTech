/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { vektor, Vektor } from "../helpers/Vektor.js";
import { Globals } from "./Globals.js";
import { Obstacle } from "./obstacle.js";
import { Player } from "./player.js";


export class ObstacleManager
{
  hasCollision(player: Player): boolean
  {
    for (let o of this.m_obstacles)
      if (o.checkCollision(player) && o.boundaryBox.begin[1] > player.boundaryBox.begin[1])
        return true;
    return false;
  }

  get count() { return this.m_obstacles.length; }

  constructor(size: vektor)
  {
    this.m_size = Array.from(size);
  }

  assignObstacle(obstacle: Obstacle)
  {
    this.m_obstacles.push(obstacle);
    let v = (this.m_size[1] / this.m_obstacles.length);
    for (let o of this.m_obstacles)
    {
      let y = this.m_obstacles.indexOf(o) * v;
      let x = Math.random() * this.m_size[0];
      o.setStart(Vektor.create(x, y));
    }
  }

  shiftObstacles(amount: number)
  {
    if (amount < 0)
      return;
    let ok = [];
    let n = [];
    for (let o of this.m_obstacles)
    {
      o.context.start[1] += Globals.gravity / 2;

      if (o.context.start[1] > this.m_size[1])
      {
        o.context.start[0] = Math.random() * this.m_size[0];
        n.push(o);
      }
      else ok.push(o);
    }
    this.m_obstacles = n.concat(ok);

    let v = (this.m_size[1] / this.m_obstacles.length);
    for (let o of this.m_obstacles)
    {
      if (n.includes(o))
        o.setStart(Vektor.create(o.context.start[0], this.m_obstacles.indexOf(o) * v));
      else o.setStart(o.context.start);
    }
  }

  render(context: CanvasRenderingContext2D)
  {
    for (let o of this.m_obstacles)
      o.render(context);
  }

  checkAndHandleCollision(player: Player)
  {
    let res = Globals.gravity;
    if (this.hasCollision(player))
      res = 0;
    if (!player.doJump)
      this.shiftObstacles(this.m_size[1] / 2 - player.height);
    return res;
  }

  m_obstacles: Obstacle[] = [];
  m_size: vektor;
};
