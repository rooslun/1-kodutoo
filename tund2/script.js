window.onload = function(){
    start();
}

let first;
let second;
let button;

function start(){
    first = document.querySelector('#first');
    second = document.querySelector('#second'); /*document.getElementById('second');*/
    button = document.querySelector('#changeColor');
    button.addEventListener('click', changeColor);
    second.addEventListener('mouseover', changeColor);
    window.addEventListener('keypress', changeColor);

}

function changeColor(){
    const r = Math.round(Math.random()*255);
    const g = Math.round(Math.random()*255);
    const b = Math.round(Math.random()*255);
    const r1 = Math.round(Math.random()*255);
    const g1= Math.round(Math.random()*255);
    const b1 = Math.round(Math.random()*255);
    const r2 = Math.round(Math.random()*255);
    const g2= Math.round(Math.random()*255);
    const b2 = Math.round(Math.random()*255);
    const r3 = Math.round(Math.random()*255);
    const g3= Math.round(Math.random()*255);
    const b3 = Math.round(Math.random()*255);
    
    

    first.style.backgroundColor = 'rgb('+ r +','+ g + ',' + b +')';
    second.style.backgroundColor = 'rgb('+ r1 +','+ g1 + ',' + b1 +')';
    third.style.backgroundColor = 'rgb('+ r2 +','+ g2 + ',' + b2 +')';
    fourth.style.backgroundColor = 'rgb('+ r3 +','+ g3 + ',' + b3 +')';
}
/*saab ka nii teha
window.onload = function(){
    start();
}

let first;
let second;
let third;
let fourth;
let button;
let r;
let g;
let b;


function start(){
    first = document.querySelector('#first');
    second = document.querySelector('#second'); //document.getElementById('second');
    third = document.querySelector('#third');
    fourth = document.querySelector('#fourth');
    button = document.querySelector('#changeColor');
    button.addEventListener('click', changeColor);
    second.addEventListener('mouseover', changeColor);
    window.addEventListener('keypress', changeColor);

}

function generateColor(){
    r = Math.round(Math.random()*255);
    g = Math.round(Math.random()*255);
    b = Math.round(Math.random()*255);
}

function changeColor(){
    generateColor();
    first.style.backgroundColor = 'rgb('+ r +','+ g + ',' + b +')';
    generateColor();
    second.style.backgroundColor = 'rgb('+ r +','+ g + ',' + b +')';
    generateColor();
    third.style.backgroundColor = 'rgb('+ r +','+ g + ',' + b +')';
    generateColor();
    fourth.style.backgroundColor = 'rgb('+ r +','+ g + ',' + b +')';
}*/