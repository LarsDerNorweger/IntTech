/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { PhysikalEntity } from "./PhysikalEntity.js";
import { renderHandler } from "./interfaces.js";

export class Obstacle extends PhysikalEntity
{
    constructor(renderhandle: renderHandler)
    {
        super(renderhandle);
        this.setNextId();
    }

    setNextId()
    {
        this.m_context.id = Obstacle.m_Id++;
    }
    static m_Id = 0;
}