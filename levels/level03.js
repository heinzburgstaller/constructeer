class Level03 extends BaseLevel {

  constructor(width, height, hitCallback) {
    super(width, height, hitCallback, 40, ASSETS.IMAGES["b2.jpg"]);
  }

  setup() {
    this.ground.push(new Ground(this.width / -3, this.height * 0.60, 1000, 1000, PI / 5));
    this.ground.push(new Ground(this.width / 2, this.height - gridSize / 2, width, gridSize));
    this.anchors.push(new Joint(this.width - (gridSize * 9), this.height - gridSize, 12, true));
    this.anchors.push(new Joint(this.width - (gridSize * 7), this.height - gridSize, 12, true));
    this.anchors.push(new Joint(this.width - (gridSize * 5), this.height - gridSize, 12, true));
  }

  setupHumans() {
    this.humans.push(new Human(this.width - (gridSize * 12), this.height - gridSize, 110, this.humanHitCallback));
    this.humans.push(new Human(this.width - (gridSize * 14), this.height - gridSize, 120, this.humanHitCallback));
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
