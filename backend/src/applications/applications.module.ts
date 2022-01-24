import { Module } from '@nestjs/common'
import { ApplicationsService } from './applications.service'
import { ApplicationsController } from './applications.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Application, ApplicationSchema } from './schemas/application.schema'
import { FormsModule } from '../forms/forms.module'

@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    // Import form module for application creation
    FormsModule,
  ],
})
export class ApplicationsModule {}
