import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}

  create(dto: CreateCommentDto) {
    return this.repository.save({
      text: dto.text,
      quote: { id: dto.quotesId },
    });
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

  async update(_id: number, dto: UpdateCommentDto) {
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
