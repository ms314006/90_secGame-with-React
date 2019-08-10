import { IGameOverPanel } from './interface/IGameOverPanel';

class GameOverPlanel implements IGameOverPanel {
  canvas: HTMLCanvasElement;

  ctx: any;

  canvasDimensions: any = {};

  reset = (): void => {};

  constructor(canvas: HTMLCanvasElement, dimensions: any, reset: any) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvasDimensions = dimensions;
    this.reset = reset;
  }

  draw = (): void => {
    const centerX = this.canvasDimensions.width / 2;
    const centerY = this.canvasDimensions.height / 2;

    this.addReStartEvent(centerX, centerY);
    // 背景半透明黑色矩形
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    this.ctx.fillRect(
      0, 0,
      this.canvasDimensions.width,
      this.canvasDimensions.height
    );

    // 視窗的顏色在中間
    this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    this.borderRadioRect(
      centerX - 350, centerY - 120, 700, 180, 10
    );

    this.ctx.fillStyle = '#FF952B';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(
      'UH-OH! 觸礁了', centerX - 65, centerY - 80
    );

    this.ctx.fillStyle = '#707070';
    this.ctx.font = '14px Arial';
    this.ctx.fillText(
      '勝敗乃鴨家常事，大俠重新來過吧~', centerX - 110, centerY - 50
    );

    // 重新開始的按鈕
    this.drawStartButton('default', centerX, centerY);
  }

  borderRadioRect = (
    x: number, y: number, w: number, h: number, r: number
  ): void => {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + h - r);
    this.ctx.lineTo(x, y + r);
    this.ctx.bezierCurveTo(x, y, x + r, y, x + r, y);
    this.ctx.lineTo(x + w - r, y);
    this.ctx.bezierCurveTo(x + w, y, x + w, y + r, x + w, y + r);
    this.ctx.lineTo(x + w, y + h - r);
    this.ctx.bezierCurveTo(x + w, y + h, x + w - r, y + h, x + w - r, y + h);
    this.ctx.lineTo(x + r, y + h);
    this.ctx.bezierCurveTo(x, y + h, x, y + h - r, x, y + h - r);
    this.ctx.fill();
  }

  drawStartButton = (buttonType: string, centerX: number, centerY: number) => {
    const posY = buttonType === 'default' ? 10 : 15;
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(centerX - 75, centerY - 20, 150, 55);
    this.ctx.drawImage(
      document.getElementById(`restart-${buttonType}`),
      0, 0, 150, 55,
      centerX - 75, centerY - 30 + posY,
      150, 55
    );
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(
      '重新挑戰', centerX - 40, centerY + posY
    );
  }

  addReStartEvent = (centerX: number, centerY: number) => {
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
      x: centerX - 75,
      y: centerY - 20,
      width: 150,
      height: 55,
    };

    this.canvas.addEventListener('mousedown', (evt) => {
      const mousePos = getMousePos(this.canvas, evt);
      if (isInside(mousePos, rect)) {
        this.drawStartButton('click', centerX, centerY);
      }
    }, false);

    this.canvas.addEventListener('mouseup', (evt) => {
      const mousePos = getMousePos(this.canvas, evt);
      if (isInside(mousePos, rect)) {
        this.reset();
      }
      this.drawStartButton('default', centerX, centerY);
    }, false);
  }
}

export default GameOverPlanel;
