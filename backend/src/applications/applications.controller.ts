import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common'
import { ApplicationsService } from './applications.service'
import { CreateApplicationDto } from './dto/create-application.dto'
import { FormsService } from '../forms/forms.service'
import { Application } from './schemas/application.schema'
import { MailerService } from '../mailer/mailer.service'
import { SendEmailToApplicantDto } from './dto/send-email-application.dto'
import { SendEmailResponse } from './types'

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly formsService: FormsService,
    private readonly mailService: MailerService
  ) {}

  @Post(':id/sendMail')
  async sendEmailToApplicant(
    @Body() sendEmailToApplicantDto: SendEmailToApplicantDto,
    @Param('id') id: string
  ): Promise<SendEmailResponse> {
    const applicantEmail = (
      await this.applicationsService.findApplicationById(id)
    ).email

    if (!applicantEmail) {
      throw new NotFoundException('applicant email not found')
    }

    // TODO: Consider fire and forget
    await this.mailService.sendMail(
      {
        subject: sendEmailToApplicantDto.subject,
        to: applicantEmail,
      },
      sendEmailToApplicantDto.content
    )

    return {
      status: 'success',
      email: applicantEmail,
    }
  }

  // TODO: Resolve this anti pattern. Ideally formId shouldn't be a param
  @Post(':formId')
  async createApplicationFromForm(
    @Body() createApplicationDto: CreateApplicationDto,
    @Param('formId') formId: string
  ): Promise<Application> {
    const retrievedForm = await this.formsService.findOne(formId)

    return this.applicationsService.create(createApplicationDto, retrievedForm)
  }

  @Get()
  async findAll(): Promise<Application[]> {
    return this.applicationsService.findAll()
  }

  @Get('find')
  async findApplicationsByFormId(
    @Query('formId') formId: string
  ): Promise<Application[]> {
    return this.applicationsService.findAllApplicationsByFormId(formId)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Application> {
    return this.applicationsService.findApplicationById(id)
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateApplicationDto: UpdateApplicationDto
  // ): Promise<Application> {
  //   return this.applicationsService.update(+id, updateApplicationDto)
  // }
}
