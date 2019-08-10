import { IHorizonLine } from './IHorizonLine';
import { IObstacle } from './IObstacle';

export interface IHorizon {
  canvas: HTMLCanvasElement;
  horizonLine: IHorizonLine[];
  obstacles: IObstacle[];
  init(): void;
  update(deltaTime: number, currentSpeed: number, updateObstacles: boolean): void;
  reset(): void;
}
