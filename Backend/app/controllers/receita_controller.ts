
import type { HttpContext } from '@adonisjs/core/http';
import { receitaValidator } from "#validators/receita_validator";
import { errorResponse } from "#exceptions/response";
import { Mensagens } from "../constants/mensagens.js";
import ReceitaService from '#services/receita_service';

export default class ReceitaController {
    public async criar({ request, response }: HttpContext) {
        try {
            const payload = await receitaValidator.validate(request.all())

            await ReceitaService.created(payload);

            return response.status(201).json({ message: Mensagens.RECEITA_CRIADA });
        } catch (error) {
            return errorResponse(response, error)
        }
    }
    public async detalhar({ params, response }: HttpContext) {
        const { id } = params;

        const receita = await ReceitaService.findById(id);

        if (!receita) {
            return response.status(404).json({ message: Mensagens.RECEITA_NAO_ENCONTRADA });
        }

        return response.json(receita);
    }
    public async index({ response, auth}: HttpContext) {

        const logado = await auth.authenticate();

        const receitas = await ReceitaService.findAll(logado?.id);

        return response.json(receitas);
    }
    public async alterar({ params, request, response }: HttpContext) {
        try {
            const id = params.id;

            const payload = await receitaValidator.validate(request.all())

            const receita = await ReceitaService.updated(id, payload);

            if (!receita) {
                return response.status(404).json({ message: Mensagens.RECEITA_ATUALIZADA });
            }
            return response.json(receita);
        } catch (error) {
            return errorResponse(response, error)
        }
    }
    public async excluir({ params, response }: HttpContext) {
        try {
            const { id } = params;

            await ReceitaService.deleted(id);

            return response.status(204).send(Mensagens.RECEITA_DELETADA);
        } catch (error) {
            return errorResponse(response, error)
        }
    }
}
