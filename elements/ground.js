class Ground extends BaseElement {

  constructor(x, y, w, h, a = 0.0) {
    var options = {
      angle: a,
      density: 1.0,
      isStatic: true,
      collisionFilter: {
        group: "ground"
      }
    }

    super(Bodies.rectangle(x, y, w, h, options));
    this.w = w;
    this.h = h;
    this.fillColor = '#006600';
  }

  draw() {
    var pos = this.body.position;
    var angle = this.body.angle;
    translate(pos.x, pos.y);
    rotate(angle);
    noStroke(255);
    fill('#006600');
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
  }

  getAngle() {
    return this.body.angle;
  }

}