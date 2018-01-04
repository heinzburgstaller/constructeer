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
var bodyA = null;

function mousePressed() {
  var anchors = level.anchors.filter(anchor => anchor.pointIsIn(mouseX, mouseY));
  var joints = elements.filter(anchor => { return anchor instanceof Joint && anchor.pointIsIn(mouseX, mouseY) });
  var items = anchors.concat(joints);
  if (items.length >= 1) {
    mousePressedX = items[0].body.position.x;
    mousePressedY = items[0].body.position.y;
    bodyA = items[0].body;
  } else {
    mousePressedX = -1;
    mousePressedY = -1;
    bodyA = null;
  }
}

function mouseReleased() {
  if (mousePressedX < 0 || mousePressedY < 0 || drawing == false) {
    return;
  }

  var bodyC = null;

  var anchors = level.anchors.filter(anchor => anchor.pointIsIn(mouseX, mouseY));
  var joints = elements.filter(anchor => { return anchor instanceof Joint && anchor.pointIsIn(mouseX, mouseY) });
  var items = anchors.concat(joints);
  if (items.length >= 1) {
    mouseX = items[0].body.position.x;
    mouseY = items[0].body.position.y;
    bodyC = items[0].body;
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
  var a = secondPoint.x - firstPoint.x;
  var b = secondPoint.y - firstPoint.y;
  var c = Math.sqrt(a * a + b * b);
  var x = (mouseX + mousePressedX) / 2;
  var y = (mouseY + mousePressedY) / 2;
  var angle = Math.atan2(b, a); // * 180 / Math.PI;


  //elements.push(new SteelBeam(x, y, 20, c, angle + (Math.PI / 2)));
  console.log(angle);
  //elements.push(new Joint(mousePressedX, mousePressedY, 10));
  var sb = new SteelBeam(x, y, c - 30, 15, angle);
  elements.push(sb);

  if(bodyC === null) {
    var j = new Joint(mouseX, mouseY, 12);
    elements.push(j);
  }
  
  var c1 = Constraint.create({
    bodyA: bodyA,
    bodyB: sb.body,
    stiffness: 0.8,
    pointA: {
      x: 0,
      y: 0
    },
    pointB: {
      x: -(c - 10) /2,
      y: 0
    }
  });
  var c2 = Constraint.create({
    bodyA: sb.body,
    bodyB: bodyC !== null ? bodyC : j.body,
    stiffness: 0.8,
    pointA: {
      x: c - 10 /2,
      y: 0
    },
    pointB: {
      x: 0,
      y: 0
    }
  });
  World.add(world, c1);
  World.add(world, c2);
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