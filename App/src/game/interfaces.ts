/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { vektor } from "../helpers/Vektor.js";

export type renderHandler = (EntityContext: GraphikContext, renderingContext: CanvasRenderingContext2D) => void;

export enum Orientation
{
  none,
  left,
  right,
}

export interface GraphikContext
{
  start: vektor,
  size: vektor,
  id: number,
  orientation: Orientation,
}

export interface SimulationContext
{
  start: vektor,
  size: vektor,
};

export interface keyMap
{
  jump: string,
  left: string,
  right: string,
}