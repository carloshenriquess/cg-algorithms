import { sruToSrdFactory } from '../cg-algorithms.js';

const inputSruXmin = document.getElementById('srusrd-sruXmin');
const inputSruYmin = document.getElementById('srusrd-sruYmin');
const inputSruXmax = document.getElementById('srusrd-sruXmax');
const inputSruYmax = document.getElementById('srusrd-sruYmax');
const inputSrdXmin = document.getElementById('srusrd-srdXmin');
const inputSrdYmin = document.getElementById('srusrd-srdYmin');
const inputSrdXmax = document.getElementById('srusrd-srdXmax');
const inputSrdYmax = document.getElementById('srusrd-srdYmax');
const inputSruX = document.getElementById('srusrd-sru-x');
const inputSruY = document.getElementById('srusrd-sru-y');
const inputSrdX = document.getElementById('srusrd-srd-x');
const inputSrdY = document.getElementById('srusrd-srd-y');

const onSubmit = () => {
  const sruXmin = +inputSruXmin.value;
  const sruYmin = +inputSruYmin.value;
  const sruXmax = +inputSruXmax.value;
  const sruYmax = +inputSruYmax.value;
  const srdXmin = +inputSrdXmin.value;
  const srdYmin = +inputSrdYmin.value;
  const srdXmax = +inputSrdXmax.value;
  const srdYmax = +inputSrdYmax.value;
  const sruX = +inputSruX.value;
  const sruY = +inputSruY.value;
  const sruLimits = {
    minX: sruXmin,
    minY: sruYmin,
    maxX: sruXmax,
    maxY: sruYmax,
  };
  const srdLimits = {
    minX: srdXmin,
    minY: srdYmin,
    maxX: srdXmax,
    maxY: srdYmax,
  };
  const sruToSrd = sruToSrdFactory(sruLimits, srdLimits);
  const [srdX, srdY] = sruToSrd(sruX, sruY);
  inputSrdX.value = srdX;
  inputSrdY.value = srdY;
};

const setupSubmitListener = () => {
  const form = document.getElementById('srusrd-form');
  form.addEventListener('submit', onSubmit);
};

const setupInputListeners = () => {
  inputSruXmin.addEventListener('input', event => {
    if (+inputSruXmax.value <= +event.target.value) {
      inputSruXmax.value = +event.target.value + 1;
    }
  });
  inputSruYmin.addEventListener('input', event => {
    if (+inputSruYmax.value <= +event.target.value) {
      inputSruYmax.value = +event.target.value + 1;
    }
  });
  inputSrdXmin.addEventListener('input', event => {
    if (+inputSrdXmax.value <= +event.target.value) {
      inputSrdXmax.value = +event.target.value + 1;
    }
  });
  inputSrdYmin.addEventListener('input', event => {
    if (+inputSrdYmax.value <= +event.target.value) {
      inputSrdYmax.value = +event.target.value + 1;
    }
  });
  inputSruXmax.addEventListener('input', event => {
    if (+inputSruXmin.value >= +event.target.value) {
      inputSruXmin.value = +event.target.value - 1;
    }
  });
  inputSruYmax.addEventListener('input', event => {
    if (+inputSruYmin.value >= +event.target.value) {
      inputSruYmin.value = +event.target.value - 1;
    }
  });
  inputSrdXmax.addEventListener('input', event => {
    if (+inputSrdXmin.value >= +event.target.value) {
      inputSrdXmin.value = +event.target.value - 1;
    }
  });
  inputSrdYmax.addEventListener('input', event => {
    if (+inputSrdYmin.value >= +event.target.value) {
      inputSrdYmin.value = +event.target.value - 1;
    }
  });
};

setupSubmitListener();
setupInputListeners();
