class Car {

  constructor() {

    this.firstcar= Composites.car(500, 100, 100, 45, 30);
    this.secondcar= Composites.car(190, 100, 100, 45, 30);

    Matter.Body.setPosition(this.firstcar.bodies[0], { x: 50, y: 600 });
    Matter.Body.setPosition(this.firstcar.bodies[1], { x: 50, y: 600 });
    Matter.Body.setPosition(this.firstcar.bodies[2], { x: 50, y: 600 });



    Matter.Body.setPosition(this.secondcar.bodies[0], { x: 1195, y: 600 });
    Matter.Body.setPosition(this.secondcar.bodies[1], { x: 1150, y: 600 });
    Matter.Body.setPosition(this.secondcar.bodies[2], { x: 1195, y: 600 });
    World.add(world, this.firstcar);
    World.add(world, this.secondcar);
  }

  show(){
    this.drawCarParts(this.firstcar.bodies, '#d7d73c');
    this.drawCarParts(this.secondcar.bodies, '#d7d73c');
    Matter.Body.applyForce( this.firstcar.bodies[0],
        {x: this.firstcar.bodies[0].position.x, y: this.firstcar.bodies[0].position.y}, {x: 0.1, y: 0});

      Matter.Body.applyForce( this.secondcar.bodies[0],
        {x: this.secondcar.bodies[0].position.x, y: this.secondcar.bodies[0].position.y}, {x: -0.1, y: 0});
  }
  remove() {
    World.remove(world, this.firstcar);
    World.remove(world, this.secondcar);
  }
  drawCarParts(parts, color){
    for(var i in parts)
    {
      if(parts[i].label === "Rectangle Body")
      {
        push();
        translate(parts[i].position.x, parts[i].position.y);
        rectMode(CENTER);
        strokeWeight(1);
        stroke('#202021');
        fill('blue');
        rect(0, 0, 70, 30);
        pop();
      }
      else{
        push();
        translate(parts[i].position.x, parts[i].position.y);
        strokeWeight(1);
        stroke('#202021');
        fill(color);
        ellipse(0, 0, 50);
        pop();
      }
    }
  }
}