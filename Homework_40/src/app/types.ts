export type Nullable<T> = T | null;
export enum STATUSES {
  SUBMITED = 'Submited',
  IN_PROGRES = 'In Progres',
}
export interface DBRecord {
  value: string;
  status: boolean;
  _id: string;
}

export interface ITodoResponse {
  completed: boolean;
  _id: string;
  title: string;
}
export type OmitedIdRecord = Omit<ITodoResponse, '_id'>;
