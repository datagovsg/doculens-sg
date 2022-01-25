import { Injectable } from '@nestjs/common'
import fs from 'fs'
import S3Module from 'aws-sdk/clients/s3'
import { config } from 'dotenv'

config()

@Injectable()
export class AttachmentService {
  private bucketName = process.env.AWS_BUCKET_NAME
  private region = process.env.AWS_BUCKET_REGION
  private accessKeyId = process.env.AWS_ACCESS_KEY
  private secretAccessKey = process.env.AWS_SECRET_KEY

  private s3: any = new S3Module({
    region: this.region,
    accessKeyId: this.accessKeyId,
    secretAccessKey: this.secretAccessKey,
  })

  // downloads a file from s3
  getPDF(id: string): any {
    const downloadParams = {
      Key: id,
      Bucket: this.bucketName,
    }
    return this.s3.getObject(downloadParams).createReadStream()
  }

  uploadFile(file: any): any {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
      Bucket: this.bucketName,
      Body: fileStream,
      Key: file.filename,
    }

    return this.s3.upload(uploadParams).promise()
  }
}
