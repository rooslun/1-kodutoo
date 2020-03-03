console.log('Fail õigesti ühendatud.');

let d = new Date();
let score = 0;
let day = d.getDay();
let date = d.getDate();
let month = d.getMonth();
let year = d.getFullYear();
let days = ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev'];
let months = ['Jaanuar', 'Veebruar'];

let time = document.querySelector('#time');
let dayContainer = document.querySelector('#weekday');
let dateContainer = document.querySelector('#date');
let monthContainer = document.querySelector('#month');
let yearContainer = document.querySelector('#year');
let scoreContainer = document.querySelector('#score');

scoreContainer.addEventListener('mouseover', changePosition);

upDateClock();




window.setInterval(upDateClock, 1000);

function upDateClock(){
    d = new Date();
    let seconds = d.getSeconds();
    let minutes = d.getMinutes();
    let hours = d.getHours();
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(hours < 10){
        hours = "0" + hours;
    }
    time.innerHTML = hours + ':' + minutes + ':' + seconds;
    //time.innerHTML = d.toLocaleTimeString('et-EE');
    //console.log(d);
}

let positions = ['flex-start', 'flex-end', 'center'];

function changePosition(){
    score++;
    scoreContainer.innerHTML = score;
    scoreContainer.style.order = Math.round(Math.random()*6)
    scoreContainer.style.alignSelf = positions[Math.round(Math.random()*2)]

    dayContainer.innerHTML = days[day];
    dayContainer.style.order = Math.round(Math.random()*6)
    dayContainer.style.alignSelf = positions[Math.round(Math.random()*2)]
    dateContainer.innerHTML = date;
    dateContainer.style.order = Math.round(Math.random()*6)
    dateContainer.style.alignSelf = positions[Math.round(Math.random()*2)]
    monthContainer.innerHTML = months[month];
    monthContainer.style.order = Math.round(Math.random()*6)
    monthContainer.style.alignSelf = positions[Math.round(Math.random()*2)]
    yearContainer.innerHTML = year;
    yearContainer.style.order = Math.round(Math.random()*6)
    yearContainer.style.alignSelf = positions[Math.round(Math.random()*2)]
}