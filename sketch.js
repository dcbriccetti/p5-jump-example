let jumpStartTimeMs = null;  // When the jump started or null if not jumping

let positions;
let player_index = 2;

function setup() {
  createCanvas(800, 800, WEBGL);
  const p1 = createVector(-300, 0, 0);
  const p2 = createVector(   0, 0, 0);
  const p3 = createVector( 300, 0, 0);
  positions = [p1, p2, p3];
}

function draw() {
  background(220);
  const p1 = positions[player_index];

  if (keyIsPressed) {
    switch (key) {
      case '1': player_index = 0; break;
      case '2': player_index = 1; break;
      case '3': player_index = 2; break;
      case 'w': p1.z -= 5; break;
      case 's': p1.z += 5; break;
      case 'a': p1.x -= 5; break;
      case 'd': p1.x += 5; break;
      case ' ':
        if (!jumpStartTimeMs) {
          jumpStartTimeMs = millis();
        }
        break;
    }
  }

  noStroke();
  directionalLight(255, 255, 255, 1, 1, -1);

  positions.forEach((p, i) => {
    ambientMaterial(i === player_index ? 'green' : 'white');
    push();
    translate(p.x, p.y, p.z);
    ellipsoid(40, 60);
    pop();
  });
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
