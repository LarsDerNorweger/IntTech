/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { Vektor } from "../helpers/Vektor.js";
import { Orientation, renderHandler } from "./interfaces.js";
import { Manager } from "./Manager.js";
import { PhysikalEntity } from "./PhysikalEntity.js";

let offset = 20;

export class Player extends PhysikalEntity
{
  handleJump()
  {
    this.jump = 20;
    this.m_context.orientation = Orientation.none;
  }
  handleLeft()
  {
    this.position -= offset;
    this.m_context.orientation = Orientation.left;
  }
  handleRight()
  {
    this.position += offset;
    this.m_context.orientation = Orientation.right;
  }

  performGameCycle(gravity: number)
  {
    if (gravity != 0)
      this.jump = this.jump > 0 ? this.jump - 2 * gravity : 0;
    else
      this.jump = 0;

    if (this.position != 0)
    {
      if (this.position > 0)
        this.position -= 2;
      else if (this.position < 0)
        this.position += 2;
    }
    this.move([this.position, -this.jump + gravity]);
  }

  private jump = 0;
  private position = 0;
}

