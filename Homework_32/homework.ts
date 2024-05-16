type Nullable<T> = T | null;
enum STATUSES {
  SUBMITED = 'Submited',
  IN_PROGRES = 'In Progres',
}
interface DBRecord {
  value: string;
  status: STATUSES;
}

class Todo {
  private form: Nullable<HTMLFormElement>;
  private todoListContainer: Nullable<HTMLDivElement>;
  private db: DBStorageManager;
  constructor(db: DBStorageManager) {
    this.form = document.querySelector<HTMLFormElement>('.form');
    this.todoListContainer =
      document.querySelector<HTMLDivElement>('.todo-list');
    this.db = db;
    this.init();
    this.initEvents();
    this.db.subscribeStorage(this.handleStorageEvent.bind(this));
  }
  private init() {
    this.db.getAllRecords().forEach(([key, data]) => {
      this.drawItem(data, key);
    });
  }
  private initEvents() {
    this.form?.addEventListener('submit', this.add.bind(this));

    this.todoListContainer?.addEventListener(
      'click',
      this.handleTodoItemEvents.bind(this)
    );
  }
  drawItem(data: DBRecord, id: string) {
    if (!this.todoListContainer) return;
    const li = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const deleteBtn = document.createElement('button');

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

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    this.todoListContainer.appendChild(li);
  }
  handleTodoItemEvents(e: Event) {
    const target = e.target as Element;
    if (!target?.parentElement) return;
    if (target.classList.contains('todo-list__item-btn')) {
      target.parentElement.remove();
      this.db.delete(
        target.parentElement.getAttribute('data-todo-id') as string
      );
    }
    if (target.classList.contains('form-check-input')) {
      // this.db.update(id, key, value);
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

class DBStorageManager {
  private instance: Storage;
  constructor(instance: Storage) {
    this.instance = instance;
  }
  save(key: string, record: DBRecord) {
    this.instance.setItem(key, JSON.stringify(record));
  }
  get(key: string): Nullable<DBRecord> {
    const value = this.instance.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  }
  getAllRecords(): [string, DBRecord][] {
    return Object.entries(this.instance).map(([key, record]) => [
      key,
      JSON.parse(record),
    ]);
  }
  delete(key: string) {
    this.instance.removeItem(key);
  }
  update(id: string, key: string, value: string) {
    const oldRecord = this.instance.getItem(id);
    if (!oldRecord) return;
    const newRecord: DBRecord = { ...JSON.parse(oldRecord), [key]: value };
    this.save(id, newRecord);
  }
  clear() {
    this.instance.clear();
  }
  subscribeStorage(callback: (e: StorageEvent) => unknown) {
    window.addEventListener('storage', callback);
  }
}

const db = new DBStorageManager(localStorage);

new Todo(db);

function uuid(): string {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}
