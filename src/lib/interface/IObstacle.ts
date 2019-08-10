import { ICollisionBox } from './ICollisionBox';

export interface IObstacle {
  canvas: HTMLCanvasElement;
  collisionBoxes: ICollisionBox[];
  xPos: number;
  yPos: number;
  typeConfig: any,
  init(): void;
  draw(): void;
  isVisible(): void;
  update(deltaTime: number, speed: number): void;
  getGap(gapCoefficient: number, speed: number): void;
}
