const buttons = Array.from(document.getElementsByClassName('js-menu-item'));
const items = buttons.map(button => button.id);

export const navigationFactory = () => {
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
    if (!items.find(menuItem => menuItem === item)) {
      throw 404;
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

  return {
    to: selectItem,
  };
};

export const setupViews = () => {
  import('./setup-views.js');
};
