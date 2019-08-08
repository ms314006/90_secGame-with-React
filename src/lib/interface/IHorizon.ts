import { IHorizonLine } from './IHorizonLine';

export interface IHorizon {
  canvas: HTMLCanvasElement;
  horizonLine: IHorizonLine[];
  init(): void;
  update(deltaTime: number, currentSpeed: number, updateObstacles: boolean): void;
}
