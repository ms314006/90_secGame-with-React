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

  gameTime: number = 0;

  dimensions: any;

  obstacles: IObstacle[] = [];

  constructor(canvas: HTMLCanvasElement, dimensions: any) {
    this.canvas = canvas;
    this.dimensions = dimensions;
  }

  reset = (): void => {
    this.horizonLine.forEach((aHorizonLine) => { aHorizonLine.reset(); });
    this.obstacles = [];
  }

  update = (
    deltaTime: number, gameTime: number, currentSpeed: number, updateObstacles: boolean
  ): void => {
    this.gameTime = gameTime;
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
    const getAriseObstacles = (): string[] => {
      const currentTime = Math.round(this.gameTime / 1000);
      const ariseObstacles = ['ball'];
      switch (true) {
        case currentTime >= 30 && currentTime < 60:
          ariseObstacles.push('boss_01', 'boss_01');
          break;
        case currentTime >= 60:
          ariseObstacles.push('boss_01');
          ariseObstacles.push('boss_02', 'boss_02');
          break;
        default:
      }
      return ariseObstacles;
    };
    const generateBall = (): void => {
      const getObstacleCountRange = (): number[] => {
        const currentTime = Math.round(this.gameTime / 1000);
        switch (true) {
          case currentTime >= 0 && currentTime < 30:
            return [2, 3];
          case currentTime >= 30 && currentTime < 60:
            return [3, 4];
          case currentTime >= 60:
            return [4, 4];
          default:
            return [0, 0];
        }
      };
      const obstacleCountRange = getObstacleCountRange();
      const obstacleCount = getRandomNum(
        obstacleCountRange[0], obstacleCountRange[1]
      );
      Array(...new Array(obstacleCount)).forEach(() => {
        const obstacleTypeIndex = getRandomNum(0, 4);
        const obstacleType = obstacleTypes[obstacleTypeIndex];
        const obstacle = new Obstacle(this.canvas, obstacleType, this.dimensions, obstaclesXpos);
        obstacle.init();
        obstaclesXpos.push(obstacle.xPos);
        this.obstacles.push(obstacle);
      });
    };

    const generateBoss = (bossIndex: number): void => {
      const obstacleType = obstacleTypes[bossIndex];
      const obstacle = new Obstacle(this.canvas, obstacleType, this.dimensions, obstaclesXpos);
      obstacle.init();
      obstaclesXpos.push(obstacle.xPos);
      this.obstacles.push(obstacle);
    };

    const ariseObstacles = getAriseObstacles();
    const obstacleType: string = ariseObstacles[getRandomNum(0, ariseObstacles.length - 1)];

    switch (obstacleType) {
      case 'ball':
        generateBall();
        break;
      case 'boss_01':
        generateBoss(5);
        break;
      case 'boss_02':
        generateBoss(6);
        break;
      default:
        throw new Error('Can not get correspond obstacle');
    }
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
