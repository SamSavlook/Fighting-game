const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.25;

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey = '';
  }

  draw() {
    c.fillStyle = 'red';
    c.fillRect(this.position.x, this.position.y, 50, this.height)
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height >= canvas.height ) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  }
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 5 
  }
})

const keys = {
  KeyA: {
    pressed: false
  },
  KeyD: {
    pressed: false
  },
  KeyW: {
    pressed: false
  },

  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

let lastKey;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement
  if (keys.KeyA.pressed && lastKey ==='KeyA') {
    player.velocity.x = -1;    
  } else if (keys.KeyD.pressed && lastKey === 'KeyD') {
    player.velocity.x = 1;
  }

  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -1;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 1;
  }

}

animate();

window.addEventListener('keydown', (event) => {
  console.log('keydown: ', event.code)

  switch (event.code) {

    case 'KeyD':
      keys.KeyD.pressed = true;
      lastKey = 'KeyD'
      break;

    case 'KeyA':
      keys.KeyA.pressed = true;
      lastKey = 'KeyA';
      break;

    case 'KeyW':
      player.velocity.y = -10;
      break;


    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;

    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;

    case 'ArrowUp':
      enemy.velocity.y = -10;
      break;
  }
})

window.addEventListener('keyup', (event) => {

  switch (event.code) {

    case 'KeyD':
      keys.KeyD.pressed = false;
      break

    case 'KeyA':
      keys.KeyA.pressed = false;
      break;

    case 'KeyW':
      keys.KeyW.pressed = false;
      break;

      // enemey moves
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break

    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;

    case 'ArrowUp':
      keys.ArrowUp.pressed = false;
      break;
  }
})