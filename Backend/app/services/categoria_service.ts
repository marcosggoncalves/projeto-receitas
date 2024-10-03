import { ICategoriaService } from "../contracts/ICategoriaService.js";
import CategoriaRepository from "../repositories/categoria_repository.js";
import { ICategoriaModel } from "../types/categoria_type.js";

class CategoriaService implements ICategoriaService {
  async findAll(): Promise<ICategoriaModel[]> {
    return await CategoriaRepository.findAll();
  }
}

export default new CategoriaService();
