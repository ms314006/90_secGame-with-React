import { IDuck } from './interface/IDuck';
import {
  FPS, dimensions, config, duck
} from './config';

class Duck implements IDuck {
  canvas: HTMLCanvasElement;

  ctx: any;

  xPos: number = 0;

  yPos: number = 0;

  groundXPos: number = 0;

  animStartTime: number = 0;

  timer: number = 0;

  msPerFrame: number = 1000 / FPS;

  status: any = duck.status.waiting;

  config: any = duck.config;

  left: boolean = false;

  right: boolean = false;

  jumpVelocity: number = 0;

  speedDrop: boolean = false;

  swimStep: number = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  update = (deltaTime: number): void => {
    this.timer += deltaTime;
    const updateSwimStep = () => {
      switch (this.swimStep) {
        case 1:
          this.swimStep = 2;
          break;
        case 2:
          this.swimStep = 3;
          break;
        case 3:
          this.swimStep = 1;
          break;
        default:
      }
    };
    if (this.timer >= 500) {
      updateSwimStep();
      this.timer = 0;
    }
    this.draw();
  }

  setRight = (isRight: boolean): void => {
    this.right = isRight;
  }

  setLeft = (isLeft: boolean): void => {
    this.left = isLeft;
  }

  init = (): void => {
    this.groundXPos = (dimensions.width / 2) - (this.config.width / 2);
    this.xPos = this.groundXPos;
    this.yPos = dimensions.height - this.config.height - config.bottomPad;
    this.draw();
    this.update(0);
  }

  draw = (): void => {
    const outputHeight = this.config.height;
    // 移動量
    const moveDestance = 5;
    if (this.right
      && this.status !== duck.status.crashed
      && this.xPos <= dimensions.width - 340) {
      this.xPos += moveDestance;
    }
    if (this.left
      && this.status !== duck.status.crashed
      && this.xPos >= 200) {
      this.xPos -= moveDestance;
    }

    this.ctx.drawImage(
      document.getElementById(`duck-${this.swimStep}`),
      0, 0,
      this.config.width, this.config.height,
      this.xPos, this.yPos,
      this.config.width, outputHeight
    );

    this.ctx.globalAlpha = 1;
  }
}

export default Duck;
