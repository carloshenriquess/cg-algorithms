import { bresenham, sruToSrdFactory } from '../cg-algorithms.js';

const canvasSize = 300;
const canvasBgColor = '#C6C3FF';
const lineColor = 'SlateBlue';
const canvas = document.getElementById('bresenham-canvas');
const context = canvas.getContext('2d');
const inputX1 = document.getElementById('bresenham-x1');
const inputY1 = document.getElementById('bresenham-y1');
const inputX2 = document.getElementById('bresenham-x2');
const inputY2 = document.getElementById('bresenham-y2');
const inputResolution = document.getElementById('bresenham-resolution');

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
  const x1 = (inputX1.value = +inputX1.value || 0);
  const y1 = (inputY1.value = +inputY1.value || 0);
  const x2 = (inputX2.value = +inputX2.value || 0);
  const y2 = (inputY2.value = +inputY2.value || 0);
  const resolution = (inputResolution.value = +inputResolution.value || 0);

  const drawPixel = drawPixelFactory(resolution, lineColor);

  fillCanvas(canvasBgColor);
  bresenham(x1, y1, x2, y2, drawPixel);
};

const setupSubmitListener = () => {
  const form = document.getElementById('bresenham-form');
  form.addEventListener('submit', onSubmit);
};

const setupInputListeners = () => {
  inputX1.addEventListener('input', event => {
    if (+inputResolution.value <= +event.target.value) {
      inputResolution.value = +event.target.value + 1;
    }
  });
  inputY1.addEventListener('input', event => {
    if (+inputResolution.value <= +event.target.value) {
      inputResolution.value = +event.target.value + 1;
    }
  });
  inputX2.addEventListener('input', event => {
    if (+inputResolution.value <= +event.target.value) {
      inputResolution.value = +event.target.value + 1;
    }
  });
  inputY2.addEventListener('input', event => {
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
