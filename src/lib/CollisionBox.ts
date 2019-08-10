import { ICollisionBox } from './interface/ICollisionBox';

class CollisionBox implements ICollisionBox {
  x: number = 0;

  y: number = 0;

  width: number = 0;

  height: number = 0;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

export default CollisionBox;
