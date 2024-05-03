class Button {
  constructor(options = {}) {
    this._attributes = options;
    this._btn = null;
    this._initButton();
  }
  _initButton() {
    const btn = document.createElement('button');

    Object.keys(this._attributes).forEach(v => {
      if (v === 'textContent') {
        btn.textContent = this._attributes?.textContent ?? 'button';
      } else btn.setAttribute(v, this._attributes[v]);
    });
    this._btn = btn;
  }
  getButton() {
    return this._btn;
  }
}

const appendButtons = (container = 'body', count = 0) => {
  const containerNode = document.querySelector(container);
  const fragment = document.createDocumentFragment();
  let innerCount = 0;

  while (count !== innerCount) {
    const btn = new Button({
      class: 'btn btn-primary btn-lg',
      textContent: 'button ' + (innerCount + 1),
      'data-number': innerCount + 1,
    });

    fragment.appendChild(btn.getButton());

    innerCount++;
  }
  containerNode?.appendChild(fragment);
};

document.addEventListener('click', ({ target: { classList, dataset } }) => {
  if (!classList.contains('btn')) return;

  alert(`Button number: ${dataset.number}`);
});

document.addEventListener('DOMContentLoaded', () =>
  appendButtons('.btn-wrapper', 3)
);
