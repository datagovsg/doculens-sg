import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateApplicationDto } from './dto/create-application.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Application, ApplicationDocument } from './schemas/application.schema'
import { Form } from '../forms/schemas/form.schema'

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private applicationModel: Model<ApplicationDocument>
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
    form: Form
  ): Promise<Application> {
    const createdApplication = new this.applicationModel({
      ...createApplicationDto,
      form: form._id,
    })

    return createdApplication.save()
  }

  async findAll(): Promise<Application[]> {
    return this.applicationModel.find()
  }

  async findApplicationById(id: string): Promise<Application> {
    // TODO: Make call to S3 to retrieve form as well
    const application = await this.applicationModel.findById(id)
    if (!application) {
      throw new NotFoundException()
    }

    return application
  }

  async findAllApplicationsByFormId(formId: string): Promise<Application[]> {
    // TODO: Make call to S3 to retrieve form as well
    const applications = await this.applicationModel.find({ form: formId })
    if (!applications) {
      throw new NotFoundException()
    }

    return applications
  }

  // TODO: Figure out repercussions of implementing hard deletion of application
}
