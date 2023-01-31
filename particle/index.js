const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
console.log(ctx);
const dpr = window.devicePixelRatio;

const canvaseWidth = 300;
const canvaseHeight = 300;

canvas.style.width = canvaseWidth + 'px';
canvas.style.height = canvaseHeight + 'px';

canvas.width = canvaseWidth * dpr;
canvas.height = canvaseHeight * dpr;

ctx.scale(dpr, dpr);

ctx.fillRect(10, 10, 50, 50);
