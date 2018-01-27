class Level01 extends BaseLevel {

  constructor(width, height, hitCallback) {
    super(width, height, hitCallback, 25, ASSETS.IMAGES["b3.png"]);
  }


  setup() {
    this.ground.push(new Ground(this.width / 2, this.height - 50 / 2, width, 50));
    this.anchors.push(new Joint(50 * 6, this.height - 50, 12, true));
    this.anchors.push(new Joint(this.width - (50 * 6), this.height - 50, 12, true));
  }

  setupHumans() {
    this.humans.push(new Human(this.width / 2, this.height - 50, 120, this.humanHitCallback));
  }

  show() {
    super.show();
  }

  doCatastrophe() {
    this.others.push(new Meteor(this.width / 2, -70, 45));
  }

}
