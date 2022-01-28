import { Document, ObjectId } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Form } from '../../forms/schemas/form.schema'
import { ApplicationStatus } from '../types'

export type ApplicationDocument = Application & Document

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    },
  },
})
export class Application {
  _id: ObjectId

  @Prop()
  name: string

  @Prop()
  email: string

  @Prop({ default: ApplicationStatus.SUBMITTED, enum: ApplicationStatus })
  status: ApplicationStatus

  // Many-to-one relationship with form entity
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Form.name })
  form: ObjectId

  @Prop()
  createdAt: string

  @Prop()
  updatedAt: string
}

export const ApplicationSchema = SchemaFactory.createForClass(Application)
