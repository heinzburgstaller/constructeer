class BaseLevel {

  constructor(width, height, humanHitCallback = null, maxBeams = 50, bgImage = null) {
    this.width = width;
    this.height = height;
    this.ground = [];
    this.anchors = [];
    this.humans = [];
    this.others = [];
    this.humanHitCallback = humanHitCallback;
    this.maxBeams = maxBeams;
    this.bg = bgImage != null ? loadImage(bgImage) : null;
    document.getElementById('beamsToGo').innerHTML = this.maxBeams;
  }

  setup() {

  }

  pointIsInGround(x, y) {
    var isIn = false;
    this.ground.forEach(g => {
      if (g.pointIsIn(x, y)) {
        isIn = true;
      }
    });
    return isIn;
  }

  show() {
    if (this.bg === null) {
      background('#bce6ff');
    } else {
      background(this.bg);
    }
    this.ground.forEach(element => {
      element.show();
    });

    this.humans.forEach(element => {
      element.show();
    });

    this.anchors.forEach(element => {
      element.show();
    });

    this.others.forEach(element => {
      element.show();
    });
  }

  doCatastrophe() {

  }

  clear() {
    this.ground.forEach(element => {
      element.remove();
    });

    this.anchors.forEach(element => {
      element.remove();
    });

    this.ground = [];
    this.anchors = [];
    this.clearOthers();
  }

  clearOthers() {
    this.others.forEach(element => {
      element.remove();
    });
    this.others = [];
  }

}
