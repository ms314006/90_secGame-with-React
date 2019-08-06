import { IRunner } from './interface/IRunner';
import Horizon from './Horizon';

class Runner implements IRunner {
  outerContainerEl: Element;

  containerEl: Element = document.createElement('div');

  canvas: Element = document.createElement('div');

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
  };

  spriteDefinition:any = {
    ldpi: {
      horizon: { x: 2, y: 54, }, // 地面
    },
  }

  horizon: any;

  private classes: any = {
    container: 'runner-container',
    canvas: 'runner-canvas',
    player: '',
  };

  constructor(containerSelector: Element, optConfig?: any) {
    this.outerContainerEl = containerSelector;
    this.config = optConfig || { speed: 6, };
    this.dimensions = {
      width: 600,
      height: 150,
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

  init = (): void => {
    this.containerEl.className = this.classes.container;
    const canvas: HTMLCanvasElement = this.createCanvas(
      this.containerEl, this.dimensions.width, this.dimensions.height, this.classes.player
    );
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f7f7f7';
      ctx.fill();
    }

    /* 背景區塊 */
    this.horizon = new Horizon(canvas, this.spriteDefinition.ldpi);
    this.outerContainerEl.appendChild(this.containerEl);
  }

  loadImages = (): void => {
    const imageSprite = document.getElementById('offline-resources-1x');
    if (imageSprite) {
      if (imageSprite.complete) {
        this.init();
      } else { // 图片没有加载完成，监听其 load 事件
        imageSprite.addEventListener(this.events.LOAD, this.init);
      }
    }
  }
}

export default Runner;
