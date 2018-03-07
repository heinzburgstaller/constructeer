class Level01 extends BaseLevel {

  constructor(width, height, hitCallback) {
    super(width, height, hitCallback, 25, ASSETS.IMAGES["b3.png"]);
    this.nextLevel = "Level02";
  }


  setup() {
    this.ground.push(new Ground(this.width / 2, this.height - gridSize / 2, width, gridSize));
    this.anchors.push(new Joint(gridSize * 6, this.height - gridSize, 12, true));
    this.anchors.push(new Joint(this.width - (gridSize * 6), this.height - gridSize, 12, true));
  }

  setupHumans() {
    this.humans.push(new Human(this.width / 2, this.height - gridSize, 120, this.humanHitCallback));
  }

  show() {
    super.show();
  }

  doCatastrophe() {
    this.others.push(new Meteor(this.width / 2, -70, 45));
  }

}
