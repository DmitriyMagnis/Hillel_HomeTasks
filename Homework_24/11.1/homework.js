const wrapper = document.querySelector('.wrapper');

const apendItemInDom = number => {
  const item = document.createElement('div');
  item.className = 'item';
  item.innerText = number;
  wrapper.appendChild(item);
};

const renderMatrix = (size = 10) => {
  for (let i = 1; i <= size; i++) {
    for (let k = 1; k <= size; k++) {
      apendItemInDom(i * k);
    }
  }
};
renderMatrix(10);
