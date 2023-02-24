const time = document.querySelector('.time');
const dateOfDay = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const body = document.body;
let randomNum;
const unsplashTag = document.querySelector('.unsplashTag');
unsplashTag.placeholder = 'enter tag'
const flickrTag = document.querySelector('.flickrTag');
flickrTag.placeholder = 'enter tag';

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  
  setTimeout(showTime, 1000);
}
function showDate(lang = 'en') {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString(`${lang}`, options);
  dateOfDay.textContent = currentDate;
  
}
showTime();
showDate();
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
  img.src = `https://raw.githubusercontent.com/Alyona8891/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {      
    document.body.style.backgroundImage = `url(${img.src})`;
  }; 
  
  unsplashTag.classList.remove('unsplashTagVis');
  flickrTag.classList.remove('flickrTagVis');
}

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
  } else if (+randomNum === 1){ 
      randomNum = '20';
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
const weatherError = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const descriptionContainer =  document.querySelector('.description-container');
async function getWeather(lang = 'en', windSpeed = 'Wind speed: ', mS = 'm/s', humidityLevel = 'Humidity: ') {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=${lang}&appid=f1f0ffc7b20c762f305783914b9deb7f&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `${windSpeed}${Math.floor(data.wind.speed)}${mS}`;
  humidity.textContent = `${humidityLevel}${Math.floor(data.main.humidity)}%`;
}
getWeather()
city.value = 'Minsk';
city.addEventListener('change', async function getWeatherNew() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=f1f0ffc7b20c762f305783914b9deb7f&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  if(data.cod === '404'){
    weatherError.textContent = `Error! city not found for "${city.value}"! Try again!`;
    descriptionContainer.classList.add('unvis');
    weatherError.classList.remove('unvis');
    city.value = '';
   } else {
    weatherError.classList.add('unvis');

  descriptionContainer.classList.remove('unvis');
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
   }
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
async function getQuotesEn() {  
  const quotes = `dataen.json`;
  const res = await fetch(quotes);
  const data = await res.json(); 
  let num = getRandomNum(0, 10)
  quote.textContent = data[num].text;
  author.textContent = data[num].author;
}
async function getQuotesRu() {  
  const quotes = `dataru.json`;
  const res = await fetch(quotes);
  const data = await res.json(); 
  let num = getRandomNum(0, 10)
  quote.textContent = data[num].text;
  author.textContent = data[num].author;
 
  
}


const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', function () {
  if(localStorage.getItem('language') === 'ru') {
    getQuotesRu();
  } else {
    getQuotesEn();
  }
});


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
    let audioPlay  = setInterval (function() {
      let audioTime = Math.round(audio.currentTime);
      let audioLength = Math.round(audio.duration);
      progress.style.width = (audioTime * 100) / audioLength + '%';
      currentTimes.innerHTML = videoTime(audio.currentTime);
      lengthTime.innerHTML = playList[playNum].duration;
     

    }
    
    )
    nameTreck.innerHTML=playList[playNum].title
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
    nameTreck.innerHTML=playList[playNum].title;
    if (isPlay) {
      play.classList.add('pause');
    }
}
function toggleBtn() {
  play.classList.toggle('pause');
}
let nameTreck = document.querySelector('.name-treck')
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

const timeLine = document.querySelector('.timeline');
const progress = document.querySelector('.progress');
function videoTime(time) {
  time = Math.floor(time);
  let minutes = Math.floor(time/60);
  let seconds = Math.floor(time - minutes * 60);
  let minutesVal = minutes;
  let secondsVal = seconds;
  if(minutes < 10) {
    minutesVal = '0' + minutes;
  }
  if(seconds < 10) {
    secondsVal = '0' + seconds;
  }
  return minutesVal + ':' + secondsVal;
}
let currentTimes = document.querySelector('.current')
let lengthTime = document.querySelector('.length')
/*function videoChangeTime (e) {
  let mouseX = Math.floor(e.pageX - progress.offsetLeft);
  let progressX = mouseX / (progress.offseWidth / 100);
  audio.currentTime = audio.duration * (progressX / 100)
}*/

timeLine.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeLine).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

const volumeSlider = document.querySelector(".volume-slider");
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  document.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
}, false)
document.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = document.querySelector(".volume-container .volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});
let playLists = document.querySelectorAll('.play-item');
const greetingTranslation = {
  'ru': [
    ['Доброй ночи,', 'Доброе утро,', 'Добрый день,', 'Добрый вечер,']
  ],
  'en': [
    ['Good night,', 'Good morning,', 'Good afternoon,', 'Good evening,']
  ]
}
function showGreeting (lang = 'en') {
  function getIndex() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 6) {
    return 0;
  } else if (hours < 12) {
    return 1;
  } else if (hours < 18) {
    return 2;
  } else {
    return 3;
  }}
  greeting.textContent = `${greetingTranslation[lang][0][getIndex()]}`;
}
const en = document.querySelector('#english');
en.checked = true;
en.addEventListener('input', changeLangEn);
function changeLangEn() {
   showGreeting('en');
   input.placeholder = '[Enter name]';
   showDate('en');
   getWeather('en')
   getQuotesEn();
   configTitle.textContent = 'Settings';
   languageSubtitle.textContent = 'Language';
   sourceSubtitle.textContent = 'Images source';
   localStorage.setItem('language', 'en');
   unsplashTag.placeholder = 'enter tag';
   flickrTag.placeholder = 'enter tag';
   blocksSubtitle.textContent = 'Visible blocks';
   lbweather.textContent = 'Weather';
   lbtime.textContent = 'Time';
   lbdate.textContent = 'Date';
   lbgreeting.textContent = 'Greeting';
   lbquote.textContent = 'Quote';
   lbplayer.textContent = 'Player';
   lblinks.textContent = 'Links';
}

const ru = document.querySelector('#russian');
ru.addEventListener('input', changeLangRu);
function changeLangRu() {
  input.placeholder = '[Введите имя]';
  showDate('ru');
  showGreeting('ru');
  getWeather('ru', 'Скорость ветра: ', ' м/сек', 'Влажность: ');
  getQuotesRu();
  wind.textContent = 
  configTitle.textContent = 'Настройки'
  languageSubtitle.textContent = 'Язык'
  changeQuote.addEventListener('click', getQuotesRu);
  sourceSubtitle.textContent = 'Источник изображений';
  localStorage.setItem('language', 'ru');
  unsplashTag.placeholder = 'введите тэг'
  flickrTag.placeholder = 'введите тэг';
  blocksSubtitle.textContent = 'Видимые блоки';
  lbweather.textContent = 'Погода';
  lbtime.textContent = 'Время';
   lbdate.textContent = 'Дата';
   lbgreeting.textContent = 'Приветствие';
   lbquote.textContent = 'Цитата';
   lbplayer.textContent = 'Аудиоплеер';
   lblinks.textContent = 'Ссылки';
}
const gitHab = document.querySelector('#gitt');
const unsplash = document.querySelector('#unsplash');
const flickr = document.querySelector('#flickr');

async function getLinkToImageSpl() {
  let url ='';
  if(unsplashTag.value) {
   url = `https://api.unsplash.com/photos/random?query=${unsplashTag.value}&orientation=landscape&client_id=CXo5cbGaWVJ5fK_Jh3R3ZVj3b6-T7eksWJFoRHK8SgE`;
  } else {
    url = `https://api.unsplash.com/photos/random?query=${getTimeOfDay()}&orientation=landscape&client_id=CXo5cbGaWVJ5fK_Jh3R3ZVj3b6-T7eksWJFoRHK8SgE`
  }
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src  = data.urls.regular;
  img.onload = () => {      
    document.body.style.backgroundImage = `url(${img.src})`;
  }; 
  flickrTag.classList.remove('flickrTagVis');
  unsplashTag.classList.add('unsplashTagVis');
  localStorage.setItem('unsplash', 'true')
  localStorage.setItem('flickr', 'false')
  localStorage.setItem('github', 'false')
}
async function getLinkToImageGh() {
  let timeOfDay = getTimeOfDay(); 
  let bgNum =  randomNum.toString().padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Alyona8891/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {      
    document.body.style.backgroundImage = `url(${img.src})`;
  }; 
  unsplashTag.classList.remove('unsplashTagVis');
  flickrTag.classList.remove('flickrTagVis');
 
  localStorage.setItem('unsplash', 'false')
  localStorage.setItem('flickr', 'false')
  localStorage.setItem('github', 'true')
}

async function getLinkToImageFl() {
  let urlFl = '';
  if(flickrTag.value) {
  urlFl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ad685f0cac8ced2f05f740e8e8c48afd&tags=${flickrTag.value}&extras=url_l&format=json&nojsoncallback=1`;
  } else {
    urlFl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ad685f0cac8ced2f05f740e8e8c48afd&tags=${getTimeOfDay()}&extras=url_l&format=json&nojsoncallback=1`
  }
  const res = await fetch(urlFl);
  const data = await res.json();
  let num = getRandomNum(0, 100)
  const img = new Image();
  img.src  = data.photos.photo[`${num}`].url_l;
  img.onload = () => {      
    document.body.style.backgroundImage = `url(${img.src})`;
  }; 
  flickrTag.classList.add('flickrTagVis');
  unsplashTag.classList.remove('unsplashTagVis');
  localStorage.setItem('flickr', 'true')
  localStorage.setItem('unsplash', 'false')
  localStorage.setItem('github', 'false')
}
unsplash.addEventListener('input', getLinkToImageSpl)
gitHab.addEventListener('input', getLinkToImageGh)
flickr.addEventListener('input', getLinkToImageFl)


const config = document.querySelector('.config');
config.addEventListener('click', configHandler);
const configContainer = document.querySelector('.config__container')
function configHandler(e) {
  configContainer.classList.toggle('visible');
    
}
const configClose = document.querySelector('.config__close');
configClose.addEventListener('click', configHandler);
const configTitle = document.querySelector('.config__title')
configTitle.textContent = 'Settings';
const languageSubtitle = document.querySelector('.language__subtitle')
languageSubtitle.textContent = 'Language'
function getLocalLang() {
  if(localStorage.getItem('language') === 'en') {
    en.checked = true;
    changeLangEn();
  } else if (localStorage.getItem('language') === 'ru') {
    ru.checked = true;
    changeLangRu()
  }
}
function getLocalSource() {
  if(localStorage.getItem('unsplash') === 'true') {
    unsplash.checked = true;
    unsplashTag.classList.add('unsplashTagVis');
    getLinkToImageSpl()
  } else if (localStorage.getItem('flickr')  === 'true') {
    flickr.checked = true;
    flickrTag.classList.add('flickrTagVis');
    getLinkToImageFl()
  } else if (localStorage.getItem('github')  === 'true') {
    gitHab.checked = true;
    setBg();
  }
}
function setLocalTag() {
  localStorage.setItem('TegUnspl', unsplashTag.value);
  localStorage.setItem('TegFlickr', flickrTag.value);
}
window.addEventListener('beforeunload', setLocalTag);
function getLocalTeg() {
  if(localStorage.getItem('TegUnspl')) {
    unsplashTag.value = localStorage.getItem('TegUnspl');
  } else if (localStorage.getItem('TegFlickr')) {
    flickrTag.value = localStorage.getItem('TegFlickr');
  } 
  
}
window.addEventListener('load', getLocalTeg);
window.addEventListener('load', getLocalLang);
window.addEventListener('load', getLocalSource);
const sourceSubtitle = document.querySelector('.source-image__subtitle');
sourceSubtitle.textContent = 'Images source';
const blocksSubtitle = document.querySelector('.blocks__subtitle');
blocksSubtitle.textContent = 'Visible blocks';
const weatherBlock = document.querySelector('.weather');

const playerBlock = document.querySelector('.player');
const dateBlock = document.querySelector('.date');
const timeBlock = document.querySelector('.time');
const quoteBlock = document.querySelector('.quote-container');
const greetingBlock = document.querySelector('.greeting-container');
const linksBlock = document.querySelector('.links');
const chweather = document.querySelector('#chweather');
const lbweather = document.querySelector('#lbweather');
lbweather.textContent = 'Weather';
const chtime = document.querySelector('#chtime');
const lbtime = document.querySelector('#lbtime');
lbtime.textContent = 'Time';
const chdate = document.querySelector('#chdate');
const lbdate = document.querySelector('#lbdate');
lbdate.textContent = 'Date';
const chgreeting = document.querySelector('#chgreeting');
const lbgreeting = document.querySelector('#lbgreeting');
lbgreeting.textContent = 'Greeting';
const chquote = document.querySelector('#chquote');
const lbquote = document.querySelector('#lbquote');
lbquote.textContent = 'Quote';
const chplayer = document.querySelector('#chplayer');
const lbplayer = document.querySelector('#lbplayer');
lbplayer.textContent = 'Player';
const chlinks = document.querySelector('#chlinks');
const lblinks = document.querySelector('#lblinks');
lblinks.textContent = 'Links';

 


function getLocalCh() {
  if(localStorage.getItem('WeatherBlock') === 'false') {
    chweather.checked = false;
    weatherBlock.classList.toggle('unvisBlock');
  } else {
    localStorage.getItem('WeatherBlock', 'true');
    chweather.checked = true;
  }
  if(localStorage.getItem('TimeBlock') === 'false') {
    chtime.checked = false;
    timeBlock.classList.toggle('unvisBlock');
  } else  {
    localStorage.getItem('TimeBlock', 'true');
    chtime.checked = true;
  }
  if(localStorage.getItem('DateBlock') === 'false') {
    chdate.checked = false;
    dateBlock.classList.toggle('unvisBlock');
  } else {
    chdate.checked = true;
  }
  if(localStorage.getItem('GreetingBlock') === 'false') {
    chgreeting.checked = false;
    greetingBlock.classList.toggle('unvisBlock');
  } else {
    chgreeting.checked = true;
  }
  if(localStorage.getItem('QuoteBlock') === 'false') {
    chquote.checked = false;
    quoteBlock.classList.toggle('unvisBlock');
  } else {
    chquote.checked = true;
  }
  if(localStorage.getItem('PlayerBlock') === 'false') {
    chplayer.checked = false;
    playerBlock.classList.toggle('unvisBlock');
  } else {
    chplayer.checked = true;
  }
  if(localStorage.getItem('LinksBlock') === 'false') {
    chlinks.checked = false;
    linksBlock.classList.toggle('unvisBlock');
  } else {
    chlinks.checked = true;
  }
}
window.addEventListener('load', getLocalCh);
chweather.addEventListener('input', function () {
  weatherBlock.classList.toggle('unvisBlock');
  if(localStorage.getItem('WeatherBlock') === 'false') {
    localStorage.setItem('WeatherBlock', 'true');
  } else {
    localStorage.setItem('WeatherBlock', 'false');
  }
})
chtime.addEventListener('input', function () {
  timeBlock.classList.toggle('unvisBlock');
  if(localStorage.getItem('TimeBlock') === 'false') {
    localStorage.setItem('TimeBlock', 'true');
  } else {
    localStorage.setItem('TimeBlock', 'false');
  }
  
})
chdate.addEventListener('change', function () {
  dateBlock.classList.toggle('unvisBlock');
  if(localStorage.getItem('DateBlock') === 'false') {
    localStorage.setItem('DateBlock', 'true');
  } else {
    localStorage.setItem('DateBlock', 'false');
  }
  
})
chgreeting.addEventListener('input', function () {
  greetingBlock.classList.toggle('unvisBlock');
  if(localStorage.getItem('GreetingBlock') === 'false') {
    localStorage.setItem('GreetingBlock', 'true');
  } else {
    localStorage.setItem('GreetingBlock', 'false');
  }
  
})
chquote.addEventListener('input', function () {
  quoteBlock.classList.toggle('unvisBlock');
  if(localStorage.getItem('QuoteBlock') === 'false') {
    localStorage.setItem('QuoteBlock', 'true');
  } else {
    localStorage.setItem('QuoteBlock', 'false');
  }
})
chplayer.addEventListener('input', function () {
  playerBlock.classList.toggle('unvisBlock');
  if(localStorage.getItem('PlayerBlock') === 'false') {
    localStorage.setItem('PlayerBlock', 'true');
  } else {
    localStorage.setItem('PlayerBlock', 'false');
  }
  
})
chlinks.addEventListener('input', function () {
  linksBlock.classList.toggle('unvisBlock');
  if(localStorage.getItem('LinksBlock') === 'false') {
    localStorage.setItem('LinksBlock', 'true');
  } else {
    localStorage.setItem('LinksBlock', 'false');
  }
})
/*--------------links----*/
/*const addMessage = document.querySelector('.message');
const addButton = document.querySelector('.add');
const todo =  document.querySelector('.todo');
let linkList = [];
if(localStorage.getItem('todo')) {
  linkList = JSON.parse(localStorage.getItem('todo'));
  displayLinks();
}
addButton.addEventListener('click', function () {
  let newLink = {
    link: addMessage.value
  }
  linkList.push(newLink);
  displayLinks();
  localStorage.setItem('todo', JSON.stringify(linkList));
  addMessage.value = '';
})

function displayLinks() {
  let displayMessage = '';
  linkList.forEach(function (item, index) {
    displayMessage += `
    <li class='li'>
    <a id='link__${index}'>${item.link}</a>
    <span onclick="deleteItem()">x</span>
    </li>`;
    todo.innerHTML=displayMessage;
    
  });
  
}
function deleteItem(index) {
  linkList = JSON.parse(localStorage.getItem('todo'));
  linkList.splice(index, 1);
  localStorage.setItem('todo', JSON.stringify(linkList));
  displayLinks();
}*/
const linksBtn = document.querySelector('.links__btn');

linksBtn.addEventListener('click', () => {
  linksBlock.classList.toggle('links__block_vis');
})
const addLinksBtn = document.querySelector('.addLink');
const addLinksBlock = document.querySelector('.links__add-block');
addLinksBtn.addEventListener('click', () => {
  addLinksBlock.classList.toggle('links__block_vis');
})
const arrow = document.querySelector('.arrow');
arrow.addEventListener('click', () => {
  addLinksBlock.classList.remove('links__block_vis');
})
const linksClose = document.querySelector('.links__close');
linksClose.addEventListener('click', () => {
  linksBlock.classList.toggle('links__block_vis');
})
