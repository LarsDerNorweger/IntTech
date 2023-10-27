/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { PhysikalEntity } from "./PhysikalEntity.js";
import { renderHandler } from "./interfaces.js";

export class Obstacle extends PhysikalEntity
{
  constructor(renderhandle: renderHandler)
  {
    super(renderhandle);
    this.setNextId();
  }

  static reset()
  {
    Obstacle.m_Id = 0;
  }

  setNextId()
  {
    this.m_context.id = Obstacle.m_Id++;
  }
  static m_Id = 0;
}