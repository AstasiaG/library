const menu = document.querySelector('ul.list');
const burger = document.querySelector('a.burger-menu');
const menuItems = document.querySelectorAll('li.list__item')

burger.addEventListener('click', () => {
  burger.classList.toggle('burger-menu__active');
  menu.classList.toggle('list-active');
  menuItems.forEach(e => {
    e.classList.toggle('list__item-active')
  });
})

menuItems.forEach(e => {
  e.addEventListener('click', (e) => {
    menu.classList.remove('list-active');
    burger.classList.remove('burger-menu__active');
    e.classList.remove('list__item-active')
  })
})

document.addEventListener('click', (el) => {
  const notMenu = el.composedPath().includes(burger);
  if(!notMenu) {
    menu.classList.remove('list-active');
    burger.classList.remove('burger-menu__active');
    menuItems.forEach(e => {
      e.classList.remove('list__item-active')
    });
  }
})

console.log("Самопроверка( 50/50 ):\n  1.Вёрстка соответствует макету. Ширина экрана 768px\n  2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется\n  3.На ширине экрана 768рх реализовано адаптивное меню");