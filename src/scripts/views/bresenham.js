import { bresenham, sruToSrdFactory } from '../cg-algorithms.js';

const canvasSize = 300;
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

const drawPixelFactory = (resolution, lineColor) => {
  const pixelSize = canvasSize / (resolution + 1);
  const drawPixelInCanvas = (x, y) => {
    context.beginPath();
    context.rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    context.fillStyle = lineColor;
    context.fill();
    context.closePath();
  };

  const sruLimits = {
    minX: 0,
    minY: 0,
    maxX: resolution,
    maxY: resolution,
  };
  const srdLimits = sruLimits;
  const sruToSrd = sruToSrdFactory(sruLimits, srdLimits);
  return (x, y) => drawPixelInCanvas(...sruToSrd(x, y));
};

const onSubmit = () => {
  const x1 = (inputX1.value = +inputX1.value || 0);
  const y1 = (inputY1.value = +inputY1.value || 0);
  const x2 = (inputX2.value = +inputX2.value || 0);
  const y2 = (inputY2.value = +inputY2.value || 0);

  let resolution = Math.max(
    Math.abs(x1),
    Math.abs(y1),
    Math.abs(x2),
    Math.abs(y2),
  );
  if (resolution < minResolution) {
    resolution = minResolution;
  }
  const drawPixel = drawPixelFactory(resolution, lineColor);

  fillCanvas(canvasBgColor);
  bresenham(x1, y1, x2, y2, drawPixel);
};

const setupListener = () => {
  const form = document.getElementById('bresenham-form');
  form.addEventListener('submit', onSubmit);
};

setupCanvas();
setupListener();
