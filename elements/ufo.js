class UFO {
  
  constructor(x, y, speed, bounce, interval, hardness) {
    this.x = x || 20;
    this.y = y || 20;
    this.speed = speed || 1.5;
    this.bounce = bounce || 1;
    this.interval = interval || 10;
    this.hardness = hardness || 30;

    // this.ufo = loadImage("assets/ufo.png");
    this.ufo = loadImage(ASSETS.IMAGES["ufo.png"]);

    this.bullets = [];

    this.target = {
      x: CANVAS_WIDTH / 2.0,
      y: CANVAS_HEIGHT
    };
  }

  remove() {
    for (var i in this.bullets) {
      World.remove(world, this.bullets[i]);
    }    
  }

  show() {
    push();
    this.drawUFO();
    this.shoot();
    this.drawBullets();
    pop();
  }

  drawUFO() {
    if (this.x < CANVAS_WIDTH - this.ufo.width) {
      this.x += this.speed;
      this.y += this.bounce * Math.sin(this.x * Math.PI / 180.0);
      image(this.ufo, this.x, this.y);
    }
  }

  shoot() {
    if (this.x % this.interval == 0) {
      console.log('Shoot!');
      var b = Bodies.circle(this.x, this.y + 20, 10, {
        friction: 0.0,
        restitution: 0.6,
        isStatic: false,
        density: 0.5,
        mass: 200
      });
      
      this.bullets.push(b);
      
      var d_x = this.target.x - this.x;
      var d_y = this.target.y - this.y;

      var norm = Math.sqrt(Math.pow(d_x, 2) + Math.pow(d_y, 2));
      d_x = d_x / norm * this.hardness;
      d_y = d_y / norm * this.hardness;

      console.log(d_x, d_y);
      Matter.Body.setVelocity(b, { x: d_x, y: d_y });

      World.add(world, b);
    }
  }

  drawBullets() {
    for (var i in this.bullets) {
      // console.log("Draw " + i)
      var pos = this.bullets[i].position;      
      strokeWeight(1);
      stroke('#202021');
      fill('#f9fbff');
      ellipse(pos.x, pos.y, 10 * 2);
    }
  }
}