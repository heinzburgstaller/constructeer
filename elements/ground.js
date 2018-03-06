class Ground extends BaseElement {

  constructor(x, y, w, h, a = 0.0, color = '#33691e', alpha = 255) {
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
    this.color = color;
    this.alpha = alpha
  }

  draw() {
    var pos = this.body.position;
    var angle = this.body.angle;
    translate(pos.x, pos.y);
    rotate(angle);
    noStroke(255);
    var c = color(this.color);
    var ca = color('rgba(' + [red(c), green(c), blue(c), this.alpha].join(',') + ')');
    fill(ca);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
  }

  getAngle() {
    return this.body.angle;
  }

}
