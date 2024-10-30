/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DeezerService } from './deezer.service';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

jest.mock('axios');

describe('DeezerService', () => {
  let service: DeezerService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    album: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeezerService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<DeezerService>(DeezerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAndStoreAlbumsBySearch', () => {
    it('should fetch and store albums successfully', async () => {
      const searchParam = 'test';
      const page = 1;
      const limit = 10;

      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: {
          data: [
            {
              album: {
                id: 1,
                title: 'Album 1',
              },
              artist: {
                name: 'Artist 1',
              },
            },
          ],
        },
      });

      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: {
          cover: 'cover_url',
          cover_small: 'cover_small_url',
          cover_medium: 'cover_medium_url',
          cover_big: 'cover_big_url',
          cover_xl: 'cover_xl_url',
          title: 'Album 1',
          artist: {
            name: 'Artist 1',
          },
          release_date: '2024-01-01',
          tracks: {
            data: [
              {
                title: 'Track 1',
                duration: 180,
                preview: 'preview_url',
              },
            ],
          },
        },
      });

      (prismaService.album.findFirst as jest.Mock).mockResolvedValueOnce(null);

      (prismaService.album.create as jest.Mock).mockResolvedValueOnce({
        id: 1,
        album_cover_image: 'cover_url',
        album_title: 'Album 1',
        artist_name: 'Artist 1',
        release_date: new Date('2024-01-01'),
      });

      const albums = await service.fetchAndStoreAlbumsBySearch(
        searchParam,
        page,
        limit,
      );
      expect(albums).toHaveLength(1);
      expect(albums[0]).toHaveProperty('album_title', 'Album 1');
      expect(prismaService.album.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if no albums are found', async () => {
      const searchParam = 'notfound';
      const page = 1;
      const limit = 10;

      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: {
          data: [],
        },
      });

      await expect(
        service.fetchAndStoreAlbumsBySearch(searchParam, page, limit),
      ).rejects.toThrow('No albums found for this search term: notfound');
    });
  });
});
