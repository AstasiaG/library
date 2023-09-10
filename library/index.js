const menu = document.querySelector('ul.list');
const burger = document.querySelector('a.burger-menu');
const menuItems = document.querySelectorAll('li.list__item')
const inp = document.getElementsByName('seasons');
const books = Array.from(document.querySelectorAll('div.books'));

burger.addEventListener('click', () => {
  burger.classList.toggle('burger-menu__active');
  menu.classList.toggle('list-active');
  menuItems.forEach(e => {
    e.classList.toggle('list__item-active')
  });
})

/*userIcon.addEventListener('click', () => {
  userMenu.classList.toggle('none');
})*/

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

function BooksSlider() {
  books.find(element => {
    if(element.className.includes(this.value)){
      element.classList.remove('none');
      element.classList.remove('fade');
      //element.classList.remove('none');
    }

    if(!(element.className.includes(this.value))) {
      element.classList.add('fade');
    }
  });
 // book.classList.remove('fade');

 /*books.find(element => {
  if(!(element.className.includes(this.value))) {
    element.classList.add('fade');
    setTimeout(function () {
      element.classList.add('fade');
    }, 30);
  }
});*/

}

inp.forEach((e) => e.addEventListener('click', BooksSlider));
books.forEach((e) => e.addEventListener('transitionend', function() {
  books.find(el => {
    if(el.className.includes('fade')) {
      el.classList.add('none');
    } else if(!(el.className.includes('none'))) {
      el.classList.remove('fade');
    }
  })
})

);

console.log("Самопроверка( 50/50 ):\n  1.Вёрстка соответствует макету. Ширина экрана 768px\n  2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется\n  3.На ширине экрана 768рх реализовано адаптивное меню");