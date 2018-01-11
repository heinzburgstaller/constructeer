class BaseElement {

  constructor(body) {
    this.body = body;
    this.mouseOnBody = false;
    this.isRemoved = false;
    World.add(world, this.body);
  }

  show() {
    var pos = this.body.position;
    if(pos.y > width + 200) {
      this.remove();
    }

    if (this.isRemoved) {
      return;
    }

    push();
    this.draw();
    pop();
  }

  mouseClicked() {

  }

  pointIsIn(x, y) {
    let r = Matter.Query.point([this.body], { x: x, y: y });
    let isIn = r.length == 1 ? true : false;
    return isIn;
  }

  draw() {
    throw new Error('You have to implement the method draw()!');
  }

  remove() {
    World.remove(world, this.body);
    this.isRemoved = true;
  }

}