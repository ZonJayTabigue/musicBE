import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { DeezerService } from '../deezer/deezer.service';

@Module({
  imports: [PrismaModule],
  providers: [AlbumService, DeezerService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
