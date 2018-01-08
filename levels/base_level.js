class BaseLevel {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.ground = [];
    this.anchors = [];
    this.others = [];
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

}