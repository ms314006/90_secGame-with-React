import HorizonLine from './HorizonLine';
import Obstacle from './Obstacle';
import { IHorizon } from './interface/IHorizon';
import { IHorizonLine } from './interface/IHorizonLine';
import { IObstacle } from './interface/IObstacle';
import { FPS, config, obstacleTypes } from './config';
import { getRandomNum } from '../util';

class Horizon implements IHorizon {
  canvas: HTMLCanvasElement

  spritePos: any = { x: 0, y: 0, };

  horizonLine: IHorizonLine[] = [];

  dimensions: any;

  gapCoefficient: number;

  obstacles: IObstacle[] = [];

  constructor(canvas: HTMLCanvasElement, dimensions: any, gapCoefficient: number) {
    this.canvas = canvas;
    this.dimensions = dimensions;
    this.gapCoefficient = gapCoefficient;
  }

  reset = (): void => {
    this.horizonLine.forEach((aHorizonLine) => { aHorizonLine.reset(); });
    this.obstacles = [];
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
    this.horizonLine.push(new HorizonLine(this.canvas, 'plx-1', FPS));
  }

  addNewObstacle = (): void => {
    const obstaclesXpos: number[] = [];
    const obstacleCount = getRandomNum(3, 3);
    Array(...new Array(obstacleCount)).forEach(() => {
      const obstacleTypeIndex = getRandomNum(0, 4);
      const obstacleType = obstacleTypes[obstacleTypeIndex];
      const obstacle = new Obstacle(this.canvas, obstacleType, this.dimensions, this.gapCoefficient, obstaclesXpos);
      obstacle.init();
      obstaclesXpos.push(obstacle.xPos);
      this.obstacles.push(obstacle);
    });
  }

  updateObstacles = (deltaTime: number, currentSpeed: number): void => {
    const updatedObstacles = this.obstacles.slice(0);

    this.obstacles.forEach((obstacle) => {
      obstacle.update(deltaTime, currentSpeed);

      if (obstacle.remove) {
        updatedObstacles.splice(updatedObstacles.indexOf(obstacle), 1);
      }
    });

    this.obstacles = updatedObstacles;
    if (this.obstacles.length > 0) {
      const lastObstacle = this.obstacles[this.obstacles.length - 1];
      if ((lastObstacle.yPos + lastObstacle.height) > lastObstacle.height * 2) {
        this.addNewObstacle();
      }
    } else {
      this.addNewObstacle();
    }
  }
}

export default Horizon;
