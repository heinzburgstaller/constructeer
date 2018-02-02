class Meteor extends BaseElement {

  constructor(x, y, r, color = '#f47142') {
    var options = {
      friction: 0.5,
      restitution: 0.3, // bouncyness
      isStatic: false,
      density: 0.8,
    }

    super(Bodies.circle(x, y, r, options));
    this.r = r;
    this.color = color;
  }

  draw() {
    var pos = this.body.position;
    strokeWeight(1);
    stroke('#202021');
    fill(this.color);
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
  }

}