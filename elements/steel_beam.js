function SteelBeam(x, y, w, h) {
  var options = {
    friction: 0,
    restitution: 0.95,
    isStatic: false
  }
  this.body = Bodies.rectangle(x, y, w, h, options);
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
    strokeWeight(3);
    stroke('#202021');
    fill('#4e4e51');
    rect(0, 0, this.w, this.h);
    pop();
  }

}