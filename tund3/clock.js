console.log('Fail õigesti ühendatud.');

let changeColorButton;
let changeFontButton, fontChanged;

let d = new Date();
let day = d.getDay();
let date = d.getDate();
let month = d.getMonth();
let year = d.getFullYear();

let days = [
  'Pühapäev',
  'Esmaspäev',
  'Teisipäev',
  'Kolmapäev',
  'Neljapäev',
  'Reede',
  'Laupäev'
];
let months = [
  'Jaanuar',
  'Veebruar',
  'Märts',
  'Aprill',
  'Mai',
  'Juuni',
  'Juuli',
  'August',
  'September',
  'Oktoober',
  'November',
  'Detsember'
];

let timeContainer = document.querySelector('#timeContainer');
let buttonContainer = document.querySelector('#buttonContainer');

let yearContainer = document.querySelector('#year');
let monthName = document.querySelector('#monthName');

yearContainer.innerHTML = year;

window.setInterval(upDateClock, 1000);

window.onload = function() {
  upDateClock();
  changeBackgroundColor();
  changeColorButton = document.querySelector('#change-color');
  changeColorButton.addEventListener(
    'click',
    this.changeBackgroundColor,
    this.changeDivColor
  );

  changeFontButton = document.querySelector('#change-size');
  changeFontButton.addEventListener('click', changeFont);
  fontChanged = 0;

  changeFontSize = document.querySelector('#change-font');
  changeFontSize.addEventListener('click', changeTextSize);
  sizeChanged = 0;
};

function upDateClock() {
  d = new Date();
  let seconds = d.getSeconds();
  let minutes = d.getMinutes();
  let hours = d.getHours();

  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }

  time.innerHTML = hours + ':' + minutes + ':' + seconds;
  this.monthName.innerHTML = date + '.' + ' ' + months[month] + ' ' + days[day];

  //time.innerHTML = d.toLocaleTimeString('et-EE');
  //console.log(d);
}

/* let positions = ['flex-start', 'flex-end', 'center'];

function changePosition() {
  score++;
  scoreContainer.innerHTML = score;
  scoreContainer.style.order = Math.round(Math.random() * 6);
  scoreContainer.style.alignSelf = positions[Math.round(Math.random() * 2)];

  dayContainer.innerHTML = days[day];
  dayContainer.style.order = Math.round(Math.random() * 6);
  dayContainer.style.alignSelf = positions[Math.round(Math.random() * 2)];
  dateContainer.innerHTML = date;
  dateContainer.style.order = Math.round(Math.random() * 6);
  dateContainer.style.alignSelf = positions[Math.round(Math.random() * 2)];
  monthContainer.innerHTML = months[month];
  monthContainer.style.order = Math.round(Math.random() * 6);
  monthContainer.style.alignSelf = positions[Math.round(Math.random() * 2)];
  yearContainer.innerHTML = year;
  yearContainer.style.order = Math.round(Math.random() * 6);
  yearContainer.style.alignSelf = positions[Math.round(Math.random() * 2)];
} */

function changeBackgroundColor() {
  const red = Math.round(Math.random() * 255);
  const green = Math.round(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);
  document.body.style.backgroundColor =
    'rgb(' + red + ',' + green + ',' + blue + ')';
}

function changeYearColor() {
  const red = Math.round(Math.random() * 255);
  const green = Math.round(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);
  this.timeContainer.style.backgroundColor =
    'rgb(' + red + ',' + green + ',' + blue + ')';
}

function changeColor(colorValue) {
  document.body.style.backgroundColor = colorValue;
}

function changeDivColor(colorValue) {
  document.timeContainer.style.backgroundColor = colorValue;
}

function changeFont() {
  console.log('test');
  if (fontChanged == 0) {
    timeContainer.style.fontFamily = 'Arial';
    fontChanged = 1;
  } else {
    timeContainer.style.fontFamily = 'Times New Roman';
    fontChanged = 0;
  }
}

function changeTextSize() {
  console.log('size');
  if (sizeChanged == 0) {
    timeContainer.style.fontSize = 'xx-large';
    sizeChanged = 1;
  } else {
    timeContainer.style.fontSize = 'small';
    sizeChanged = 0;
  }
}
