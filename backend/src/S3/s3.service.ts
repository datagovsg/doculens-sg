import { Injectable } from '@nestjs/common'
import fs from 'fs'
import S3Module from 'aws-sdk/clients/s3'
import { ConfigService } from '../config/config.service'
@Injectable()
export class AttachmentService {
  constructor(private configService: ConfigService) {}

  private s3: any = new S3Module({
    region: this.configService.get('s3.s3_bucket_region'),
    accessKeyId: this.configService.get('awsKeys.aws_access_key'),
    secretAccessKey: this.configService.get('awsKeys.aws_secret_key'),
  })

  // downloads a file from s3
  getPDF(id: string): any {
    const downloadParams = {
      Key: id,
      Bucket: this.configService.get('s3.s3_bucket_name'),
    }
    return this.s3.getObject(downloadParams).createReadStream()
  }

  uploadFile(file: any): any {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
      // Bucket: schema.s3.s3_bucket_name,
      Body: fileStream,
      Key: file.filename,
    }

    return this.s3.upload(uploadParams).promise()
  }
}
