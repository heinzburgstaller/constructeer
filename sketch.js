// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render, Not needed rendering is done by p5.js
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;

var ground;
var stealBeams = [];

function setup() {
  createCanvas(1200, 800);
  engine = Engine.create();
  world = engine.world;
  //Engine.run(engine); // Done in draw() function

  ground = new Ground(width / 2, 775, width, 50); // Grass
}

function mouseDragged() {

}

function mouseClicked() {
  stealBeams.push(new SteelBeam(mouseX, mouseY, 20, 200));
}

function draw() {
  background('#bce6ff'); // sky
  Engine.update(engine);

  ground.show();
  stealBeams.forEach(item => item.show());
}