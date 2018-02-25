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
    //rectMode(CENTER);
    strokeWeight(0);
    stroke('#202021');
    fill('#4e4e51');
    //rect(0, 0, this.w - 24, this.h);
    var hheight = this.h/2;
    var hwidth = (this.w-20)/2;
    var brad = 4;
    rotate(angle);
    beginShape();
    vertex(-hwidth,-hheight);
    bezierVertex(-hwidth+brad, -2, -hwidth+brad, +2, -hwidth, hheight);
    vertex(-hwidth,hheight);
    vertex(hwidth, hheight);
    bezierVertex(hwidth-brad, +2, hwidth-brad, -2, hwidth, -hheight);
    vertex(hwidth, -hheight);
    endShape(CLOSE);

  }

  getAngle() {
    return this.body.angle;
  }

}
