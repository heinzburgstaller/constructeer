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

}

var mousePressedX;
var mousePressedY;

function mousePressed() {
  mousePressedX = mouseX;
  mousePressedY = mouseY;
}

function mouseReleased() {
  var a = mouseX - mousePressedX;
  var b = mouseY - mousePressedY;
  var c = Math.sqrt(a * a + b * b);
  var x = (mouseX + mousePressedX) / 2;
  var y = (mouseY + mousePressedY) / 2;
  var angle = Math.atan2(b, a); // * 180 / Math.PI;

  stealBeams.push(new SteelBeam(x, y, 20, c, angle + (Math.PI / 2)));
}

function keyPressed() {
  console.log(key + ' pressed');
}

function draw() {
  background('#bce6ff'); // sky
  Engine.update(engine);

  ground.show();
  stealBeams.forEach(item => item.show());
}