class WreckingBall{

  constructor(x, y, length, ballSize) {
    this.x = x;
    this.y = y;
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
      h: 20,
      w: length,
      friction: 0.95,
      restitution: 0.2,
      angle: 0,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "wrecking"
      },
      chamfer: {
        radius: this.length / 10
      }
    }

    this.ball_options = {
      h: ballSize,
      w: ballSize,
      friction: 0.95,
      restitution: 0.2,
      angle: 0,
      isStatic: false,
      density: 100.0,
      collisionFilter: {
        group: "wrecking"
      }
    }



    this.rotation_point = Bodies.circle(this.x+this.length, this.y, 10, this.rotation_point_options);
    this.line = Bodies.rectangle(this.x+this.length/2, this.y, this.line_options.w, this.line_options.h, this.line_options);
    this.ball = Bodies.circle(this.x, this.y, this.ballSize, this.ball_options);

    World.add(world, this.rotation_point);
    World.add(world, this.line);
    World.add(world, this.ball);

    this.createConstraints();

  }

  remove() {
    World.remove(world, this.rotation_point);
    World.remove(world, this.line);
    World.remove(world, this.ball);
  }

  createConstraints(){

    var rotation_to_line = Constraint.create({
      bodyA: this.line,
      length: 0,
      pointA: {
        x: this.length/2,
        y: 0
      },
      pointB: {
        x: 0,
        y: 0
      },
      bodyB: this.rotation_point,
      stiffness: 1
    });

    var ball_to_line = Constraint.create({
      bodyA: this.line,
      length: 0,
      pointA: {
        x: -this.length/2,
        y: 0
      },
      pointB: {
        x: 0,
        y: 0
      },
      bodyB: this.ball,
      stiffness: 1
    });

    World.add(world, rotation_to_line);
    World.add(world, ball_to_line);

  }

  show() {
    this.drawRect(this.line, this.line_options, '#d7d73c');
    this.drawCircle(this.ball, this.ball_options, '#d73c3c');
    this.drawCircle(this.rotation_point, this.rotation_point_options, '#3c3cd7');
  }

  drawRect(part, options, color){
    push();
    translate(part.position.x, part.position.y);
    rotate(part.angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke('#202021');
    fill(color);
    rect(0, 0, options.w, options.h, this.length / 10);
    pop();
  }

  drawCircle(part, options, color){
    push();
    translate(part.position.x, part.position.y);
    rotate(part.angle);
    strokeWeight(1);
    stroke('#202021');
    fill(color);
    ellipse(0, 0, options.w*2);
    pop();
  }


}
