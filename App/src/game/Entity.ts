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
  setSize(value: vektor) { this.m_context.size = Array.from(value); }
  setStart(value: vektor) { this.m_context.start = Array.from(value); }
  constructor(manager: Manager, renderHandle: renderHandler)
  {
    this.m_manager = manager;
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
  protected m_manager: Manager;
  protected m_context: GraphikContext;
}