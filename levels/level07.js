class Level07 extends BaseLevel {

  constructor(width, height, hitCallback) {
    super(width, height, hitCallback, 40, ASSETS.IMAGES["b2.jpg"]);
  }

  setup() {
    //this.ground.push(new Ground(this.width / -3, this.height * 0.60, 1000, 1000, PI / 4));
    this.ground.push(new Ground(this.width / 2, this.height - gridSize / 2, width *3, gridSize));
    this.anchors.push(new Joint(this.width - (gridSize * 15), this.height - gridSize, 12, true));
    this.anchors.push(new Joint(this.width - (gridSize * 11), this.height - gridSize, 12, true));
    this.anchors.push(new Joint(this.width - (gridSize * 8), this.height - gridSize, 12, true));
  }

  setupHumans() {
    this.humans.push(new Human(this.width - (gridSize * 12), this.height - gridSize, 110, this.humanHitCallback));
    this.humans.push(new Human(this.width - (gridSize * 14), this.height - gridSize, 120, this.humanHitCallback));
    this.humans.push(new Human(this.width - (gridSize * 9), this.height - gridSize, 80, this.humanHitCallback));
  }

  show() {
    super.show();
  }

  doCatastrophe() {
    for (var i = 0; i < width; i = i+2) {
      this.others.push(new Raindrop(random(-50, i*3), random(-50, height/2), 3));
      //this.others.push(new Raindrop(random(width/2, width), random(0, 10), random(2, 4)));

    }


  }

}
