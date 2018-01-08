class SteelBeam extends BaseElement {

  constructor(x, y, w, h, a) {
    var options = {
      friction: 0.95,
      restitution: 0.2, // bouncyness
      angle: a,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "construction"
      }

    }

    super(Bodies.rectangle(x, y, w, h, options));
    this.w = w;
    this.h = h;
    this.fillColor = '#4e4e51';
  }

  draw() {
    var pos = this.body.position;
    var angle = this.body.angle;
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke('#202021');
    fill('#4e4e51');
    rect(0, 0, this.w - 30, this.h);
  }

  getAngle() {
    return this.body.angle;
  }

}