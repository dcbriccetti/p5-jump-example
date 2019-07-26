// p5.js Jump Example, AKA Jumping Eggs

let jumpStartTimeMs = [];  // When each jump started or null if not jumping
let positions = [];
let selected_player = 0;
let mouseHasMoved = false;

function setup() {
  createCanvas(800, 700, WEBGL);
  smooth();
  for (let x = -300; x <= 300; x += 100) {
    positions.push(createVector(x, 0, 0))
  }
}

function draw() {
  background('lightblue');
  const pos = positions[selected_player];
  handleInput(pos);

  if (mouseHasMoved && mouseY >= 0 && mouseY < height)
    rotateY(cMap(mouseX, 0, width - 1, -TAU / 16, TAU / 16));

  for (let x = -500; x <= 500; x += 50) {
    push();
    translate(x, 60, 0);
    rotateX(TAU * 0.25);
    plane(10, 2400);
    pop();
  }
  ambientMaterial('white');
  directionalLight(255, 255, 255, 1, 1, -1);

  positions.forEach((p, i) => {
    if (i === selected_player) stroke('white'); else noStroke();
    push();
    translate(p.x, p.y - getJumpHeight(i), p.z);
    ellipsoid(40, 60);
    pop();
  });
}

function mouseMoved() {
  mouseHasMoved = true;
}

function handleInput(pos) {
  if (!keyIsPressed) return;

  const num = Number(key);
  if (num >= 1 && num <= positions.length) {
    selected_player = num - 1
  } else {
    const shiftMult = keyIsDown(SHIFT) ? 10 : 1;
    if (keyIsDown(UP_ARROW))    pos.z -= 3 * shiftMult;
    if (keyIsDown(DOWN_ARROW))  pos.z += 3 * shiftMult;
    if (keyIsDown(LEFT_ARROW))  pos.x -= 3 * shiftMult;
    if (keyIsDown(RIGHT_ARROW)) pos.x += 3 * shiftMult;
    if (keyIsDown(32)) { // Space
      if (!jumpStartTimeMs[selected_player]) {
        jumpStartTimeMs[selected_player] = millis();
      }
    }
  }
}

const JUMP_DURATION_MS = 1000;
const MAX_JUMP_HEIGHT = 300;

function getJumpHeight(i) {
  if (jumpStartTimeMs[i]) {
    const timeIntoJumpMs = millis() - jumpStartTimeMs[i];
    const jumpDone = timeIntoJumpMs > JUMP_DURATION_MS;
    if (jumpDone) {
      jumpStartTimeMs[i] = null;
    } else {
      const jumpFractionDone = timeIntoJumpMs / JUMP_DURATION_MS;
      return sin(jumpFractionDone * PI) * MAX_JUMP_HEIGHT;
    }
  }
  return 0;
}

// Constrained map
const cMap = (n, l1, h1, l2, h2) => map(constrain(n, l1, h1), l1, h1, l2, h2);
