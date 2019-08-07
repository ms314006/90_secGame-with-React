import { IHorizonLine } from './interface/IHorizonLine';

class HorizonLine implements IHorizonLine {
  canvas: HTMLCanvasElement;

  FPS: number = 0;

  image: string;

  sourceXPos: any[] = [];

  xPos: any[] = [];

  yPos: number = 0;

  spritePos: { x: number, y: number, } = {
    x: 0,
    y: 0,
  };

  dimensions: any = {
    width: 600,
    height: 300,
    YPos: 0,
  };

  constructor(
    canvas: HTMLCanvasElement,
    spritePos: { x: number, y: number, },
    image: string,
    FPS: number
  ) {
    this.canvas = canvas;
    this.spritePos = spritePos;
    this.image = image;
    this.FPS = FPS;
    this.init();
    this.draw();
  }

  updateXPos = (pos: number, incre: number): void => {
    const line1 = pos;
    const line2 = pos === 0 ? 1 : 0;
    this.xPos[line1] -= incre;
    this.xPos[line2] = this.xPos[line1] + this.dimensions.width;

    if (this.xPos[line1] <= -this.dimensions.width) {
      this.xPos[line1] += this.dimensions.width * 2;
      this.xPos[line2] = this.xPos[line1] - this.dimensions.width;
      this.sourceXPos[line1] = this.spritePos.x;
    }
  }

  update = (deltaTime: number, speed: number) => {
    const incre = Math.floor(speed * (this.FPS / 1000) * deltaTime);
    if (this.xPos[0] <= 0) {
      this.updateXPos(0, incre);
    } else {
      this.updateXPos(1, incre);
    }
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
      document.getElementById(this.image),
      this.sourceXPos[0], this.spritePos.y,
      this.dimensions.width, this.dimensions.height,
      this.xPos[0], this.yPos,
      this.dimensions.width, this.dimensions.height
    );
    ctx.drawImage(
      document.getElementById(this.image),
      this.sourceXPos[0], this.spritePos.y,
      this.dimensions.width, this.dimensions.height,
      this.xPos[1], this.yPos,
      this.dimensions.width, this.dimensions.height
    );
  }
}

export default HorizonLine;
