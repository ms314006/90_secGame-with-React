export interface IDuck {
  canvas: HTMLCanvasElement;
  xPos: number;
  yPos: number;
  init(): void;
  update(deltaTime: number): void;
  setRight(isRight: boolean): void;
  setLeft(isRight: boolean): void;
  getBuff(): void;
  setCollision(): void;
  reset(): void;
}
