class Level01 extends BaseLevel {

  constructor(width, height, hitCallback) {
    super(width, height, hitCallback, 25, ASSETS.IMAGES["b3.png"]);
  }


  setup() {
    this.ground.push(new Ground(this.width / 2, this.height - 100 / 2, width, 100));
    this.anchors.push(new Joint(this.width * (0.30 * 10 / 11), this.height - 100, 12, true));
    this.anchors.push(new Joint(this.width * (0.70 * 10 / 11), this.height - 100, 12, true));
  }

  show() {
    super.show();
  }

  doCatastrophe() {
    this.others.push(new Meteor(this.width / 2, -70, 45));
  }

}
