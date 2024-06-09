import { DBStorageManager } from './db';
import { uuid } from './helpers';
import { Modal } from './modal';
import { DBRecord, Nullable, STATUSES } from './types';

export class Todo {
  private form: Nullable<HTMLFormElement>;
  private todoListContainer: Nullable<HTMLDivElement>;
  private db: DBStorageManager;
  private modal: Modal;
  constructor(db: DBStorageManager, modal: Modal) {
    this.form = document.querySelector<HTMLFormElement>('.form');
    this.todoListContainer =
      document.querySelector<HTMLDivElement>('.todo-list');
    this.db = db;
    this.init();
    this.initEvents();
    this.db.subscribeStorage(this.handleStorageEvent.bind(this));
    this.modal = modal;
    console.log('xaxa');
  }
  private init(): void {
    this.db.getAllRecords().forEach(([key, data]) => {
      this.drawItem(data, key);
    });
  }
  private initEvents(): void {
    if (this.form) this.form?.addEventListener('submit', this.add.bind(this));

    this.todoListContainer?.addEventListener(
      'click',
      this.handleTodoItemEvents.bind(this)
    );
  }
  drawItem(data: DBRecord, id: string): void {
    if (!this.todoListContainer) return;

    const li = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const deleteBtn = document.createElement('button');
    const showModal = document.createElement('button');

    checkbox.classList.add('form-check-input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', id);
    checkbox.checked = data.status === STATUSES.SUBMITED;
    label.classList.add('todo-list__item-text');
    label.setAttribute('for', id);
    label.textContent = data.value;
    li.setAttribute('data-todo-id', id);
    li.classList.add('todo-list__item');

    deleteBtn.textContent = 'delete';
    deleteBtn.classList.add('btn', 'btn-danger', 'todo-list__item-btn');
    showModal.classList.add('btn', 'btn-primary', 'todo-list__item-modalShow');
    showModal.textContent = 'show modal';

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    li.appendChild(showModal);
    this.todoListContainer.appendChild(li);
  }
  onDelete(target: any) {
    target.parentElement.remove();
    this.db.delete(target.parentElement.getAttribute('data-todo-id') as string);
  }
  onModalOpen(target: any) {
    const id = target.parentElement.getAttribute('data-todo-id');

    const record = this.db.get(id);
    if (record) this.modal.openModal(record, id);
  }
  onCheckboxToggle(target: any) {
    const id = target.parentElement.getAttribute('data-todo-id');
    target.parentElement.classList.toggle('submited');
    this.db.update(
      String(id),
      'status',
      (target as HTMLInputElement).checked
        ? STATUSES.SUBMITED
        : STATUSES.IN_PROGRES
    );
  }

  handleTodoItemEvents(e: Event) {
    console.log(e);
    const target = e.target as Element;
    if (!target?.parentElement) return;
    if (target.classList.contains('todo-list__item-btn')) {
      this.onDelete(target);
    }
    if (target.classList.contains('todo-list__item-modalShow')) {
      this.onModalOpen(target);
    }
    if (target.classList.contains('form-check-input')) {
      this.onCheckboxToggle(target);
    }
  }
  add(e: Event) {
    const target = e.target as HTMLFormElement;
    e.preventDefault();
    const inputTask = new FormData(target).get('task');
    const uniqueId = uuid();
    const newRecord = { status: STATUSES.IN_PROGRES, value: String(inputTask) };
    this.db.save(uniqueId, newRecord);
    this.drawItem(newRecord, uniqueId);

    this.form?.reset();
  }
  handleStorageEvent(e: StorageEvent) {
    if (e.newValue) {
      this.drawItem(JSON.parse(e.newValue), String(e.key));
    }
    if (e.oldValue && this.todoListContainer) {
      const todoItems = Array.from(this.todoListContainer?.children);
      const node = todoItems.find(
        node => node.getAttribute('data-todo-id') === e.key
      );
      node?.remove();
    }
  }
}
