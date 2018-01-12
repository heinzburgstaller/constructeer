class BaseLevel {

  constructor(width, height, maxBeams = 50) {
    this.width = width;
    this.height = height;
    this.ground = [];
    this.anchors = [];
    this.others = [];
    this.maxBeams = maxBeams;
    document.getElementById('beamsToGo').innerHTML = this.maxBeams;
  }

  setup() {

  }

  show() {
    background('#bce6ff'); // sky
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