
import Receita from "#models/receita";
import { IReceita } from "../contracts/IReceita.js";
import { IRepository } from "../contracts/IRepository.js";
import { IReceitaModel } from "../types/receita_type.js";

class ReceitaRepository implements IRepository<IReceita> {
  async created(data: IReceitaModel): Promise<IReceitaModel> {
    const usuario = await Receita.create(data as any);
    return usuario as IReceitaModel;
  }
  async findById(id: number): Promise<IReceitaModel | null> {
    const receita = await Receita.find(id);
    return receita ? (receita as IReceitaModel) : null;
  }
  async findAll(id: number): Promise<IReceitaModel[]> {
    const receitas = await Receita.query()
      .preload('usuario', (query) => {
        query.select('nome')
      })
      .preload('categoria', (query) => {
        query.select('id', 'nome')
      })
      .if(id, (query) => {
        query.where('id_usuario', id);
      })
      .exec();

    return receitas.map((receita) => receita as IReceitaModel);
  }
  async updated(id: number, data: Partial<IReceitaModel>): Promise<IReceitaModel | null> {
    const receita = await Receita.find(id);
    if (receita) {
      receita.merge(data);
      await receita.save();
      return receita as IReceitaModel;
    }
    return null;
  }
  async deleted(id: number): Promise<void> {
    const receita = await Receita.find(id);
    if (receita) {
      await receita.delete();
    }
  }
}

export default new ReceitaRepository();
