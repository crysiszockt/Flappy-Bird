let birdY = 250;
let birdX = 80;
let birdVelocity = 0;

let pipeTop;
let pipeBottom;
let pipeY = 100;
let distanceX = 400;
let pipeMovement = 4;
let textAlpha = 255;

const gameStates = Object.freeze({
  START: "Start",
  GAMEOVER: "Game Over!"
});

let gameState = gameStates.START;

let frames = 0;

let highscore = 0;

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
  background("lightblue");
  birdLogic()
  keyPressed();
  if (second >= 3) {
    createPipe(distanceX)
  }
  timeCalc(frames++)
  scoreLogic()
}

function birdLogic() {
  fill("yellow")
  circle(birdX, birdY, 50);
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
  if (key === " " || key === "MouseButton") {
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

  let inPipeGap = (pipeX <= birdX + 15 && pipeX >= birdX - 15);
  if (((birdY < pipeY - 50 || birdY > pipeY + 150) && inPipeGap) || gameState === gameStates.GAMEOVER) {
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
  if (_frames % 60 === 0 && gameState === gameStates.START) {
    second++
    if (second === 60) {
      minute++;
      minute = String(minute).padStart(2, '0')
      second = 0;
    }
    second = String(second).padStart(2, '0') 
  }
  if (second <= 3 && gameState === gameStates.START) {
    strokeWeight(4)
    stroke("black")
    fill("white", textAlpha)
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