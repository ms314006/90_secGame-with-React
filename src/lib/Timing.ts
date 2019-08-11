import { ITiming } from './interface/ITiming.ts';
import { config } from './config';
import { borderRadioRect } from '../util';

class Timing implements ITiming {
  canvas: HTMLCanvasElement;

  ctx: any;

  remainTime: number = config.gameTotalTime;

  canvasDimensions: any = {};

  constructor(canvas: HTMLCanvasElement, dimensions: any) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvasDimensions = dimensions;
  }

  update = (gameTime: number): void => {
    this.remainTime = config.gameTotalTime - Math.round(gameTime / 1000);
    this.draw();
  }

  draw = (): void => {
    /* 視窗 */
    this.ctx.fillStyle = '#535353';
    borderRadioRect(
      this.ctx, this.canvasDimensions.width - 190, -15, 190, 150, 30
    );
    this.ctx.fillStyle = '#262626';
    borderRadioRect(
      this.ctx, this.canvasDimensions.width - 190, -20, 190, 150, 30
    );

    /* 時間 */
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '14px Arial';
    this.ctx.fillText(
      'TIME',
      this.canvasDimensions.width - 170, 35
    );

    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '58px Arial';
    this.ctx.fillText(
      this.getDisplayTime(),
      this.canvasDimensions.width - 170, 100
    );
  }

  getDisplayTime = (): string => {
    const convertTimeToMMss = (time: number) => {
      const fillZero = (str: string): string => {
        let result = str;
        while (result.length < 2) {
          result = `0${str}`;
        }
        return result;
      };

      // 除 60 為分，剩下的是秒，要記得補 0
      const mm = fillZero(String(Math.floor(time / 60)));
      const ss = fillZero(String(time % 60));
      return `${mm}:${ss}`;
    };
    return convertTimeToMMss(this.remainTime);
  }
}

export default Timing;
