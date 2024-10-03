 
import { IUsuario } from "../contracts/IUsuario.js";
import Usuario from "../models/user.js";

export type IUsuarioModel = Usuario & IUsuario;
