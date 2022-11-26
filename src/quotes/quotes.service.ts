import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { QuotesEntity } from './entities/quote.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchQuoteDto } from './dto/search-quotes.dto';

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
    return this.repository.find({
      order: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(_id: number) {
    const qb = await this.repository.createQueryBuilder('quotes');

    await qb
      .whereInIds(_id)
      .update()
      .set({
        views: () => 'views + 1',
      })
      .execute();

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

  async popular() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('views', 'DESC');
    qb.limit(10);

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
    };
  }

  async search(dto: SearchQuoteDto) {
    const qb = this.repository.createQueryBuilder('s');

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);

    if (dto.views) {
      qb.orderBy('views', dto.views);
    }

    if (dto.text) {
      qb.andWhere(`s.text LIKE :text`);
    }

    if (dto.category) {
      qb.andWhere(`s.category LIKE :category`);
    }

    if (dto.tags) {
      qb.andWhere(`s.tags LIKE :tags`);
    }

    qb.setParameters({
      text: `%${dto.text}%`,
      category: `%${dto.category}%`,
      tags: `%${dto.tags}%`,
    });

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }
}
