class Ground extends BaseElement {

  constructor(x, y, w, h, a = 0.0) {
    var options = {
      angle: a,
      isStatic: true
    }

    super(Bodies.rectangle(x, y, w, h, options));
    this.w = w;
    this.h = h;
    this.fillColor = '#006600';
  }

  draw() {
    noStroke(255);
    fill('#006600');
    rectMode(CENTER);
    rect(this.body.position.x, this.body.position.y, this.w, this.h);
  }

  getAngle() {
    return this.body.angle;
  }

}