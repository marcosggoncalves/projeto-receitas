import Categoria from '#models/categoria'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public async run () {
    await Categoria.createMany([
      { nome: 'Bolos e tortas doces' },
      { nome: 'Carnes' },
      { nome: 'Aves' },
      { nome: 'Peixes e frutos do mar' },
      { nome: 'Saladas, molhos e acompanhamentos' },
      { nome: 'Sopas' },
      { nome: 'Massas' },
      { nome: 'Bebidas' },
      { nome: 'Doces e sobremesas' },
      { nome: 'Lanches' },
      { nome: 'Prato Único' },
      { nome: 'Light' },
      { nome: 'Alimentação Saudável' }
    ])
  }
}
