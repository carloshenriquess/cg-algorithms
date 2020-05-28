import { bresenham } from '../cg-algorithms.js';

const canvasSize = 500;
const minResolution = 5;
const canvasBgColor = '#C6C3FF';
const lineColor = 'SlateBlue';
const canvas = document.getElementById('bresenham-canvas');
const context = canvas.getContext('2d');
const inputX1 = document.getElementById('bresenham-x1');
const inputY1 = document.getElementById('bresenham-y1');
const inputX2 = document.getElementById('bresenham-x2');
const inputY2 = document.getElementById('bresenham-y2');

const fillCanvas = color => {
  context.beginPath();
  context.rect(0, 0, canvasSize, canvasSize);
  context.fillStyle = color;
  context.fill();
  context.closePath();
};

const setupCanvas = () => {
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  fillCanvas(canvasBgColor);
};

const drawAxis = () => {
  context.beginPath();
  context.moveTo(0, canvasSize / 2);
  context.lineTo(canvasSize, canvasSize / 2);
  context.moveTo(canvasSize / 2, 0);
  context.lineTo(canvasSize / 2, canvasSize);
  context.lineWidth = 2;
  context.stroke();
  context.closePath();
};

const drawPixelFactory = (max, lineColor) => {
  const pixelSize = canvasSize / (max * 2 + 1);
  return (x, y) => {
    context.beginPath();
    context.rect(
      x * pixelSize + canvasSize / 2 - pixelSize / 2,
      -y * pixelSize + canvasSize / 2 - pixelSize / 2,
      pixelSize,
      pixelSize,
    );
    context.fillStyle = lineColor;
    context.fill();
    context.closePath();
  };
};

const onSubmit = () => {
  const x1 = (inputX1.value = +inputX1.value || 0);
  const y1 = (inputY1.value = +inputY1.value || 0);
  const x2 = (inputX2.value = +inputX2.value || 0);
  const y2 = (inputY2.value = +inputY2.value || 0);

  let max = Math.max(Math.abs(x1), Math.abs(y1), Math.abs(x2), Math.abs(y2));
  if (max < minResolution) {
    max = minResolution;
  }
  const drawPixel = drawPixelFactory(max, lineColor);

  fillCanvas(canvasBgColor);
  drawAxis();
  bresenham(x1, y1, x2, y2, drawPixel);
};

const setupListener = () => {
  const form = document.getElementById('bresenham-form');
  form.addEventListener('submit', onSubmit);
};

setupCanvas();
drawAxis();
setupListener();
