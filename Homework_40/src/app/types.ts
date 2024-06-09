export type Nullable<T> = T | null;
export enum STATUSES {
  SUBMITED = 'Submited',
  IN_PROGRES = 'In Progres',
}
export interface DBRecord {
  value: string;
  status: STATUSES;
}
