import 'bootstrap/dist/css/bootstrap.min.css';
import { DBStorageManager } from './app/db';
import { Modal } from './app/modal';
import { Todo } from './app/todo';
import './styles/index.scss';

const modal = new Modal();

const db = new DBStorageManager(localStorage);

import('./app/dynamicChunk').then(module => {
  const myFunc = module.default;
  new Todo(db, modal);
  console.log(myFunc());
});
