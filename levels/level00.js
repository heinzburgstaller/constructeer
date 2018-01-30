class Level00 extends BaseLevel {

  constructor(width, height, hitCallback) {
    super(width, height, hitCallback, 2, ASSETS.IMAGES["b1.jpg"]);
    this.joint1 = { x: 50 * 9, y: 50 * 9 };
    this.joint2 = { x: this.width - (50 * 9), y: 50 * 9 };
  }

  setup() {
    this.ground.push(new Ground(this.width / -6.7, this.height * 1.18, 1000, 1000, PI / 10));
    this.ground.push(new Ground(this.width + this.width / 6.7, this.height * 1.18, 1000, 1000, -PI / 10, '#003d00'));
    this.ground.push(new Ground(this.width / 2, this.height - 50 / 2, width, 50, 0, '#629749'));
    this.anchors.push(new Joint(this.joint1.x, this.joint1.y, 12, true));
    this.anchors.push(new Joint(this.joint2.x, this.joint2.y, 12, true));
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
    text('Welcome to Constructeer!', 30, 50);

    this.after(1.2, () => {
      textStyle(NORMAL);
      textSize(22);
      text('Save the humans by constructing\na helping barrier!' +
        ' Use and improve your\nconstruction and engineering skills.',
        30, 100
      );
    });

    this.after(3.2, () => {
      textStyle(BOLD);
      textSize(18);
      text('Draw beams by dragging your mouse from joint to joint...',
        250, 300
      );
    });

    this.after(3.2, () => {
      textStyle(NORMAL);
      strokeWeight(1);
      textSize(18);
      text('(Hint: Hold down the SHIFT key to get a helper grid)',
        250, 330
      );
    });

    this.after(5, () => {
      textStyle(NORMAL);
      textSize(18);
      fill('blue');
      text('Test your construction\nby hitting the "Run" button!',
        935, 30
      );
    });

    this.after(5.8, () => {
      textStyle(NORMAL);
      textSize(18);
      fill('red');
      text('Or go back into construction\nmode with the "Construct"\nbutton, if something went\nwrong',
        935, 80
      );
    });

    this.after(7.8, () => {
      textStyle(NORMAL);
      textSize(15);
      fill('black');
      text('A wonderful\n"undo" button is\nalso up here ;)',
        720, 30
      );
    });

    this.for(2.6, (progress) => {
      strokeWeight(2);
      stroke('#ff5722');
      var firstHalf = progress * 2;
      var secondHalf = (progress - 0.5) * 2;

      var p1 = this.joint1;
      var p2 = { x: 600, y: 400 };
      var p3 = { x: p1.x + ((p2.x - p1.x) * firstHalf), y: p1.y + ((p2.y - p1.y) * firstHalf) };

      if (firstHalf > 0.9) {
        fill('#ff5722');
        ellipse(p2.x, p2.y, 12 * 2);
      }

      if (firstHalf <= 1.0) {
        line(p1.x, p1.y, p3.x, p3.y);
        return;
      }

      var p4 = this.joint2;
      var p5 = { x: p2.x + ((p4.x - p2.x) * secondHalf), y: p2.y + ((p4.y - p2.y) * secondHalf) };

      line(p1.x, p1.y, p2.x, p2.y);
      line(p2.x, p2.y, p5.x, p5.y);
    }, 3.2, true);

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
