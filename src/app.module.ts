/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { DeezerModule } from './deezer/deezer.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [DeezerModule, AlbumModule, TrackModule],
  providers: [PrismaService],
})
export class AppModule {}
