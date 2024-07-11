import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';

class Api {
  instance: AxiosInstance;
  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config);
  }

  fetchById = (id: string) => this.instance.get(`people/${id}/`);
}

const api = new Api({
  baseURL: 'https://swapi.dev/api/',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
