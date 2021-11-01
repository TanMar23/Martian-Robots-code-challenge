import Mars from './mars.js';

let mars = new Mars([5, 3]);

const cardinalPoints = ["N", "E", "S", "W"];
var global = {};
global.output = [];

class UserInput {
  constructor(input) {
    this.userInput = this.verify(input);
    this.roboInstructions = [];
  };

  verify(input) {
    input.trim();
    const pGridAndCommands = /(\d+\s+\d+\s*\n+)((\d+\s+\d+\s*[NESW]{1}\s*\n+[LRF]+\s*\n*)+)/i;
    const verify = input.match(pGridAndCommands);
    const result = (!verify) ? false : verify[0];
    return result;
  };

  processInput() {
    const inputSplitLines = /[\r?\n]+/;
    const marsGrid = /\d{1,2}\s+\d{1,2}/;
    const splitSpace = /\s+/;
    const inputDirection = /[NESW]/;
    const inputInstruction = /[RLF]+/;

    const lines = splitLines(this.userInput).filter(Boolean);

    function splitLines(string) {
      return string.split(inputSplitLines);
    };

    this.gridCoordinates = lines.shift().match(marsGrid)[0].split(splitSpace);

    for (let i = 0; i < lines.length; i += 2) {
      const rawCoordinates = lines[i];
      const rawInstruction = lines[i + 1];
      const xy = rawCoordinates.match(marsGrid)[0].split(splitSpace);
      const direction = rawCoordinates.match(inputDirection)[0];
      const instruction = rawInstruction.match(inputInstruction)[0];
      this.newRoboCommand(xy[0], xy[1], direction, instruction);
    };
  };

  newRoboCommand(x, y, direction, instruction) {
    const command = {
      x: x,
      y: y,
      direction: direction,
      instruction: instruction
    };
    this.roboInstructions.push(command);
  };
};

export default class Robot {
  constructor(x, y, direction, instruction) {
    this.position = {
      x: parseInt(x),
      y: parseInt(y)
    };
    this.direction = direction;
    this.instruction = instruction;
    this.lost = false;
  };

  move() {
    if (mars.isInside(this.position)) {
      for (let i = 0; i < this.instruction.length; i++) {
        const currentInstruction = this.instruction.charAt(i);
        switch(true) {
          case currentInstruction === "L":
            this.direction = (this.turnLeft(this.direction));
            break;
          case currentInstruction === "R":
            this.direction = (this.turnRight(this.direction));
            break;
          case currentInstruction === "F":
            this.moveForward();
            break;
          case this.lost:
            break;
        }
      }
      const addRobotToArr = (this.lost) ? global.output.push(this.position.x + " " + this.position.y + " " + this.direction + " " + "LOST") : global.output.push(this.position.x + " " + this.position.y + " " + this.direction);
      return addRobotToArr;
    }
  };

  turnLeft(direction) {
    let currentDir = cardinalPoints.indexOf(direction);
    if (currentDir === 0) { currentDir = 4; }
    return cardinalPoints[currentDir - 1];
  };

  turnRight(direction) {
    let currentDir = cardinalPoints.indexOf(direction);
    if (currentDir === 3) { currentDir = -1; }
    return cardinalPoints[currentDir + 1];
  };

  moveForward() {
    const oldPosition = { x: this.position.x, y: this.position.y };
    switch(this.direction) {
      case "N":
        this.position.y++;;
        break;
      case "E":
        this.position.x++;
        break;
      case "S":
        this.position.y--;
        break;
      case "W":
        this.position.x--;
        break;
      default:
        break;
    };

     if (!mars.isInside(this.position)) {
      this.position = oldPosition;
      
      if (mars.valueAt(this.position) !== "scent") {
        mars.scentAt(this.position);
        this.lost = true;
      }
    }
  };

  robotCurrentDirection() {
    let direction = this.direction;
    return direction;
  };

  robotCurrentPosition() {
    let location = `${this.position.x} ${this.position.y}`;
    return location;
  };

  robotCurrentPositionAndDirection() {
    let location = `${this.position.x} ${this.position.y} ${this.direction}`;
    if (this.lost) {
      location += ' LOST';
    }
    return location;
  };
}

function startProgram () {
  const maxCoorSize = 50;

  function startRobots (commands) {
    for (let i = 0; i < commands.length; i++) {
      const current = commands[i];
      const robot = new Robot (current.x, current.y, current.direction, current.instruction);
      robot.move();
    }
  };

  const goClick = document.getElementById("go");
  goClick.onclick = function run(){
    const input = document.getElementById("instructions").value;
    const command = new UserInput(input);

    
    if (!command.userInput) {
      alert("The information provided is invalid! Did you enter it in the correct format?");
    } else {
      command.processInput();
      if (command.gridCoordinates[0] > maxCoorSize || command.gridCoordinates[1] > maxCoorSize) {
        alert("Maximum grid size is 50");
      } else {
        mars = new Mars (command.gridCoordinates);
        startRobots(command.roboInstructions);
        document.getElementById("output").value = global.output.join("\n");
      }
    }
  };

  const clearClick = document.getElementById("clear");
  clearClick.onclick = function (){
    document.getElementById("instructions").value = "";
    document.getElementById("output").value = "";
    global = {};
    global.output = [];
  };
}

window.onload = function(){
  startProgram();
}

