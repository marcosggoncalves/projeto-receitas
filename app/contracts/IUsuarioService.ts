import { IUsuarioModel } from "../types/usuario_type.js";
import { IUsuario } from "./IUsuario.js";
import { IResponse } from "./IResponse.js";
 
export interface IUsuarioService {
  created(data: IUsuario): Promise<IUsuarioModel>;
  findById(id: number): Promise<IUsuarioModel | null>;
  login(login: string, senha: string): Promise<IResponse  | null>;
  loginRevoke(usuario: IUsuarioModel, id: number): Promise<Number | null>;
  findAll(): Promise<IUsuarioModel[]>;
  updated(id: number, data: Partial<IUsuario>): Promise<IUsuarioModel | null>;
  deleted(id: number): Promise<void>;
}
