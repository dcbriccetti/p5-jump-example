let jumpStartTimeMs = [];  // When each jump started or null if not jumping
let positions = [];
let player_index = 0;

function setup() {
  createCanvas(800, 700, WEBGL);
  for (let x = -300; x <= 300; x += 100) {
    positions.push(createVector(x, 0, 0))
  }
}

function draw() {
  background(220);
  const pos = positions[player_index];
  handleInput(pos);
  ambientMaterial('white');
  directionalLight(255, 255, 255, 1, 1, -1);

  positions.forEach((p, i) => {
    if (i === player_index) stroke('white'); else noStroke();
    push();
    translate(p.x, p.y - getJumpHeight(i), p.z);
    ellipsoid(40, 60);
    pop();
  });
}

function handleInput(pos) {
  if (keyIsPressed) {
    const num = Number(key);
    if (num >= 1 && num <= positions.length) {
      player_index = num - 1
    } else {
      switch (key) {
        case 'w': pos.z -= 5; break;
        case 's': pos.z += 5; break;
        case 'a': pos.x -= 5; break;
        case 'd': pos.x += 5; break;
        case ' ':
          if (!jumpStartTimeMs[player_index]) {
            jumpStartTimeMs[player_index] = millis();
          }
          break;
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
