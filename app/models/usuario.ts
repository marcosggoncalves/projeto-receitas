import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['login'],
  passwordColumnName: 'senha',
})

export default class Usuario extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string 

  @column()
  declare login: string

  @column({ serializeAs: null })
  declare senha: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime 
 
  static accessTokens = DbAccessTokensProvider.forModel(Usuario, {
    expiresIn: '1 days',
    prefix: 'oat_',
    table: 'usuarios_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}