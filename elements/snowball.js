class Snowball extends BaseElement {

  constructor(x, y, r) {
    var options = {
      friction: 0.95,
      restitution: 0.2, // bouncyness
      isStatic: false,
      density: 0.1,
    }

    super(Bodies.circle(x, y, r, options));
    this.r = r;
  }

  draw() {
    var pos = this.body.position;
    strokeWeight(1);
    stroke('#202021');
    fill('#f9fbff');
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
  }

}