/*------------------------------------------------
/*  private Math implementations
/*
/*  Autor: Colin Böttger
/*
/*  E-mail:boettger.colin@web.de
/*------------------------------------------------*/

import { Vektor, vektor } from "./Vektor.js";

export { area, Area };

interface area
{
  begin: vektor,
  size: vektor,
}

class Area
{
  static create(start: vektor, size: vektor): area
  {
    return {
      begin: Vektor.create(...start),
      size: Vektor.create(...size),
    };
  }

  static area(area: area): number
  {
    let t = area.size.reduce((a, x) => a *= x);
    return Math.abs(t);
  }
  private constructor() { }
}