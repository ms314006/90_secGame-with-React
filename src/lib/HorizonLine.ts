import { IHorizonLine } from './interface/IHorizonLine';

class HorizonLine implements IHorizonLine {
  canvas: HTMLCanvasElement;

  FPS: number = 0;

  image: string;

  sourceYPos: any[] = [];

  xPos: number = 0;

  yPos: number[] = [];

  spritePos: { x: number, y: number, } = {
    x: 0,
    y: 0,
  };

  dimensions: any = {
    width: 1200,
    height: 900,
    YPos: 0,
    Xpos: 0,
  };

  constructor(
    canvas: HTMLCanvasElement,
    image: string,
    FPS: number
  ) {
    this.canvas = canvas;
    this.image = image;
    this.FPS = FPS;
    this.init();
    this.draw();
  }

  updateYPos = (pos: number, incre: number): void => {
    const line1 = pos;
    const line2 = pos === 0 ? 1 : 0;
    this.yPos[line1] += incre;
    this.yPos[line2] = this.yPos[line1] - this.dimensions.height;
    if (this.yPos[line1] >= this.dimensions.height) {
      this.yPos[line1] += 0;
      this.yPos[line2] = this.yPos[line1] - this.dimensions.height;
      this.sourceYPos[line1] = this.spritePos.y;
    }
  }

  update = (deltaTime: number, speed: number) => {
    const incre = Math.floor(speed * (this.FPS / 1000) * deltaTime);
    if (this.yPos[0] <= this.dimensions.height && this.yPos[0] >= 0) {
      this.updateYPos(0, incre);
    } else {
      this.updateYPos(1, incre);
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
    this.sourceYPos = [this.spritePos.y,
      0];
    this.xPos = this.dimensions.Xpos;
    this.yPos = [0, -this.dimensions.height];
  }

  draw = (): void => {
    const ctx: any = this.canvas.getContext('2d');
    ctx.drawImage(
      document.getElementById(this.image),
      this.spritePos.x, this.sourceYPos[0],
      this.dimensions.width, this.dimensions.height,
      this.xPos, this.yPos[0],
      this.dimensions.width, this.dimensions.height
    );

    ctx.drawImage(
      document.getElementById(this.image),
      this.spritePos.x, this.sourceYPos[1],
      this.dimensions.width, this.dimensions.height,
      this.xPos, this.yPos[1],
      this.dimensions.width, this.dimensions.height
    );
  }
}

export default HorizonLine;
