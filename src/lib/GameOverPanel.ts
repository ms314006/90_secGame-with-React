import StartButton from './StartButton';
import { IGameOverPanel } from './interface/IGameOverPanel';
import { borderRadioRect } from '../util';

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

    // 背景半透明黑色矩形
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    this.ctx.fillRect(
      0, 0,
      this.canvasDimensions.width,
      this.canvasDimensions.height
    );

    // 視窗的顏色在中間
    this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    borderRadioRect(
      this.ctx, centerX - 350, centerY - 120, 700, 180, 10
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
    const restartButton = new StartButton(
      this.canvas, centerX - 75, centerY - 30, '重新挑戰', this.reset
    );
    restartButton.draw('default');
  }
}

export default GameOverPlanel;
