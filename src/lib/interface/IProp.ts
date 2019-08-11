export interface IProp {
  canvas: HTMLCanvasElement;
  xPos: number;
  yPos: number;
  typeConfig: any,
  remove: boolean;
  height: number;
  init(): void;
  draw(): void;
  isVisible(): void;
  update(deltaTime: number, speed: number): void;
}
