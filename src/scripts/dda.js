const canvas = document.getElementById('dda-canvas');
const canvasSize = 300;
canvas.width = canvasSize;
canvas.height = canvasSize;
const context = canvas.getContext('2d');
const fillBgCanvas = color => {
  context.beginPath();
  context.rect(0, 0, canvasSize, canvasSize);
  context.fillStyle = color;
  context.fill();
  context.closePath();
};
fillBgCanvas('#c6c3ff');
const drawAxis = () => {
  context.beginPath();
  context.moveTo(0, canvasSize / 2);
  context.lineTo(canvasSize, canvasSize / 2);
  context.moveTo(canvasSize / 2, 0);
  context.lineTo(canvasSize / 2, canvasSize);
  context.stroke();
  context.closePath();
};
drawAxis();

const drawLine = (x1, y1, x2, y2, paintPixel) => {
  const xVariation = Math.abs(x2 - x1);
  const yVariation = Math.abs(y2 - y1);
  const biggerVariation = yVariation > xVariation ? yVariation : xVariation;
  let x = x1;
  let y = y1;
  paintPixel(Math.round(x), Math.round(y));
  for (var i = 1; i <= biggerVariation; i++) {
    x += (xVariation / biggerVariation) * (x1 < x2 ? 1 : -1);
    y += (yVariation / biggerVariation) * (y1 < y2 ? 1 : -1);
    paintPixel(Math.round(x), Math.round(y));
  }
};

const onSubmit = () => {
  const inputX1 = document.getElementById('dda-x1');
  const inputY1 = document.getElementById('dda-y1');
  const inputX2 = document.getElementById('dda-x2');
  const inputY2 = document.getElementById('dda-y2');
  const x1 = (inputX1.value = +inputX1.value || 0);
  const y1 = (inputY1.value = +inputY1.value || 0);
  const x2 = (inputX2.value = +inputX2.value || 0);
  const y2 = (inputY2.value = +inputY2.value || 0);
  if (x1 == null || y1 == null || x2 == null || y2 == null) {
    console.log('inválido');
    return;
  }
  // console.log(x1, y1, x2, y2);
  const max = Math.max(Math.abs(x1), Math.abs(y1), Math.abs(x2), Math.abs(y2));
  const pixelSize = canvasSize / (max * 2 + 1);
  const paintPixel = (x, y, color = '#F00') => {
    context.beginPath();
    context.rect(
      x * pixelSize + canvasSize / 2 - pixelSize / 2,
      -y * pixelSize + canvasSize / 2 - pixelSize / 2,
      pixelSize,
      pixelSize,
    );
    context.fillStyle = color;
    context.fill();
    context.closePath();
  };
  fillBgCanvas('#c6c3ff');
  drawAxis();
  drawLine(x1, y1, x2, y2, paintPixel);
};

const form = document.getElementById('dda-form');
form.addEventListener('submit', onSubmit);
