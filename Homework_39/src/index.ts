import { DBStorageManager } from './app/db';
import { Modal } from './app/modal';
import { Todo } from './app/todo';

const modal = new Modal();

const db = new DBStorageManager(localStorage);

new Todo(db, modal);
