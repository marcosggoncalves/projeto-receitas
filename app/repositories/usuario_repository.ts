import Usuario from "#models/Usuario";
import { AccessToken } from "@adonisjs/auth/access_tokens";
import { IRepository } from "../contracts/IRepository.js";
import { IUsuario } from "../contracts/IUsuario.js";
import { IUsuarioModel } from "../types/usuario_type.js";

class UsuarioRepository implements IRepository<IUsuario> {
  async findByLogin(login: string, senha: string): Promise< IUsuarioModel | null> {
    return  await Usuario.verifyCredentials(login, senha);
  }
  async gerarToken(usuario: IUsuarioModel): Promise<AccessToken | null> {
    return await Usuario.accessTokens.create(usuario);
  }
  async revokeToken(usuario: IUsuarioModel, token: number): Promise<Number | null> {
    return await Usuario.accessTokens.delete(usuario, token);
  }
  async created(data: IUsuarioModel): Promise<IUsuarioModel> {
    const usuario = await Usuario.create(data as any);
    return usuario as IUsuarioModel;
  }
  async findById(id: number): Promise<IUsuarioModel | null> {
    const usuario = await Usuario.find(id);
    return usuario ? (usuario as IUsuarioModel) : null;
  } 
  async findAll(): Promise<IUsuarioModel[]> {
    const usuarios = await Usuario.all();
    return usuarios.map((usuario) => usuario as IUsuarioModel);
  }
  async updated(id: number, data: Partial<IUsuarioModel>): Promise<IUsuarioModel | null> {
    const usuario = await Usuario.find(id);
    if (usuario) {
      usuario.merge(data);
      await usuario.save();
      return usuario as IUsuarioModel;
    }
    return null;
  }
  async deleted(id: number): Promise<void> {
    const usuario = await Usuario.find(id);
    if (usuario) {
      await usuario.delete();
    }
  }
}

export default new UsuarioRepository();
