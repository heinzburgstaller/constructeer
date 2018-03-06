class LandSlide extends BaseElement {

  constructor(x, y, r) {
    var options = {
      friction: 0.0,
      restitution: 1, // bouncyness
      isStatic: false,
      density: 0.5,
    }

    super(Bodies.circle(x, y, r, options));
    this.r = r;
  }

  draw() {
    var pos = this.body.position;
    strokeWeight(1);
    stroke('#202021');
    fill('grey');
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
  }

}