import { DBRecord, Nullable } from './types';

export class DBStorageManager {
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
