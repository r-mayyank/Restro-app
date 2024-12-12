export type TableStatus = 'empty' | 'occupied' | 'reserved';

export interface Table {
  id: number;
  number: number;
  status: TableStatus;
  capacity: number;
}

export interface TableUpdate {
  status?: TableStatus;
  capacity?: number;
}

