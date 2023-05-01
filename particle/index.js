const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
console.log(ctx);
const dpr = window.devicePixelRatio;

let canvaseWidth;
let canvaseHeight;
let particles;

function init() {
  canvaseWidth = innerWidth;
  canvaseHeight = innerHeight;

  canvas.style.width = canvaseWidth + "px";
  canvas.style.height = canvaseHeight + "px";

  canvas.width = canvaseWidth * dpr;
  canvas.height = canvaseHeight * dpr;
  ctx.scale(dpr, dpr);

  particles = [];
  const TOTAL = canvaseWidth / 50;

  for (let i = 0; i < TOTAL; i++) {
    const x = randomNumBetween(0, canvaseWidth);
    const y = randomNumBetween(0, canvaseHeight);
    const radius = randomNumBetween(50, 100);
    const vy = randomNumBetween(1, 5);
    const particle = new Particle(x, y, radius, vy);
    particles.push(particle);
  }
}
// ctx.fillRect(10, 10, 50, 50);

const feGaussianBlur = document.querySelector("feGaussianBlur");
const feColorMatrix = document.querySelector("feColorMatrix");

const controls = new (function () {
  this.blurValue = 40;
  this.alphaChennel = 100;
  this.alphaOffset = -23;
  this.acc = 1.03;
})();

let gui = new dat.GUI();

const f1 = gui.addFolder("gooey Effect");
f1.open();
f1.add(controls, "blurValue", 0, 100).onChange((value) => {
  feGaussianBlur.setAttribute("stdDeviation", value);
});

f1.add(controls, "alphaChennel", 1, 100).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`
  );
});

f1.add(controls, "alphaOffset", -40, 40).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChennel} ${value}`
  );
});

const f2 = gui.addFolder("particle Property");
f2.add(controls, "acc", 1, 1.5, 0.01).onChange((value) => {
  particles.forEach((particle) => (particle.acc = value));
});

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.03;
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }
}

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

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

window.addEventListener("load", () => {
  init();
  animate();
});

window.addEventListener("resize", () => {
  init();
});
