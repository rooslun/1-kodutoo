console.log('Fail õigesti ühendatud.');

let changeColorButton;
let changeFontButton, fontChanged;

@ -45,20 +43,7 @@ window.setInterval(upDateClock, 1000);

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
@ -62,28 +23,10 @@ window.onload = function() {
  sizeChanged = 0;
};

@ -85,70 +70,5 @@ function upDateClock() {
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
/* let positions = ['flex-start', 'flex-end', 'center'];