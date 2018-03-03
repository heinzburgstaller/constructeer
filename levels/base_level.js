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
    this.frameCountInConstructor = frameCount;
    document.getElementById('beamsToGo').innerHTML = this.maxBeams;
  }

  setup() {

  }

  after(seconds, callback) {
    if (this.frameCountInConstructor + (seconds * FPS) < frameCount) {
      callback.apply(this);
    }
  }

  for(seconds, callback, afterSeconds = 0, repeat = false) {
    var startedAt = this.frameCountInConstructor + (afterSeconds * FPS);

    if (startedAt >= frameCount) {
      return;
    }

    var diff = startedAt + (frameCount - startedAt);
    var endAt = startedAt + FPS * seconds;

    if (repeat == false && endAt < frameCount) {
      return;
    }

    var progress = (diff - startedAt) / (endAt - startedAt);
    var integr = Math.floor(progress);
    var decimal = progress - integr;
    callback.apply(this, [decimal]);
  }

  setupHumans() {

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
    this.clearHumans();
  }

  clearOthers() {
    this.others.forEach(element => {
      element.remove();
    });
    this.others = [];
  }

  clearHumans() {
    this.humans.forEach(human => {
      human.remove();
    });
    this.humans = [];
  }

  resetStaticJoints()
  {

  }

}
