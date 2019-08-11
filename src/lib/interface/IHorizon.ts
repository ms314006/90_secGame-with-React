import { IHorizonLine } from './IHorizonLine';
import { IObstacle } from './IObstacle';
import { IProp } from './IProp';

export interface IHorizon {
  canvas: HTMLCanvasElement;
  horizonLine: IHorizonLine[];
  obstacles: IObstacle[];
  props: IProp[];
  init(): void;
  update(
    deltaTime: number, gameTime: number, currentSpeed: number, updateObstacles: boolean
  ): void;
  reset(): void;
}
