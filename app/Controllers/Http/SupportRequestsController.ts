import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import SupportRequest from 'App/Models/SupportRequest'

export default class SupportRequestsController {
  //get all requests
  public async index({}: HttpContextContract) {
    return SupportRequest.all()
  }

  //creating a new support request
  public async store({ request, response }: HttpContextContract) {
    const reqs = await request.validate({
      schema: schema.create({
        firstname: schema.string({ trim: true }),
        lastname: schema.string({ trim: true }),
        email: schema.string({ trim: true }),
        title: schema.string({ trim: true }),
        fullMessage: schema.string({ trim: true }),
        userFile: schema.file({
          size: '3mb',
          extnames: ['jpg', 'png', 'jpeg', 'pdf', 'docx', 'doc'],
        }),
      }),
    })

    const fileUpload = request.file('file')

    const fileName = new Date().getTime().toString() + `.${fileUpload?.extname}`

    await fileUpload?.move(Application.publicPath('file_uploads'), { name: fileName })

    const newSupportRequest = new SupportRequest()

    newSupportRequest.firstname = reqs.firstname
    newSupportRequest.lastname = reqs.lastname
    newSupportRequest.email = reqs.email
    newSupportRequest.messageTitle = reqs.title
    newSupportRequest.fullMessage = reqs.fullMessage
    newSupportRequest.userFile = `file_uploads/${fileName}`

    await newSupportRequest.save()
    response.status(201)

    return newSupportRequest
  }
}
