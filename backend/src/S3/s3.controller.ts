import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common'
import { AttachmentService } from './s3.service'

import multer from 'multer'
import util from 'util'
import fs from 'fs'

const unlinkFile = util.promisify(fs.unlink)

const upload = multer({ dest: 'uploads/' })

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Get(':id')
  getAttachment(@Param('id') id: string, @Res() res: any): any {
    const readStream = this.attachmentService.getPDF(id)
    readStream.pipe(res)
  }
  @Post()
  async postAttachment(@Req() req: any, @Res() res: any): Promise<any> {
    await upload.single('image')
    const file = req.file
    console.log(file)
    const result = await this.attachmentService.uploadFile(file)
    await unlinkFile(file.path)
    console.log(result)
    res.send({ imagePath: `/attachment/${result.Key}` })
  }
}
