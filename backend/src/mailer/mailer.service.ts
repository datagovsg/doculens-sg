import { Injectable } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer'

import { ConfigService } from '../config/config.service'

@Injectable()
export class MailerService {
  constructor(private config: ConfigService) {}

  private mailer: Pick<Transporter, 'sendMail'> = this.config.get(
    'mailConfig.host'
  )
    ? nodemailer.createTransport({
        host: this.config.get('mailConfig.host'),
        port: this.config.get('mailConfig.port'),
        auth: {
          user: this.config.get('mailConfig.user'),
          pass: this.config.get('mailConfig.password'),
        },
      })
    : {
        sendMail: (options: SendMailOptions) => {
          Logger.log(JSON.stringify(options, null, 2))
          return Promise.resolve(options)
        },
      }

  sendMail = async (mailOptions: SendMailOptions): Promise<void> => {
    return this.mailer.sendMail({
      ...mailOptions,
      from: this.config.get('mailConfig.temporarySender'),
    })
  }
}
