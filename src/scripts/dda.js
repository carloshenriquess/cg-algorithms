export const dda = () => {
  const form = document.getElementById('dda-form');
  const onSubmit = () => {
    const x1 = document.getElementById('dda-x1').value;
    const y1 = document.getElementById('dda-y1').value;
    const x2 = document.getElementById('dda-x2').value;
    const y2 = document.getElementById('dda-y2').value;
    console.log(`(${x1},${y1})`);
    console.log(`(${x2},${y2})`);
  };
  form.addEventListener('submit', onSubmit);
  dda.hide = () => {};
};
