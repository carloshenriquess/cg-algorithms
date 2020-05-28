export const dda = () => {
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
    // console.log('draw', x1, y1, x2, y2);
    // let Xinc;
    // let Yinc;
    const xVariation = Math.abs(x2 - x1);
    const yVariation = Math.abs(y2 - y1);
    const biggerVariation = yVariation > xVariation ? yVariation : xVariation;
    paintPixel(Math.round(x1), Math.round(y1));
    console.log('paint', 'X:', x1, 'Y:', y1);
    for (var i = 1; i <= biggerVariation; i++) {
      x1 = x1 + xVariation / biggerVariation;
      y1 = y1 + yVariation / biggerVariation;
      paintPixel(Math.round(x1), Math.round(y1));
      console.log('paint', 'X:', x1, 'Y:', y1);
    }
    // Xinc = (x2 - x1) / biggerVariation;
    // Yinc = (y2 - y1) / biggerVariation;
    // let x = x1;
    // let y = y1;
    //   while(X<X2){
    //     paintPixel(Math.round(X) ,Math.round(Y));
    //     X = X + Xinc;
    //     Y = Y + Yinc;
    //  }
  };

  const onSubmit = () => {
    const x1 = +document.getElementById('dda-x1').value;
    const y1 = +document.getElementById('dda-y1').value;
    const x2 = +document.getElementById('dda-x2').value;
    const y2 = +document.getElementById('dda-y2').value;
    if (x1 == null || y1 == null || x2 == null || y2 == null) {
      console.log('inválido');
      return;
    }
    // console.log(x1, y1, x2, y2);
    const max = Math.max(
      Math.abs(x1),
      Math.abs(y1),
      Math.abs(x2),
      Math.abs(y2),
    );
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
};
