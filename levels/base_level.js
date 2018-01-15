class BaseLevel {

  constructor(width, height, maxBeams = 50, bgImage = null) {
    this.width = width;
    this.height = height;
    this.ground = [];
    this.anchors = [];
    this.others = [];
    this.maxBeams = maxBeams;
    this.bg = null; // bgImage != null ? loadImage(bgImage) : null;
    document.getElementById('beamsToGo').innerHTML = this.maxBeams;
  }

  setup() {

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