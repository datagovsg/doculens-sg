import { Module } from '@nestjs/common'

import { AttachmentService } from './s3.service'
import { AttachmentController } from './s3.controller'

@Module({
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
