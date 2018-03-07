class Level10 extends BaseLevel {

  constructor(width, height, hitCallback) {
    super(width, height, hitCallback, 35, ASSETS.IMAGES["b5.jpg"]);
  }

  setup() {
    this.ground.push(new Ground(this.width / 2, this.height - gridSize / 2, width, gridSize));
    this.anchors.push(new Joint(this.width - (gridSize * 16), this.height - gridSize, 12, true));
    this.anchors.push(new Joint(this.width - (gridSize * 8), this.height - gridSize, 12, true));
  }

  setupHumans() {
    this.humans.push(new Human(this.width - (gridSize * 10), this.height - gridSize, 110, this.humanHitCallback));
    this.humans.push(new Human(this.width - (gridSize * 12), this.height - gridSize, 120, this.humanHitCallback));
    this.humans.push(new Human(this.width - (gridSize * 14), this.height - gridSize, 120, this.humanHitCallback));
  }

  show() {
    super.show();
  }

  doCatastrophe() {
    this.others.push(new Rocket());
  }

}