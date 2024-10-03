
import Receita from "#models/receita";
import { IReceita } from "../contracts/IReceita.js";
import { IRepositoryReceita } from "../contracts/IRepositoryReceita.js";
import { IReceitaModel } from "../types/receita_type.js";

class ReceitaRepository implements IRepositoryReceita<IReceita> {
  async created(data: IReceitaModel): Promise<IReceitaModel> {
    const usuario = await Receita.create(data as any);
    return usuario as IReceitaModel;
  }
  async findById(id: number): Promise<IReceitaModel | null> {
    const receita = await Receita.query()
      .where('id', id)
      .preload('categoria', (query) => {
        query.select('id', 'nome')
      })
      .firstOrFail();
  
    return receita ? (receita as IReceitaModel) : null;
  }
  async findAll(id: number): Promise<IReceitaModel[]> {
    const receitas = await Receita.query()
      .select('id', 'nome', 'tempoPreparoMinutos', 'porcoes', 'id_categoria')
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
