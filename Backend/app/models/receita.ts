import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo } from '@adonisjs/lucid/orm'
import Usuario from './user.js'
import Categoria from './categoria.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations' 

export default class Receita extends BaseModel {
  @column({ isPrimary: true })
  declare Id: number

  @column()
  declare idUsuario: number

  @column()
  declare idCategoria: number | null

  @column()
  declare nome: string | null

  @column()
  declare tempoPreparoMinutos: number | null

  @column()
  declare porcoes: number | null

  @column()
  declare modoPreparo: string

  @column()
  declare ingredientes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Usuario, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Categoria, { foreignKey: 'idCategoria' })
  declare categoria: BelongsTo<typeof Categoria>
}

// node ace db:seed
// node ace migration:run