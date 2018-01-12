class Level03 extends BaseLevel {

  constructor(width, height) {
    super(width, height, 40);
  }

  setup() {
    this.ground.push(new Ground(this.width / -3, this.height * 0.60, 1000, 1000, PI / 5));
    this.ground.push(new Ground(this.width / 2, this.height - 50 / 2, width, 50));
    this.anchors.push(new Joint(this.width * 0.90, this.height - 50 - 12, 12, true));
    this.anchors.push(new Joint(this.width * 0.75, this.height - 50 - 12, 12, true));
    this.anchors.push(new Joint(this.width * 0.60, this.height - 50 - 12, 12, true));
  }

  show() {
    super.show();
  }

  doCatastrophe() {
    for (var i = 0; i < 100; i++) {
      this.others.push(new Snowball(random(-150, -100), random(-350, -300), random(10, 25)));
    }
  }

}