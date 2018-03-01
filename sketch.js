// module aliases
Matter.use('matter-collision-events');

var Engine = Matter.Engine,
  // Render = Matter.Render, Not needed rendering is done by p5.js
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint,
  Events = Matter.Events;

var engine;
var world;
var runEngine = false;

var level = null;
var elements = [];
var helper = new Helper();
var numberOfBeams = 0;
var constructionHistory = [];
var gridIsOn = false;
const gridSize = 50;
const FPS = 50;

function setup() {
  var p5Canvas = createCanvas(1200, 650);
  p5Canvas.parent("canvasContainer");
  frameRate(FPS);
  gridIsOn = false;

  engine = Engine.create();
  //engine.constraintIterations = 5;
  world = engine.world;

  loadLevel('Level00');
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
  level.clearHumans();
  level.setupHumans();
  level.resetStaticJoints();
  redrawFromHistory();
}

function loadLevel(levelString = null) {
  var e = document.getElementById('selectLevel');
  var levelClassString = levelString === null ? e.options[e.selectedIndex].value : levelString;
  //console.log(levelClassString);
  clearAll();

  switch (levelClassString) {
    case 'Level00':
      level = new Level00(this.width, this.height, this.bodyHit);
      break;
    case 'Level01':
      level = new Level01(this.width, this.height, this.bodyHit);
      break;
    case 'Level02':
      level = new Level02(this.width, this.height, this.bodyHit);
      break;
    case 'Level03':
      level = new Level03(this.width, this.height, this.bodyHit);
      break;
    case 'Level04':
      level = new Level04(this.width, this.height, this.bodyHit);
      break;
    case 'Level05':
      level = new Level05(this.width, this.height, this.bodyHit);
      break;
    case 'Level08':
      level = new Level08(this.width, this.height, this.bodyHit);
      break;
    default:
      level = new Level01(this.width, this.height, this.bodyHit);
      break;
  }

  level.setup();
  level.setupHumans();
}

function checkMouseOnBody() {
  level.anchors.forEach(item => {
    item.mouseOnBody = item.pointIsIn(mouseX, mouseY);
  });
  elements.forEach(item => {
    item.mouseOnBody = item.pointIsIn(mouseX, mouseY);
  });
}

function bodyHit() {
  console.log("Body Hit");
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
    drawingLegal = calc.c > 60 && calc.c <= 250;

    if (level.pointIsInGround(mouseDraggedX, mouseDraggedY)) {
      drawingLegal = false;
    }
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
  var jointPerPoint = getJointPerPoint(mouseX, mouseY);
  if (jointPerPoint !== null) {
    mousePressedX = jointPerPoint.x;
    mousePressedY = jointPerPoint.y;
    bodyA = jointPerPoint.body;
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

function getGridCoords(mouseX, mouseY) {
  //console.log("gridIsOn:" + gridIsOn);
  if (gridIsOn)
    return {
      x: (Math.round(mouseX / gridSize) * gridSize),
      y: (Math.round(mouseY / gridSize) * gridSize)
    };
  else
    return {
      x: mouseX,
      y: mouseY
    }
}


function mouseReleased() {

  if (mousePressedX < 0 || mousePressedY < 0
    || drawing == false || drawingLegal == false || runEngine == true) {
    drawing = false;
    return;
  }


  mouse = getGridCoords(mouseX, mouseY);

  var bodyC = null;
  var jointPerPoint = getJointPerPoint(mouse.x, mouse.y);
  if (jointPerPoint !== null) {
    mouse.x = jointPerPoint.x;
    mouse.y = jointPerPoint.y;
    bodyC = jointPerPoint.body;
  }

  drawing = false;
  var sorted = helper.sortTwoPoints(mousePressedX, mousePressedY, mouse.x, mouse.y);
  var calc = helper.doBasicCalculations(sorted.firstPoint, sorted.secondPoint);

  var sb = new SteelBeam(calc.x, calc.y, calc.c, 15, calc.angle);
  numberOfBeams++;
  document.getElementById('beamsToGo').innerHTML = level.maxBeams - numberOfBeams;
  elements.push(sb);

  if (bodyC === null) {
    var j = new Joint(mouse.x, mouse.y, 10);
    bodyC = j.body;
    elements.push(j);
  }

  createJointConstraints(bodyA, sb.body, bodyC, calc, sorted.orient);
  addToHistory(bodyA.position.x, bodyA.position.y, calc, sorted.orient, mouse.x, mouse.y);
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
      var j = new Joint(historyElement.jointX, historyElement.jointY, 10);
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

  gridIsOn = keyIsDown(SHIFT);
  if (gridIsOn === undefined) {
    gridIsOn = false;
  }

  if (gridIsOn) {
    push();
    var lines_x = level.width / gridSize;
    var lines_y = level.height / gridSize;
    for (var lineNr = 0; lineNr < lines_x; lineNr++) {
      strokeWeight(1);
      stroke('black');
      line(lineNr * gridSize, 0, lineNr * gridSize, level.height);
    }
    for (var lineNr = 0; lineNr < lines_y; lineNr++) {
      strokeWeight(1);
      stroke('black');
      line(0, lineNr * gridSize, level.width, lineNr * gridSize);
    }

    pop();
  }

  if (drawing == true && runEngine == false) {

    if (numberOfBeams >= level.maxBeams) {
      drawing = false;
      drawingLegal = false;
      alert("You have reached the maximum allowed number of beams for this level!"
        + " Please test your construction or undo and try again.");
      return;
    }

    push();
    strokeWeight(3);
    drawingLegal ? stroke('green') : stroke('red');
    grid_mouseDragged = getGridCoords(mouseDraggedX, mouseDraggedY);
    line(mousePressedX, mousePressedY, grid_mouseDragged.x, grid_mouseDragged.y);
    pop();
  }
}

function clearAll() {
  runEngine = false;
  elements.forEach(item => item.remove());
  elements = [];
  constructionHistory = [];
  numberOfBeams = 0;
  if (level !== null) {
    level.clear();
  }
}

function testBreakage() {
  var breakageAngularSpeed = 0.11;
  var brokeConstraints = world.constraints.filter(c => {
    return c.bodyA.angularSpeed > breakageAngularSpeed || c.bodyB.angularSpeed > breakageAngularSpeed
  });
  brokeConstraints.forEach(c => World.remove(world, c));
}
