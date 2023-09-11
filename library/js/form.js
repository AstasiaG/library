const visits = document.querySelectorAll('span.visits');
const bonuses = document.querySelectorAll('span.bonuses');
const books = document.querySelectorAll('span.books1');
const userActive = JSON.parse(localStorage.getItem('user'));
const letters = document.getElementById('letters');
const fullName = document.getElementById('fullName');
const card = document.querySelector('span.card1');

visits.forEach(e => {
  e.innerText = userActive.visits;
});

books.forEach(e => {
  e.innerText = userActive.books.length;
});

bonuses.forEach(e => {
  e.innerText = userActive.books.length * 20;
})

letters.innerText = `${userActive.firstName[0]}${userActive.lastName[0]}`;
fullName.innerText = `${userActive.firstName} ${userActive.lastName}`;
card.innerText = userActive.cardNumber;