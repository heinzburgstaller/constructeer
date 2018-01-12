class Level01 extends BaseLevel {

  constructor(width, height) {
    super(width, height);
    this.maxBeams = 30;
  }

  setup() {
    this.ground.push(new Ground(this.width / 2, this.height - 50 / 2, width, 50));
    this.anchors.push(new Joint(this.width * 0.30, this.height - 50 - 12, 12, true));
    this.anchors.push(new Joint(this.width * 0.70, this.height - 50 - 12, 12, true));
    var counterbutton = document.getElementsByName('beams-left-button').item(0);
    counterbutton.innerHTML = this.maxBeams;
  }

  show() {
    super.show();
  }

  doCatastrophe() {
    this.others.push(new Meteor(this.width / 2, -70, 45));
  }

}