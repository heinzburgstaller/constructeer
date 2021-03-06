class Human {

  constructor(x, y, h, hitCallback) {

    this.x = x;
    this.y = y;
    this.h = h;
    this.hitCallback = hitCallback;

    this.head_options = {
      h: this.h / 5,
      w: this.h / 5,
      friction: 0.95,
      restitution: 0.2,
      angle: 0,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "human"
      },
      chamfer: {
        radius: this.h / 10
      }
    }
    this.torso_options = {
      h: 2 * this.h / 5,
      w: 2 * this.h / 6,
      friction: 0.95,
      restitution: 0.2,
      angle: 0,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "human"
      },
      chamfer: {
        radius: this.h / 10
      }
    }
    this.left_arm_options = {
      h: 2 * this.h / 5,
      w: this.h / 10,
      friction: 0.95,
      restitution: 0.2,
      angle: PI / 4, // a+0.785398,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "human"
      },
      chamfer: {
        radius: this.h / 10
      }
    }
    this.right_arm_options = {
      h: 2 * this.h / 5,
      w: this.h / 10,
      friction: 0.95,
      restitution: 0.2,
      angle: -0.785398,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "human"
      },
      chamfer: {
        radius: this.h / 10
      }
    }
    this.left_foot_options = {
      h: 2 * this.h / 5,
      w: this.h / 10,
      friction: 0.95,
      restitution: 0.2,
      angle: 0,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "human"
      },
      chamfer: {
        radius: this.h / 10
      }
    }
    this.right_foot_options = {
      h: 2 * this.h / 5,
      w: this.h / 10,
      friction: 0.95,
      restitution: 0.2,
      angle: 0,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "human"
      },
      chamfer: {
        radius: this.h / 10
      }
    }

    this.head = Bodies.rectangle(x, y - 8.5 * this.h / 10, this.head_options.w, this.head_options.h, this.head_options);
    this.torso = Bodies.rectangle(x, y - 11 * this.h / 20, this.torso_options.w, this.torso_options.h, this.torso_options);
    this.left_arm = Bodies.rectangle(x - 2 * this.h / 10, y - 3 * this.h / 5, this.left_arm_options.w, this.left_arm_options.h, this.left_arm_options);
    this.right_arm = Bodies.rectangle(x + 2 * this.h / 10, y - 3 * this.h / 5, this.right_arm_options.w, this.right_arm_options.h, this.right_arm_options);
    this.left_foot = Bodies.rectangle(x - this.h / 10, y - this.h / 5, this.left_foot_options.w, this.left_foot_options.h, this.left_foot_options);
    this.right_foot = Bodies.rectangle(x + this.h / 10, y - this.h / 5, this.right_foot_options.w, this.right_foot_options.h, this.right_foot_options);

    World.add(world, this.head);
    World.add(world, this.torso);
    World.add(world, this.left_arm);
    World.add(world, this.right_arm);
    World.add(world, this.left_foot);
    World.add(world, this.right_foot);

    this.createConstraints();

    var collide = (function (pair) {
      this.hitCallback();
    }).bind(this);
    this.head.onCollide(collide);
  }

  testEvent() {
    debugger;
  }

  createConstraints() {
    var headTorso1 = Constraint.create({
      bodyA: this.head,
      length: 0,
      pointA: {
        x: -this.head_options.w / 4,
        y: this.head_options.h / 2
      },
      pointB: {
        x: -this.head_options.w / 4,
        y: -this.torso_options.h / 2
      },
      bodyB: this.torso,
      stiffness: 0.02
    });
    var headTorso2 = Constraint.create({
      bodyA: this.head,
      length: 0,
      pointA: {
        x: this.head_options.w / 4,
        y: this.head_options.h / 2
      },
      pointB: {
        x: this.head_options.w / 4,
        y: -this.torso_options.h / 2
      },
      bodyB: this.torso,
      stiffness: 0.02
    });

    var LeftArmTorso1 = Constraint.create({
      bodyA: this.left_arm,
      length: 0,
      pointA: {
        x: 0,
        y: -this.left_arm_options.h / 2
      },
      pointB: {
        x: -this.torso_options.w / 1.6,
        y: -this.torso_options.h / 1.6
      },
      bodyB: this.torso,
      stiffness: 0.02
    });

    var RightArmTorso1 = Constraint.create({
      bodyA: this.right_arm,
      length: 0,
      pointA: {
        x: 0,
        y: -this.right_arm_options.h / 2
      },
      pointB: {
        x: +this.torso_options.w / 1.6,
        y: -this.torso_options.h / 1.6
      },
      bodyB: this.torso,
      stiffness: 0.02
    });

    var LeftFootTorso1 = Constraint.create({
      bodyA: this.torso,
      length: 0,
      pointA: {
        x: -this.h / 10,
        y: (11 * this.h / 20 - this.left_foot_options.h)
      },
      pointB: {
        x: 0,
        y: -this.left_foot_options.h / 2
      },
      bodyB: this.left_foot,
      stiffness: 0.6
    });

    var LeftFootTorso2 = Constraint.create({
      bodyA: this.torso,
      length: 0,
      pointA: {
        x: -this.h / 10,
        y: (11 * this.h / 20 - this.left_foot_options.h) + 10
      },
      pointB: {
        x: 0,
        y: -this.left_foot_options.h / 2 + 10
      },
      bodyB: this.left_foot,
      stiffness: 0.6
    });

    var RightFootTorso1 = Constraint.create({
      bodyA: this.torso,
      length: 0,
      pointA: {
        x: +this.h / 10,
        y: (11 * this.h / 20 - this.left_foot_options.h)
      },
      pointB: {
        x: 0,
        y: -this.left_foot_options.h / 2
      },
      bodyB: this.right_foot,
      stiffness: 0.6
    });

    var RightFootTorso2 = Constraint.create({
      bodyA: this.torso,
      length: 0,
      pointA: {
        x: +this.h / 10,
        y: (11 * this.h / 20 - this.left_foot_options.h) + 10
      },
      pointB: {
        x: 0,
        y: -this.left_foot_options.h / 2 + 10
      },
      bodyB: this.right_foot,
      stiffness: 0.6
    });

    World.add(world, headTorso1);
    World.add(world, headTorso2);
    World.add(world, LeftArmTorso1);
    World.add(world, RightArmTorso1);
    World.add(world, LeftFootTorso1);
    World.add(world, LeftFootTorso2);
    World.add(world, RightFootTorso1);
    World.add(world, RightFootTorso2);
  }

  show() {
    this.drawBodypart(this.head, this.head_options, '#fdc5ba');
    this.drawBodypart(this.right_arm, this.right_arm_options, '#7CA660');
    this.drawBodypart(this.left_foot, this.left_foot_options, '#9499A6');
    this.drawBodypart(this.right_foot, this.right_foot_options, '#9499A6');
    this.drawBodypart(this.left_arm, this.left_arm_options, '#7CA660');
    this.drawBodypart(this.torso, this.torso_options, '#7CA660');

  }

  remove() {
    World.remove(world, this.head);
    World.remove(world, this.right_arm);
    World.remove(world, this.left_foot);
    World.remove(world, this.right_foot);
    World.remove(world, this.torso);
    World.remove(world, this.left_arm);
  }

  drawBodypart(part, options, color) {
    push();
    translate(part.position.x, part.position.y);
    rotate(part.angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke('#202021');
    fill(color);
    rect(0, 0, options.w, options.h, this.h / 10);
    pop();
  }

}
