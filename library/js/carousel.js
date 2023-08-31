const sliderItem = Array.from(document.getElementsByClassName('slider__image'));
const sliderDot = document.getElementsByClassName('slider-nav__dot');
const arrRight = document.getElementById('right');
const arrLeft = document.getElementById('left');
const dots = Array.from(sliderDot);
let itemWidth = sliderItem[0].offsetWidth;

window.addEventListener(`resize`, event => {
  const windowInnerWidth = document.documentElement.clientWidth;

  if(windowInnerWidth > 1023) {
    dots.forEach(e => e.className = 'slider-nav__dot');
    dots[0].className = 'slider-nav__dot active';
    console.log(itemWidth);

    sliderItem.forEach((el) => el.style.transform = `translate(0)`);
  }
}, false);

function DotsSwiper() {

  if(this.className.includes('active')) {
    return;
  } else {
    dots.forEach(e => e.className = 'slider-nav__dot');
    this.className = 'slider-nav__dot active';

    const e = dots.findIndex((e) => e.className.includes('active'));
    sliderItem.forEach((el) => el.style.transform = `translate(-${itemWidth * e}px)`);
  }
}

function Left() {
  let item = dots.findIndex((e) => e.className.includes('active'));

  if(dots[0].className.includes('active')) {
    arrLeft.className = 'disable';
  } else {
    item -= 1;
      dots.forEach(e => e.className = 'slider-nav__dot');
      dots[item].className = 'slider-nav__dot active';

      sliderItem.forEach((el) => el.style.transform = `translate(-${itemWidth * item}px)`);
  }
}

function Right() {
  let item = dots.findIndex((e) => e.className.includes('active'));

  if(dots[4].className.includes('active')) {
    arrRight.className = 'disable';
  } else {
      item += 1;
      dots.forEach(e => e.className = 'slider-nav__dot');
      dots[item].className = 'slider-nav__dot active';

      sliderItem.forEach((el) => el.style.transform = `translate(-${itemWidth * item}px)`);
  }
}

arrLeft.addEventListener( "click" , Left);
arrRight.addEventListener( "click" , Right);

for (let i = 0; i < sliderDot.length; i++) {
  sliderDot[i].addEventListener( "click" , DotsSwiper);
}