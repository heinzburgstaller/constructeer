// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render, Not needed rendering is done by p5.js
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint;

var engine;
var world;
var runEngine = false;

var level;
var elements = [];
var beam1;
var beam2;

var a = -1000;
var c1;

function setup() {
  var p5Canvas = createCanvas(1200, 700);
  p5Canvas.parent("canvasContainer");
  engine = Engine.create();
  world = engine.world;

  level = new Level01(p5Canvas.width, p5Canvas.height);
  level.setup();

  /*
  c1 = Constraint.create({
    bodyA: beam1.body,
    bodyB: beam2.body,
    length: 10,
    stiffness: 0.8,
    pointA: {
      x: 0,
      y: -100
    },
    pointB: {
      x: -100,
      y: 0
    }
  });
  World.add(world, c1);
*/

}

function testConstruction() {
  runEngine = true;
}

var mouseDraggedX = -1;
var mouseDraggedY = -1;

function mouseDragged() {
  if (mousePressedX >= 0 && mousePressedY >= 0) {
    drawing = true;
    mouseDraggedX = mouseX;
    mouseDraggedY = mouseY;
  }
}

function mouseMoved() {
  level.anchors.forEach(item => {
    item.mouseOnBody = item.pointIsIn(mouseX, mouseY);
  });
  elements.forEach(item => {
    item.mouseOnBody = item.pointIsIn(mouseX, mouseY);
  });
}

function mouseClicked() {
  elements.forEach(item => {
    if (item.pointIsIn(mouseX, mouseY)) {
      item.mouseClicked();
    }
  });
}

var mousePressedX = -1;
var mousePressedY = -1;
var drawing = false;

function mousePressed() {
  var anchors = level.anchors.filter(anchor => anchor.pointIsIn(mouseX, mouseY));
  var joints = elements.filter(anchor => anchor.pointIsIn(mouseX, mouseY));
  var items = anchors.concat(joints);
  if (items.length >= 1) {
    mousePressedX = items[0].body.position.x;
    mousePressedY = items[0].body.position.y;
  } else {
    mousePressedX = -1;
    mousePressedY = -1;
  }
}

function mouseReleased() {
  if (mousePressedX < 0 || mousePressedY < 0 || drawing == false) {
    return;
  }

  var firstPoint = { x: 0, y: 0 };
  var secondPoint = { x: 0, y: 0 };

  if (mousePressedY == mouseY) {
    if (mousePressedX < mouseX) {
      firstPoint = { x: mousePressedX, y: mousePressedY };
      secondPoint = { x: mouseX, y: mouseY };
    } else {
      firstPoint = { x: mouseX, y: mouseY };
      secondPoint = { x: mousePressedX, y: mousePressedY };
    }
  } else if (mousePressedY < mouseY) {
    firstPoint = { x: mousePressedX, y: mousePressedY };
    secondPoint = { x: mouseX, y: mouseY };
  } else {
    firstPoint = { x: mouseX, y: mouseY };
    secondPoint = { x: mousePressedX, y: mousePressedY };
  }

  drawing = false;
  var a = mouseX - mousePressedX;
  var b = mouseY - mousePressedY;
  var c = Math.sqrt(a * a + b * b);
  var x = (mouseX + mousePressedX) / 2;
  var y = (mouseY + mousePressedY) / 2;
  var angle = Math.atan2(b, a); // * 180 / Math.PI;
  var a = angle + (Math.PI / 2);

  //elements.push(new SteelBeam(x, y, 20, c, angle + (Math.PI / 2)));
  console.log(angle);
  //elements.push(new Joint(mousePressedX, mousePressedY, 10));
  elements.push(new SteelBeam(x, y, 15, c - 30, a));
  elements.push(new Joint(mouseX, mouseY, 12));
}

function keyPressed() {
  console.log(key + ' pressed');
}

function draw() {
  if (runEngine) {
    Engine.update(engine);
  }

  level.show();
  elements.forEach(item => item.show());

  if (drawing == true) {
    line(mousePressedX, mousePressedY, mouseDraggedX, mouseDraggedY);
  }


  //joints.forEach(item => item.show());

  //beam1.show();
  //beam2.show();
  //beam3.show();

  /*
  if (a == -1000) {
    a = beam1.getAngle() + beam2.getAngle();
    console.log(a);
  }

  if (beam1.getAngle() + beam2.getAngle() > a + 1.0) {
    World.remove(world, c1);

  } */

}