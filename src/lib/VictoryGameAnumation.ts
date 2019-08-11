import StartButton from './StartButton';
import { IVictoryGameAnimation } from './interface/IVictoryGameAnimation';
import { FPS, duck } from './config';
import { borderRadioRect } from '../util';

class VictoryGameAnimation implements IVictoryGameAnimation {
  canvas: HTMLCanvasElement;

  ctx: any;

  canvasDimensions: any = {};

  centerX: number = 0;

  centerY: number = 0;

  reset = (): void => {};

  constructor(canvas: HTMLCanvasElement, dimensions: any, reset: any) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvasDimensions = dimensions;
    this.centerX = dimensions.width / 2;
    this.centerY = dimensions.height / 2;
    this.reset = reset;
  }

  draw = (): void => {
    /* 背景 */
    let backgrounfYPos = -120;
    let duckYPos = this.canvasDimensions.height - 150;
    const drawBackground = () => {
      this.ctx.clearRect(
        0, 0, this.canvasDimensions.width, this.canvasDimensions.height
      );
      this.ctx.drawImage(
        document.getElementById('plx-frame'),
        0, 0,
        this.canvasDimensions.width, this.canvasDimensions.height,
        0, backgrounfYPos,
        this.canvasDimensions.width, this.canvasDimensions.height
      );
      this.ctx.drawImage(
        document.getElementById('plx-1'),
        0, 0,
        this.canvasDimensions.width, this.canvasDimensions.height,
        0, backgrounfYPos + 120,
        this.canvasDimensions.width, this.canvasDimensions.height
      );
      this.ctx.drawImage(
        document.getElementById('goal'),
        0, 0,
        this.canvasDimensions.width, this.canvasDimensions.height,
        this.centerX - 50, backgrounfYPos + 60,
        this.canvasDimensions.width, this.canvasDimensions.height
      );

      this.ctx.drawImage(
        document.getElementById('duck-1'),
        0, 0,
        this.canvasDimensions.width, this.canvasDimensions.height,
        this.centerX - (duck.config.width / 2), duckYPos,
        this.canvasDimensions.width, this.canvasDimensions.height
      );

      duckYPos -= 1;
      if (backgrounfYPos <= 0) {
        backgrounfYPos += 1;
      }

      if (backgrounfYPos > 0 && duckYPos < 240) {
        clearInterval(drawBackgroundInterval);
        this.drawRestartPanel();
      }
    };
    const drawBackgroundInterval = setInterval(drawBackground, 60 / FPS);
  }

  drawRestartPanel = (): void => {
    this.ctx.fillStyle = '#FFFFFF';
    borderRadioRect(
      this.ctx,
      this.centerX - 350, this.centerY - 175,
      700, 350, 20
    );

    this.ctx.fillStyle = '#FF952B';
    this.ctx.font = '30px Arial';
    this.ctx.fillText(
      'Congratulations! 恭喜過關!', this.centerX - 170, this.centerY - 110
    );
    this.ctx.drawImage(
      document.getElementById('clear-img-1'),
      0, 0,
      this.canvasDimensions.width, this.canvasDimensions.height,
      this.centerX - 320, this.centerY - 70,
      this.canvasDimensions.width, this.canvasDimensions.height
    );
    this.ctx.drawImage(
      document.getElementById('clear-img-2'),
      0, 0,
      this.canvasDimensions.width, this.canvasDimensions.height,
      this.centerX - 95, this.centerY - 70,
      this.canvasDimensions.width, this.canvasDimensions.height
    );
    this.ctx.drawImage(
      document.getElementById('clear-img-3'),
      0, 0,
      this.canvasDimensions.width, this.canvasDimensions.height,
      this.centerX + 130, this.centerY - 70,
      this.canvasDimensions.width, this.canvasDimensions.height
    );

    // 重新開始的按鈕
    const restartButton = new StartButton(
      this.canvas, this.centerX - 75, this.centerY + 90, '再玩一次', this.reset
    );
    restartButton.draw('default');
  }
}

export default VictoryGameAnimation;
