import HorizonLine from './HorizonLine';
import { IHorizon } from './interface/IHorizon';
import { IHorizonLine } from './interface/IHorizonLine';

class Horizon implements IHorizon {
  canvas: HTMLCanvasElement

  spritePos: any;

  constructor(canvas: HTMLCanvasElement, spritePos: any) {
    this.canvas = canvas;
    this.spritePos = spritePos;
    this.init();
  }

  init = (): void => {
    const horizonLine = new HorizonLine(this.canvas, this.spritePos.horizon);
  }
}

export default Horizon;
