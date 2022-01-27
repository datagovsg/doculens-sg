import { Module } from '@nestjs/common'

import { AttachmentService } from './s3.service'
import { AttachmentController } from './s3.controller'
import { ConfigModule } from '../config/config.module'

@Module({
  imports: [ConfigModule],
  controllers: [AttachmentController],
  providers: [AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {}
