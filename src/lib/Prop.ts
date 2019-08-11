import { IProp } from './interface/IProp';
import { FPS } from './config';
import { getRandomNum } from '../util'

class Prop implements IProp {
  canvas: HTMLCanvasElement;

  ctx: any;

  typeConfig: any;

  xPos: number = 0;

  yPos: number = 0;

  remove: boolean = false;

  speedOffset: number = 0;

  currentFrame: number = 0;

  timer: number = 0;

  height: number = 0;

  constructor(canvas: HTMLCanvasElement, propsType: any) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.typeConfig = propsType;
  }

  init = (): void => {
    this.height = this.typeConfig.height;
    const xPosConfig = [...this.typeConfig.xPos];
    const getRandomXops = () => xPosConfig[getRandomNum(0, xPosConfig.length - 1)];
    const randomXpos = getRandomXops();
    this.xPos = randomXpos;
    this.yPos = this.typeConfig.yPos;
    this.draw();
  }

  draw = () => {
    const sourceWidth = this.typeConfig.width;
    const sourceHeight = this.typeConfig.height;
    let sourceY = 0;
    if (this.currentFrame > 0) {
      sourceY += sourceHeight * this.currentFrame;
    }
    this.ctx.drawImage(
      document.getElementById(this.typeConfig.type),
      0, sourceY,
      sourceWidth, sourceHeight,
      this.xPos, this.yPos,
      this.typeConfig.width, this.typeConfig.height
    );
  }

  update = (deltaTime: number, speed: number) :void => {
    let workSpeed = speed;
    if (!this.remove) {
      if (this.typeConfig.speedOffset) {
        workSpeed += this.speedOffset;
      }

      this.yPos += Math.floor((workSpeed * FPS / 1000) * Math.round(deltaTime));

      if (this.typeConfig.numFrames) {
        this.timer += deltaTime;

        if (this.timer >= this.typeConfig.frameRate) {
          this.currentFrame = (
            this.currentFrame === this.typeConfig.numFrames - 1
              ? 0 : this.currentFrame + 1);
          this.timer = 0;
        }
      }
      this.draw();

      if (!this.isVisible()) {
        this.remove = true;
      }
    }
  }

  isVisible = (): boolean => {
    return this.yPos < 900;
  }
}

export default Prop;
