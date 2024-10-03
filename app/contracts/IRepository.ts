 export interface IRepository<T> {
    created(data: T): Promise<T>;
    findById(id: number): Promise<T | null>;
    findAll(id: number | null): Promise<T[]>;
    updated(id: number, data: Partial<T>): Promise<T | null>;
    deleted(id: number): Promise<void>;
  }
  