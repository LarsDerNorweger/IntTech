/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { vektor, Vektor } from "../helpers/Vektor.js";
import { Obstacle } from "./obstacle.js";
import { Player } from "./player.js";

export class ObstacleManager
{
  constructor(size: vektor)
  {
    this.m_size = Array.from(size);
  }


  assignObstacle(obstacle: Obstacle)
  {
    this.m_obstacles = [];
  }

  shiftObstacles(rate: number)
  {

  }

  checkAndHandleCollision(player: Player)
  {

  };

  m_obstacles: Obstacle[];
  m_size: vektor;
};