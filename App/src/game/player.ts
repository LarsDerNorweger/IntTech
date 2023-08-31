/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { Orientation } from "./interfaces.js";
import { PhysikalEntity } from "./PhysikalEntity.js";



export class Player extends PhysikalEntity
{
  set onScoreChange(value: (value: number) => void) { this.fireScoreChange = value; };

  set score(value: number)
  {
    if (this.m_lastscore >= value)
      return;
    this.m_lastscore = value;
    this.fireScoreChange && this.fireScoreChange(this.m_lastscore);
  }
  set jumpSize(value: number) { this.m_jumpsize = Math.ceil(value / 2.4); }
  get height(): number { return this.boundaryBox.begin[1]; }
  set offset(value: number) { this.m_offset = Math.ceil(value); }

  get doJump(): boolean { return this.m_jump > 0; }

  handleJump()
  {
    this.m_jump = this.m_jumpsize;
    this.m_context.orientation = Orientation.none;
  }
  handleLeft()
  {
    this.m_position -= this.m_offset;
    this.m_context.orientation = Orientation.left;
  }
  handleRight()
  {
    this.m_position += this.m_offset;
    this.m_context.orientation = Orientation.right;
  }

  performGameCycle(gravity: number)
  {
    this.m_jump = this.m_jump > 0 ? this.m_jump - 2 * gravity || 1.2 : 0;

    if (this.m_position != 0)
    {
      if (this.m_position > 0)
        this.m_position -= 2;
      else if (this.m_position < 0)
        this.m_position += 2;
    }
    this.move([this.m_position, Math.ceil(-this.m_jump + gravity)]);
  }

  private m_offset = 0;
  private m_lastscore = 0;
  private m_jump = 0;
  private m_jumpsize = 0;
  private m_position = 0;
  private fireScoreChange?: (value: number) => void;
}

