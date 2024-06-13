import 'bootstrap/dist/css/bootstrap.min.css';
import api from './app/api';
import { DBStorageManager } from './app/db';
import { Modal } from './app/modal';
import { Todo } from './app/todo';
import './styles/index.scss';

const modal = new Modal();

const db = new DBStorageManager(localStorage, api);

import('./app/dynamicChunk').then(() => {
  new Todo(db, modal);
});
