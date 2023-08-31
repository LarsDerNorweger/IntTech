/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { area } from "../helpers/Area.js";
import { isColliding } from "../helpers/Collision.js";
import { vektor, Vektor } from "../helpers/Vektor.js";
import { Entity } from "./Entity.js";
import { renderHandler } from "./interfaces.js";

export abstract class PhysikalEntity extends Entity
{
  get boundaryBox(): area { return this.m_boundary; }

  constructor(renderHandle: renderHandler)
  {
    super(renderHandle);
    this.m_boundary = {
      size: Vektor.create(0, 0),
      begin: Vektor.create(0, 0),
    };
  }

  setSize(value: vektor)
  {
    super.setSize(value);
    this.m_boundary.size = Array.from(value);
  }

  setStart(value: vektor)
  {
    super.setStart(value);
    this.m_boundary.begin = Array.from(value);
  }

  move(delta: vektor)
  {
    this.setStart(Vektor.add(this.m_boundary.begin, delta));
  }

  moveTo(position: vektor)
  {
    this.setStart(position);
  }

  checkCollision(entity: PhysikalEntity): boolean
  {
    return isColliding(entity.boundaryBox, this.boundaryBox);
  }

  checkButtom(entity: PhysikalEntity, tollerance: number): boolean
  {
    let b1 = Vektor.add(this.boundaryBox.begin, this.boundaryBox.size);
    let b2 = Vektor.add(entity.boundaryBox.begin, entity.boundaryBox.size);

    let r = Vektor.subtract(Vektor.add(b2, [tollerance, tollerance]), b1);
    return r[1] <= 0;
  }

  protected m_boundary: area;
}