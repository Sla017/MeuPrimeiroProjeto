let snake;
let food;
let gridSize = 20;

function setup() {
  createCanvas(600, 600);
  snake = new Snake();
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(gridSize);
}

function draw() {
  background(51);

  if (snake.eat(food)) {
    pickLocation();
  }

  snake.update();
  snake.show();

  fill(255, 0, 100);
  rect(food.x, food.y, gridSize, gridSize);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  }
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(width / 2), floor(height / 2));
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();

    this.body.shift();

    head.x += this.xSpeed * gridSize;
    head.y += this.ySpeed * gridSize;

    this.body.push(head);
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(255);
      noStroke();
      rect(this.body[i].x, this.body[i].y, gridSize, gridSize);
    }
  }

  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x === pos.x && y === pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  dir(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }
}
