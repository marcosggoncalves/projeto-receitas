import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Receitas extends BaseSchema {
  protected tableName = 'receitas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_usuario').unsigned().notNullable().references('id').inTable('usuarios').onDelete('RESTRICT').onUpdate('CASCADE')
      table.integer('id_categoria').unsigned().nullable().references('id').inTable('categorias').onDelete('CASCADE').onUpdate('CASCADE')

      table.string('nome', 45).nullable()
      table.integer('tempo_preparo_minutos').unsigned().nullable()
      table.integer('porcoes').unsigned().nullable()
      table.text('modo_preparo').notNullable()
      table.text('ingredientes').nullable()
      
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
