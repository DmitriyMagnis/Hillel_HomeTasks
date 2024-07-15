import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';
import type { ITodoItem } from '../types';

class Api {
  instance: AxiosInstance;
  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config);
  }

  fetchAllTodos = () => this.instance.get<ITodoItem[]>(`todos`);
  fetchCreateTodo = (data: Partial<ITodoItem>) =>
    this.instance.post<ITodoItem>(`create`, data);
  fetchUpdateTodo = (data: Partial<ITodoItem>) =>
    this.instance.post<Partial<ITodoItem>>(`update`, data);
  fetchDeleteTodo = (id: string) => this.instance.delete(`delete/${id}`);
}

const api = new Api({
  baseURL: 'http://localhost:5000/',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
