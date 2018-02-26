class Raindrop extends BaseElement {

  constructor(x, y, r) {
    var options = {
      friction: 0.0,
      restitution: 0.6, // bouncyness
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
    fill('#1e90ff');
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2, 13);
    // http://learningprocessing.com/examples/chp10/example-10-08-drop-design
  }

}