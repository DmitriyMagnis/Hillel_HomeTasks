import { type Api } from './api';
import { DBRecord, Nullable, type OmitedIdRecord } from './types';
export class DBStorageManager {
  private instance: Storage;
  api: Api;
  constructor(instance: Storage, api: Api) {
    this.api = api;
    this.instance = instance;
  }
  async save(record: OmitedIdRecord) {
    try {
      const dbRecordsResponse = await this.api.createTodoRecord(record);
      if (!dbRecordsResponse) return;
      this.instance.setItem(
        dbRecordsResponse._id,
        JSON.stringify(dbRecordsResponse)
      );
      return {
        _id: dbRecordsResponse._id,
        value: dbRecordsResponse.title,
        status: dbRecordsResponse.completed,
      };
    } catch (error) {
      console.log(error);
    }
  }
  get(key: string): Nullable<DBRecord> {
    const value = this.instance.getItem(key);
    console.log(value);
    if (!value) return null;
    return JSON.parse(value);
  }
  async getAllRecords(): Promise<DBRecord[] | undefined> {
    try {
      const dbRecordsResponse = await this.api.getTodos();
      if (!dbRecordsResponse) return;
      return dbRecordsResponse.map(item => {
        const newitem: DBRecord = {
          _id: item._id,
          value: item.title,
          status: item.completed,
        };
        this.instance.setItem(item._id, JSON.stringify(newitem));
        return newitem;
      });
    } catch (error) {
      console.log(error);
      throw Error('error');
    }
  }
  async delete(id: string) {
    try {
      const dbResponse = await this.api.deleteTodo(id);

      if (dbResponse) this.instance.removeItem(id);
    } catch (e) {
      console.log(e);
    }
  }
  async update(id: string, key: string, value: boolean) {
    try {
      const oldRecord = this.instance.getItem(id);
      const newRecord: DBRecord = { ...JSON.parse(oldRecord!), [key]: value };
      const newDbRecord = await this.api.updateTodo(newRecord);
      if (newDbRecord) {
        this.instance.setItem(
          id,
          JSON.stringify({
            status: newDbRecord.completed,
            _id: newDbRecord._id,
            value: newDbRecord.title,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }

    // this.save(id, newRecord);
  }
  clear() {
    this.instance.clear();
  }
  subscribeStorage(callback: (e: StorageEvent) => unknown) {
    window.addEventListener('storage', callback);
  }
}
