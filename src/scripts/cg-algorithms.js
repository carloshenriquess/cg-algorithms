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
      srdLimits.minX || 0;
  const yToSrd = y =>
    ((y - sruLimits.minY) * (srdLimits.minY - srdLimits.maxY)) /
      (sruLimits.maxY - sruLimits.minY) +
      srdLimits.maxY || 0;
  return (x, y) => [xToSrd(x), yToSrd(y)];
};

export const circle = (x1, xy, radius, drawPixel) => {
  let x = radius - 1;
  let y = 0;
  let dx = 1;
  let dy = 1;
  const diameter = radius * 2;
  let decision = dx - diameter; //Critério de decisão

  while (x >= y) {
    drawPixel(x + x1, y + xy);
    drawPixel(y + x1, x + xy);
    drawPixel(-x + x1, y + xy);
    drawPixel(-y + x1, x + xy);
    drawPixel(-x + x1, -y + xy);
    drawPixel(-y + x1, -x + xy);
    drawPixel(x + x1, -y + xy);
    drawPixel(y + x1, -x + xy);
    if (decision <= 0) {
      y++;
      decision += dy; // Muda o critério de decisão para y -> y+1
      dy += 2;
    }
    if (decision > 0) {
      x--;
      dx += 2;
      decision += -diameter + dx; // Muda para y -> y+1, x -> x-1
    }
  }
};

export const scale = (object, scaleX, scaleY) => {
  const scale = (x, y) => {
    const resultX = x * scaleX;
    const resultY = y * scaleY;
    return [resultX, resultY];
  };
  return object.map(([x, y]) => scale(x, y));
};

export const translation = (object, translateX, translateY) => {
  const translate = (x, y) => {
    const resultX = x + translateX;
    const resultY = y + translateY;
    return [resultX, resultY];
  };
  return object.map(([x, y]) => translate(x, y));
};

export const rotation = (object, angle) => {
  const degreeToRadian = degree => (degree * Math.PI) / 180;
  const radian = degreeToRadian(angle);
  const rotate = (x, y) => {
    const resultX = x * Math.cos(radian) - y * Math.sin(radian);
    const resultY = x * Math.sin(radian) + y * Math.cos(radian);
    return [resultX, resultY];
  };
  return object.map(([x, y]) => rotate(x, y));
};
