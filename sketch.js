let x = 0;
let y = 100;
let z = 0;
let jumpStartTimeMs = null;  // When the jump started or null if not jumping

function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  background(220);

  if (keyIsPressed) {
    switch (key) {
      case 'w': z -= 5; break;
      case 's': z += 5; break;
      case 'a': x -= 5; break;
      case 'd': x += 5; break;
      case ' ':
        if (!jumpStartTimeMs) {
          jumpStartTimeMs = millis();
        }
        break;
    }
  }

  stroke('blue');
  ambientMaterial('lightblue');
  directionalLight(255, 255, 255, 1, 1, -1);
  translate(x, y - getJumpHeight(), z);
  rotateY(millis() / 1000);
  ellipsoid(40, 60);
}

const JUMP_DURATION_MS = 1000;
const MAX_JUMP_HEIGHT = 100;

function getJumpHeight() {
  if (jumpStartTimeMs) {
    const timeIntoJumpMs = millis() - jumpStartTimeMs;
    const jumpDone = timeIntoJumpMs > JUMP_DURATION_MS;
    if (jumpDone) {
      jumpStartTimeMs = null;
    } else {
      const jumpFractionDone = timeIntoJumpMs / JUMP_DURATION_MS;
      return sin(jumpFractionDone * PI) * MAX_JUMP_HEIGHT;
    }
  }
  return 0;
}
