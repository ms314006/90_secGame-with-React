export interface ITiming {
  canvas: HTMLCanvasElement;
  remainTime: number;
  update(gameTime: number): void;
  draw(): void;
}
