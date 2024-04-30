const text = document.querySelector('.text');
const btn = document.querySelector('.btn');

const changeColor = () => text.classList.toggle('red');

btn.addEventListener('click', changeColor);
