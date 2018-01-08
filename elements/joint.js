class Joint extends BaseElement {

  constructor(x, y, r, isStatic = false) {
    var options = {
      friction: 0.95,
      restitution: 0.2, // bouncyness
      isStatic: isStatic,
      density: 0.1,
      collisionFilter: {
        group: "construction"
      }
    }

    super(Bodies.circle(x, y, r, options));
    this.r = r;
  }

  draw() {
    var pos = this.body.position;
    strokeWeight(1);
    stroke('#202021');
    if (this.body.isStatic) {
      fill('#705114');
    } else {
      fill('#7c7462');
    }
    if (this.mouseOnBody) {
      fill('#bc0000');
    }
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
  }

}