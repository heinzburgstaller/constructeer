class Level03 extends BaseLevel {

  constructor(width, height, hitCallback) {
    super(width, height, hitCallback, 40, ASSETS.IMAGES["b2.jpg"]);
  }

  setup() {
    this.ground.push(new Ground(this.width / -3, this.height * 0.60, 1000, 1000, PI / 5));
    this.ground.push(new Ground(this.width / 2, this.height - 50 / 2, width, 50));
    this.anchors.push(new Joint(this.width - (50 * 9), this.height - 50, 12, true));
    this.anchors.push(new Joint(this.width - (50 * 7), this.height - 50, 12, true));
    this.anchors.push(new Joint(this.width - (50 * 5), this.height - 50, 12, true));
  }

  setupHumans() {
    this.humans.push(new Human(this.width - (50 * 12), this.height - 50, 110, this.humanHitCallback));
    this.humans.push(new Human(this.width - (50 * 14), this.height - 50, 120, this.humanHitCallback));
  }

  show() {
    super.show();
  }

  doCatastrophe() {
    for (var i = 0; i < 100; i++) {
      this.others.push(new Snowball(random(-150, -100), random(-350, -300), random(8, 16)));
    }
  }

}
