/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { test } from 'test';
import { Vektor } from './Vektor.js';
import { Area } from './Area.js';
import { isTrue } from './Assert';
import { isColliding } from './Collision.js';

let v1 = Vektor.create(1, 1);
let v2 = Vektor.create(1, 2);
let v3 = Vektor.create(2, 1);
let v4 = Vektor.create(3, 3);

test('Collision Tests', async t =>
{
  await t.test("isOverlapping", isOverlapping);
  await t.test("isIdendical", isIdendical);
  await t.test("dont overlap", dontOverlap);
});


function isOverlapping()
{
  let a1 = Area.create(v1, v1);
  let a2 = Area.create(v2, v1);
  let a3 = Area.create(v1, v3);
  isTrue(isColliding(a1, a2));
  isTrue(isColliding(a1, a3));
  isTrue(isColliding(a3, a1));
  isTrue(isColliding(a2, a1));
}
function isIdendical()
{
  let a1 = Area.create(v1, v1);
  isTrue(isColliding(a1, a1));
}
function dontOverlap()
{
  let a1 = Area.create(v1, v1);
  let a2 = Area.create(v4, v1);
  isTrue(!isColliding(a1, a2));
}
