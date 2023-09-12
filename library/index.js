const menu = document.querySelector('ul.list');
const burger = document.querySelector('a.burger-menu');
const menuItems = document.querySelectorAll('li.list__item');
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
const buyBookBtn = document.getElementById('subscription');
const cardProf = document.getElementById('cardProf');
const booksList = document.getElementById('booksList');
const formBInp = document.querySelectorAll('input.formB');
const arrBooks = Array.from(document.querySelectorAll('article.book'));

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
      userIcon.setAttribute('title', `${userAct.firstName} ${userAct.lastName}`);
    
      usMenuNone.classList.add('none');
      usMenuAuth.classList.remove('none');
      cardProf.innerText = `${userAct.cardNumber}`;
      cardProf.style.fontSize = '13px';

      cardNumRes.value = userAct.cardNumber;
      cardNameRes.value = `${userAct.firstName} ${userAct.lastName}`;
      emptyCard.classList.add('none');
      fillCard.classList.remove('none');
      userAct.books.forEach((e) => {
        booksList.innerHTML += `<li class="profile__list-item">${e}</li>`;
      })
      arrBooks.forEach((e) => {
        const a = e.childNodes[1];
        userAct.books.forEach((el) => {
          el.toLowerCase();
          const l = a.childNodes[3];
          const c = l.childNodes[0].textContent;
          if(el.includes(c)){
            const b = e.querySelector('button.buy');
            b.innerText = 'Own';
            b.setAttribute('disabled', '');
          }
        });
      });

    } else {
      getCardNon.classList.remove('none');
      getCardAuth.classList.add('none');
    
      userIcon.classList.remove('account__icon');
      userIcon.removeAttribute('title', `${userAct.firstName} ${userAct.lastName}`);
    
      usMenuNone.classList.remove('none');
      usMenuAuth.classList.add('none');
      buyBtn.forEach((d) => {
        d.innerText = 'Buy';
      });
    }
  } else if(userAct === null) {
    getCardNon.classList.remove('none');
    getCardAuth.classList.add('none');
  
    userIcon.classList.remove('account__icon');
  
    usMenuNone.classList.remove('none');
    usMenuAuth.classList.add('none');
    buyBtn.forEach((d) => {
      d.innerText = 'Buy';
    });
  }
}

buyBtn.forEach((u) => {
  u.addEventListener('click', () => {
    if(userAct === null) {
      wrapper.classList.remove('none');
      login.classList.remove('none');
    } else if(userAct !== null && userAct.subscription === false){
      wrapper.classList.remove('none');
      buyBook.classList.remove('none');
    } 
    
    if(userAct.subscription === true) {
      const bookThis = u.closest('article.book');
      const author = (bookThis.querySelector('span.author').innerHTML);
      const bookName = bookThis.querySelector('p.book__name');
      const b = `${bookName.childNodes[0].textContent},${author.substring(3)}`;
      userAct.books.push(b);
      localStorage.setItem('user', JSON.stringify(userAct));
      userAct.books.forEach((e) => {
        booksList.innerHTML += `<li class="profile__list-item">${e}</li>`;
      })
      u.innerText = 'Own';
      u.setAttribute('disabled', '');
    }
  });

});

logoutBtn.addEventListener('click', () => {
  userMenu.classList.add('none');
  userAct.condition = false;
  localStorage.setItem('user', JSON.stringify(userAct));
  CheckUser();
  location.reload();
});

cardBtn.addEventListener('click', function() {
  if(userAct === null) {
    return;
  } else if (userAct !== null || userAct.condition === false) {
    const name = `${userAct.firstName} ${userAct.lastName}`;
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

buyBookBtn.addEventListener('click', () => {
  if(!(buyBookBtn.hasAttribute('disabled'))) {
    userAct.subscription = true;
    localStorage.setItem('user', JSON.stringify(userAct));
    wrapper.classList.add('none');
    buyBook.classList.add('none');
  } else {
    return;
  }
});

formBInp.forEach((e) => {
  e.addEventListener('change', () => {
    const bankCard = document.getElementById('bankCard').value;
    const code1 = document.getElementById('code1').value;
    const code2 = document.getElementById('code2').value;
    const cvc = document.getElementById('cvc').value;
    const cardholderName = document.getElementById('cardholderName').value;
    const postalCode = document.getElementById('postalCode').value;
    const city = document.getElementById('city').value;

    if(bankCard != 0 && code1 != 0 && code2 != 0 && cvc != 0 && cardholderName != 0 && postalCode != 0 && city != 0) {
      buyBookBtn.removeAttribute('disabled', '');
    }
  })
})


console.log("Самопроверка( 50/200 ):\n  Этап 1:Пользователь не зарегистрирован \n Нет технологии sticky для панели навигации\n  Этап 2: Пользователь на этапе регистрации\n Окна регистрации, входа, профиля и покупки абонимента не закрываются при нажатии вне окна\n  Этап 3: Пользователь на этапе входа в учётную запись после регистрации\n  Этап 4: Пользователь после входа в учётную запись\n ");