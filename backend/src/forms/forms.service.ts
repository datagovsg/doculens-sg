import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateFormDto } from './dto/create-form.dto'
import { FormDocument, Form } from './schemas/form.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdateFormDto } from './dto/update-form.dto'

@Injectable()
export class FormsService {
  constructor(@InjectModel(Form.name) private formModel: Model<FormDocument>) {}

  async create(createFormDto: CreateFormDto): Promise<Form> {
    const createdForm = new this.formModel(createFormDto)
    return await createdForm.save()
  }

  async findAll(): Promise<Form[]> {
    return this.formModel.find()
  }

  async findOne(id: string): Promise<Form> {
    const form = await this.formModel.findById(id)
    if (!form) {
      throw new NotFoundException()
    }
    return form
  }

  async update(id: string, updateFormDto: UpdateFormDto): Promise<Form> {
    const form = await this.formModel
      .findByIdAndUpdate(id, updateFormDto)
      .setOptions({ new: true })

    if (!form) {
      throw new NotFoundException()
    }

    return form
  }

  async delete(id: string): Promise<void> {
    const result = await this.formModel.findByIdAndDelete(id)
    if (!result) {
      throw new NotFoundException()
    }
  }
}
