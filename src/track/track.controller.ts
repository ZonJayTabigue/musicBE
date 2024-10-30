/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { TrackService } from './track.service';
import { Prisma } from '@prisma/client';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async createTrack(@Body() trackData: Prisma.TrackCreateInput) {
    return this.trackService.createTrack(trackData);
  }
}
