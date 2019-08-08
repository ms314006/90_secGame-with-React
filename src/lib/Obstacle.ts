import { IObstacle } from './interface/IObstacle'
import { FPS, obstacleTypes } from './config';
import { getRandomNum } from '../util';

class Obstacle implements IObstacle {
  canvas: HTMLCanvasElement;

  ctx: any;

  typeConfig: any;

  gapCoefficient: number;

  dimensions: number;

  maxGapCoefficient: number = 1.5;

  maxObstacleLength: number = 3;

  types: any = obstacleTypes;

  xPos: number = 0;

  yPos: number = 0;

  remove: boolean = false;

  gap: number = 0;

  speedOffset: number = 0;

  currentFrame: number = 0;

  timer: number = 0;

  height: number = 0;

  constructor(
    canvas: HTMLCanvasElement,
    obstacleType: any,
    dimensions: any,
    gapCoefficient: number
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.typeConfig = obstacleType;
    this.dimensions = dimensions;
    this.gapCoefficient = gapCoefficient;
    this.yPos = -this.typeConfig.height;
    this.xPos = 0;
  }

  init = (speed: number): void => {
    // 这里是为了确保刚开始游戏速度慢时，不会生成较大的障碍物和翼龙
    // 否则速度慢时，生成较大的障碍物或翼龙是跳不过去的

    this.height = this.typeConfig.height;
    const xPosConfig = this.typeConfig.xPos;
    // 随机 X 軸
    this.xPos = xPosConfig[getRandomNum(0, xPosConfig.length - 1)];
    this.draw();

    // 障碍物的间隙随游戏速度变化而改变
    this.gap = this.getGap(this.gapCoefficient, speed);
  }

  getGap = (gapCoefficient: number, speed: number): number => {
    const minGap = Math.round(this.height * speed
      + this.typeConfig.minGap * gapCoefficient);
    const maxGap = Math.round(minGap * this.maxGapCoefficient);
    return getRandomNum(minGap, maxGap);
  }

  draw = () => {
    const sourceWidth = this.typeConfig.width;
    const sourceHeight = this.typeConfig.height;

    // 根据每组障碍物的数量计算障碍物在雪碧图上的坐标
    let sourceY = 0;

    // 如果存在动画帧，则计算当前动画帧在雪碧图中的坐标
    if (this.currentFrame > 0) {
      sourceY += sourceHeight * this.currentFrame;
    }
    this.ctx.drawImage(
      document.getElementById(this.typeConfig.type),
      0, sourceY,
      sourceWidth, sourceHeight,
      this.xPos, this.yPos,
      this.typeConfig.width, this.typeConfig.height
    );
  }

  update = (deltaTime: number, speed: number) :void => {
    let workSpeed = speed;
    if (!this.remove) {
      // 修正速度
      if (this.typeConfig.speedOffset) {
        workSpeed += this.speedOffset;
      }

      this.yPos += Math.floor((workSpeed * FPS / 1000) * Math.round(deltaTime));

      // 如果有动画帧，则更新
      if (this.typeConfig.numFrames) {
        this.timer += deltaTime;

        if (this.timer >= this.typeConfig.frameRate) {
          // 第一帧 currentFrame 为 0，第二帧 currentFrame 为 1
          this.currentFrame = (
            this.currentFrame === this.typeConfig.numFrames - 1
              ? 0 : this.currentFrame + 1);
          this.timer = 0;
        }
      }
      this.draw();

      if (!this.isVisible()) {
        this.remove = true;
      }
    }
  }

  isVisible = (): boolean => {
    return this.yPos < 900;
  }
}

export default Obstacle;
