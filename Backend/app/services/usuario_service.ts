
import { IUsuario } from "../contracts/IUsuario.js";
import { IUsuarioService } from "../contracts/IUsuarioService.js";
import UsuarioRepository from "../repositories/usuario_repository.js";
import { IUsuarioModel } from "../types/usuario_type.js";
import { IResponse } from "../contracts/IResponse.js";

class UsuarioService implements IUsuarioService {
  async loginRevoke(usuario: IUsuarioModel, id: number): Promise<Number | null> {
    return await UsuarioRepository.revokeToken(usuario, id);
  }
  async login(login: string, senha: string): Promise<IResponse | null> {
    const usuario = await UsuarioRepository.findByLogin(login, senha)

    if (usuario) {
      const token = await UsuarioRepository.gerarToken(usuario);

      return {
        status: true,
        data: { token: token?.value!.release(), usuario },
      };
    }

    return {}
  }
  async created(data: IUsuario): Promise<IUsuarioModel> {
    return await UsuarioRepository.created(data as IUsuarioModel);
  }
  async findById(id: number): Promise<IUsuarioModel | null> {
    return await UsuarioRepository.findById(id);
  }
  async updated(id: number, data: Partial<IUsuario>): Promise<IUsuarioModel | null> {
    return await UsuarioRepository.updated(id, data);
  }
}

export default new UsuarioService();
