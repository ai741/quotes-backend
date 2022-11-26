export class SearchQuoteDto {
  text?: string;
  category?: string;
  views?: 'DESC' | 'ASC';
  limit?: number;
  take?: number;
  tags?: string;
}
