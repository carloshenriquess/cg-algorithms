export const dda = (x1, y1, x2, y2, drawPixel) => {
  const xVariation = Math.abs(x2 - x1);
  const yVariation = Math.abs(y2 - y1);
  const biggerVariation = yVariation > xVariation ? yVariation : xVariation;
  let x = x1;
  let y = y1;
  drawPixel(Math.round(x), Math.round(y));
  for (var i = 1; i <= biggerVariation; i++) {
    x += (xVariation / biggerVariation) * (x1 < x2 ? 1 : -1);
    y += (yVariation / biggerVariation) * (y1 < y2 ? 1 : -1);
    drawPixel(Math.round(x), Math.round(y));
  }
};

export const bresenham = (x1, y1, x2, y2, drawPixel) => {
  const xVariation = Math.abs(x2 - x1);
  const xIncrement = x1 < x2 ? 1 : -1;
  const yVariation = Math.abs(y2 - y1);
  const yIncrement = y1 < y2 ? 1 : -1;
  let err = (xVariation > yVariation ? xVariation : -yVariation) / 2;

  drawPixel(x1, y1);
  while (x1 !== x2 || y1 !== y2) {
    const e2 = err;
    if (e2 > -xVariation) {
      err -= yVariation;
      x1 += xIncrement;
    }
    if (e2 < yVariation) {
      err += xVariation;
      y1 += yIncrement;
    }
    drawPixel(x1, y1);
  }
};

export const sruToSrdFactory = (sruLimits, srdLimits) => {
  const xToSrd = x =>
    ((x - sruLimits.minX) * (srdLimits.maxX - srdLimits.minX)) /
      (sruLimits.maxX - sruLimits.minX) +
    srdLimits.minX;
  const yToSrd = y =>
    ((y - sruLimits.minY) * (srdLimits.minY - srdLimits.maxY)) /
      (sruLimits.maxY - sruLimits.minY) +
    srdLimits.maxY;
  return (x, y) => [xToSrd(x), yToSrd(y)];
};
