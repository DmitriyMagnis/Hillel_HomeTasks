jest.mock('axios');
import axios from 'axios';
import { Api } from '../api/index';

const todoItems = [{ _id: '1231312', title: 'title', completed: true }];
const response = {
  data: todoItems,
  status: 200,
};

let api: Api;

describe('API: ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.create = jest.fn().mockReturnThis();
    api = new Api({
      baseURL: 'http://localhost:5000/',
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('fetchAllTodos: should return array of items', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: response, status: 200 });

    const todos = await api.fetchAllTodos();

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(todos).toEqual({ data: response, status: 200 });
  });
  it('fetchAllTodos: should return Axios error', async () => {
    axios.get = jest.fn().mockRejectedValue({ data: 'error', status: 400 });

    try {
      await api.fetchAllTodos();
      expect(axios.get).toHaveBeenCalledTimes(1);
    } catch (error) {
      expect(error).toEqual({ data: 'error', status: 400 });
    }
  });
  it('fetchCreateTodo: should pass correct params and return properly response', async () => {
    const todoItem = { _id: 'id', title: 'title', completed: true };
    axios.post = jest.fn().mockResolvedValue({ data: todoItem, status: 200 });

    const todo = await api.fetchCreateTodo(todoItem);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`create`, todoItem);
    expect(todo).toEqual({ data: todoItem, status: 200 });
  });
  it('fetchCreateTodo: should pass correct params and return rejected  response', async () => {
    const todoItem = { _id: 'id', title: 'title', completed: true };
    axios.post = jest.fn().mockRejectedValue({ data: todoItem, status: 400 });

    try {
      await api.fetchCreateTodo(todoItem);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(`create`, todoItem);
    } catch (error) {
      expect(error).toEqual({ data: todoItem, status: 400 });
    }
  });
  //etc the same one
});
