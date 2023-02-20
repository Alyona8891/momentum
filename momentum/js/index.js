const time = document.querySelector('.time');
const dateOfDay = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const body = document.body;
let randomNum;

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  setTimeout(showTime, 1000);
}
function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-US', options);
  dateOfDay.textContent = currentDate;
  setTimeout(showDate, 1000);
}
showTime();
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 6) {
    return 'night';
  } else if (hours < 12) {
    return 'morning';
  } else if (hours < 18) {
    return 'afternoon'
  } else {
    return 'evening';
  }
  setTimeout(getTimeOfDay, 1000);
} 
const timeOfDay = getTimeOfDay()
greeting.textContent = `Good ${timeOfDay},`;
const input = document.querySelector('.name');
input.placeholder = '[Enter name]';
function setLocalStorage() {
  localStorage.setItem('name', input.value);
}
window.addEventListener('beforeunload', setLocalStorage);
function getLocalStorage() {
  if(localStorage.getItem('name')) {
    input.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomNum = getRandomNum(1, 20)
function setBg() {
  
  let timeOfDay = getTimeOfDay(); 
  let bgNum =  randomNum.toString().padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {      
    document.body.style.backgroundImage = `url(${img.src})`;
  }; 
}
setBg();

function getSlideNext() {
  if (+randomNum !== 20) {
      randomNum = [+randomNum + 1].toString().padStart(2, '0');
  } else if (+randomNum === 20) {
      randomNum = '01';
  }
  setBg();
}
function getSlidePrev() {
  if (+randomNum !== 1) {
      randomNum = [+randomNum - 1].toString().padStart(2, '0');
  } else  {
      randomNum = '01';
  }
  setBg();
}
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=en&appid=f1f0ffc7b20c762f305783914b9deb7f&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  setTimeout(getWeather, 1000);
}
getWeather()
city.value = 'Minsk';
city.addEventListener('change', async function getWeatherNew() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=f1f0ffc7b20c762f305783914b9deb7f&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
});
function setLocalStorageCity() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageCity);
function getLocalStorageCity() {
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getLocalStorageCity);
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
async function getQuotes() {  
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  let num = getRandomNum(0, 2)
  quote.textContent = data[num].text;
  author.textContent = data[num].author;
}
getQuotes();

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes);


const play = document.querySelector('.play');
let isPlay = false;
const btnPlayNext = document.querySelector('.play-next');
const btnPlayPrev = document.querySelector('.play-prev');
const audio = new Audio();
let playNum = 0;
function playAudio() {
  if(!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    liMusic[playNum].classList.add('item-active')
  } else {
    audio.pause();
    isPlay = false;
    liMusic[playNum].classList.remove('item-active')
  }
}
function playAudioNew() {
 
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    if (isPlay) {
      play.classList.add('pause');
    }
 

  
}
function toggleBtn() {
  play.classList.toggle('pause');
}
play.addEventListener('click', playAudio);
play.addEventListener('click',toggleBtn)
function playNext() {
  if (playNum === playList.length-1) {
    liMusic[playNum].classList.remove('item-active')
    playNum = 0;
    playAudioNew()
    liMusic[playNum].classList.add('item-active')

} else  {
  liMusic[playNum].classList.remove('item-active')
  playNum = playNum + 1;
  playAudioNew()
  liMusic[playNum].classList.add('item-active')
}

}
audio.addEventListener('ended', playNext);
function playPrev() {
  if (playNum === 0) {
    liMusic[playNum].classList.remove('item-active')
    playNum = playList.length-1;
    playAudioNew()
    liMusic[playNum].classList.add('item-active')

} else  {
  liMusic[playNum].classList.remove('item-active')
  playNum = playNum - 1;
  playAudioNew()
  liMusic[playNum].classList.add('item-active')

}
}
import playList from './playList.js';
console.log(playList);
btnPlayNext.addEventListener('click', playNext);
btnPlayPrev.addEventListener('click', playPrev);

for(let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = playList[i].title;
  const playListContainer = document.querySelector('.play-list');
  playListContainer.append(li)
}
const liMusic = document.querySelectorAll('.play-item');