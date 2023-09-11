const btnRegister = document.getElementById('registerBtn');
const btnLogin = document.getElementById('loginBtn');
const wrap = document.getElementById('wrapper');
import {CheckUser} from '../index.js';

btnRegister.addEventListener('click', function (event){
  event.preventDefault();

  const firstName = document.getElementById('fName');
  const lastName = document.getElementById('lName');
  const email = document.getElementById('emailReg');
  const password = document.getElementById('passwordReg');
  const number = Math.trunc(Math.random()*1e10).toString(16);

  const user = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    condition: true,
    visits: 1,
    cardNumber: number,
    books: [],
  };

  window.localStorage.setItem('user', JSON.stringify(user));
  wrap.classList.add('none');
  CheckUser();
})

btnLogin.addEventListener('click', function (event){
  event.preventDefault();
  const password = document.getElementById('passwordLog').value;
  const login = document.getElementById('login').value;
  const userPrev = JSON.parse(localStorage.getItem('user'));

  if(password === userPrev.password && login === userPrev.email || password === userPrev.password && login === userPrev.cardNumber) {
    wrap.classList.add('none');
    CheckUser();
  }

});