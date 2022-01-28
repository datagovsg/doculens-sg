import { Injectable } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer'
import { SES } from 'aws-sdk'

import { ConfigService } from '../config/config.service'
import { htmlString } from './templates/standard'

@Injectable()
export class MailerService {
  constructor(private config: ConfigService) {}

  private mailer: Pick<Transporter, 'sendMail'> = this.config.get(
    'mailConfig.host'
  )
    ? nodemailer.createTransport({
        SES: new SES({
          accessKeyId: this.config.get('awsKeys.aws_access_key'),
          secretAccessKey: this.config.get('awsKeys.aws_secret_key'),
          region: this.config.get('awsRegion'),
        }),
      })
    : {
        sendMail: (options: SendMailOptions) => {
          Logger.log(JSON.stringify(options, null, 2))
          return Promise.resolve(options)
        },
      }

  sendMail = async (
    mailOptions: Omit<SendMailOptions, 'from'>,
    message?: string
  ): Promise<void> => {
    if (message) {
      return this.mailer.sendMail({
        from: this.config.get('mailConfig.temporarySender'),
        to: mailOptions.to,
        html: htmlString(message, mailOptions.subject),
        subject: mailOptions.subject,
      })
    }

    return this.mailer.sendMail({
      ...mailOptions,
      from: this.config.get('mailConfig.temporarySender'),
    })
  }
}
