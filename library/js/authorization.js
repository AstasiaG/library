const userIcon = document.getElementById('profile_icon');
const userMenu = document.getElementById('user_menu');
const loginBtn = Array.from(document.getElementsByName('first'));
const registerBtn = Array.from(document.getElementsByName('second'));
const wrapper = document.getElementById('wrapper');
const login = document.getElementById('login');
const register = document.getElementById('register');
const profile = document.getElementById('profile');
const buyBook = document.getElementById('buy-book');
const close = Array.from(document.querySelectorAll('a.close-icon'));

userIcon.addEventListener('click', () => {
  userMenu.classList.toggle('none');
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
  })
});

/*wrapper.addEventListener('click', () => {

  if (!(login.className.includes('none'))) {
    wrapper.classList.add('none');
    login.classList.add('none');
  } else if (!(register.className.includes('none'))) {
    wrapper.classList.add('none');
    register.classList.add('none');
  }
})*/