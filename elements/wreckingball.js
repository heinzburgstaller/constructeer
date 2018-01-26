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

  }

}
