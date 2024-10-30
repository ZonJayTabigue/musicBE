/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAlbums(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.prisma.album.findMany({
      skip,
      take: limit,
      // include: { tracks: true },
    });
  }

  async getAlbumById(id: number) {
    return this.prisma.album.findUnique({
      where: { id },
      include: { tracks: true },
    });
  }

  async createAlbum(data: Prisma.AlbumCreateInput) {
    return this.prisma.album.create({
      data,
    });
  }

  async updateAlbum(id: number, data: Prisma.AlbumUpdateInput) {
    return this.prisma.album.update({
      where: { id },
      data,
    });
  }

  async deleteAlbum(id: number) {
    return this.prisma.album.delete({
      where: { id },
    });
  }
}
