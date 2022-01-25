import { Document, ObjectId } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type FormDocument = Form & Document

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
export class Form {
  _id: ObjectId

  @Prop()
  title: string

  @Prop()
  description: string

  // @Prop()
  // formStructure: never

  @Prop({ default: true })
  isActive: boolean

  @Prop()
  ownerId: string

  @Prop()
  createdAt: string

  @Prop()
  updatedAt: string
}

export const FormSchema = SchemaFactory.createForClass(Form)
