class Level01 extends BaseLevel {

  constructor(width, height) {
    super(width, height);
  }

  setup() {
    this.ground.push(new Ground(this.width / 2, this.height - 50 / 2, width, 50));
    this.anchors.push(new Joint(this.width * 0.25, this.height - 50, 15, true));
    this.anchors.push(new Joint(this.width * 0.75, this.height - 50, 15, true));
  }

  show() {
    super.show();
  }

}