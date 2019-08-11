export interface IStartButton {
  canvas: HTMLCanvasElement;
  posX: number;
  posY: number;
  text: string;
  draw(buttonType: string): void;
}
