/**
 * @jest-environment jsdom
 */

import Robot from './src/main.js';


describe('Robot unit test', () => {
  const robot = new Robot(1, 1,  'E', 'RFRFRFRF');
  it('Should have the proper initial position and direction according to the provided input', () => {
    expect(robot.robotCurrentPositionAndDirection()).toBe("1 1 E");
  });

  it('Should move forward when moveForward() is called', () => {
    robot.moveForward();
    expect(robot.robotCurrentPosition()).toBe("2 1");
  });

  it('Should end in proper location according first challenge', () => {
    const robotFirstInput = new Robot(1, 1,  'E', 'RFRFRFRF');
    robotFirstInput.move();
    expect(robotFirstInput.robotCurrentPositionAndDirection()).toBe("1 1 E");
  });

  it('Should end in proper location according second challenge', () => {
    const robotSecondInput = new Robot(3, 2,  'N', 'FRRFLLFFRRFLL');
    robotSecondInput.move();
    expect(robotSecondInput.robotCurrentPositionAndDirection()).toBe("3 2 N LOST");
  });

  it('Should end in proper location according third challenge', () => {
    const robotThirdInput = new Robot(0, 3,  'W', 'LLFFFLFLFL');
    robotThirdInput.move();
    expect(robotThirdInput.robotCurrentPositionAndDirection()).toStrictEqual("2 3 S");
  });
});