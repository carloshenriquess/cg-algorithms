export const bresenham = () => {
  const form = document.getElementById('bresenham-form');
  const xElement = document.getElementById('bresenham-x');
  const yElement = document.getElementById('bresenham-y');
  const onSubmit = () => {
    const x = xElement.value;
    const y = yElement.value;
    console.log(x, y);
  };
  form.addEventListener('submit', onSubmit);
  dda.hide = () => {};
};
