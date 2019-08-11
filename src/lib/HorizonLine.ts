import { IHorizonLine } from './interface/IHorizonLine';

class HorizonLine implements IHorizonLine {
  canvas: HTMLCanvasElement;

  FPS: number = 0;

  image: string;

  dimensions: any = {
    width: 1200,
    height: 900,
    YPos: 0,
    Xpos: 0,
  };

  sourceYPos: any[] = [];

  xPos: number = 0;

  yPos: number[] = [];

  startYPos: number = this.dimensions.height - 120;

  spritePos: { x: number, y: number, } = {
    x: 0,
    y: 0,
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
  }

  reset = (): void => {
    this.xPos = this.dimensions.Xpos;
    this.yPos = [0, -this.dimensions.height];
    this.startYPos = this.dimensions.height - 120;
  }

  updateYPos = (pos: number, incre: number): void => {
    const line1 = pos;
    const line2 = pos === 0 ? 1 : 0;
    this.yPos[line1] += incre;
    this.yPos[line2] = this.yPos[line1] - this.dimensions.height;
    this.startYPos += incre;
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
    this.draw();
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

    if (this.startYPos <= 900) {
      ctx.clearRect(this.xPos, this.startYPos, 1200, 120);
      ctx.drawImage(
        document.getElementById('plx-frame_s'),
        this.spritePos.x, this.sourceYPos[0],
        this.dimensions.width, this.dimensions.height,
        this.xPos, this.startYPos,
        this.dimensions.width, this.dimensions.height
      );
    }

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
