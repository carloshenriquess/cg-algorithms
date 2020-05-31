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
  context.fillStyle = color;
  context.fillRect(0, 0, canvasSize, canvasSize);
};

const setupCanvas = () => {
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  fillCanvas(canvasBgColor);
};

const drawPixelFactory = (resolution, lineColor) => {
  const pixelSize = canvasSize / resolution;
  const drawPixelInCanvas = (x, y) => {
    context.fillStyle = lineColor;
    context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  };

  const sruLimits = {
    minX: 0,
    minY: 0,
    maxX: resolution - 1,
    maxY: resolution - 1,
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
    if (+inputResolution.value <= +event.target.value) {
      inputResolution.value = +event.target.value + 1;
    }
  });
  inputY.addEventListener('input', event => {
    if (+inputResolution.value <= +event.target.value) {
      inputResolution.value = +event.target.value + 1;
    }
  });
};

const setupListeners = () => {
  setupSubmitListener();
  setupInputListeners();
};

setupCanvas();
setupListeners();
