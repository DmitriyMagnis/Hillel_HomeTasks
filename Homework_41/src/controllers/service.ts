import mongoose from 'mongoose';
import { TodoModel } from './schema';

export class TodoService {
  async getAllTodos() {
    try {
      const todos = await TodoModel.find({});
      return todos;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async createTodo(todoData: any) {
    try {
      const todo = new TodoModel({
        _id: new mongoose.Types.ObjectId(),
        ...todoData,
      });
      await todo.save();
      return todo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deleteTodo(id: number) {
    try {
      const todo = await TodoModel.findByIdAndDelete(id);
      return todo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateSingleTodo(id: number, data: any) {
    try {
      const todo = await TodoModel.findByIdAndUpdate(id, data, { new: true });
      await todo?.save();
      return todo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
