let birdY = 250;
let birdVelocity = 0;

let pipeTop;
let pipeBottom;
let pipeY = 100;
let distanceX = 300;

let frames = 0
let timeRecord;

let second = 0;
let minute = 0;

let secondOver = false;

function setup() {
  textOutput();
  createCanvas(400, 600);
  timeRecord = millis();
}

function draw() {
  background("lightblue");
  birdLogic()
  keyPressed();
  frames++
  distanceX -= 4
  createPipe(distanceX)
  if (frames % 60 === 0) {
    second += 1
    
  }
  
}

function birdLogic() {
  fill("yellow")
  circle(80, birdY, 50);
  if (birdY > height) {
      birdY = height;
      birdVelocity = 0;
  }
  birdY += birdVelocity;
  birdVelocity += 0.5;

}

function keyPressed() {
  if (key === " " || key === "MouseButton") {
    birdVelocity = -10;
  }
}

function createPipe(pipeX = 50){
  strokeWeight(2.5)
  fill("lightgreen")
  pipeBottom = rect(pipeX, -40, 50, pipeY);
  pipeTop = rect(pipeX, pipeY + 150, 50, height - (pipeY + 150));
  strokeWeight(3)
  rect(pipeX - 5, pipeY - 50, 60, 10)
  rect(pipeX - 5, pipeY + 150, 60, 10)
  if (pipeX <= -50) {
    distanceX = 400;
    pipeY = random(100, 400)
  }
}