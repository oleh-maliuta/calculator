const themeImg = document.getElementById('theme-img');

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

let previous = '';
let current = '';
let result = '';

themeImg.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
    } else {
        document.body.classList.add('dark');
    }
});
