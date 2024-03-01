const themeImg = document.getElementById('theme-img');

const previousText = document.getElementById('previous-text');
const currentText = document.getElementById('current-text');
const resultText = document.getElementById('result-text');

const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const zero = document.getElementById('zero');
const doubleZero = document.getElementById('double-zero');
const dot = document.getElementById('dot');

let previousVal = '';
let currentVal = '0';
let resultVal = '0';

previousText.textContent = previousVal;
currentText.textContent = currentVal;
resultText.textContent = resultVal;

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

themeImg.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

one.addEventListener('click', () => {
    
});

two.addEventListener('click', () => {
    
});

three.addEventListener('click', () => {
    
});

four.addEventListener('click', () => {
    
});

five.addEventListener('click', () => {
    
});

six.addEventListener('click', () => {
    
});

seven.addEventListener('click', () => {
    
});

eight.addEventListener('click', () => {
    
});

nine.addEventListener('click', () => {
    
});

zero.addEventListener('click', () => {
    
});

doubleZero.addEventListener('click', () => {
    
});

dot.addEventListener('click', () => {
    
});
