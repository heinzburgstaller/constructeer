class Level02 extends BaseLevel {

  constructor(width, height) {
    super(width, height);
  }

  setup() {
    this.ground.push(new Ground(this.width / 2, this.height - 50 / 2, width, 50));
    this.anchors.push(new Joint(this.width * 0.35, this.height - 50 - 12, 12, true));
    this.anchors.push(new Joint(this.width * 0.65, this.height - 50 - 12, 12, true));
  }

  show() {
    super.show();
  }

  doCatastrophe() {
    for (var i = 0; i < 100; i++) {
      this.others.push(new Snowball(this.width / 2 + random(-80, 80), random(-200, -300), random(2, 10)));
    }
  }

}