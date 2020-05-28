const buttons = Array.from(document.getElementsByClassName('js-menu-item'));
const items = buttons.map(button => button.id);

export const setupNavigation = () => {
  let selectedItem;

  const clearViewsButSelected = () => {
    for (const item of items) {
      if (item === selectedItem) {
        continue;
      }
      const view = document.getElementById(item + '-view');
      view.style.display = 'none';
      const selectedButton = buttons.find(button => button.id === item);
      selectedButton.classList.remove('c-menu__button--selected');
    }
  };

  const selectItem = item => {
    if (selectedItem === item) {
      return;
    }
    selectedItem = item;
    clearViewsButSelected();
    const selectedView = document.getElementById(item + '-view');
    const selectedButton = buttons.find(button => button.id === item);
    selectedView.style.display = 'block';
    selectedButton.classList.add('c-menu__button--selected');
  };

  const handleMenuClick = event => {
    selectItem(event.target.id);
  };
  for (const button of buttons) {
    button.addEventListener('click', handleMenuClick);
  }
  selectItem(items[0]);
};

export const setupViews = () => {
  import('./actions.js');
};
