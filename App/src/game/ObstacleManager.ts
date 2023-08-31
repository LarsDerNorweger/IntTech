/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { Area, area } from "../helpers/Area.js";
import { vektor, Vektor } from "../helpers/Vektor.js";
import { Globals } from "./Globals.js";
import { Obstacle } from "./obstacle.js";
import { Player } from "./player.js";


export class ObstacleManager
{
  hasCollision(player: Player): Obstacle | undefined
  {
    let tmp = Vektor.add(player.boundaryBox.begin, player.boundaryBox.size)[1] - 1;
    for (let o of this.m_obstacles)
      if (o.checkCollision(player) && o.boundaryBox.begin[1] >= tmp)
        return o;
    return undefined;
  }

  get count() { return this.m_obstacles.length; }

  get boundaryBox(): area
  {
    let n = Vektor.create(0, 0);
    if (this.m_obstacles.length <= 0)
      return Area.create(n, n);
    return this.m_obstacles[0].boundaryBox;
  }

  constructor(size: vektor)
  {
    this.m_size = Array.from(size);
  }

  assignObstacle(obstacle: Obstacle)
  {
    this.m_obstacles.push(obstacle);
  }

  prepareObstacles()
  {
    this.m_obstacles.reverse();
    let v = (this.m_size[1] / this.m_obstacles.length);
    for (let o of this.m_obstacles)
    {
      let y = this.m_obstacles.indexOf(o) * v;
      let x = Math.random() * this.m_size[0];
      o.setStart(Vektor.create(x, y));
    }
  }

  shiftObstacles(amount: number): number
  {
    if (amount < 0)
      return 0;

    let ok = [];
    let n = [];
    let f = this.m_size[1] / (this.m_size[1] - (this.m_size[1] / 3));
    console.log(f);
    let ax = Globals.gravity * f;
    for (let o of this.m_obstacles)
    {
      o.context.start[1] += ax;

      if (o.context.start[1] > this.m_size[1])
      {
        o.context.start[0] = Math.random() * this.m_size[0];
        o.setNextId();
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
    return ax;
  }

  render(context: CanvasRenderingContext2D)
  {
    for (let o of this.m_obstacles)
      o.render(context);
  }

  HandleCollisionAndGetGravity(player: Player)
  {
    let res = Globals.gravity;
    let c = this.hasCollision(player);
    if (c)
    {
      res = 0;
      player.score = c.context.id;
    }

    if (!player.doJump)
      res += this.shiftObstacles((2 * this.m_size[1] / 3) - player.height);
    return res;
  }

  m_obstacles: Obstacle[] = [];
  m_size: vektor;
};
