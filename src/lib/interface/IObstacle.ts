export interface IObstacle {
  canvas: HTMLCanvasElement;
  init(): void;
  draw(): void;
  isVisible(): void;
  update(deltaTime: number, speed: number): void;
  getGap(gapCoefficient: number, speed: number): void;
}
