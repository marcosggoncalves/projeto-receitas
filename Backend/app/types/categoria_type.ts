import Categoria from "#models/categoria"; 
import { ICategoria } from "../contracts/ICategoria.js";

export type ICategoriaModel = Categoria & ICategoria;
