class Helper {

  constructor() {

  }

  sortTwoPoints(x1, y1, x2, y2) {
    var firstPoint = { x: 0, y: 0 };
    var secondPoint = { x: 0, y: 0 };
    var orient = 'down';

    if (y1 == y2) {
      if (x1 < x2) {
        firstPoint = { x: x1, y: y1 };
        secondPoint = { x: x2, y: y2 };
        console.log('straight to the right');
        orient = 'down';
      } else {
        firstPoint = { x: x2, y: y2 };
        secondPoint = { x: x1, y: y1 };
        console.log('straight to the left');
        orient = 'up';
      }
    } else if (y1 < y2) {
      firstPoint = { x: x1, y: y1 };
      secondPoint = { x: x2, y: y2 };
      console.log('down');
      orient = 'down';
    } else {
      firstPoint = { x: x2, y: y2 };
      secondPoint = { x: x1, y: y1 };
      console.log('up');
      orient = 'up';
    }

    return {
      firstPoint: firstPoint,
      secondPoint: secondPoint,
      orient: orient
    };
  }

  doBasicCalculations(firstPoint, secondPoint) {
    var a = secondPoint.x - firstPoint.x;
    var b = secondPoint.y - firstPoint.y;
    return {
      a: a,
      b: b,
      c: Math.sqrt(a * a + b * b),
      x: (secondPoint.x + firstPoint.x) / 2,
      y: (secondPoint.y + firstPoint.y) / 2,
      angle: Math.atan2(b, a)
    };
  }

}