/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { Area, area } from "./Area";
import { Vektor } from "./Vektor";

export function isColliding(area1: area, area2: area): boolean {
  // if (Area.area(area1) == 0 || Area.area(area2))
  //   return false
  let l1 = area1.begin
  let r1 = Vektor.add(area1.begin, area1.size)
  let l2 = area2.begin
  let r2 = Vektor.add(area2.begin, area2.size)
  console.log(area1, area2, l1, r1, l2, r2)
  if (l1[0] > r2[0] || l2[0] > r1[0]) {
    console.log(l1[0] > r2[0] || l2[0] > r1[0], l1[0], r2[0], l2[0], r1[0], "x")
    return false
  }
  if (r1[1] < l2[1] || r2[1] < l1[1]) {
    console.log(r1[1] > l2[1] || r2[1] > l1[1], r1[1], l2[1], r2[1], l1[1], "y")
    return false
  }
  console.log("true")
  return true
}