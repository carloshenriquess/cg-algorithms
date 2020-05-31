import { circle, sruToSrdFactory } from '../cg-algorithms.js';

const canvasSize = 300;
const canvasBgColor = '#C6C3FF';
const lineColor = 'SlateBlue';
const canvas = document.getElementById('circle-canvas');
const context = canvas.getContext('2d');
const inputX = document.getElementById('circle-x');
const inputY = document.getElementById('circle-y');
const inputRadius = document.getElementById('circle-radius');
const inputResolution = document.getElementById('circle-resolution');

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
  const pixelSize = canvasSize / resolution;
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
  const x = (inputX.value = +inputX.value || 0);
  const y = (inputY.value = +inputY.value || 0);
  const radius = (inputRadius.value = +inputRadius.value || 0);
  const resolution = (inputResolution.value = +inputResolution.value || 0);

  const drawPixel = drawPixelFactory(resolution, lineColor);

  fillCanvas(canvasBgColor);
  circle(x, y, radius, drawPixel);
};

const setupSubmitListener = () => {
  const form = document.getElementById('circle-form');
  form.addEventListener('submit', onSubmit);
};

const setupInputListeners = () => {
  inputX.addEventListener('input', event => {
    if (+inputResolution.value < +event.target.value) {
      inputResolution.value = event.target.value;
    }
  });
  inputY.addEventListener('input', event => {
    if (+inputResolution.value < +event.target.value) {
      inputResolution.value = event.target.value;
    }
  });
};

const setupListeners = () => {
  setupSubmitListener();
  setupInputListeners();
};

setupCanvas();
setupListeners();
