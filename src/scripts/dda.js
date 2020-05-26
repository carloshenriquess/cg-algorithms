export const dda = () => {
  const canvas = document.getElementById('dda-canvas');
  const context = canvas.getContext('2d');
  const fillBgCanvas = color => {
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.fill();
  };

  const onSubmit = () => {
    const x1 = document.getElementById('dda-x1').value;
    const y1 = document.getElementById('dda-y1').value;
    const x2 = document.getElementById('dda-x2').value;
    const y2 = document.getElementById('dda-y2').value;
    console.log(`(${x1},${y1})`);
    console.log(`(${x2},${y2})`);
  };

  fillBgCanvas('#c6c3ff');

  const form = document.getElementById('dda-form');
  form.addEventListener('submit', onSubmit);
};
