/* eslint-disable prettier/prettier */
import { Controller, Post, Query } from '@nestjs/common';
import { DeezerService } from './deezer.service';

@Controller('deezer')
export class DeezerController {
  constructor(private readonly deezerService: DeezerService) {}

  @Post('fetch-and-store-albums')
  async fetchAndStoreAlbumsBySearch(
    @Query('searchParam') searchParam: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.deezerService.fetchAndStoreAlbumsBySearch(searchParam, page, limit);
  }
}
