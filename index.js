const urlGet = 'https://api.unsplash.com/photos/random?count=12&client_id=cfjQldTSsWJ5i8w9VNXxStC27VFyHzLWDfFVwVqKvLE';
const imgContainer = document.querySelectorAll('div.image');
/*const xhr = new XMLHttpRequest();
xhr.open('GET', urlGet);
xhr.send();
xhr.addEventListener('load', () => {
  if (xhr.status === 200) {
    let data = JSON.parse(xhr.response);
    console.log(data);
  }
});
*/
async function getData() {
  const res = await fetch(urlGet);
  const data = await res.json();
  showData(data);
  console.log(data);
}

function showData(data) {
  for(let i = 0; i < imgContainer.length; i++) {
    imgContainer[i].style.backgroundImage = `url(${data[i].urls.small_s3})`;
  }
}

getData();