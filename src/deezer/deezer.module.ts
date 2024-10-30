/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DeezerService } from './deezer.service';
import { DeezerController } from './deezer.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DeezerService],
  controllers: [DeezerController],
})
export class DeezerModule {}
