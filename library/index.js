const menu = document.querySelector('ul.list');
const burger = document.querySelector('a.burger-menu');
const menuItems = document.querySelectorAll('li.list__item')

burger.addEventListener('click', () => {
  burger.classList.toggle('burger-menu__active');
  menu.classList.toggle('transform');
  menuItems.forEach(e => {
    e.classList.toggle('list__item-active')
  });
})
menuItems.forEach(e => {
  e.addEventListener('click', (e) => {
    menu.classList.remove('transform');
    burger.classList.remove('burger-menu__active');
    e.classList.remove('list__item-active')
  })
})

document.addEventListener('click', (el) => {
  const notMenu = el.composedPath().includes(burger);
  if(!notMenu) {
    menu.classList.remove('transform');
    burger.classList.remove('burger-menu__active');
    menuItems.forEach(e => {
      e.classList.remove('list__item-active')
    });
  }
})
