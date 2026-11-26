// Bird
let birdY = 250;
let birdX = 80;
let birdVelocity = 0;
let wingH = 30;
let canJump = true;
// Pipes
let pipeTop;
let pipeBottom;
let pipeY = 100;
let distanceX = 400;
let pipeMovement = 4;
// Parallax
let cloudsX = 300;
let mountainsX = 0;
let groundX = 0;


const gameStates = Object.freeze({
  START: "Start",
  GAMEOVER: "Game Over!"
});

let gameState = gameStates.START;

let frames = 0;

let highscore = 0;

let textAlpha = 1.0;
let cSteps = ["3", "2", "1", "GO!"];
let second = -1;
let minute = 0;
let time = ``;

function setup() {
  textOutput();
  createCanvas(400, 600);
  timeRecord = millis();
}

function draw() {
  ParalaxLogic()
  birdLogic();
  keyPressed();
  if (second >= 3) {
    createPipe(distanceX)
  }
  timeCalc(frames++);
  scoreLogic();
}

function ParalaxLogic() {
  background("lightblue");
  if (gameState !== gameStates.GAMEOVER) {
    cloudsX -= 0.5;
    mountainsX -= 1.2;
    groundX -= 3;
  }

  // CLOUDS ------------------------
  
  if (cloudsX < -100) cloudsX = width + 50;
  fill(255, 255, 255, 255);
  ellipse(cloudsX, 100, 60, 40);
  ellipse(cloudsX + 25, 95, 50, 35);
  ellipse(cloudsX - 20, 105, 45, 30);

  // MOUNTAINS ---------------------
  
  if (mountainsX <= -250) mountainsX = 0;
  fill(100, 149, 237);
  for (let x = mountainsX; x < width + 200; x += 250) {
    triangle(x, height, x + 100, 220, x + 200, height);
    triangle(x + 80, height, x + 180, 260, x + 280, height);
  }
  // GROUND ------------------------
  
  if (groundX <= -40) groundX = 0;
  fill(110, 190, 70);
  rect(0, height - 30, width, 30);
  fill(85, 160, 50);
  for (let x = groundX; x < width + 40; x += 40) {
    rect(x, height - 30, 20, 10);
  }
}

function birdLogic() {
  push();
  translate(birdX, birdY);
  let bodyAngle = map(birdVelocity, -10, 12, -0.5, 0.8, true)
  rotate(bodyAngle)
  // body
  fill("yellow");
  ellipse(0, 0, 50, 50);
  // eye
  fill(255);
  ellipse(8, -6, 10, 10);
  fill(0);
  ellipse(10, -6, 4, 4);
  // Beak
  fill("orange");
  ellipse(25, 2, 18, 8);
  push();
  // wing
  translate(-6, 2);
  let wingAngle = map(birdVelocity, -10, 10, -0.6, 0.6, true);
  rotate(wingAngle);
  fill(255, 255, 220);
  ellipse(0, 0, 18, 10);
  pop();
  pop();

  if (gameState === gameStates.GAMEOVER) return;
  if (birdY > height && second >= 3) {
      birdY = height;
      birdVelocity = 0;
      triggerDeath()
  }
  birdY += birdVelocity;
  birdVelocity += 0.5;
}

function keyPressed() {
  if ((key === " " || key === "mouseButton") && canJump) {
    birdVelocity = -10;
  }
}

function createPipe(pipeX = 50){
  // pipes
  strokeWeight(2.5)
  fill(`rgb(44, 176, 26)`)
  pipeTop = rect(pipeX, -40, 50, pipeY);
  pipeBottom = rect(pipeX, pipeY + 150, 50, height - (pipeY + 150));
  // top part
  strokeWeight(3)
  fill(`rgb(44, 176, 26)`)
  rect(pipeX - 5, pipeY - 50, 60, 10)
  rect(pipeX - 5, pipeY + 150, 60, 10)
  // highlights
  fill(`rgb(178, 255, 102)`)
  strokeWeight(0)
  rect(pipeX + 5, -40, 4, pipeY - 10)
  rect(pipeX + 5, pipeY + 170, 4, height - (pipeY + 130))
  //shadowing
  fill("black")
  rect(pipeX, pipeY + 160, 50, 5)
  rect(pipeX + 45, -40, 4, pipeY - 10)
  rect(pipeX + 45, pipeY + 160, 4, height - (pipeY + 130))

  let inPipe = (pipeX <= birdX + 15 && pipeX + 40 >= birdX - 15);
  if (((birdY < pipeY - 25 || birdY > pipeY + 125) && inPipe) || gameState === gameStates.GAMEOVER) {
    triggerDeath()
    return;
  }
  pipeMovement += 0.0003
  distanceX -= pipeMovement;
  
  if (pipeX <= -50) {
    distanceX = 400;
    pipeY = random(100, 400)
  }
}

function timeCalc(_frames) {
  textAlpha -= 0.03
  if (_frames % 60 === 0 && gameState === gameStates.START) {
    textAlpha = 1.0
    second++
    if (second === 60) {
      minute++;
      minute = String(minute).padStart(2, '0')
      second = 0;
    }
    second = String(second).padStart(2, '0') 
  }
  if (second <= 3 && gameState === gameStates.START) {
    strokeWeight(0)
    // stroke("black")
    fill(`rgb(0, 0, 0, ${textAlpha})`)
    textAlign(CENTER, CENTER)
    textSize(64)
    let step = cSteps[int(second)]
    text(step, width/2, height/2)
  }else if (gameState === gameStates.START) {
    strokeWeight(4)
    stroke("black")
    fill("white")
    textAlign(CENTER, TOP)
    textSize(20)
    time = `${minute}:${second}`;
    text(time, width/2, height/10)
  }  
}

function scoreLogic() {
  if ((distanceX <= birdX + 2 && distanceX >= birdX - 2) && gameState !== gameStates.GAMEOVER) highscore++;
  strokeWeight(4)
  stroke("black")
  fill("white")
  textSize(30)
  textAlign(CENTER, BASELINE)
  text(`${highscore}`)
}

function triggerDeath() {
  strokeWeight(2)
  stroke("black")
  fill("white")
  textSize(30)
  textAlign(CENTER, CENTER)
  text(`GAME OVER!\n${highscore}\n${time}`, width/2, height/2)
  if (gameState === gameStates.GAMEOVER) return;
  gameState = gameStates.GAMEOVER
}