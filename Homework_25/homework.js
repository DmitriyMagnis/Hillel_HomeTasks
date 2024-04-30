const wrapper = document.querySelector('.wrapper');

const createImgInDom = (src = 1) => {
  const item = document.createElement('img');
  item.className = 'img';
  item.src = `./assets/${src}.jpg`;
  wrapper.appendChild(item);
};

const randomiseNumber = (max = 6) => {
  const random = Math.floor(Math.random() * (max + 1));
  return random || random + 1;
};

const imgNum = randomiseNumber(6);

createImgInDom(imgNum);
