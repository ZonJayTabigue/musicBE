/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Prisma } from '@prisma/client';

describe('AlbumController', () => {
  let albumController: AlbumController;
  let albumService: AlbumService;

  const mockAlbumService = {
    getAlbums: jest.fn(),
    searchAlbums: jest.fn(),
    getAlbumById: jest.fn(),
    createAlbum: jest.fn(),
    updateAlbum: jest.fn(),
    deleteAlbum: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [{ provide: AlbumService, useValue: mockAlbumService }],
    }).compile();

    albumController = module.get<AlbumController>(AlbumController);
    albumService = module.get<AlbumService>(AlbumService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAlbums', () => {
    it('should return a list of albums', async () => {
      const page = 1;
      const limit = 10;
      const expectedAlbums = [{ id: 1, album_title: 'Album 1' }];

      (mockAlbumService.getAlbums as jest.Mock).mockResolvedValue(
        expectedAlbums,
      );

      const albums = await albumController.getAlbums(page, limit);
      expect(albums).toEqual(expectedAlbums);
      expect(mockAlbumService.getAlbums).toHaveBeenCalledWith(page, limit);
    });
  });

  describe('searchAlbums', () => {
    it('should return albums based on search', async () => {
      const searchParam = 'test';
      const page = 1;
      const limit = 10;
      const expectedAlbums = [{ album_title: 'Album 1' }];

      (mockAlbumService.searchAlbums as jest.Mock).mockResolvedValue(
        expectedAlbums,
      );

      const albums = await albumController.searchAlbums(
        searchParam,
        page,
        limit,
      );
      expect(albums).toEqual(expectedAlbums);
      expect(mockAlbumService.searchAlbums).toHaveBeenCalledWith(
        searchParam,
        page,
        limit,
      );
    });
  });

  describe('getAlbum', () => {
    it('should return an album by ID', async () => {
      const albumId = 1;
      const expectedAlbum = { id: albumId, album_title: 'Album 1' };

      (mockAlbumService.getAlbumById as jest.Mock).mockResolvedValue(
        expectedAlbum,
      );

      const album = await albumController.getAlbum(albumId);
      expect(album).toEqual(expectedAlbum);
      expect(mockAlbumService.getAlbumById).toHaveBeenCalledWith(albumId);
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

      (mockAlbumService.createAlbum as jest.Mock).mockResolvedValue(albumData);

      const album = await albumController.createAlbum(albumData);
      expect(album).toEqual(albumData);
      expect(mockAlbumService.createAlbum).toHaveBeenCalledWith(albumData);
    });
  });

  describe('updateAlbum', () => {
    it('should update an existing album', async () => {
      const albumId = 1;
      const updateData: Prisma.AlbumUpdateInput = {
        album_title: 'Updated Album',
      };

      const expectedAlbum = { id: albumId, album_title: 'Updated Album' };

      (mockAlbumService.updateAlbum as jest.Mock).mockResolvedValue(
        expectedAlbum,
      );

      const album = await albumController.updateAlbum(albumId, updateData);
      expect(album).toEqual(expectedAlbum);
      expect(mockAlbumService.updateAlbum).toHaveBeenCalledWith(
        albumId,
        updateData,
      );
    });
  });

  describe('deleteAlbum', () => {
    it('should delete an album by ID', async () => {
      const albumId = 1;
      const expectedResponse = { id: albumId };

      (mockAlbumService.deleteAlbum as jest.Mock).mockResolvedValue(
        expectedResponse,
      );

      const response = await albumController.deleteAlbum(albumId);
      expect(response).toEqual(expectedResponse);
      expect(mockAlbumService.deleteAlbum).toHaveBeenCalledWith(albumId);
    });
  });
});
