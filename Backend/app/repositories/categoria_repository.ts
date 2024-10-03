import Categoria from "#models/categoria";
import { ICategoria } from "../contracts/ICategoria.js";
import { IRepositoryCategoria } from "../contracts/IRepositoryCategoria.js";
import { ICategoriaModel } from "../types/categoria_type.js";
 
class CategoriaRepository implements IRepositoryCategoria<ICategoria> {
  async findAll(): Promise<ICategoriaModel[]> {
    const categorias = await Categoria.all()
    return categorias.map((categoria) => categoria as ICategoriaModel);
  }
}

export default new CategoriaRepository();
