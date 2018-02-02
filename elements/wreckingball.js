class Meteor extends {

  constructor(x, y, length, ballSize) {

    this.x = x;
    thix.y = y;
    this.length = length;
    this.ballSize = ballSize;

    this.rotation_point_options = {
      h: 10,
      w: 10,
      friction: 0.95,
      restitution: 0.2,
      angle: 0,
      isStatic: true,
      density: 1.0,
      collisionFilter: {
        group: "wrecking"
      }
    }

    this.line_options = {
      h: 1,
      w: length,
      friction: 0.95,
      restitution: 0.2,
      angle: 0,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "wrecking"
      }
    }

    this.ball_options = {
      h: ballSize,
      w: ballSize,
      friction: 0.95,
      restitution: 0.2,
      angle: 0,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "wrecking"
      }
    }

    this.rotation_point = Bodies.circle(this.x+this.length, this.y, 10, this.rotation_point_options);
    this.line = Bodies.rectangle(this.x, this.y, this.line_options.w, this.line_options.h, this.line_options);
    this.ball = Bodies.circle(this.x, this.y, this.ballSize, this.ball_options);

    World.add(world, this.rotation_point);
    World.add(world, this.line);
    World.add(world, this.ball);

    this.createConstraints();

  }

  createConstraints(){

  }

  drawRect(part, options, color){
    push();
    translate(part.position.x, part.position.y);
    rotate(part.angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke('#202021');
    fill(color);
    rect(0, 0, options.w, options.h,this.h/10);
    pop();
  }

  drawCircle(part, options, color){
    push();
    translate(part.position.x, part.position.y);
    rotate(part.angle);
    circleMode(CENTER);
    strokeWeight(1);
    stroke('#202021');
    fill(color);
    rect(0, 0, options.w, options.h,this.h/10);
    pop();
  }


}
