
import type { HttpContext } from '@adonisjs/core/http';
import { errorResponse } from "#exceptions/response";
import { usuarioValidator } from '#validators/usuario_validator';
import UsuarioService from '#services/usuario_service';
import { Mensagens } from '../constants/mensagens.js';
import { usuarioLoginValidator } from '#validators/usuario_login_validator';

export default class UsuarioController {
    public async logout({ response, auth }: HttpContext) {

        const logado = await auth.authenticate();

        const token = Number(logado?.currentAccessToken?.identifier);

        await UsuarioService.loginRevoke(logado, token);

        return response.status(201).json({ message: Mensagens.SESSAO_FINALIZADA });
    }
    public async login({ request, response }: HttpContext) {
        try {
            const payload = await usuarioLoginValidator.validate(request.all())

            const { login, senha } = payload;

            const body = await UsuarioService.login(login, senha);

            return response.status(201).json(body);
        } catch (error) {
            return errorResponse(response, error)
        }
    }
    public async criar({ request, response }: HttpContext) {
        try {
            const payload = await usuarioValidator.validate(request.all())

            const receita = await UsuarioService.created(payload);

            return response.status(201).json(receita);
        } catch (error) {
            return errorResponse(response, error)
        }
    }
    public async detalhar({ params, response }: HttpContext) {
        const { id } = params;

        const receita = await UsuarioService.findById(id);

        if (!receita) {
            return response.status(404).json({ message: Mensagens.USUARIO_NAO_ENCONTRADO });
        }

        return response.json(receita);
    }
    public async index({ response }: HttpContext) {

        const receitas = await UsuarioService.findAll();

        return response.json(receitas);
    }
    public async alterar({ params, request, response }: HttpContext) {
        try {
            const id = params.id;

            const payload = await usuarioValidator.validate(request.all())

            const receita = await UsuarioService.updated(id, payload);

            if (!receita) {
                return response.status(404).json({ message: Mensagens.USUARIO_ATUALIZADO });
            }
            return response.json(receita);
        } catch (error) {
            return errorResponse(response, error)
        }
    }
    public async excluir({ params, response }: HttpContext) {
        try {
            const { id } = params;

            await UsuarioService.deleted(id);

            return response.status(204).send({ message: Mensagens.USUARIO_DELETADO });
        } catch (error) {
            return errorResponse(response, error)
        }
    }
}
