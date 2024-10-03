export interface IRepositoryCategoria<T> {
  findAll(): Promise<T[]>;
}
