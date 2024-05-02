const linkBtn = document.querySelector('.link');
const redirectBtn = document.querySelector('.redirect');

class StateManager {
  constructor(initialState = null) {
    this._state = initialState ?? structuredClone(initialState);
  }
  setState(value) {
    this._state = value;
  }
  getState() {
    return this._state;
  }
}
const state = new StateManager();

const redirectHandler = () => location.assign(state.getState());

const linkInputHandler = () => {
  state.setState(prompt('Enter link for redirect', 'http://google.com'));

  if (!state.getState()) {
    redirectBtn.toggleAttribute('disabled');
    return;
  }

  redirectBtn.removeAttribute('disabled');
};

linkBtn.addEventListener('click', linkInputHandler);
redirectBtn.addEventListener('click', redirectHandler);
