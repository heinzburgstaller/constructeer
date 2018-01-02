function Joint(x, y, r) {
  var options = {
    friction: 0.95,
    restitution: 0.2, // bouncyness
    isStatic: false
  }
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  World.add(world, this.body);
}

Joint.prototype.show = function() {
  fill(0,0,0);
  //noStroke();
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  ellipse(0, 0, this.r * 2);
  pop();
}