import { translation, sruToSrdFactory } from '../cg-algorithms.js';
import { batmanObject } from '../util/batman.js';

const canvasSize = 300;
const canvasBgColor = '#C6C3FF';
const lineColor = 'SlateBlue';
const canvas = document.getElementById('translation-canvas');
const context = canvas.getContext('2d');
const inputX = document.getElementById('translation-x');
const inputY = document.getElementById('translation-y');
const inputResolution = document.getElementById('translation-resolution');

const fillCanvas = color => {
  context.fillStyle = color;
  context.fillRect(0, 0, canvasSize, canvasSize);
};

const drawObject = ({ object, resolution, lineColor }) => {
  const sruLimits = {
    minX: -(resolution / 2),
    minY: -(resolution / 2),
    maxX: resolution / 2,
    maxY: resolution / 2,
  };
  const srdLimits = {
    minX: 0,
    minY: 0,
    maxX: resolution,
    maxY: resolution,
  };
  const sruToSrd = sruToSrdFactory(sruLimits, srdLimits);
  const pixelSize = canvasSize / resolution;

  object = object
    .map(coordinates => sruToSrd(...coordinates))
    .map(([x, y]) => [x * pixelSize, y * pixelSize])
    .map(([x, y]) => [x + pixelSize / 2, y + pixelSize / 2]);
  context.beginPath();
  context.moveTo(...object[0]);
  for (const coordinates of object.slice(1)) {
    context.lineTo(...coordinates);
  }
  context.strokeStyle = lineColor;
  context.lineWidth = 1;
  context.stroke();
  context.closePath();
};

const setupCanvas = () => {
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  fillCanvas(canvasBgColor);
};

const onSubmit = () => {
  const translationX = +inputX.value;
  const translationY = +inputY.value;
  const resolution = (inputResolution.value = +inputResolution.value || 0);

  const object = translation(batmanObject, translationX, translationY);

  const drawOptions = {
    object,
    resolution,
    lineColor,
  };

  fillCanvas(canvasBgColor);
  drawObject(drawOptions);
};

const setupSubmitListener = () => {
  const form = document.getElementById('translation-form');
  form.addEventListener('submit', onSubmit);
};

const setupListeners = () => {
  setupSubmitListener();
};

setupCanvas();
const drawOptions = {
  object: batmanObject,
  resolution: 60,
  lineColor,
};
drawObject(drawOptions);
setupListeners();
