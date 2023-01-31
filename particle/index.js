const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
console.log(ctx);
const dpr = window.devicePixelRatio;

const canvaseWidth = innerWidth;
const canvaseHeight = innerHeight;

canvas.style.width = canvaseWidth + 'px';
canvas.style.height = canvaseHeight + 'px';

canvas.width = canvaseWidth * dpr;
canvas.height = canvaseHeight * dpr;
ctx.scale(dpr, dpr);

// ctx.fillRect(10, 10, 50, 50);

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
  }
  update() {
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }
}

const TOTAL = 20;
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};
let particles = [];

for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvaseWidth);
  const y = randomNumBetween(0, canvaseHeight);
  const radius = randomNumBetween(50, 100);
  const vy = randomNumBetween(1, 5);
  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

// 60 FPS
let interval = 1000 / 60;
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;

  ctx.clearRect(0, 0, canvaseWidth, canvaseHeight);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    if (particle.y - particle.radius > canvaseHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvaseWidth);
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });

  then = now - (delta % interval);
}

animate();
