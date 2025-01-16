export type TableStatus = 'empty' | 'occupied' | 'reserved';
export type TableAvailability = 'available' | 'unavailable';

export interface Table {
  id: number;
  tno: number;
  capacity: number;
  available: TableAvailability;
  status: TableStatus;
  restaurantId: number;
}

export interface TableUpdate {
  status?: TableStatus;
  capacity?: number;
  availability?: TableAvailability;
}

