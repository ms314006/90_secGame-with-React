import CollisionBox from './CollisionBox';

export const FPS = 30;

export const config = {
  speed: 6,
  gapCoefficient: 0.6,
  maxObstacleDuplication: 5,
  clearTime: 0,
  maxSpeed: 13,
  acceleration: 0.001,
  bottomPad: 100,
  gameTotalTime: 90,
};

export const dimensions = {
  width: 1200,
  height: 900,
};

export const obstacleTypes = [{
  type: 'ball-1',
  width: 120,
  height: 250,
  xPos: [230, 390, 550, 710, 870],
  yPos: -250,
  multipleSpeed: 4,
  minGap: 120,
  minSpeed: 0,
  collisionBoxes: [
    new CollisionBox(5, 8, 80, 80)
  ],
}, {
  type: 'ball-2',
  width: 120,
  height: 250,
  xPos: [230, 390, 550, 710, 870],
  yPos: -250,
  multipleSpeed: 4,
  minGap: 120,
  minSpeed: 0,
  collisionBoxes: [
    new CollisionBox(5, 8, 80, 80)
  ],
}, {
  type: 'ball-3',
  width: 120,
  height: 250,
  xPos: [230, 390, 550, 710, 870],
  yPos: -250,
  multipleSpeed: 4,
  minGap: 120,
  minSpeed: 0,
  collisionBoxes: [
    new CollisionBox(5, 8, 80, 80)
  ],
}, {
  type: 'ball-4',
  width: 120,
  height: 250,
  xPos: [230, 390, 550, 710, 870],
  yPos: -250,
  multipleSpeed: 4,
  minGap: 120,
  minSpeed: 0,
  collisionBoxes: [
    new CollisionBox(5, 8, 80, 80)
  ],
}, {
  type: 'ball-5',
  width: 120,
  height: 250,
  xPos: [230, 390, 550, 710, 870],
  yPos: -250,
  multipleSpeed: 4,
  minGap: 120,
  minSpeed: 0,
  collisionBoxes: [
    new CollisionBox(5, 8, 80, 80)
  ],
}, {
  type: 'boss-1',
  width: 385,
  height: 300,
  xPos: [230, 390, 550, 710],
  yPos: -300,
  multipleSpeed: 4,
  minGap: 150,
  minSpeed: 0,
  collisionBoxes: [
    new CollisionBox(20, 8, 320, 250)
  ],
}, {
  type: 'boss-2',
  width: 600,
  height: 422,
  xPos: [230, 390],
  yPos: -350,
  multipleSpeed: 4,
  minGap: 200,
  minSpeed: 0,
  collisionBoxes: [
    new CollisionBox(0, 50, 550, 300)
  ],
}];

export const duck = {
  config: {
    width: 130,
    height: 230,
  },
  status: {
    crashed: 'crashed',
    right: 'right',
    running: 'running',
    waiting: 'waiting',
  },
  animFrames: {
    waiting: {
      frames: [44, 0],
      msPerFrame: 1000 / 3,
    },
    running: {
      frames: [88, 132],
      msPerFrame: 1000 / 12,
    },
    crashed: {
      frames: [220],
      msPerFrame: 1000 / 60,
    },
    jumping: {
      frames: [0],
      msPerFrame: 1000 / 60,
    },
    right: {
      frames: [0],
      msPerFrame: 1000 / 60,
    },
  },
  collisionBoxes: {
    running: [
      new CollisionBox(30, 5, 55, 80),
      new CollisionBox(15, 60, 92, 50)
    ],
  },
};
