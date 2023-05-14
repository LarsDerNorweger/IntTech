/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { vektor, Vektor } from "../helpers/Vektor.js";
import { Entity } from "./Entity.js";
import { renderHandler, SimulationContext } from "./interfaces.js";
import { Manager } from "./Manager.js";

export abstract class PhysikalEntity extends Entity
{
  setSize(value: vektor)
  {
    super.setSize(value);
    this.m_boundary.size = Array.from(value);
  }
  setStart(value: vektor)
  {
    super.setStart(value);
    this.m_boundary.start = Array.from(value);
  }

  move(dela: vektor)
  {
    this.setStart(Vektor.add(this.m_boundary.start, dela));
  }

  moveTo(position: vektor)
  {
    this.setStart(position);
  }

  get boundaryBox(): SimulationContext { return this.m_boundary; }

  constructor(manager: Manager, renderHandle: renderHandler)
  {
    super(manager, renderHandle);
    this.m_boundary = {
      size: Vektor.create(0, 0),
      start: Vektor.create(0, 0),
    };
  }

  checkCollision(entity: PhysikalEntity): boolean
  {
    // maybe incorrect

    let b1 = this.m_boundary;
    let b2 = entity.boundaryBox;

    let s1 = Vektor.lenght(b1.size);
    let s2 = Vektor.lenght(b2.size);

    let res = Vektor.subtract(Vektor.add(b1.start, b1.size), Vektor.add(b2.start, b2.size));
    let l = Vektor.lenght(res);
    if (l < s1 || l < s2)
      return true;
    return false;
  }

  checkButtom(entity: PhysikalEntity, tollerance: number): boolean
  {
    let b1 = Vektor.add(this.boundaryBox.start, this.boundaryBox.size);
    let b2 = Vektor.add(entity.boundaryBox.start, entity.boundaryBox.size);

    let r = Vektor.subtract(Vektor.add(b2, [tollerance, tollerance]), b1);
    return r[1] <= 0;
  }

  protected m_boundary: SimulationContext;
}