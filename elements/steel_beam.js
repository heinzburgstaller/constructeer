function SteelBeam(x, y, w, h, a) {
  var options = {
    friction: 0.95,
    restitution: 0.2, // bouncyness
    angle: a,
    isStatic: false
  }
  this.body = Bodies.rectangle(x, y, w + 2, h + 2, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);
  console.log(this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(4);
    stroke('#202021');
    fill('#4e4e51');
    rect(0, 0, this.w, this.h);
    pop();
  }

}