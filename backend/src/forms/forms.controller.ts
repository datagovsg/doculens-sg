import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { FormsService } from './forms.service'
import { CreateFormDto } from './dto/create-form.dto'
import { UpdateFormDto } from './dto/update-form.dto'
import { Form } from './schemas/form.schema'

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  async create(@Body() createFormDto: CreateFormDto): Promise<Form> {
    return this.formsService.create(createFormDto)
  }

  @Get()
  async findAll(): Promise<Form[]> {
    return this.formsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Form> {
    return this.formsService.findOne(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(id, updateFormDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.formsService.delete(id)
  }
}
