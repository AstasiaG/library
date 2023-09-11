const menu = document.querySelector('ul.list');
const burger = document.querySelector('a.burger-menu');
const menuItems = document.querySelectorAll('li.list__item')
const inp = document.getElementsByName('seasons');
const books = Array.from(document.querySelectorAll('div.books'));
const userMenu = document.getElementById('user_menu');
const usMenuNone = document.getElementById('nonAuthProf');
const usMenuAuth = document.getElementById('authProf');
const userIcon = document.getElementById('profile_icon');
const loginBtn = Array.from(document.getElementsByName('first'));
const registerBtn = Array.from(document.getElementsByName('second'));
const profileBtn = Array.from(document.getElementsByName('profile'));
const wrapper = document.getElementById('wrapper');
const login = document.getElementById('login');
const register = document.getElementById('register');
const profile = document.getElementById('profile');
const buyBook = document.getElementById('buy-book');
const close = Array.from(document.querySelectorAll('a.close-icon'));
const getCardAuth = document.getElementById('auth');
const getCardNon = document.getElementById('nonAuth');
const logoutBtn = document.getElementById('logout');
const buyBtn = Array.from(document.querySelectorAll('button.buy'));
const userAct = JSON.parse(localStorage.getItem('user'));
const cardNum = document.getElementById('CardNumber');
const cardName = document.getElementById('CardName');
const emptyCard = document.getElementById('empty');
const fillCard = document.getElementById('fill');
const cardBtn = document.querySelector('button.card-form__button');
const cardNumRes = document.getElementById('CardNumberRes');
const cardNameRes = document.getElementById('CardNameRes');
const name = `${userAct.firstName} ${userAct.lastName}`;

CheckUser();

profileBtn.forEach((e) => {
  e.addEventListener('click', () => {
    wrapper.classList.remove('none');
    profile.classList.remove('none');
  })
});

burger.addEventListener('click', () => {
  if (!(userMenu.className.includes('none'))) {
    userMenu.classList.add('none');
  }
  burger.classList.toggle('burger-menu__active');
  menu.classList.toggle('list-active');
  menuItems.forEach(e => {
    e.classList.toggle('list__item-active')
  });
})

userIcon.addEventListener('click', () => {
  userMenu.classList.toggle('none');
  if(burger.className.includes('burger-menu__active')) {
    burger.classList.remove('burger-menu__active')
    userMenu.classList.remove('none')
  }
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
  const usMenu = el.composedPath().includes(userMenu);
  const usIcon = el.composedPath().includes(userIcon);
  const prof = el.composedPath().includes(profile);
  const buy = el.composedPath().includes(buyBook);
  const notLog = el.composedPath().includes(login);
  const wr = el.composedPath().includes(wrapper);
  if(!notMenu) {
    menu.classList.remove('list-active');
    burger.classList.remove('burger-menu__active');
    menuItems.forEach(e => {
      e.classList.remove('list__item-active')
    });
  } 
  if (!usMenu && !usIcon) {
    userMenu.classList.add('none');
  }
})

loginBtn.forEach(e => {
  e.addEventListener('click', () => {
    wrapper.classList.remove('none');
    login.classList.remove('none');
    userMenu.classList.add('none');
    if(!(register.className.includes('none'))) {
      register.classList.add('none');
    }
  })
});

registerBtn.forEach(e => {
  e.addEventListener('click', () => {
    wrapper.classList.remove('none');
    register.classList.remove('none');
    userMenu.classList.add('none');
    if(!(login.className.includes('none'))) {
      login.classList.add('none');
    }
  })
});

close.forEach(e => {
  e.addEventListener('click', () => {
    wrapper.classList.add('none');
    const a = e.closest('div.modal');
    a.classList.add('none');
  })
});

function BooksSlider() {
  books.find(element => {
    if(!(element.className.includes(this.value))) {
      element.classList.add('fade');

      if(element.className.includes('fade')) {
        setTimeout(function() {
          element.classList.add('none');
        },800);
      }

    }

  });

  books.find(element => {
    if(element.className.includes(this.value)){
      setTimeout(function() {
        element.classList.remove('none');
        if(!element.className.includes('none')) {
          setTimeout(function() {
            element.classList.remove('fade');
          },500);
        }
      },500);
    }
  });
}

inp.forEach((e) => e.addEventListener('click', BooksSlider));

export function CheckUser () {
  if(userAct !== null) {
    if(userAct.condition === true) {
      getCardNon.classList.add('none');
      getCardAuth.classList.remove('none');
    
      userIcon.innerText = `${userAct.firstName[0]}${userAct.lastName[0]}`;
      userIcon.classList.add('account__icon');
    
      usMenuNone.classList.add('none');
      usMenuAuth.classList.remove('none');

      cardNumRes.value = userAct.cardNumber;
      cardNameRes.value = `${userAct.firstName} ${userAct.lastName}`;
      emptyCard.classList.add('none');
      fillCard.classList.remove('none');
    } else {
      getCardNon.classList.remove('none');
      getCardAuth.classList.add('none');
    
      userIcon.classList.remove('account__icon');
    
      usMenuNone.classList.remove('none');
      usMenuAuth.classList.add('none');
    }
  } else if(userAct === null) {
    getCardNon.classList.remove('none');
    getCardAuth.classList.add('none');
  
    userIcon.classList.remove('account__icon');
  
    usMenuNone.classList.remove('none');
    usMenuAuth.classList.add('none');
  }
}

buyBtn.forEach((u) => {
  u.addEventListener('click', () => {
    if(userAct == null || userAct.condition === false) {
      wrapper.classList.remove('none');
      login.classList.remove('none');
    } else {
      wrapper.classList.remove('none');
      buyBook.classList.remove('none');
    }
  });

  if (userAct == null || userAct.condition === false) {
    u.innerText = 'Buy';
  };
});

logoutBtn.addEventListener('click', () => {
  userMenu.classList.add('none');
  userAct.condition = false;
  localStorage.setItem('user', JSON.stringify(userAct));
  CheckUser();
  location.reload();
});

cardBtn.addEventListener('click', function() {
  if (userAct !== null || userAct.condition === false) {
    if(cardNum.value === userAct.cardNumber && cardName.value === name) {
        cardNumRes.value = cardNum.value;
        cardNameRes.value = cardName.value;
        emptyCard.classList.add('none');
        fillCard.classList.remove('none');

      setTimeout(function(){
        emptyCard.classList.remove('none');
        fillCard.classList.add('none');
        cardNum.value = '';
        cardName.value = '';
      },10000);
    }
  }
});

console.log("Самопроверка( 50/50 ):\n  1.Вёрстка соответствует макету. Ширина экрана 768px\n  2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется\n  3.На ширине экрана 768рх реализовано адаптивное меню");