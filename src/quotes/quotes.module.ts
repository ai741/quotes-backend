import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotesEntity } from './entities/quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuotesEntity])],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
