/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { vektor, Vektor } from "../helpers/Vektor.js";
import { GraphikContext, Orientation, renderHandler } from "./interfaces.js";
import { Manager } from "./Manager.js";


export abstract class Entity
{
  get context(): GraphikContext { return this.m_context; }
  setSize(value: vektor) { this.m_context.size = value.map(x => Math.ceil(x)); }
  setStart(value: vektor) { this.m_context.start = value.map(x => Math.ceil(x)); }

  constructor(renderHandle: renderHandler)
  {
    this.m_renderHandler = renderHandle;
    this.m_context = {
      start: Vektor.create(0, 0),
      size: Vektor.create(0, 0),
      id: Manager.nextID,
      orientation: Orientation.none
    };
  }

  render(context: CanvasRenderingContext2D)
  {
    this.m_renderHandler(this.m_context, context);
  }

  protected m_renderHandler: renderHandler;
  protected m_context: GraphikContext;
}