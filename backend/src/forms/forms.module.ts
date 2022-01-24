import { Module } from '@nestjs/common'
import { FormsService } from './forms.service'
import { FormsController } from './forms.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Form, FormSchema } from './schemas/form.schema'

@Module({
  controllers: [FormsController],
  providers: [FormsService],
  imports: [
    MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }]),
  ],
})
export class FormsModule {}
