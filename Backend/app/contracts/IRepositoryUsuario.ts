 export interface IRepositoryUsuario<T> {
    created(data: T): Promise<T>;
    findById(id: number): Promise<T | null>;
    updated(id: number, data: Partial<T>): Promise<T | null>;
  }
  