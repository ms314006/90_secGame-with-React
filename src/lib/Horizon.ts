import HorizonLine from './HorizonLine';
import { IHorizon } from './interface/IHorizon';
import { IHorizonLine } from './interface/IHorizonLine';
import { FPS } from './config';

class Horizon implements IHorizon {
  canvas: HTMLCanvasElement

  spritePos: any;

  horizonLine: IHorizonLine[] = [];

  constructor(canvas: HTMLCanvasElement, spritePos: any) {
    this.canvas = canvas;
    this.spritePos = spritePos;
    this.init();
  }

  update = (deltaTime: number, currentSpeed: number): void => {
    this.horizonLine.forEach((horizonLine) => {
      horizonLine.update(deltaTime, currentSpeed);
    });
  }

  init = (): void => {
    this.horizonLine.push(new HorizonLine(this.canvas, this.spritePos.horizon, 'plx-1', FPS - 60));
    this.horizonLine.push(new HorizonLine(this.canvas, this.spritePos.horizon, 'plx-2', FPS - 50));
    this.horizonLine.push(new HorizonLine(this.canvas, this.spritePos.horizon, 'plx-3', FPS - 40));
    this.horizonLine.push(new HorizonLine(this.canvas, this.spritePos.horizon, 'plx-4', FPS - 30));
    this.horizonLine.push(new HorizonLine(this.canvas, this.spritePos.horizon, 'plx-5', FPS - 20));
  }
}

export default Horizon;
