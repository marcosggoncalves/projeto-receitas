import { ICategoriaModel } from "../types/categoria_type.js";

export interface ICategoriaService {
  findAll(): Promise<ICategoriaModel[]>;
}
