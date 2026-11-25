let birdY = 250;
let birdVelocity = 0;

let pipeTop;
let pipeBottom;
let pipeY = 100;
let distanceX = 400;

const gameStates = Object.freeze({
  START: "Start",
  GAMEOVER: "Game Over!"
});

let gameState = gameStates.START

let frames = 0

let highscore = 0;

let second = 0;
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
  scoreText()
  
}

function birdLogic() {
  fill("yellow")
  circle(80, birdY, 50);
  if (gameState === gameStates.GAMEOVER) return;
  if (birdY > height) {
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
  strokeWeight(2.5)
  fill("lightgreen")
  pipeTop = rect(pipeX, -40, 50, pipeY);
  pipeBottom = rect(pipeX, pipeY + 150, 50, height - (pipeY + 150));
  strokeWeight(3)
  fill("red")
  rect(pipeX - 5, pipeY - 50, 60, 10)
  fill("yellow")
  rect(pipeX - 5, pipeY + 150, 60, 10)
  print(pipeX)
  if (((birdY < pipeY - 50 || birdY > pipeY + 150) && (pipeX >= 75 && pipeX <= 85)) || gameState === gameStates.GAMEOVER) {
    print(birdY, " < PipeBottom:", pipeY - 50, " > PipeTop:", pipeY + 150)
    triggerDeath()
    return;
  }
  distanceX -= 4
  if (pipeX === 80) highscore++;
  if (pipeX <= -50) {
    distanceX = 400;
    pipeY = random(100, 400)
  }
}

function timeCalc(_frames) {
  if (_frames % 60 === 0) {
    second++
    
    if (second === 60) {
      minute++;
      minute = String(minute).padStart(2, '0')
      second = 0;
    }
    second = String(second).padStart(2, '0')
  }
  strokeWeight(4)
  stroke("black")
  fill("white")
  textSize(20)
  time = `${minute}:${second}`;
  text(time, width/2, height/2)
}

function scoreText() {
  strokeWeight(4)
  stroke("black")
  fill("white")
  textSize(30)
  text(`${highscore}`, width/2, 40)
}

function triggerDeath() {
  if (gameState === gameStates.GAMEOVER) return;
  gameState = gameStates.GAMEOVER
  print(gameState)
}
