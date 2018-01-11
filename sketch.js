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
var helper = new Helper();

function setup() {
  var p5Canvas = createCanvas(1170, 700);
  p5Canvas.parent("canvasContainer");
  engine = Engine.create();
  //engine.constraintIterations = 5;
  world = engine.world;

  level = new Level01(this.width, this.height);
  level.setup();
}

function testConstruction() {
  runEngine = true;
  level.doCatastrophe();
}

function loadLevel01() {
  clearAll();
  level = new Level01(this.width, this.height);
  level.setup();
}

function loadLevel02() {
  clearAll();
  level = new Level02(this.width, this.height);
  level.setup();
}

function loadLevel03() {
  clearAll();
  level = new Level03(this.width, this.height);
  level.setup();
}

function checkMouseOnBody() {
  level.anchors.forEach(item => {
    item.mouseOnBody = item.pointIsIn(mouseX, mouseY);
  });
  elements.forEach(item => {
    item.mouseOnBody = item.pointIsIn(mouseX, mouseY);
  });
}

var mouseDraggedX = -1;
var mouseDraggedY = -1;

function mouseDragged() {
  if (mousePressedX >= 0 && mousePressedY >= 0) {
    drawing = true;
    drawingLegal = false;
    mouseDraggedX = mouseX;
    mouseDraggedY = mouseY;

    var sorted = helper.sortTwoPoints(mousePressedX, mousePressedY, mouseX, mouseY);
    var calc = helper.doBasicCalculations(sorted.firstPoint, sorted.secondPoint);
    drawingLegal = calc.c > 70 && calc.c <= 250;
  }
  checkMouseOnBody();
}

function mouseMoved() {
  checkMouseOnBody();
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
var drawingLegal = false;
var bodyA = null;

function mousePressed() {
  var anchors = level.anchors.filter(anchor => anchor.pointIsIn(mouseX, mouseY));
  var joints = elements.filter(anchor => {
    return anchor instanceof Joint && anchor.pointIsIn(mouseX, mouseY)
  });
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
  if (mousePressedX < 0 || mousePressedY < 0 || drawing == false || drawingLegal == false) {
    drawing = false;
    return;
  }

  var bodyC = null;
  var anchors = level.anchors.filter(anchor => anchor.pointIsIn(mouseX, mouseY));
  var joints = elements.filter(anchor => {
    return anchor instanceof Joint && anchor.pointIsIn(mouseX, mouseY)
  });
  var items = anchors.concat(joints);
  if (items.length >= 1) {
    mouseX = items[0].body.position.x;
    mouseY = items[0].body.position.y;
    bodyC = items[0].body;
  }

  drawing = false;
  var sorted = helper.sortTwoPoints(mousePressedX, mousePressedY, mouseX, mouseY);
  var calc = helper.doBasicCalculations(sorted.firstPoint, sorted.secondPoint);

  var sb = new SteelBeam(calc.x, calc.y, calc.c, 15, calc.angle);
  elements.push(sb);

  if (bodyC === null) {
    var j = new Joint(mouseX, mouseY, 12);
    bodyC = j.body;
    elements.push(j);
  }

  var c1 = Constraint.create({
    bodyA: bodyA,
    bodyB: sb.body,
    stiffness: 0.92,
    length: 0.0,
    pointA: {
      x: 0,
      y: 0
    },
    pointB: {
      x: sorted.orient == 'down' ? -calc.a / 2 : calc.a / 2,
      y: sorted.orient == 'down' ? -calc.b / 2 : calc.b / 2
    }
  });
  var c2 = Constraint.create({
    bodyA: sb.body,
    bodyB: bodyC,
    stiffness: 0.92,
    length: 0,
    pointA: {
      x: sorted.orient == 'down' ? calc.a / 2 : -calc.a / 2,
      y: sorted.orient == 'down' ? calc.b / 2 : -calc.b / 2
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
  //console.log(key + ' pressed');
}

var undoneElements = [];

function undoConstruction() {

  if(elements.length > 0) {
    console.log("undo button was pressed");
    var previousAnchor = elements.pop();
    var previousBeam = elements.pop();
    // console.log(previousAnchor);
    // console.log(previousBeam);
    undoneElements.push(previousBeam); // LIFO 
    undoneElements.push(previousAnchor);
    World.remove(world, previousAnchor);
    World.remove(world, previousBeam);
  }

  //TODO disable button if no  elements to be undone

}

function redoConstruction() {

  if(undoneElements.length > 0) {
    console.log("redo button was pressed");
    console.log(undoneElements.length)

    //for each redo, only re-add first two elements
    var last = undoneElements[undoneElements.length - 1];
    var secondlast = undoneElements[undoneElements.length - 2];
    elements.push(last);
    elements.push(secondlast);
    World.add(world, last);
    World.add(world, secondlast);  
    undoneElements.pop();
    undoneElements.pop();
  }

  //TODO disable button if no more elements to be redone

}


function draw() {
  if (runEngine) {
    Engine.update(engine);
    testBreakage();
  }

  level.show();
  elements.forEach(item => item.show());

  if (drawing == true) {
    stroke('red');
    strokeWeight(3);
    drawingLegal ? stroke('green') : stroke('red');
    line(mousePressedX, mousePressedY, mouseDraggedX, mouseDraggedY);
  }
}

function clearAll() {
  runEngine = false;
  elements.forEach(item => item.remove());
  elements = [];
  level.clear();
}

function testBreakage() {
  var breakageAngularSpeed = 0.1;
  var brokeConstraints = world.constraints.filter(c => {
    return c.bodyA.angularSpeed > breakageAngularSpeed || c.bodyB.angularSpeed > breakageAngularSpeed
  });
  brokeConstraints.forEach(c => World.remove(world, c));
}
