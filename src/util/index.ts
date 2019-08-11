import { IObstacle } from '../lib/interface/IObstacle';
import { IDuck } from '../lib/interface/IDuck';
import { ICollisionBox } from '../lib/interface/ICollisionBox';
import CollisionBox from '../lib/CollisionBox';
import * as config from '../lib/config';

export const getRandomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const boxCompare = (duckBox: ICollisionBox, obstacleBox: ICollisionBox): boolean => {
  let crashed = false;
  if (duckBox.x < obstacleBox.x + obstacleBox.width
    && duckBox.x + duckBox.width > obstacleBox.x
    && duckBox.y < obstacleBox.y + obstacleBox.height
    && duckBox.height + duckBox.y > obstacleBox.y) {
    crashed = true;
  }

  return crashed;
};

const createAdjustedCollisionBox = (
  box: ICollisionBox, adjustment: ICollisionBox
): ICollisionBox => (
  new CollisionBox(
    box.x + adjustment.x,
    box.y + adjustment.y,
    box.width,
    box.height
  )
);

const drawCollisionBoxes = (
  canvasCtx: any, duckBox: ICollisionBox, obstacleBox: ICollisionBox
): void => {
  canvasCtx.save();
  canvasCtx.strokeStyle = '#f00';
  canvasCtx.strokeRect(
    duckBox.x, duckBox.y, duckBox.width, duckBox.height
  );

  canvasCtx.strokeStyle = '#0f0';
  canvasCtx.strokeRect(
    obstacleBox.x, obstacleBox.y, obstacleBox.width, obstacleBox.height
  );
  canvasCtx.restore();
};

export const checkForCollision = (
  obstacle: IObstacle, duck: IDuck, optCanvasCtx: any
): boolean => {
  let result = false;
  const duckBox = new CollisionBox(
    duck.xPos + 5,
    duck.yPos + 10,
    duck.config.width - 10,
    duck.config.height - 100
  );

  const obstacleBox = new CollisionBox(
    obstacle.xPos + 10,
    obstacle.yPos + 1,
    obstacle.typeConfig.width - 30,
    obstacle.typeConfig.height - 18
  );

  /*
  if (optCanvasCtx) {
    drawCollisionBoxes(optCanvasCtx, duckBox, obstacleBox);
  }
  */

  if (boxCompare(duckBox, obstacleBox)) {
    const { collisionBoxes, } = obstacle.typeConfig;
    const duckCollisionBoxes = config.duck.collisionBoxes.running;

    result = duckCollisionBoxes.some((duckCollisionBox) => {
      return collisionBoxes.some((collisionBox) => {
        const adjDuckBox = createAdjustedCollisionBox(duckCollisionBox, duckBox);
        const adjObstacleBox = createAdjustedCollisionBox(collisionBox, obstacleBox);
        const crashed = boxCompare(adjDuckBox, adjObstacleBox);

        /*
        if (optCanvasCtx) {
          drawCollisionBoxes(optCanvasCtx, adjDuckBox, adjObstacleBox);
        }
        */

        return crashed;
      });
    });
  }
  return result;
};

export const borderRadioRect = (
  ctx: any, x: number, y: number, w: number, h: number, r: number
): void => {
  ctx.beginPath();
  ctx.moveTo(x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.bezierCurveTo(x, y, x + r, y, x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.bezierCurveTo(x + w, y, x + w, y + r, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.bezierCurveTo(x + w, y + h, x + w - r, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.bezierCurveTo(x, y + h, x, y + h - r, x, y + h - r);
  ctx.fill();
};
