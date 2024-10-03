
import CategoriaService from '#services/categoria_service';
import type { HttpContext } from '@adonisjs/core/http';

export default class CategoriaController {
    public async index({ response}: HttpContext) {
        const categorias  = await CategoriaService.findAll();

        return response.json(categorias);
    }
}
