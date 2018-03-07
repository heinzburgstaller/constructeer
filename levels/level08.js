class Level08 extends BaseLevel {

  constructor(width, height, hitCallback) {
    super(width, height, hitCallback, 25, ASSETS.IMAGES["b3.png"]);
    this.counter = -1;
    this.counter2 = -0.5;
    this.nextLevel = "Level09";
  }


  setup() {
    this.ground.push(new Ground(this.width / 2, this.height - gridSize / 2, width, gridSize));
    //this.anchors.push(new Joint(gridSize * 8, this.height - gridSize, 12, true));
    this.anchors.push(new Joint(gridSize * 9, this.height - gridSize, 12, true));
    //this.anchors.push(new Joint(this.width - (gridSize * 8), this.height - gridSize, 12, true));
    this.anchors.push(new Joint(this.width - (gridSize * 9), this.height - gridSize, 12, true));
    this.counter = -5;

    //console.log(Matter.Body);
    var this_closure = this;
    Events.on(engine, 'beforeUpdate', function(event) {
      var speed1 = 0.1;
      var speed2 = 0.2;
      var mod1 = 5;
      var mod2 = 2;
      this_closure.counter += speed1;
      this_closure.counter2 += speed2;

        if (this_closure.counter < 0) {
            return;
        }


        for (let anchor of this_closure.anchors)
        {
          var px2 = mod1*Math.sin(this_closure.counter-speed1);
          var px3 = mod2*Math.sin(this_closure.counter2-speed2);
          var px = anchor.body.position.x + mod1 * Math.sin(this_closure.counter)-px2+px3 - (mod2*Math.sin(this_closure.counter2));
          Matter.Body.setVelocity(anchor.body, { x: px - anchor.body.position.x, y: 0 });
          Matter.Body.setPosition(anchor.body, { x: px, y: anchor.body.position.y });

        }
        // body is static so must manually update velocity for friction to work

  });
}

  setupHumans() {
    this.humans.push(new Human((this.width / 2) + (gridSize*3/2), this.height - gridSize*10-10, 120, this.humanHitCallback));
  }

  show() {
    super.show();
  }

  doCatastrophe() {
    //this.others.push(new Meteor(this.width / 2, -70, 45));
    //this.anchors
    this.counter = -1;
  }

  resetStaticJoints()
  {
    this.counter = -5;

    Matter.Body.setVelocity(this.anchors[0].body, { x: 0, y: 0 });
    Matter.Body.setPosition(this.anchors[0].body, { x: gridSize * 9, y: this.anchors[0].body.position.y });


    Matter.Body.setVelocity(this.anchors[1].body, { x: 0, y: 0 });
    Matter.Body.setPosition(this.anchors[1].body, { x: this.width - (gridSize * 9), y: this.anchors[1].body.position.y });

  }



}
