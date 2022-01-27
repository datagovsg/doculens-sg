import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { HelmetMiddleware } from 'middlewares/helmet.middleware'
import { SessionMiddleware } from 'middlewares/session.middleware'
import { ConfigModule } from 'config/config.module'
import { AuthModule } from 'auth/auth.module'
import { OtpModule } from 'otp/otp.module'
import { MailerModule } from 'mailer/mailer.module'
import { TerminusModule } from '@nestjs/terminus'
import { HealthModule } from './health/health.module'
import { AttachmentModule } from './S3/s3.module'
import { FormsModule } from './forms/forms.module'
import { MongooseModule } from '@nestjs/mongoose'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigService } from './config/config.service'
import { ApplicationsModule } from './applications/applications.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
      serveStaticOptions: {
        maxAge: 2 * 60 * 60 * 1000, // 2 hours, same as cloudflare
        setHeaders: function (res, path) {
          // set maxAge to 0 for root index.html
          if (
            path ===
            join(__dirname, '..', '..', 'frontend', 'build', 'index.html')
          ) {
            res.setHeader('Cache-control', 'public, max-age=0')
          }
        },
      },
    }),
    ConfigModule,
    OtpModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return { uri: configService.get('mongoUrl') }
      },
      inject: [ConfigService],
    }),
    MailerModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite', // TO-DO: change to production database dialect
      autoLoadModels: true, // TO-DO: remove in production
      synchronize: true, // TO-DO: remove in production
    }),
    AuthModule,
    TerminusModule,
    HealthModule,
    AttachmentModule,
    FormsModule,
    ApplicationsModule,
    TextractModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // Apply global middlewares
    consumer.apply(HelmetMiddleware, SessionMiddleware).forRoutes('*')
  }
}
