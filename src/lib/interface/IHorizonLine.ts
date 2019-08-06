export interface IHorizonLine {
  canvas: HTMLCanvasElement;
  dimensions: {
    width: number;
    height: number;
    YPos: number;
  };
  init(): void;
  draw(): void;
}
