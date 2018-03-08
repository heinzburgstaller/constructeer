class Rocket {

  constructor(x, y, speed, bounce, interval, hardness) {
      this.x = 20;
      this.y = 20;

    this.rocket = loadImage(ASSETS.IMAGES["rocket.png"]);

    this.cup = Bodies.rectangle(200, 200, 200, 100,
        {isStatic: true,
            isSensor: true,
            label: 'cup',
            collisionFilter: {category: 0x0002}
        });

    World.add(world, this.cup);

  }

  remove() {
      World.remove(world, this.rocket)
  }

  show() {
    this.drawRocket();
  }

  drawRocket(){
      push();
      translate(this.cup, 20, 20);
      scale(2.0);
      rotate(PI / 3.60);
      if (this.x < CANVAS_WIDTH - this.rocket.width) {
          this.x += 7;
          this.y += -2;
          image(this.rocket, this.x, this.y);
      }
      pop();
  }

}