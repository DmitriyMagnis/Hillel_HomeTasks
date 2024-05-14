"use strict";
class Todo {
    form;
    todoListContainer;
    db;
    constructor(db) {
        this.form = document.querySelector('.form');
        this.todoListContainer =
            document.querySelector('.todo-list');
        this.db = db;
        this.init();
        this.initEvents();
        this.db.subscribeStorage(this.handleStorageEvent.bind(this));
        console.log(this.todoListContainer?.childNodes);
    }
    init() {
        this.db.getAllRecords().forEach(([key, value]) => {
            this.drawItem(value, key);
        });
    }
    initEvents() {
        this.form?.addEventListener('submit', this.add.bind(this));
        this.todoListContainer?.addEventListener('click', this.delete.bind(this));
    }
    drawItem(textValue, id) {
        if (!this.todoListContainer)
            return;
        const li = document.createElement('li');
        const text = document.createElement('p');
        const deleteBtn = document.createElement('button');
        li.classList.add('todo-list__item');
        text.classList.add('todo-list__item-text');
        deleteBtn.classList.add('btn', 'btn-danger', 'todo-list__item-btn');
        li.setAttribute('data-todo-id', id);
        deleteBtn.textContent = 'delete';
        text.textContent = textValue;
        li.appendChild(text);
        li.appendChild(deleteBtn);
        this.todoListContainer.appendChild(li);
    }
    delete(e) {
        const target = e.target;
        if (!target?.parentElement)
            return;
        if (target.classList.contains('todo-list__item-btn')) {
            target.parentElement.remove();
            this.db.delete(target.parentElement.getAttribute('data-todo-id'));
        }
    }
    add(e) {
        const target = e.target;
        e.preventDefault();
        const inputTask = new FormData(target).get('task');
        const uniqueId = uuid();
        this.db.save(uniqueId, String(inputTask));
        this.drawItem(String(inputTask), uniqueId);
        this.form?.reset();
    }
    handleStorageEvent(e) {
        if (e.newValue) {
            this.drawItem(String(e.newValue), String(e.key));
        }
        if (e.oldValue && this.todoListContainer) {
            const todoItems = Array.from(this.todoListContainer?.children);
            const node = todoItems.find(node => node.getAttribute('data-todo-id') === e.key);
            node?.remove();
        }
    }
}
class DB {
    instance;
    constructor(instance) {
        this.instance = instance;
    }
    save(key, value) {
        this.instance.setItem(key, value);
    }
    get(key) {
        return this.instance.getItem(key);
    }
    getAllRecords() {
        return Object.entries(this.instance);
    }
    delete(key) {
        this.instance.removeItem(key);
    }
    clear() {
        this.instance.clear();
    }
    subscribeStorage(callback) {
        window.addEventListener('storage', callback);
    }
}
const db = new DB(localStorage);
new Todo(db);
function uuid() {
    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return randLetter + Date.now();
}
