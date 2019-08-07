export interface IHorizonLine {
  canvas: HTMLCanvasElement;
  dimensions: {
    width: number;
    height: number;
    YPos: number;
  };
  FPS: number;
  image: string;
  init(): void;
  draw(): void;
  update(deltaTime: number, speed: number): void;
}
