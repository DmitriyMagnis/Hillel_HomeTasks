import type { DBRecord, ITodoResponse, OmitedIdRecord } from './types';

export class Api {
  _URL: string;
  _PORT: number;
  _headers: Headers;
  constructor(
    baseUrl: string = 'http://localhost',
    port: number = 5000,

    headers: Record<string, any> = {}
  ) {
    this._URL = baseUrl;
    this._PORT = port;
    const defaultHeaders = new Headers(headers);
    defaultHeaders.set('Content-Type', 'application/json');
    defaultHeaders.set('charset', 'utf-8');
    this._headers = defaultHeaders;
  }
  async getTodos(): Promise<ITodoResponse[] | undefined> {
    try {
      const response = await fetch(`${this._URL}:${this._PORT}/todos`, {
        headers: this._headers,
      });
      if (response.ok) {
        return await response.json();
      }
      throw Error('errorin getTodos');
    } catch (error) {
      console.log('getTodos error');
      // throw Error('error getTodos');
    }
  }
  async createTodoRecord(
    record: OmitedIdRecord
  ): Promise<ITodoResponse | undefined> {
    try {
      const response = await fetch(`${this._URL}:${this._PORT}/create`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify(record),
      });
      if (response.ok) {
        return await response.json();
      }
      throw Error('createTodoRecord error');
    } catch (error) {
      console.log(error);

      // throw Error('catch');
    }
  }
  async updateTodo(record: DBRecord): Promise<ITodoResponse | undefined> {
    try {
      const response = await fetch(`${this._URL}:${this._PORT}/update`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          _id: record._id,
          completed: record.status,
          title: record.value,
        }),
      });
      if (response.ok) {
        return await response.json();
      }
      throw Error('updateTodo error');
    } catch (error) {
      console.log(error);
    }
  }
  async deleteTodo(id: string) {
    try {
      const response = await fetch(`${this._URL}:${this._PORT}/delete/${id}`, {
        headers: this._headers,
        method: 'DELETE',
      });
      if (response.ok) {
        return await response.json();
      }
      throw Error('updateTodo error');
    } catch (e) {
      console.log(e);
    }
  }
}

const api = new Api();

export default api;
