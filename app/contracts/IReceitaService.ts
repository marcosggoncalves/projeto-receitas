import { IReceitaModel } from "../types/receita_type.js";
import { IReceita } from "./IReceita.js";

export interface IReceitaService {
  created(data: IReceita): Promise<IReceitaModel>;
  findById(id: number): Promise<IReceitaModel | null>;
  findAll(id:number): Promise<IReceitaModel[]>;
  updated(id: number, data: Partial<IReceita>): Promise<IReceitaModel | null>;
  deleted(id: number): Promise<void>;
}
