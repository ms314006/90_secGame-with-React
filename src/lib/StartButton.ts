import { IStartButton } from './interface/IStartButton';

class StartButton implements IStartButton {
  canvas: HTMLCanvasElement;

  ctx: any;

  posX: number = 0;

  posY: number = 0;

  text: string = '';

  reset = (): void => {};

  constructor(
    canvas: HTMLCanvasElement,
    posX: number,
    posY: number,
    text: string,
    reset: any
  ) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.posX = posX;
    this.posY = posY;
    this.text = text;
    this.reset = reset;
  }

  draw = (buttonType: string): void => {
    const posYOffset = buttonType === 'default' ? 10 : 15;
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(this.posX, this.posY, 150, 55);
    this.ctx.drawImage(
      document.getElementById(`restart-${buttonType}`),
      0, 0, 150, 55,
      this.posX, this.posY + posYOffset,
      150, 55
    );
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(
      '再玩一次', this.posX + 35, this.posY + 30 + posYOffset
    );
  }

  addReStartEvent = () => {
    const getMousePos = (canvas: HTMLCanvasElement, event: any): any => {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const isInside = (pos: any, rect: any) => (
      pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
    );

    const rect = {
      x: this.posX,
      y: this.posY,
      width: 150,
      height: 55,
    };

    this.canvas.addEventListener('mousedown', (evt) => {
      const mousePos = getMousePos(this.canvas, evt);
      if (isInside(mousePos, rect)) {
        this.draw('click');
      }
    }, false);

    const mouseUpEvent = (evt) => {
      const mousePos = getMousePos(this.canvas, evt);
      if (isInside(mousePos, rect)) {
        this.reset();
        this.canvas.removeEventListener('mouseup', mouseUpEvent, false);
      }
      this.draw('default');
    };

    this.canvas.addEventListener('mouseup', mouseUpEvent, false);
  }
}

export default StartButton;
