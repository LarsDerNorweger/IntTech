/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { vektor, Vektor } from "../helpers/Vektor.js";
import { keyMap, renderHandler } from "./interfaces.js";
import { Obstacle } from "./obstacle.js";
import { Player } from "./player.js";
import { Scene } from "./scene.js";

export class Manager {
  static get nextID(): number { return ++Manager.m_lastID; }

  readonly keyMap: keyMap = {
    jump: " ",
    left: "a",
    right: "d"
  };

  set handleGameOver(callback: (instanciated: boolean) => void) { this.m_handleGameOver = callback; }

  constructor(parent: HTMLElement, size: vektor) {
    let canvas = document.createElement('canvas');
    parent.appendChild(canvas);
    canvas.width = size[0];
    canvas.height = size[1];
    let ctx = canvas.getContext("2d");
    if (ctx)
      this.m_context = ctx;
    else throw new Error();
    window.onkeydown = this.mhandleKeyPress.bind(this);
    this.m_size = size;
  }

  startGameLoop(executionTime?: number) {
    if (this.m_intervallHandle)
      this.stopGameLoop();
    this.m_intervallHandle = window.setInterval(() => {
      this.performCalculation();
      window.requestAnimationFrame(this.performRender.bind(this));
    }, executionTime || 10);
  }

  stopGameLoop(propagate?: boolean) {
    if (this.m_intervallHandle)
      window.clearInterval(this.m_intervallHandle);
    this.m_intervallHandle = null;
    if (this.m_handleGameOver)
      this.m_handleGameOver(!propagate);
  }


  mhandleKeyPress(event: KeyboardEvent) {
    if (!this.m_Player)
      return
    let map = this.keyMap;
    switch (event.key) {
      case map.jump: this.m_Player.handleJump(); break;
      case map.left: this.m_Player.handleLeft(); break;
      case map.right: this.m_Player.handleRight(); break;
    }
  }

  addScene(handler: renderHandler) {
    this.m_scene = new Scene(this, handler);
    this.m_scene.setSize(this.m_size);
    this.m_buttom = new Obstacle(this, () => { });

    this.m_buttom.setStart(Vektor.create(0, this.m_size[1]));
    this.m_buttom.setSize(Vektor.create(this.m_size[0], 0));
  }

  addPlayer(handler: renderHandler, size: vektor) {
    this.m_Player = new Player(this, handler);
    let s = Vektor.subtract(this.m_size, size);
    s = Vektor.subtract(s, [0, this.m_size[1] / 3]);
    s[0] = (this.m_size[0] / 2) - size[0] / 2;
    this.m_Player.setStart(s);
    this.m_Player.setSize(size);
  }

  addObstacele(handler: renderHandler, maxCount: number) {
    for (let i = maxCount; i > 0; i--)
      this.m_obstacles.push(new Obstacle(this, handler));
  }

  private performCalculation() {
    this.m_Player && this.m_Player.performGameCycle(1.2);
    this.m_checkBoundarys();
  }

  private m_checkBoundarys() {
    if (!this.m_Player)
      return
    let b = this.m_Player.boundaryBox.start;
    let e = Vektor.add(b, this.m_Player.boundaryBox.size);
    if (this.m_buttom && this.m_Player.checkButtom(this.m_buttom, 1)) {
      this.stopGameLoop(true);
      return;
    }
    let x = this.m_size[0];
    if (e[0] <= 0)
      this.m_Player.move([x, 0]);
    else if (e[0] >= x)
      this.m_Player.move([-x, 0]);
  }

  private performRender() {
    this.m_scene && this.m_scene.render(this.m_context);
    this.m_Player && this.m_Player.render(this.m_context);
    for (let o of this.m_obstacles)
      o.render(this.m_context);
  }


  private m_context;
  private m_size: vektor;


  private m_handleGameOver?: (value: boolean) => void;
  private m_intervallHandle: number | null = null;
  private m_scene?: Scene;
  private m_buttom?: Obstacle;
  private m_Player?: Player;
  private m_obstacles: Obstacle[] = [];
  private static m_lastID = 0;
}