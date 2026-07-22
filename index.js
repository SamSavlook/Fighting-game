const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const enemyHealthEl = document.querySelector('#enemyHealth');
const playerHealthEl = document.querySelector('#playerHealth');

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
});

const shop = new Sprite({
  position: {
    x: 600,
    y: 128
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax: 6
});

//--------------------- Players ---------------------

const player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  }
});

const enemy = new Fighter({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0 
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  }
})

//--------------------- ---- ---------------------

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
  }, 
  ArrowUp: {
    pressed: false
  }
}


decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement
  if (keys.KeyA.pressed && player.lastKey ==='KeyA') {
    player.velocity.x = -5;    
  } else if (keys.KeyD.pressed && player.lastKey === 'KeyD') {
    player.velocity.x = 5;
  }

  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }

  // detect collision
  if (rectangularCollision({
    rectangle1: player,
    rectangle2: enemy
  }) && player.isAttacking) {
    player.isAttacking = false;
    enemy.health -= 20;
    enemyHealthEl.style.width = enemy.health + '%'
  }

  if (rectangularCollision({
    rectangle1: enemy,
    rectangle2: player
  }) && enemy.isAttacking) {
    enemy.isAttacking = false;
    player.health -= 20;
    playerHealthEl.style.width = player.health + '%'
  }


  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerID });
  }
}

animate();

// ---------- Add listeners -------------------------

window.addEventListener('keydown', (event) => {
  // console.log('keydown: ', event.code)

  switch (event.code) {
// player
    case 'Digit1': 
    player.debug()
    break;

    case 'KeyD':
      keys.KeyD.pressed = true;
      player.lastKey = 'KeyD'
      break;

    case 'KeyA':
      keys.KeyA.pressed = true;
      player.lastKey = 'KeyA';
      break;

    case 'KeyW':
      player.velocity.y = -20;
      break;

      case 'Space': 
      player.attack();
      break;

// enemy
    case 'Digit2':
      enemy.debug()
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
      enemy.velocity.y = -20;
      break;

    case 'ArrowDown':
      enemy.attack();
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