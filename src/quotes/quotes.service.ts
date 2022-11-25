import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { QuotesEntity } from './entities/quote.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(QuotesEntity)
    private repository: Repository<QuotesEntity>,
  ) {}

  create(dto: CreateQuoteDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(_id: number) {
    const find = await this.repository.findOne({ where: { id: _id } });

    if (!find) {
      throw new NotFoundException('quotes not found');
    }
    return this.repository.findOne({ where: { id: _id } });
  }

  async update(_id: number, dto: UpdateQuoteDto) {
    const find = await this.repository.findOne({ where: { id: _id } });

    if (!find) {
      throw new NotFoundException('quotes not found');
    }
    return this.repository.update(_id, dto);
  }

  async remove(_id: number) {
    const find = await this.repository.findOne({ where: { id: _id } });

    if (!find) {
      throw new NotFoundException('quotes not found');
    }
    return this.repository.delete(_id);
  }
}
