import HorizonLine from './HorizonLine';
import Obstacle from './Obstacle';
import { IHorizon } from './interface/IHorizon';
import { IHorizonLine } from './interface/IHorizonLine';
import { FPS, config, obstacleTypes } from './config';
import { getRandomNum } from '../util';

class Horizon implements IHorizon {
  canvas: HTMLCanvasElement

  spritePos: any;

  horizonLine: IHorizonLine[] = [];

  dimensions: any;

  gapCoefficient: number;

  obstacles: any[];

  obstacleHistory: any[];

  constructor(canvas: HTMLCanvasElement, spritePos: any, dimensions: any, gapCoefficient: number) {
    this.canvas = canvas;
    this.spritePos = spritePos;
    this.dimensions = dimensions;
    this.gapCoefficient = gapCoefficient;
    this.obstacles = [];
    this.obstacleHistory = [];
  }

  update = (deltaTime: number, currentSpeed: number, updateObstacles: boolean): void => {
    this.horizonLine.forEach((horizonLine) => {
      horizonLine.update(deltaTime, currentSpeed);
    });
    if (updateObstacles) {
      this.updateObstacles(deltaTime, currentSpeed);
    }
  }

  init = (): void => {
    this.horizonLine.push(new HorizonLine(this.canvas, this.spritePos.horizon, 'plx-1', FPS));
  }

  addNewObstacle = (currentSpeed: number): void => {
    // 随机障碍物
    const obstacleTypeIndex = getRandomNum(0, 4);
    const obstacleType = obstacleTypes[obstacleTypeIndex];
    if (this.duplicateObstacleCheck(obstacleType.type)) {
      this.addNewObstacle(currentSpeed);
    } else {
      // 存储障碍物
      const obstacle = new Obstacle(this.canvas, obstacleType,
        this.dimensions, this.gapCoefficient);
      obstacle.init(currentSpeed);
      this.obstacles.push(obstacle);

      // 存储障碍物类型
      this.obstacleHistory.unshift(obstacleType.type);

      // 若 history 数组长度大于 1， 清空最前面两个数据
      if (this.obstacleHistory.length > 4) {
        this.obstacleHistory.splice(config.maxObstacleDuplication);
      }
    }
  }

  updateObstacles = (deltaTime: number, currentSpeed: number): void => {
    // 复制存储的障碍物
    const updatedObstacles = this.obstacles.slice(0);

    this.obstacles.forEach((obstacle) => {
      obstacle.update(deltaTime, currentSpeed);

      if (obstacle.remove) {
        updatedObstacles.shift();
      }
    });

    // 更新存储的障碍物
    this.obstacles = updatedObstacles;

    if (this.obstacles.length > 0) {
      const lastObstacle = this.obstacles[this.obstacles.length - 1];
      // 满足添加障碍物的条件
      if (lastObstacle && !lastObstacle.followingObstacleCreated
        && lastObstacle.isVisible()
        && (lastObstacle.yPos + lastObstacle.height + lastObstacle.gap) < this.dimensions.height) {
        this.addNewObstacle(currentSpeed);
        lastObstacle.followingObstacleCreated = true;
      }
    } else { // 没有存储障碍物，直接添加
      this.addNewObstacle(currentSpeed);
    }
  }

  duplicateObstacleCheck = (nextObstacleType: string): boolean => {
    let duplicateCount: number = 0;

    this.obstacleHistory.forEach((obstacle) => {
      duplicateCount = obstacle === nextObstacleType ? duplicateCount + 1 : 0;
    });

    return duplicateCount >= config.maxObstacleDuplication;
  }
}

export default Horizon;
