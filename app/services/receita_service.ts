import { IReceita } from "../contracts/IReceita.js";
import { IReceitaService } from "../contracts/IReceitaService.js";
import ReceitaRepository from "../repositories/receita_repository.js";
import { IReceitaModel } from "../types/receita_type.js";

class ReceitaService implements IReceitaService {
  async created(data: IReceita): Promise<IReceitaModel> {
    return await ReceitaRepository.created(data as IReceitaModel);
  }
  async findById(id: number): Promise<IReceitaModel | null> {
    return await ReceitaRepository.findById(id);
  } 
  async findAll(id:number): Promise<IReceitaModel[]> {
    return await ReceitaRepository.findAll(id);
  }
  async updated(id: number, data: Partial<IReceita>): Promise<IReceitaModel | null> {
    return await ReceitaRepository.updated(id, data);
  }
  async deleted(id: number): Promise<void> {
    await ReceitaRepository.deleted(id);
  }
}

export default new ReceitaService();
