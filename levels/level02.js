class Level02 extends BaseLevel {

  constructor(width, height, hitCallback) {
    super(width, height, hitCallback, 30, ASSETS.IMAGES["b1.jpg"]);
  }

  setup() {
    this.ground.push(new Ground(this.width / 2, this.height - 50 / 2, width, 50));
    this.anchors.push(new Joint(50 * 6, this.height - 50, 12, true));
    this.anchors.push(new Joint(this.width - (50 * 6), this.height - 50, 12, true));
  }

  setupHumans() {
    this.humans.push(new Human(this.width / 2 - 50, this.height - 50, 120, this.humanHitCallback));
    this.humans.push(new Human(this.width / 2 + 50, this.height - 50, 120, this.humanHitCallback));
  }

  show() {
    super.show();
  }

  doCatastrophe() {
    for (var i = 0; i < 100; i++) {
      this.others.push(new Snowball(this.width / 2 + random(-80, 80), random(-12, -150), random(3, 12)));
    }
  }

}
