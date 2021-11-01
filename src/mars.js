export default class Mars {
  constructor(gridCoordinates) {
    this.width = parseInt(gridCoordinates[0]) + 1;
    this.height = parseInt(gridCoordinates[1]) + 1;
    this.cells = new Array(this.height * this.width);
  };

  isInside(point) {
    return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
  };

  scentAt(point) {
    this.cells[point.y * this.width + point.x] = "scent";
  };

  valueAt(point) {
    return this.cells[point.y * this.width + point.x];
  };
};
