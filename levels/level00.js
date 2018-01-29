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
    if (runEngine == false) {
      this.showTutorial();
    }
  }

  showTutorial() {
    push();
    textStyle(BOLD);
    textSize(32);
    text('Welcome to Constructeer!', 30, 30);

    this.after(1.2, () => {
      textStyle(NORMAL);
      textSize(22);
      text('Save the humans by constructing a helping barrier\n' +
        'using your construction and engineer skills.',
        30, 80
      );
    });

    this.for(1, (progress) => {
      var p1 = { x: 500, y: 500 };
      var p2 = { x: 800, y: 400 };
      var p3 = { x: p1.x + ((p2.x - p1.x) * progress), y: p1.y + ((p2.y - p1.y) * progress) };

      line(p1.x, p1.y, p3.x, p3.y);
    }, 4, true);
    pop();
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
