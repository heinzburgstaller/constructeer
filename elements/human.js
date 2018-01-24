class Human {

  constructor(x, y, h, a) {

    this.x = x;
    this.y = y;
    this.h = h;
    this.a = a;

    this.head_options = {
      h: this.h/5,
      w: this.h/5,
      friction: 0.95,
      restitution: 0.2,
      angle: a,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "human"
      },
      chamfer: {
            radius: this.h/10
      }
    }
    this.torso_options = {
      h: 2*this.h/5,
      w: 2*this.h/6,
      friction: 0.95,
      restitution: 0.2,
      angle: a,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "human"
      },
      chamfer: {
            radius: this.h/10
      }
    }
    this.left_arm_options = {
      h: 2*this.h/5,
      w: this.h/10,
      friction: 0.95,
      restitution: 0.2,
      angle: PI / 4, // a+0.785398,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "human"
      },
      chamfer: {
            radius: this.h/10
      }
    }
    this.right_arm_options = {
      h: 2*this.h/5,
      w: this.h/10,
      friction: 0.95,
      restitution: 0.2,
      angle: a-0.785398,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "human"
      },
      chamfer: {
            radius: this.h/10
      }
    }
    this.left_foot_options = {
      h: 2*this.h/5,
      w: this.h/10,
      friction: 0.95,
      restitution: 0.2,
      angle: a,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "human"
      },
      chamfer: {
            radius: this.h/10
      }
    }
    this.right_foot_options = {
      h: 2*this.h/5,
      w: this.h/10,
      friction: 0.95,
      restitution: 0.2,
      angle: a,
      isStatic: false,
      density: 1.0,
      collisionFilter: {
        group: "human"
      },
      chamfer: {
            radius: this.h/10
      }
    }

    this.head = Bodies.rectangle(x, y-8.5*this.h/10, this.head_options.w, this.head_options.h, this.head_options);
    this.torso = Bodies.rectangle(x, y-11*this.h/20, this.torso_options.w, this.torso_options.h, this.torso_options);
    this.left_arm = Bodies.rectangle(x-2*this.h/10, y-3*this.h/5, this.left_arm_options.w, this.left_arm_options.h, this.left_arm_options);
    this.right_arm = Bodies.rectangle(x+2*this.h/10, y-3*this.h/5, this.right_arm_options.w, this.right_arm_options.h, this.right_arm_options);
    this.left_foot = Bodies.rectangle(x+this.h/10, y-this.h/5, this.left_foot_options.w, this.left_foot_options.h, this.left_foot_options);
    this.right_foot = Bodies.rectangle(x-this.h/10, y-this.h/5, this.right_foot_options.w, this.right_foot_options.h, this.right_foot_options);

    World.add(world, this.head);
    World.add(world, this.torso);
    World.add(world, this.left_arm);
    World.add(world, this.right_arm);
    World.add(world, this.left_foot);
    World.add(world, this.right_foot);

    this.createConstraints();

  }

  createConstraints(){
    var headTorso1 = Constraint.create({
        bodyA: this.head,
        pointA: {
            x: -this.head_options.w/4,
            y: this.head_options.h/2
        },
        pointB: {
            x: -this.head_options.w/4,
            y: -this.torso_options.h/2
        },
        bodyB: this.torso,
        stiffness: 0.02
    });
    var headTorso2 = Constraint.create({
        bodyA: this.head,
        pointA: {
            x: this.head_options.w/4,
            y: this.head_options.h/2
        },
        pointB: {
            x: this.head_options.w/4,
            y: -this.torso_options.h/2
        },
        bodyB: this.torso,
        stiffness: 0.02
    });

    var LeftArmTorso1 = Constraint.create({
        bodyA: this.left_arm,
        pointA: {
            x: 0,
            y: this.left_arm_options.h/2
        },
        pointB: {
            x: -this.torso_options.w/2,
            y: -this.torso_options.h/2
        },
        bodyB: this.torso,
        stiffness: 0.9
    });

    var LeftArmTorso2 = Constraint.create({
        bodyA: this.torso,
        pointA: {
            x: -this.torso_options.w/2,
            y: -this.torso_options.h/2
        },
        pointB: {
            x: +this.h/20,
            y: this.left_arm_options.h/2
        },
        bodyB: this.left_arm,
        stiffness: 1
    });

    var LeftFootTorso1 = Constraint.create({
        bodyA: this.torso,
        pointA: {
            x: -this.torso_options.w/2,
            y: this.torso_options.h/2
        },
        pointB: {
            x: 0,
            y: this.left_foot_options.h/2
        },
        bodyB: this.left_foot,
        stiffness: 1
    });

    World.add(world, headTorso1);
    World.add(world, headTorso2);
    //World.add(world, LeftArmTorso1);
    //World.add(world, LeftArmTorso2);
    World.add(world, LeftFootTorso1);
  }

  show() {
    this.drawBodypart(this.head, this.head_options);
    this.drawBodypart(this.right_arm, this.right_arm_options);
    this.drawBodypart(this.left_foot, this.left_foot_options);
    this.drawBodypart(this.right_foot, this.right_foot_options);
    this.drawBodypart(this.torso, this.torso_options);
    this.drawBodypart(this.left_arm, this.left_arm_options);
  }

  drawBodypart(part, options){
    push();
    translate(part.position.x, part.position.y);
    rotate(part.angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke('#202021');
    fill('#4e4e51');
    rect(0, 0, options.w, options.h,this.h/10);
    pop();
  }

  getAngle() {
    return this.body.angle;
  }

}
