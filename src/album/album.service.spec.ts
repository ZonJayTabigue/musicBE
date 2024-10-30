/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { PrismaService } from '../prisma/prisma.service';
import { DeezerService } from '../deezer/deezer.service';
import { Prisma } from '@prisma/client';

describe('AlbumService', () => {
  let albumService: AlbumService;
  let prismaService: PrismaService;
  let deezerService: DeezerService;

  const mockPrismaService = {
    album: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockDeezerService = {
    fetchAndStoreAlbumsBySearch: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: DeezerService, useValue: mockDeezerService },
      ],
    }).compile();

    albumService = module.get<AlbumService>(AlbumService);
    prismaService = module.get<PrismaService>(PrismaService);
    deezerService = module.get<DeezerService>(DeezerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAlbums', () => {
    it('should return a list of albums', async () => {
      const page = 1;
      const limit = 10;
      const expectedAlbums = [{ id: 1, album_title: 'Album 1' }];

      (mockPrismaService.album.findMany as jest.Mock).mockResolvedValue(
        expectedAlbums,
      );

      const albums = await albumService.getAlbums(page, limit);
      expect(albums).toEqual(expectedAlbums);
      expect(mockPrismaService.album.findMany).toHaveBeenCalledWith({
        skip: (page - 1) * limit,
        take: limit,
      });
    });
  });

  describe('searchAlbums', () => {
    it('should call the DeezerService to fetch and store albums', async () => {
      const searchParam = 'test';
      const page = 1;
      const limit = 10;
      const expectedAlbums = [{ album_title: 'Album 1' }];

      (
        mockDeezerService.fetchAndStoreAlbumsBySearch as jest.Mock
      ).mockResolvedValue(expectedAlbums);

      const albums = await albumService.searchAlbums(searchParam, page, limit);
      expect(albums).toEqual(expectedAlbums);
      expect(
        mockDeezerService.fetchAndStoreAlbumsBySearch,
      ).toHaveBeenCalledWith(searchParam, page, limit);
    });
  });

  describe('getAlbumById', () => {
    it('should return an album by ID', async () => {
      const albumId = 1;
      const expectedAlbum = { id: albumId, album_title: 'Album 1' };

      (mockPrismaService.album.findUnique as jest.Mock).mockResolvedValue(
        expectedAlbum,
      );

      const album = await albumService.getAlbumById(albumId);
      expect(album).toEqual(expectedAlbum);
      expect(mockPrismaService.album.findUnique).toHaveBeenCalledWith({
        where: { id: albumId },
        include: { tracks: true },
      });
    });
  });

  describe('createAlbum', () => {
    it('should create a new album', async () => {
      const albumData: Prisma.AlbumCreateInput = {
        album_title: 'New Album',
        artist_name: 'New Artist',
        release_date: new Date(),
        album_cover_image: '',
        album_cover_small: '',
        album_cover_medium: '',
        album_cover_big: '',
        album_cover_xl: ''
      };

      (mockPrismaService.album.create as jest.Mock).mockResolvedValue(
        albumData,
      );

      const album = await albumService.createAlbum(albumData);
      expect(album).toEqual(albumData);
      expect(mockPrismaService.album.create).toHaveBeenCalledWith({
        data: albumData,
      });
    });
  });

  describe('updateAlbum', () => {
    it('should update an existing album', async () => {
      const albumId = 1;
      const updateData: Prisma.AlbumUpdateInput = {
        album_title: 'Updated Album',
      };

      const expectedAlbum = { id: albumId, album_title: 'Updated Album' };

      (mockPrismaService.album.update as jest.Mock).mockResolvedValue(
        expectedAlbum,
      );

      const album = await albumService.updateAlbum(albumId, updateData);
      expect(album).toEqual(expectedAlbum);
      expect(mockPrismaService.album.update).toHaveBeenCalledWith({
        where: { id: albumId },
        data: updateData,
      });
    });
  });

  describe('deleteAlbum', () => {
    it('should delete an album by ID', async () => {
      const albumId = 1;
      const expectedResponse = { id: albumId };

      (mockPrismaService.album.delete as jest.Mock).mockResolvedValue(
        expectedResponse,
      );

      const response = await albumService.deleteAlbum(albumId);
      expect(response).toEqual(expectedResponse);
      expect(mockPrismaService.album.delete).toHaveBeenCalledWith({
        where: { id: albumId },
      });
    });
  });
});
