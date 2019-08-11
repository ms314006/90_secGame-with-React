import { IGame } from './interface/IGame';
import { IHorizon } from './interface/IHorizon';
import { IDuck } from './interface/IDuck';
import { IPromptPanel, IPromptPabel } from './interface/IPromptPanel';
import { IGameOverPanel } from './interface/IGameOverPanel';
import { IVictoryGameAnimation } from './interface/IVictoryGameAnimation';
import { ITiming } from './interface/ITiming';
import Horizon from './Horizon';
import Duck from './Duck';
import PromptPanel from './PromptPanel'
import GameOverPanel from './GameOverPanel';
import Timing from './Timing';
import VictoryGameAnumation from './VictoryGameAnumation';
import { config, dimensions } from './config';
import { checkForCollision } from '../util'

class Game implements IGame {
  outerContainerEl: Element;

  containerEl: Element = document.createElement('div');

  canvas: HTMLCanvasElement = null;

  ctx: any;

  gameTime: number = 0;

  updatePending: boolean = false;

  raqId: any;

  config: any;

  dimensions: any = dimensions;

  time: number = 0;

  currentSpeed: number;

  activated: boolean = false;

  playing: boolean = false;

  crashed: boolean = false;

  paused: boolean = false;

  victory: boolean = false;

  isFirstGame: boolean = true;

  events: any = {
    load: 'load',
    keyDown: 'keydown',
    keyUp: 'keyup',
  };

  visibleGameOverPanel: boolean = false;

  horizon: IHorizon = null;

  duck: IDuck = null;

  gameOverPanel: IGameOverPanel = null;

  victoryGameAnimation: IVictoryGameAnimation = null;

  timing: ITiming = null;

  promptPanel: IPromptPabel = null

  private classes: any = {
    container: 'runner-container',
    canvas: 'runner-canvas',
    player: '',
  };

  private keyCodes: any = {
    start: { '32': 1, },
    controlDuckRight: { '39': 1, },
    controlDuckLeft: { '37': 1, },
  }

  constructor(containerSelector: Element, optConfig?: any) {
    this.outerContainerEl = containerSelector;
    this.config = optConfig || config;
    this.currentSpeed = this.config.speed;
  }

  private createCanvas = (
    container: Element, width: number, height: number, optClassName?: any
  ): HTMLCanvasElement => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.className = optClassName
      ? `${optClassName} ${this.classes.canvas}`
      : this.classes.canvas;
    canvas.width = width;
    canvas.height = height;
    container.appendChild(canvas);
    return canvas;
  }

  startListening = ():void => {
    document.addEventListener(this.events.keyDown, this);
    document.addEventListener(this.events.keyUp, this);
  }

  stopListening = ():void => {
    document.removeEventListener(this.events.keyDown, this);
    document.removeEventListener(this.events.keyUp, this);
  }

  handleEvent = (e): void => {
    return ((eType, events) => {
      switch (eType) {
        case events.keyDown:
          this.onKeyDown(e);
          break;
        case events.keyUp:
          this.onKeyUp(e);
          break;
        default:
          break;
      }
    })(e.type, this.events);
  }

  onKeyDown = (e): void => {
    if (!this.crashed && !this.paused) {
      switch (1) {
        case this.keyCodes.start[e.keyCode]:
          e.preventDefault();
          this.setPlayStatus(!this.playing);
          break;
        case this.keyCodes.controlDuckRight[e.keyCode]:
          e.preventDefault();
          this.duck.setRight(true);
          break;
        case this.keyCodes.controlDuckLeft[e.keyCode]:
          e.preventDefault();
          this.duck.setLeft(true);
          break;
        default:
      }
    }
  }

  onKeyUp = (e): void => {
    if (!this.crashed && !this.paused) {
      switch (1) {
        case this.keyCodes.controlDuckRight[e.keyCode]:
          e.preventDefault();
          this.duck.setRight(false);
          break;
        case this.keyCodes.controlDuckLeft[e.keyCode]:
          e.preventDefault();
          this.duck.setLeft(false);
          break;
        default:
      }
    }
  }

  setPlayStatus = (isPlaying: boolean): void => {
    this.playing = isPlaying;
  }

  getTimeStamp = () => performance.now();

  update = (): void => {
    this.updatePending = false;
    const now = this.getTimeStamp();
    const deltaTime = now - (this.time || now);
    this.time = now;

    if (this.playing && !this.paused && !this.crashed && !this.victory) {
      this.clearCanvas();

      this.gameTime += deltaTime;
      const hasObstacles = this.gameTime > this.config.clearTime;
      this.horizon.update(deltaTime, this.gameTime, this.currentSpeed, hasObstacles);
      this.timing.update(this.gameTime);
      this.duck.update(deltaTime);

      /* 判斷碰撞 */
      let isCollision = hasObstacles;
      isCollision = this.horizon.obstacles.some((obstacle) => {
        return hasObstacles && checkForCollision(obstacle, this.duck, this.ctx);
      });
      if (isCollision) {
        this.duck.setCollision();
        if (!this.visibleGameOverPanel) {
          this.visibleGameOverPanel = true;
          setTimeout(() => {
            this.crashed = true;
            this.gameOverPanel = new GameOverPanel(
              this.canvas, this.dimensions, this.reset
            );
            this.gameOverPanel.draw();
          }, 50);
        }
      }

      /* 判斷吃到道具 */
      let isBuff = false;
      isBuff = this.horizon.props.some((prop) => {
        return hasObstacles && checkForCollision(prop, this.duck, this.ctx);
      });
      if (isBuff) {
        this.horizon.props = [];
        this.horizon.obstacles = [];
        this.duck.getBuff();
      }

      /* 判斷完成遊戲 */
      const isVictoryGame = () => (
        Math.round(this.gameTime / 1000) >= config.gameTotalTime
      );

      if (isVictoryGame()) {
        this.victory = true;
        this.victoryGameAnimation = new VictoryGameAnumation(
          this.canvas, this.dimensions, this.reset
        );
        this.victoryGameAnimation.draw();
      }
    }
    this.scheduleNextUpdate();
  }

  clearCanvas = (): void => {
    this.ctx.clearRect(0, 0, this.dimensions.width,
      this.dimensions.height);
  }

  scheduleNextUpdate = (): void => {
    if (!this.updatePending) {
      this.updatePending = true;
      this.raqId = requestAnimationFrame(this.update);
    }
  }

  init = (): void => {
    this.containerEl.className = this.classes.container;
    this.canvas = this.createCanvas(
      this.containerEl, this.dimensions.width, this.dimensions.height, this.classes.player
    );
    this.ctx = this.canvas.getContext('2d');
    if (this.ctx) {
      this.ctx.fillStyle = '#f7f7f7';
      this.ctx.fill();
    }

    /* 背景區塊 */
    this.horizon = new Horizon(this.canvas, this.dimensions);
    this.horizon.init();

    /* 計分器 */
    this.timing = new Timing(this.canvas, this.dimensions);
    this.timing.draw();

    /* 小鴨 */
    this.duck = new Duck(this.canvas);
    this.duck.init();
    this.outerContainerEl.appendChild(this.containerEl);
    this.update();
    this.startListening();

    /* 提示視窗 */
    if (this.isFirstGame) {
      this.promptPanel = new PromptPanel(this.canvas, this.dimensions);
      this.promptPanel.draw();
      this.isFirstGame = false;
    }
  }

  loadImages = (): void => {
    const backageGroundImage = document.getElementById('plx-1');
    if (backageGroundImage) {
      if (backageGroundImage.complete) {
        this.init();
      } else {
        backageGroundImage.addEventListener(this.events.load, this.init);
      }
    }
  }

  reset = (): void => {
    this.gameTime = 0;
    this.setPlayStatus(true);
    this.paused = false;
    this.crashed = false;
    this.victory = false;
    this.visibleGameOverPanel = false;
    this.currentSpeed = this.config.speed;
    this.time = this.getTimeStamp();
    this.clearCanvas();
    this.horizon.reset();
    this.duck.reset();
  }
}

export default Game;
