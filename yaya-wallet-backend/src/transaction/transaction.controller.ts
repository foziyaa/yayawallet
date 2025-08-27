import { Controller, Get, Query, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async findAll(@Query('p') page: string) {
    try {
      const pageNumber = parseInt(page, 10) || 1;
      return await this.transactionService.findAll(pageNumber);
    } catch (error) {
      // This will catch errors from the service and send a proper server error response
      throw new HttpException('Failed to fetch transactions', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('search')
  async search(@Body('query') query: string) {
    if (!query) {
      throw new HttpException('The "query" field is required', HttpStatus.BAD_REQUEST);
    }
    try {
        return await this.transactionService.search(query);
    } catch (error) {
        throw new HttpException('Failed to search for transactions', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}