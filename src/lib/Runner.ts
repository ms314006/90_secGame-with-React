import { IRunner } from './interface/IRunner';
import { IHorizon } from './interface/IHorizon';
import Horizon from './Horizon';

class Runner implements IRunner {
  outerContainerEl: Element;

  containerEl: Element = document.createElement('div');

  canvas: Element = document.createElement('div');

  ctx: any;

  updatePending: boolean = false;

  raqId: any;

  config: any;

  dimensions: any;

  time: number;

  currentSpeed: number;

  activated: boolean;

  playing: boolean;

  crashed: boolean;

  paused: boolean;

  events:any = {
    LOAD: 'load',
    KEYDOWN: 'keydown',
    KEYUP: 'keyup',
  };

  spriteDefinition:any = {
    ldpi: {
      horizon: { x: 0, y: 0, }, // 背景
    },
  }

  horizon: IHorizon;

  private classes: any = {
    container: 'runner-container',
    canvas: 'runner-canvas',
    player: '',
  };

  private keyCodes:any = {
    start: { '38': 1, '32': 1 },
  }

  constructor(containerSelector: Element, optConfig?: any) {
    this.outerContainerEl = containerSelector;
    this.config = optConfig || { speed: 6, };
    this.dimensions = {
      width: 600,
      height: 300,
    };
    this.currentSpeed = this.config.speed;
    this.time = 0;
    this.activated = false;
    this.playing = false;
    this.crashed = false;
    this.paused = false;
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
    document.addEventListener(this.events.KEYDOWN, this);
    document.addEventListener(this.events.KEYUP, this);
  }

  stopListening = ():void => {
    document.removeEventListener(this.events.KEYDOWN, this);
    document.removeEventListener(this.events.KEYUP, this);
  }

  handleEvent = (e): void => {
    return ((eType, events) => {
      switch (eType) {
        case events.KEYDOWN:
          this.onKeyDown(e);
          break;
        default:
          break;
      }
    })(e.type, this.events);
  }

  onKeyDown = (e): void => {
    if (!this.crashed && !this.paused) {
      if (this.keyCodes.start[e.keyCode]) {
        e.preventDefault();
        this.setPlayStatus(!this.playing);
        this.update();
      }
    }    
  }

  setPlayStatus = (isPlaying: boolean): void => {
    this.playing = isPlaying;
  }

  update = (): void => {
    const getTimeStamp = () => performance.now();
    this.updatePending = false;

    const now = getTimeStamp();
    const deltaTime = now - (this.time || now);

    this.time = now;
    if (this.playing && !this.paused) {
      this.clearCanvas();
      this.horizon.update(deltaTime, this.currentSpeed);
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
    const canvas: HTMLCanvasElement = this.createCanvas(
      this.containerEl, this.dimensions.width, this.dimensions.height, this.classes.player
    );
    this.ctx = canvas.getContext('2d');
    if (this.ctx) {
      this.ctx.fillStyle = '#f7f7f7';
      this.ctx.fill();
    }

    /* 背景區塊 */
    this.horizon = new Horizon(canvas, this.spriteDefinition.ldpi);
    this.outerContainerEl.appendChild(this.containerEl);
    this.update();
    this.startListening();
  }

  loadImages = (): void => {
    const imageSprite = document.getElementById('offline-resources-1x');
    if (imageSprite) {
      if (imageSprite.complete) {
        this.init();
      } else {
        imageSprite.addEventListener(this.events.LOAD, this.init);
      }
    }
  }
}

export default Runner;
