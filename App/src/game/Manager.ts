/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { vektor, Vektor } from "../helpers/Vektor.js";
import { create } from "../helpers/dom.js";
import { ObstacleManager } from "./ObstacleManager.js";
import { keyMap, renderHandler } from "./interfaces.js";
import { Obstacle } from "./obstacle.js";
import { Player } from "./player.js";
import { Scene } from "./scene.js";

export class Manager
{
  static get nextID(): number { return ++Manager.m_lastID; }

  keyMap: keyMap = {
    jump: " ",
    left: "a",
    right: "d"
  };

  get score(): number
  {
    return this.m_Player?.score ?? 0;
  }
  set handleGameOver(callback: (instanciated: boolean) => void) { this.m_handleGameOver = callback; }
  set handleScoreChange(callback: (score: number) => void)
  {
    if (this.m_Player)
      this.m_Player.onScoreChange = callback;
    this.m_fireScoreChange = callback;
    callback(0);
  }

  constructor(parent: HTMLElement, size: vektor)
  {
    Obstacle.reset();
    let canvas = create('canvas', parent);
    canvas.width = size[0];
    canvas.height = size[1];
    let ctx = canvas.getContext("2d");
    if (ctx)
      this.m_context = ctx;
    else throw new Error();

    window.onkeydown = (e) =>
    {
      this.m_key = e.key.toLowerCase();
      this.m_handleKey();
    };
    window.onkeyup = () => this.m_key = undefined;
    this.m_obstaclManager = new ObstacleManager(size);
    this.m_size = size;

  }

  startGameLoop(executionTime?: number)
  {
    if (this.m_intervallHandle)
      this.stopGameLoop();
    if (!this.m_Player)
      return;
    if (this.m_wasStarted)
      this.resetGame(this.m_Player.context.size);

    this.m_wasStarted = true;
    this.m_intervallHandle = window.setInterval(() =>
    {
      this.performCalculation();
      window.requestAnimationFrame(this.performRender.bind(this));
    }, executionTime || 10);
    this.m_keyTimer = setInterval(this.m_handleKey.bind(this), 25);
  }

  stopGameLoop(propagate?: boolean)
  {
    if (this.m_intervallHandle)
      window.clearInterval(this.m_intervallHandle);
    if (this.m_keyTimer)
      window.clearInterval(this.m_keyTimer);
    this.m_intervallHandle = null;
    if (this.m_handleGameOver)
      this.m_handleGameOver(!propagate);
  }

  m_handleKey()
  {
    if (!this.m_key || !this.m_Player)
      return;
    let map = this.keyMap;
    switch (this.m_key)
    {
      case map.jump:
        if (this.m_obstaclManager.hasCollision(this.m_Player))
          this.m_Player.handleJump();
        break;
      case map.left: this.m_Player.handleLeft(); break;
      case map.right: this.m_Player.handleRight(); break;
    }
  }

  addScene(handler: renderHandler)
  {
    this.m_scene = new Scene(handler);
    this.m_scene.setSize(this.m_size);
    this.m_buttom = new Obstacle(() => { });
    this.m_buttom.setStart(Vektor.create(0, this.m_size[1]));
    this.m_buttom.setSize(Vektor.create(this.m_size[0], 0));
    this.performRender();
  }

  addPlayer(handler: renderHandler, size: vektor)
  {
    this.m_Player = new Player(handler);
    this.renderPlayer(size);
    this.performRender();
  }

  private resetGame(size: vektor)
  {
    if (!this.m_Player)
      return;
    this.renderPlayer(size);
    this.m_Player.reset();
    this.m_obstaclManager.resetObstacles();
  }

  private renderPlayer(size: vektor)
  {
    if (!this.m_Player)
      return;
    if (this.m_fireScoreChange)
    {
      this.m_Player.onScoreChange = this.m_fireScoreChange;
      this.m_fireScoreChange(0);
    }

    let s = Vektor.subtract(this.m_size, size);
    s = Vektor.subtract(s, [0, this.m_size[1] / 3]);
    s[0] = (this.m_size[0] / 2) - size[0] / 2;
    this.m_Player.setStart(s);
    this.m_Player.setSize(size);
    this.setPlayerParameters();
  }


  private setPlayerParameters()
  {
    if (!this.m_Player)
      return;
    this.m_Player.jumpSize = this.m_Player.context.size[1] * 6;
    let tmp = Math.ceil(this.m_size[0] / 100);
    this.m_Player.offset = tmp;
  }

  addObstacele(handler: renderHandler, maxCount: number, size: vektor)
  {
    for (let i = maxCount; i > 0; i--)
    {
      let o = new Obstacle(handler);
      o.setSize(size);
      this.m_obstaclManager.assignObstacle(o);
    }
    this.m_obstaclManager.prepareObstacles();
    this.setPlayerParameters();
    this.performRender();
  }

  private performCalculation()
  {
    this.m_Player && this.m_Player.performGameCycle(this.m_obstaclManager.HandleCollisionAndGetGravity(this.m_Player));
    this.m_checkBoundarys();
  }

  private m_checkBoundarys()
  {
    if (!this.m_Player)
      return;
    let b = this.m_Player.boundaryBox.begin;
    let e = Vektor.add(b, this.m_Player.boundaryBox.size);
    if (this.m_buttom && this.m_Player.checkCollision(this.m_buttom))
    {
      this.stopGameLoop(true);
      return;
    }
    let x = this.m_size[0];
    if (e[0] <= 0)
      this.m_Player.move([x, 0]);
    else if (e[0] >= x)
      this.m_Player.move([-x, 0]);
  }

  private performRender()
  {
    this.m_scene && this.m_scene.render(this.m_context);
    this.m_Player && this.m_Player.render(this.m_context);
    this.m_obstaclManager.render(this.m_context);
  }


  private m_context;
  private m_size: vektor;


  private m_handleGameOver?: (value: boolean) => void;
  private m_fireScoreChange?: (value: number) => void;
  private m_intervallHandle: number | null = null;
  private m_scene?: Scene;
  private m_buttom?: Obstacle;
  private m_Player?: Player;
  private m_key?: string;
  private m_keyTimer?: number;
  private m_obstaclManager: ObstacleManager;
  private static m_lastID = 0;
  private m_wasStarted: boolean = false;
}