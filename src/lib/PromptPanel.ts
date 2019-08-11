import { IPromptPabel } from './interface/IPromptPanel';
import { borderRadioRect } from '../util';

class PromptPanel implements IPromptPabel {
  canvas: HTMLCanvasElement;

  ctx: any;

  canvasDimensions: any = {};

  constructor(canvas: HTMLCanvasElement, dimensions: any) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvasDimensions = dimensions;
  }

  draw = (): void => {
    const centerX = this.canvasDimensions.width / 2;
    const centerY = this.canvasDimensions.height / 2;

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    this.ctx.fillRect(
      0, 0,
      this.canvasDimensions.width,
      this.canvasDimensions.height
    );
    // 視窗的顏色在中間
    this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    borderRadioRect(
      this.ctx, centerX - 350, centerY - 120, 700, 180, 20
    );

    this.ctx.fillStyle = '#FF952B';
    this.ctx.font = '40px Arial';
    this.ctx.fillText(
      'Hi ! 請點擊 “空白鍵” 開始遊戲！', centerX - 275, centerY - 50
    );

    this.ctx.font = '25px Arial';
    this.ctx.fillText(
      '遊戲過程別忘了使用 “方向鍵” 替小鴨閃避障礙物！', centerX - 278, centerY + 10
    );
  }
}

export default PromptPanel;
