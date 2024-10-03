import Usuario from "#models/user";
import { AccessToken } from "@adonisjs/auth/access_tokens";
import { IUsuario } from "../contracts/IUsuario.js";
import { IUsuarioModel } from "../types/usuario_type.js";
import { IRepositoryUsuario } from "../contracts/IRepositoryUsuario.js";

class UsuarioRepository implements IRepositoryUsuario<IUsuario> {
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
  async updated(id: number, data: Partial<IUsuarioModel>): Promise<IUsuarioModel | null> {
    const usuario = await Usuario.find(id);
    if (usuario) {
      usuario.merge(data);
      await usuario.save();
      return usuario as IUsuarioModel;
    }
    return null;
  }
}

export default new UsuarioRepository();
