const _INPUTENUMTYPES = ['input', 'textarea', 'text', 'tel', 'email'];

const createEl = ({ type = 'div', attr, content }) => {
  const _el = document.createElement(type);
  if (content) _el.textContent = content;

  if (attr) {
    Object.entries(attr).forEach(([key, value]) => {
      _el.setAttribute(key, value);
    });
  }

  return _el;
};

class ValidationHandler {
  validate(pattern, value) {
    return new RegExp(pattern).test(value);
  }
  validateSingleField(target) {
    const pattern = target.getAttribute('patterns');
    const isValid = this.validate(pattern, target.value);

    if (!isValid) target.parentNode.classList.add('error');
    else target.parentNode.classList.remove('error');
    return isValid;
  }
  validateAllFields() {
    let isSubmited = true;
    this._inputNodes.forEach(item => {
      const isValidField = this.validateSingleField(item);
      if (isSubmited) {
        isSubmited = isValidField;
      }
    });
    return isSubmited;
  }
}
class MyForm extends ValidationHandler {
  constructor(root = 'body', inputsData) {
    super();
    this._root = root;
    this._inputsData = inputsData;
    this._inputNodes = [];
  }
  init() {
    const container = document.querySelector(this._root);
    const form = this.createForm();
    this.setFormInputNodes(form);
    this.createListeners(form);
    container.insertAdjacentElement('afterbegin', form);
  }
  createFormInput(data) {
    const item = createEl(data);
    const wrapper = createEl({ attr: { class: 'form_input-wraper' } });
    if (data.validator) {
      //need for css attr() function
      wrapper.setAttribute('error-message', data.validator.errorMsg);
      item.setAttribute('patterns', data.validator.patterns);
    }
    wrapper.insertAdjacentElement('afterbegin', item);
    return wrapper;
  }
  onBlur(e) {
    const isValid = this.validateSingleField(e.target);
    //console.log(isValid);
  }
  onSubmit(e) {
    e.preventDefault();
    const isSubmited = this.validateAllFields();
    if (isSubmited) {
      const result = this._inputNodes.reduce(
        (table, { name, value }) => ({ ...table, [name]: value }),
        {}
      );
      console.dir({ result });
    }
  }
  createListeners(form) {
    this.getFormInputNodes().forEach(item => {
      item.addEventListener('blur', this.onBlur.bind(this));
    });
    form.addEventListener('submit', this.onSubmit.bind(this));
  }
  setFormInputNodes(form) {
    const nodesToArray = Array.from(form.elements).filter(
      ({ nodeName }) => nodeName !== 'BUTTON'
    );
    this._inputNodes = nodesToArray;
  }
  getFormInputNodes() {
    return this._inputNodes;
  }
  createForm() {
    const form = createEl({
      type: 'form',
      attr: {
        class: 'form',
      },
    });
    const fragment = new DocumentFragment();
    this._inputsData.forEach(data => {
      const formItem = _INPUTENUMTYPES.includes(data.type)
        ? this.createFormInput(data)
        : createEl(data);

      fragment.append(formItem);
    });

    form.appendChild(fragment);

    return form;
  }
}
const a = new MyForm('.wrapper', [
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
    validator: {
      patterns: '^[a-zA-Z0-9_.-\\s]{5,30}$',
      errorMsg: 'Invalid Name',
    },
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
    validator: {
      patterns: '^[a-zA-Z0-9_.-\\s]{1,50}$',
      errorMsg: 'Invalid input length',
    },
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
    validator: {
      patterns: '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
      errorMsg: 'Invalid phone number',
    },
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
    validator: {
      patterns: '^\\w{1,30}@\\w{2,20}.[a-zA-Z]{2,6}$',
      errorMsg: 'Invalid error',
    },
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
