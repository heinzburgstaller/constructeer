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
var numberOfBeams = 0;
var constructionHistory = [];

function setup() {
  var p5Canvas = createCanvas(1170, 700);
  p5Canvas.parent("canvasContainer");
  engine = Engine.create();
  //engine.constraintIterations = 5;
  world = engine.world;

  level = new Level01(this.width, this.height, 10);
  level.setup();

  numberOfBeams = 0;
}

function testConstruction() {
  runEngine = true;
  level.doCatastrophe();
}

function undo() {
  if (constructionHistory.length == 0) {
    return;
  }
  numberOfBeams--;
  document.getElementById('beamsToGo').innerHTML = level.maxBeams - numberOfBeams;
  constructionHistory.pop();
  construct();
}

function construct() {
  runEngine = false;
  elements.forEach(item => item.remove());
  elements = [];
  level.clearOthers();
  redrawFromHistory();
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

function getJointPerPoint(x, y) {
  var anchors = level.anchors.filter(anchor => anchor.pointIsIn(x, y));
  var joints = elements.filter(anchor => {
    return anchor instanceof Joint && anchor.pointIsIn(x, y)
  });
  var items = anchors.concat(joints);
  if (items.length >= 1) {
    return {
      x: items[0].body.position.x,
      y: items[0].body.position.y,
      body: items[0].body
    };
  }

  return null;
}

function mouseReleased() {

  if (mousePressedX < 0 || mousePressedY < 0 || drawing == false || drawingLegal == false || runEngine == true) {
    drawing = false;
    return;
  }

  var bodyC = null;
  var jointPerPoint = getJointPerPoint(mouseX, mouseY);
  if (jointPerPoint !== null) {
    mouseX = jointPerPoint.x;
    mouseY = jointPerPoint.y;
    bodyC = jointPerPoint.body;
  }

  drawing = false;
  var sorted = helper.sortTwoPoints(mousePressedX, mousePressedY, mouseX, mouseY);
  var calc = helper.doBasicCalculations(sorted.firstPoint, sorted.secondPoint);

  var sb = new SteelBeam(calc.x, calc.y, calc.c, 15, calc.angle);
  numberOfBeams++;
  document.getElementById('beamsToGo').innerHTML = level.maxBeams - numberOfBeams;
  elements.push(sb);

  if (bodyC === null) {
    var j = new Joint(mouseX, mouseY, 12);
    bodyC = j.body;
    elements.push(j);
  }

  createJointConstraints(bodyA, sb.body, bodyC, calc, sorted.orient);
  addToHistory(bodyA.position.x, bodyA.position.y, calc, sorted.orient, mouseX, mouseY);
}

function createJointConstraints(bodyA, bodyB, bodyC, calc, orient) {
  var c1 = Constraint.create({
    bodyA: bodyA,
    bodyB: bodyB,
    stiffness: 0.92,
    length: 0.0,
    pointA: {
      x: 0,
      y: 0
    },
    pointB: {
      x: orient == 'down' ? -calc.a / 2 : calc.a / 2,
      y: orient == 'down' ? -calc.b / 2 : calc.b / 2
    }
  });
  var c2 = Constraint.create({
    bodyA: bodyB,
    bodyB: bodyC,
    stiffness: 0.92,
    length: 0,
    pointA: {
      x: orient == 'down' ? calc.a / 2 : -calc.a / 2,
      y: orient == 'down' ? calc.b / 2 : -calc.b / 2
    },
    pointB: {
      x: 0,
      y: 0
    }
  });
  World.add(world, c1);
  World.add(world, c2);
}

function redrawFromHistory() {
  constructionHistory.forEach(historyElement => {
    var calc = historyElement.calc;
    var sb = new SteelBeam(calc.x, calc.y, calc.c, 15, calc.angle);
    elements.push(sb);

    var jointA = getJointPerPoint(historyElement.bodyAx, historyElement.bodyAy);

    var bodyC = null;
    var jointPerPoint = getJointPerPoint(historyElement.jointX, historyElement.jointY);
    if (jointPerPoint !== null) {
      bodyC = jointPerPoint.body;
    } else {
      var j = new Joint(historyElement.jointX, historyElement.jointY, 12);
      bodyC = j.body;
      elements.push(j);
    }

    createJointConstraints(jointA.body, sb.body, bodyC, calc, historyElement.orient);
  });
}

function addToHistory(bodyAx, bodyAy, calc, orient, jointX, jointY) {
  constructionHistory.push({
    bodyAx: bodyAx,
    bodyAy: bodyAy,
    calc: calc,
    orient: orient,
    jointX: jointX,
    jointY: jointY
  });
}

function keyPressed() {
  //console.log(key + ' pressed');
}

function draw() {
  if (runEngine) {
    Engine.update(engine);
    testBreakage();
  }

  level.show();
  elements.forEach(item => item.show());

  //console.log("current nr of beams:", numberOfBeams);


  if (drawing == true && runEngine == false) {

    if (numberOfBeams >= level.maxBeams) {
      //console.log("maxbeams reached, current nr of beams:", numberOfBeams);
      drawing = false;
      drawingLegal = false;
      alert("You have reached the maximum allowed number of beams for this level! Please test your construction or undo and try again.");
      return false;
    }

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
  constructionHistory = [];
  numberOfBeams = 0;
  level.clear();
}

function testBreakage() {
  var breakageAngularSpeed = 0.11;
  var brokeConstraints = world.constraints.filter(c => {
    return c.bodyA.angularSpeed > breakageAngularSpeed || c.bodyB.angularSpeed > breakageAngularSpeed
  });
  brokeConstraints.forEach(c => World.remove(world, c));
}


