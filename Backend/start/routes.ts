/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsuarioController = () => import('#controllers/usuario_controller');
const ReceitaController = () => import('#controllers/receita_controller');
const CategoriaController = () => import('#controllers/categoria_controller');

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';

router.group(() => {
    router.post('/login', [UsuarioController, 'login']);
    router.post('/registrar', [UsuarioController, 'criar']);
    router.get('/logout', [UsuarioController, 'logout']).use(middleware.auth());
}).prefix('/api-publica');

router.group(() => {
    router.group(() => {
        router.get('/:id', [UsuarioController, 'detalhar']);
        router.put('/:id', [UsuarioController, 'alterar']);
    }).prefix('/usuarios').use(middleware.auth())

    router.group(() => {
        router.post('/', [ReceitaController, 'criar']);
        router.get('/', [ReceitaController, 'index']);
        router.get('/:id', [ReceitaController, 'detalhar']);
        router.put('/:id', [ReceitaController, 'alterar']);
        router.delete('/:id', [ReceitaController, 'excluir']);
    }).prefix('/receitas');

    router.group(() => {
        router.get('/', [CategoriaController, 'index']);
    }).prefix('/categorias');
}).prefix('/api').use(middleware.auth())
