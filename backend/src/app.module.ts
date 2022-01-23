import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { HelmetMiddleware } from 'middlewares/helmet.middleware'
import { SessionMiddleware } from 'middlewares/session.middleware'
import { ConfigModule } from 'config/config.module'
import { AuthModule } from 'auth/auth.module'
import { OtpModule } from 'otp/otp.module'
import { MailerModule } from 'mailer/mailer.module'
import { TerminusModule } from '@nestjs/terminus'
import { HealthModule } from './health/health.module'
import { FormsModule } from './forms/forms.module'
import { MongooseModule } from '@nestjs/mongoose'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigService } from './config/config.service'

@Module({
  imports: [
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
    FormsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // Apply global middlewares
    consumer.apply(HelmetMiddleware, SessionMiddleware).forRoutes('*')
  }
}
