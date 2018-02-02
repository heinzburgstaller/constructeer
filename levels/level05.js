class Level05 extends BaseLevel {

  constructor(width, height, hitCallback) {
    super(width, height, hitCallback, 25, ASSETS.IMAGES["b3.png"]);
  }


  setup() {
    this.ground.push(new Ground(this.width / 2, this.height - gridSize / 2, width, gridSize));
    this.anchors.push(new Joint(this.width * 0.30, this.height - gridSize - 12, 12, true));
    this.anchors.push(new Joint(this.width * 0.70, this.height - gridSize - 12, 12, true));
  }

  setupHumans() {
    this.humans.push(new Human(this.width / 2, this.height - gridSize, 120, this.humanHitCallback));
    this.humans.push(new Human(this.width / 2 + 100, this.height - gridSize, 100, this.humanHitCallback));
    this.humans.push(new Human(this.width / 2 - 100, this.height - gridSize, 110, this.humanHitCallback));
    this.others.push(new WreckingBall(200, 0, 500, 50));
  }

  show() {
    super.show();
  }

  doCatastrophe() {

  }

}
