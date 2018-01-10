class Helper {

  constructor() {

  }

  sortTwoPoints(x1, y1, x2, y2) {
    var firstPoint = { x: 0, y: 0 };
    var secondPoint = { x: 0, y: 0 };
    var orient = 0;

    if (y1 == y2) {
      if (x1 < x2) {
        firstPoint = { x: x1, y: y1 };
        secondPoint = { x: x2, y: y2 };
        console.log('straight to the right');
        orient = 1;
      } else {
        firstPoint = { x: x2, y: y2 };
        secondPoint = { x: x1, y: y1 };
        console.log('straight to the left');
        orient = 2;
      }
    } else if (y1 < y2) {
      firstPoint = { x: x1, y: y1 };
      secondPoint = { x: x2, y: y2 };
      console.log('down');
      orient = 3;
    } else {
      firstPoint = { x: x2, y: y2 };
      secondPoint = { x: x1, y: y1 };
      console.log('up');
      orient = 4;
    }

    return [firstPoint, secondPoint, orient];
  }

  doBasicCalculations(sorted) {
    var a = sorted[1].x - sorted[0].x;
    var b = sorted[1].y - sorted[0].y;
    return {
      a: a,
      b: b,
      c: Math.sqrt(a * a + b * b),
      x: (sorted[1].x + sorted[0].x) / 2,
      y: (sorted[1].y + sorted[0].y) / 2,
      angle: Math.atan2(b, a)
    };
  }

}