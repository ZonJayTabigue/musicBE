/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Delete, Put, Query, Body } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Prisma } from '@prisma/client';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbums(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.albumService.getAlbums(Number(page), Number(limit));
  }

  @Get(':id')
  async getAlbum(@Param('id') id: number) {
    return this.albumService.getAlbumById(Number(id));
  }

  @Post()
  async createAlbum(@Body() albumData: Prisma.AlbumCreateInput) {
    return this.albumService.createAlbum(albumData);
  }

  @Put(':id')
  async updateAlbum(@Param('id') id: number, @Body() albumData: Prisma.AlbumUpdateInput) {
    return this.albumService.updateAlbum(Number(id), albumData);
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id: number) {
    return this.albumService.deleteAlbum(Number(id));
  }
}