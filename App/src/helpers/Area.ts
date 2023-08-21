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
    return area.size.reduce((a, x) => a *= x);
  }

  static doIntersect(area1: area, area2: area): boolean
  {
    if (Area.area(area1) == 0 || Area.area(area2) == 0)
      return false;
    let b1 = area1.begin;
    let b2 = area2.begin;

    let e1 = Vektor.add(b1, area1.size);
    let e2 = Vektor.add(b2, area2.size);
    //console.log(area1, area2);

    //RectA.X1 < RectB.X2 && RectA.X2 > RectB.X1 && RectA.Y1 > RectB.Y2 && RectA.Y2 < RectB.Y1;
    console.log(b1[0], e2[0], e1[0], b2[0], b1[1], e2[1], e1[1], b2[1]);
    return (b1[0] < e2[0] && e1[0] > b2[0] && b1[1] > e2[1] && e1[1] < b2[1]);
  }

  private constructor() { }
}