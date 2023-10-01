const imgContainer = document.querySelectorAll('img.image');
const popup = document.querySelector('div.popup__view');
const popupImg= document.querySelector('div.image__view');
const fullImage = document.querySelector('img.open__image');
const close = document.querySelector('div.btn-close');
const searchField = document.querySelector('input.search');
const searchBtn = document.querySelector('button.search__btn');
const authorPhoto = document.querySelectorAll('img.author__img');
const authorName = document.querySelectorAll('div.name');
const authorLink = document.querySelectorAll('a.author');
const errText = document.querySelector('div.error');
const themeBtn = document.querySelector('div.theme');
const footerText = document.querySelector('div.footer__text');
const links = document.querySelectorAll('a.link');
const logo = document.querySelector('img.logo');
const footer = document.querySelector('footer.page-footer');
const header = document.querySelector('header.page-header');
const img = document.querySelectorAll('div.image__panel');
localStorage.setItem("isDark", false);

let urlGet = 'https://api.unsplash.com/photos/random?query=evening&count=25&client_id=cfjQldTSsWJ5i8w9VNXxStC27VFyHzLWDfFVwVqKvLE';

async function getData() {
  try{
    const res = await fetch(urlGet);
    const data = await res.json();
    showData(data);
    console.log(data);
  } catch(err) {
    console.log(err);
    errText.style.display = 'block';
  }
}

function showData(data) {
  for(let i = 0; i < imgContainer.length; i++) {
    imgContainer[i].setAttribute('src', `${data[i].urls.regular}`);
    imgContainer[i].setAttribute('alt', `${data[i].alt_description}`);
    authorName[i].innerText = data[i].user.name;
    authorPhoto[i].setAttribute('src', `${data[i].user.profile_image.small}`);
    authorLink[i].setAttribute('href', `${data[i].user.links.html}`);
  }
}

getData();

async function searchImage() {
  try{
    urlGet = `https://api.unsplash.com/search/photos?query=${searchField.value}&per_page=25&client_id=cfjQldTSsWJ5i8w9VNXxStC27VFyHzLWDfFVwVqKvLE`;
    const res = await fetch(urlGet);
    const data = await res.json();
    showData(data.results);
  } catch(err) {
    errText.style.display = 'block';
  }
}

function showImage(e) {
  popup.classList.remove('hidden');
  fullImage.setAttribute('src', `${e.target.children[1].getAttribute('src')}`);
  fullImage.setAttribute('alt', `${e.target.children[1].getAttribute('alt')}`);
}

for(let i = 0; i < img.length; i++) {
  img[i].addEventListener('click', (e) => {
    const notAuthor = e.composedPath().includes(authorLink[i]);
    if(!notAuthor) {
      showImage(e);
    }
  });
}

close.addEventListener('click', () => {
  popup.classList.add('hidden');
})

searchField.addEventListener('keydown', async function(e) {
  if(e.keyCode == 13) {
    e.preventDefault();
   await searchImage();
  }
});

popup.addEventListener('click', (el) => {
  const notImg = el.composedPath().includes(popupImg);
  if(!notImg) {
    popup.classList.add('hidden');
  }
})

function changeTheme() {
  let dark = localStorage.getItem('isDark');
  console.log(dark);
  if(dark == 'true') {
    document.body.style.background = 'var(--main-color)';
    themeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none"><path d="M15.8334 9.5C15.8329 11.7168 16.4141 13.8949 17.519 15.8167C18.6239 17.7384 20.2138 19.3366 22.1298 20.4514C24.0459 21.5663 26.2209 22.1588 28.4377 22.1697C30.6544 22.1806 32.8352 21.6096 34.7622 20.5137C34.0006 28.5475 27.2334 34.8333 19.0001 34.8333C10.2553 34.8333 3.16675 27.7447 3.16675 19C3.16675 10.7667 9.45258 3.9995 17.4864 3.23792C16.3995 5.14573 15.8297 7.30431 15.8334 9.5ZM6.33341 19C6.33341 22.3594 7.66793 25.5812 10.0434 27.9567C12.4189 30.3321 15.6407 31.6667 19.0001 31.6667C21.2381 31.6665 23.4362 31.0739 25.3709 29.949C27.3056 28.8241 28.9081 27.207 30.0153 25.2621C29.515 25.3096 29.0083 25.3333 28.5001 25.3333C19.7553 25.3333 12.6667 18.2447 12.6667 9.5C12.6667 8.99175 12.6905 8.48667 12.738 7.98475C10.7931 9.09201 9.17602 10.6944 8.0511 12.6292C6.92619 14.5639 6.33355 16.762 6.33341 19ZM28.7597 3.62742L30.0834 3.95833V5.54167L28.7597 5.87258C28.203 6.01181 27.6946 6.29969 27.2889 6.70546C26.8831 7.11123 26.5952 7.61963 26.456 8.17633L26.1251 9.5H24.5417L24.2108 8.17633C24.0716 7.61963 23.7837 7.11123 23.378 6.70546C22.9722 6.29969 22.4638 6.01181 21.9071 5.87258L20.5834 5.54167V3.95833L21.9071 3.62742C22.4635 3.48794 22.9716 3.19994 23.377 2.79419C23.7825 2.38844 24.0702 1.88017 24.2092 1.32367L24.5417 0H26.1251L26.456 1.32367C26.5952 1.88037 26.8831 2.38877 27.2889 2.79454C27.6946 3.20031 28.203 3.48819 28.7597 3.62742ZM36.6764 11.5441L38.0001 11.875V13.4583L36.6764 13.7892C36.1197 13.9285 35.6113 14.2164 35.2055 14.6221C34.7998 15.0279 34.5119 15.5363 34.3727 16.093L34.0417 17.4167H32.4584L32.1275 16.093C31.9883 15.5363 31.7004 15.0279 31.2946 14.6221C30.8888 14.2164 30.3804 13.9285 29.8237 13.7892L28.5001 13.4583V11.875L29.8237 11.5441C30.3804 11.4049 30.8888 11.117 31.2946 10.7112C31.7004 10.3054 31.9883 9.79703 32.1275 9.24033L32.4584 7.91667H34.0417L34.3727 9.24033C34.5119 9.79703 34.7998 10.3054 35.2055 10.7112C35.6113 11.117 36.1197 11.4049 36.6764 11.5441Z" fill="#222222"/></svg>'
    searchField.style.background = 'var(--main-color)';
    footerText.style.color = 'var(--text-color)';
    for(let i = 0; i < links.length; i++) {
      links[i].style.color = 'var(--text-color)';
    }
    for(let i = 0; i < authorLink.length; i++) {
      authorLink[i].style.background = 'var(--main-color)';
      authorName[i].style.color = 'var(--bg-grey)';
    }
    logo.setAttribute('src', './img/logoBl.png');
    footer.style.background = 'var(--main-color)';
    header.style.background = 'var(--main-color)';
    localStorage.setItem("isDark", false);
    return;
  } else if(dark == 'false'){

    document.body.style.background = 'var(--text-color)';
    themeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none"><path d="M18.9999 28.4999C16.4804 28.4999 14.064 27.499 12.2824 25.7174C10.5008 23.9358 9.49992 21.5195 9.49992 18.9999C9.49992 16.4804 10.5008 14.064 12.2824 12.2824C14.064 10.5008 16.4804 9.49992 18.9999 9.49992C21.5195 9.49992 23.9358 10.5008 25.7174 12.2824C27.499 14.064 28.4999 16.4804 28.4999 18.9999C28.4999 21.5195 27.499 23.9358 25.7174 25.7174C23.9358 27.499 21.5195 28.4999 18.9999 28.4999ZM18.9999 25.3333C20.6796 25.3333 22.2905 24.666 23.4783 23.4783C24.666 22.2905 25.3333 20.6796 25.3333 18.9999C25.3333 17.3202 24.666 15.7093 23.4783 14.5216C22.2905 13.3338 20.6796 12.6666 18.9999 12.6666C17.3202 12.6666 15.7093 13.3338 14.5216 14.5216C13.3338 15.7093 12.6666 17.3202 12.6666 18.9999C12.6666 20.6796 13.3338 22.2905 14.5216 23.4783C15.7093 24.666 17.3202 25.3333 18.9999 25.3333ZM17.4166 1.58325H20.5833V6.33325H17.4166V1.58325ZM17.4166 31.6666H20.5833V36.4166H17.4166V31.6666ZM5.56534 7.80417L7.80417 5.56534L11.1624 8.92359L8.92359 11.1624L5.56534 7.80417ZM26.8374 29.0763L29.0763 26.8374L32.4345 30.1957L30.1957 32.4345L26.8374 29.0763ZM30.1957 5.56375L32.4345 7.80417L29.0763 11.1624L26.8374 8.92359L30.1957 5.56534V5.56375ZM8.92359 26.8374L11.1624 29.0763L7.80417 32.4345L5.56534 30.1957L8.92359 26.8374ZM36.4166 17.4166V20.5833H31.6666V17.4166H36.4166ZM6.33325 17.4166V20.5833H1.58325V17.4166H6.33325Z" fill="#F5F5F5"/></svg>';
    searchField.style.background = 'var(--bg-grey)';
    footerText.style.color = 'var(--main-color)';
    for(let i = 0; i < links.length; i++) {
      links[i].style.color = 'var(--main-color)';
    }
    for(let i = 0; i < authorLink.length; i++) {
      authorLink[i].style.background = 'var(--bg-grey)';
      authorName[i].style.color = 'var(--main-color)';
    }
    logo.setAttribute('src', './img/logoWt.png');
    footer.style.background = 'var(--text-color)';
    header.style.background = 'var(--text-color)';
    localStorage.setItem("isDark", true);
  }
}

searchBtn.addEventListener('click', searchImage);
themeBtn.addEventListener('click', changeTheme);