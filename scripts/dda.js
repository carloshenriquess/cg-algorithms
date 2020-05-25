export const dda = () => {
  const form = document.getElementById('dda-form');
  const xElement = document.getElementById('dda-x');
  const yElement = document.getElementById('dda-y');
  const onSubmit = () => {
    const x = xElement.value;
    const y = yElement.value;
    console.log(x, y);
  };
  form.addEventListener('submit', onSubmit);
  dda.hide = () => {};
};
