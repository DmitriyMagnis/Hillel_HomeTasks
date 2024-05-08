class Model {
  constructor(initialState = null) {
    this._state = initialState;
  }
  setState(value) {
    this._state = value;
  }
  getState() {
    return this._state;
  }
}

class PureEventEmmitter {
  constructor() {
    this._listeners = {};
  }
  subscribeMeTo(event, handler) {
    if (this._listeners[event]) this._listeners[event].push(handler);
    else this._listeners[event] = [handler];
  }
  emitt(event, data) {
    if (!this._listeners[event]) return;

    this._listeners[event].forEach(callback => callback(data));
  }
}

class View extends PureEventEmmitter {
  constructor() {
    super();
    this._linkBtn = document.querySelector('.link');
    this._redirectBtn = document.querySelector('.redirect');

    this._linkBtn.addEventListener('click', this.linkClick.bind(this));
    this._redirectBtn.addEventListener('click', this.redirectClick.bind(this));
  }
  linkClick(data) {
    this.emitt('addLink', data);
  }
  redirectClick(data) {
    this.emitt('rediurectTo', data);
  }
  enableRedirectBtn() {
    this._redirectBtn.toggleAttribute('disabled');
  }
  disableRedirectBtn() {
    this._redirectBtn.removeAttribute('disabled');
  }
}

class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
    this._view.subscribeMeTo('addLink', this.linkHandler.bind(this));
    this._view.subscribeMeTo('rediurectTo', this.redirectHandler.bind(this));
  }
  linkHandler() {
    this._model.setState(
      prompt('Enter link for redirect', 'http://google.com')
    );

    if (!this._model.getState()) {
      this._view.enableRedirectBtn();
      return;
    }

    this._view.disableRedirectBtn();
  }
  redirectHandler() {
    location.assign(this._model.getState());
  }
}

const model = new Model();
const view = new View();
const controller = new Controller(model, view);
