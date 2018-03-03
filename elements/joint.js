class Joint extends BaseElement {

  constructor(x, y, r, isStatic = false) {
    var options = {
      friction: 0.95,
      restitution: 0.2, // bouncyness
      isStatic: isStatic,
      density: 1.0,
      collisionFilter: {
        group: "construction"
      }
    }

    super(Bodies.circle(x, y, r, options));
    this.r = r;
  }

  draw() {
    var pos = this.body.position;
    strokeWeight(2);
    stroke('#202021');
    if (this.body.isStatic) {
      //fill('#ffbc2d');
      fill('#000000');
    } else {
      fill('#cccccc');
    }
    if (this.mouseOnBody) {
      fill('#00bc00');
    }
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
  }

}
