import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async index() {
    return { messgae: 'From the index Route' }
  }
  public async user({ params }: HttpContextContract) {
    return { messgae: `From the index Route with id: ${params.id}` }
  }
}
