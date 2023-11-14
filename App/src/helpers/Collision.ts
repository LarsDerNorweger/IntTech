/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { area } from "./Area.js";
import { Vektor } from "./Vektor.js";

export function isColliding(area1: area, area2: area): boolean
{
  let l1 = area1.begin;
  let r1 = Vektor.add(area1.begin, area1.size);
  let l2 = area2.begin;
  let r2 = Vektor.add(area2.begin, area2.size);
  if (l1[0] > r2[0] || l2[0] > r1[0])
    return false;
  if (r1[1] < l2[1] || r2[1] < l1[1])
    return false;
  return true;
}