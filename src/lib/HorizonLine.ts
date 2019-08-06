import { IHorizonLine } from './interface/IHorizonLine';

class HorizonLine implements IHorizonLine {
  canvas: HTMLCanvasElement;

  sourceXPos: any[] = [];

  xPos: any[] = [];

  yPos: number = 0;

  spritePos: { x: number, y: number, } = {
    x: 0,
    y: 0,
  };

  dimensions: any = {
    width: 600,
    height: 12,
    YPos: 127,
  };

  constructor(canvas: HTMLCanvasElement, spritePos: { x: number, y: number, }) {
    this.canvas = canvas;
    this.spritePos = spritePos;
    this.init();
    this.draw();
  }

  init = (): void => {
    Object.keys(this.dimensions).forEach((d) => {
      if (Object.prototype.hasOwnProperty.call(this.dimensions, d)) {
        const elem = this.dimensions[d];
        this.dimensions[d] = elem;
      }
    });
    this.sourceXPos = [this.spritePos.x,
      this.spritePos.x + this.dimensions.width];
    this.xPos = [0, this.dimensions.width];
    this.yPos = this.dimensions.YPos;
  }

  draw = (): void => {
    const ctx: any = this.canvas.getContext('2d');

    ctx.drawImage(
      document.getElementById('offline-resources-1x'),
      this.sourceXPos[0], this.spritePos.y,
      this.dimensions.width, this.dimensions.height,
      this.xPos[0], this.yPos,
      this.dimensions.width, this.dimensions.height
    );
    ctx.drawImage(
      document.getElementById('offline-resources-1x'),
      this.sourceXPos[1], this.spritePos.y,
      this.dimensions.width, this.dimensions.height,
      this.xPos[1], this.yPos,
      this.dimensions.width, this.dimensions.height
    );
  }
}

export default HorizonLine;
