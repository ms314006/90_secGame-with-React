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
  draw(gamtTime: number): void;
  update(deltaTime: number, speed: number): void;
  reset(): void;
}
