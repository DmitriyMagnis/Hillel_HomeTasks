const validate = (pattern, value) => new RegExp(pattern).test(value);
class MyFormEvents {
  onBlurEvent({ target }) {
    const pattern = target.getAttribute('validator');

    if (!pattern) return;

    const isValidated = validate(pattern, target.value);

    this.handleErrorEvent(isValidated, target);
  }
  submitForm(e) {
    e.preventDefault();

    const inputs = Array.from(e.target.elements).filter(({ value }) => value); // exclude button
    let isAllInputsValid = true;
    inputs.forEach(el => {
      const pattern = el.getAttribute('validator');
      if (!pattern) return;

      const isValid = validate(pattern, el.value);
      this.handleErrorEvent(isValid, el);
      //need to prevent updating isAllInputsValid from further validation
      isAllInputsValid = !isAllInputsValid ? isAllInputsValid : isValid;
    });

    if (isAllInputsValid) {
      const showResultInTable = inputs.reduce(
        (table, { name, value }) => ({ ...table, [name]: value }),
        {}
      );
      console.log(showResultInTable);
      e.target.reset();
    }
  }
  handleErrorEvent(isValidated, { parentNode }) {
    if (!isValidated) {
      parentNode.classList.add('error');
      parentNode.setAttribute('data-error-msg', 'Wrong Input');
    } else {
      parentNode.classList.remove('error');
      parentNode.removeAttribute('data-error-msg');
    }
  }
}

class ElementConstructor extends MyFormEvents {
  _enumsInputTypes = ['input', 'textarea'];
  createFabricEl({ type = 'div', attr, content, validator }) {
    const _el = document.createElement(type);
    if (content) _el.textContent = content;

    if (validator) {
      _el.setAttribute('validator', validator);
      _el.addEventListener('blur', this.onBlurEvent.bind(this));
    }

    if (type === 'form') {
      _el.addEventListener('submit', this.submitForm.bind(this));
    }

    if (attr) {
      Object.entries(attr).forEach(([key, value]) => {
        _el.setAttribute(key, value);
      });
    }

    const isWithWrapper = this._enumsInputTypes.includes(type)
      ? this.createWrapper(_el)
      : _el;

    return isWithWrapper;
  }

  createWrapper(element) {
    const el = this.createFabricEl({
      attr: {
        class: 'form_input-wraper',
      },
    });

    el.insertAdjacentElement('afterbegin', element);
    return el;
  }
}

class MyForm extends ElementConstructor {
  constructor(root = 'body', inputsData) {
    super();
    this._root = root;
    this._inputsData = inputsData;
  }
  init() {
    const container = document.querySelector(this._root);
    container.insertAdjacentElement('afterbegin', this.createForm());
  }
  createForm() {
    const form = this.createFabricEl({
      type: 'form',
      attr: {
        class: 'form',
      },
    });
    const fragment = new DocumentFragment();

    this._inputsData.forEach(data => {
      const el = this.createFabricEl(data);

      fragment.append(el);
    });

    form.appendChild(fragment);

    return form;
  }
}
new MyForm('.wrapper', [
  {
    type: 'h3',
    content: 'We would like to help you',
    attr: { class: 'form_head' },
  },
  {
    type: 'input',
    attr: {
      name: 'Name',
      type: 'text',
      placeHolder: 'Name',
      class: 'form_input-name form-control',
      tabIndex: '1',
    },
    //where to store patterns? or how to make relations beetween them when submiting?
    // validator: val => /^\w{1,15}$/.test(val),
    validator: '^[a-zA-Z0-9_.-\\s]{5,30}$',
  },
  {
    type: 'textarea',
    attr: {
      name: 'Message',
      type: 'text',
      placeHolder: 'Message',
      class: 'form_input-area form-control',
      tabIndex: '2',
      rows: '4',
    },
    validator: '^[a-zA-Z0-9_.-\\s]{1,50}$',
  },
  {
    type: 'h5',
    content: 'How to Answer You?',
    attr: { class: 'form_contact text-body-secondary' },
  },
  {
    type: 'input',
    attr: {
      name: 'Phone',
      type: 'tel',
      placeHolder: 'Phone Number',
      class: 'form_input-tel form-control',
      tabIndex: '3',
    },
    validator: '(?:([0-9]{3})\\)?([ .-]?)([0-9]{3})\\2([0-9]{4}))',
  },
  {
    type: 'input',
    attr: {
      name: 'Email',
      type: 'email',
      placeHolder: 'Email',
      class: 'form_input-email form-control',
      tabIndex: '4',
    },
    validator: '^\\w{1,30}@\\w{2,20}(.[\\w{2,20}])?.[a-zA-Z]{2,6}$',
  },
  {
    type: 'button',
    content: 'Send message',
    attr: {
      type: 'submit',
      class: 'form_input-btn btn btn-primary',
      tabIndex: '5',
    },
  },
]).init();
