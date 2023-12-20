import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UsersController {
  //get all user
  public async index() {
    return User.all()
  }

  // get user by ID
  public async show({ params }: HttpContextContract) {
    return User.findOrFail(params.id)
  }

  //create a new user
  public async store({ request, response }: HttpContextContract) {
    const { fullname, email } = request.body()

    const newUser = await User.create({ fullname, email })
    response.status(201)

    return newUser
  }
}
