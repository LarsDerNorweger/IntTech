/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { vektor, Vektor } from "../helpers/Vektor.js";
import { Orientation, renderHandler } from "./interfaces.js";
import { Manager } from "./Manager.js";
import { PhysikalEntity } from "./PhysikalEntity.js";

let offset = 10;

export class Player extends PhysikalEntity
{
  set jumpSize(value: number)
  {
    this.m_jumpsize = value / 2.4;
    console.log(value);
  }
  get height(): number
  {
    return this.boundaryBox.begin[1];
  }

  get doJump(): boolean { return this.jump > 0; }

  handleJump()
  {
    this.jump = this.m_jumpsize;
    console.log(this.jump);
    this.m_context.orientation = Orientation.none;
  }
  handleLeft()
  {
    this.m_position -= offset;
    this.m_context.orientation = Orientation.left;
  }
  handleRight()
  {
    this.m_position += offset;
    this.m_context.orientation = Orientation.right;
  }

  performGameCycle(gravity: number)
  {
    this.jump = this.jump > 0 ? this.jump - 2 * gravity || 1.2 : 0;

    if (this.m_position != 0)
    {
      if (this.m_position > 0)
        this.m_position -= 2;
      else if (this.m_position < 0)
        this.m_position += 2;
    }
    this.move([this.m_position, -this.jump + gravity]);
  }

  private jump = 0;
  private m_jumpsize = 0;
  private m_position = 0;
}

