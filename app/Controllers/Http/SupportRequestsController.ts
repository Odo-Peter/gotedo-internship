import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SupportRequestsController {
  //get all requests
  public async index() {
    return { messgae: 'From the support index route' }
  }

  //creating a new support request
  public async store({ request, response }: HttpContextContract) {
    const { firstName, lastName, emailAddress, messageTitle, messageText } = request.body()

    response.status(201)
    return {
      first_name: firstName,
      last_name: lastName,
      email_address: emailAddress,
      message_title: messageTitle,
      message_text: messageText,
    }
  }
}
