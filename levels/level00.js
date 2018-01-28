class Level00 extends BaseLevel {

  constructor(width, height, hitCallback) {
    super(width, height, hitCallback, 2, ASSETS.IMAGES["b1.jpg"]);
  }

  setup() {
    this.ground.push(new Ground(this.width / -6.7, this.height * 1.18, 1000, 1000, PI / 10));
    this.ground.push(new Ground(this.width + this.width / 6.7, this.height * 1.18, 1000, 1000, -PI / 10, '#003d00'));
    this.ground.push(new Ground(this.width / 2, this.height - 50 / 2, width, 50, 0, '#629749'));
    this.anchors.push(new Joint(50 * 9, 50 * 9, 12, true));
    this.anchors.push(new Joint(this.width - (50 * 9), 50 * 9, 12, true));
  }

  setupHumans() {
    this.humans.push(new Human(this.width / 2 - 75, this.height - 50, 100, this.humanHitCallback));
    this.humans.push(new Human(this.width / 2 + 75, this.height - 50, 95, this.humanHitCallback));
    this.humans.push(new Human(this.width / 2, this.height - 50, 110, this.humanHitCallback));
  }

  show() {
    super.show();
  }

  doCatastrophe() {
    var m1 = new Meteor(0, -70, 30, '#9c27b0');
    var m2 = new Meteor(this.width, -70, 30, '#d05ce3');
    this.others.push(m1);
    this.others.push(m2);

    Matter.Body.applyForce(m1.body, { x: 0, y: -70 }, { x: 80, y: 100 });
    Matter.Body.applyForce(m2.body, { x: this.width, y: -70 }, { x: -90, y: 90 });
  }

}
