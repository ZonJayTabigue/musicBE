/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DeezerController } from './deezer.controller';
import { DeezerService } from './deezer.service';

describe('DeezerController', () => {
  let controller: DeezerController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: DeezerService;

  const mockDeezerService = {
    fetchAndStoreAlbumsBySearch: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeezerController],
      providers: [{ provide: DeezerService, useValue: mockDeezerService }],
    }).compile();

    controller = module.get<DeezerController>(DeezerController);
    service = module.get<DeezerService>(DeezerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAndStoreAlbumsBySearch', () => {
    it('should return albums from the service', async () => {
      const searchParam = 'test';
      const page = 1;
      const limit = 10;
      const expectedAlbums = [{ album_title: 'Album 1' }];

      (
        mockDeezerService.fetchAndStoreAlbumsBySearch as jest.Mock
      ).mockResolvedValue(expectedAlbums);

      const result = await controller.fetchAndStoreAlbumsBySearch(
        searchParam,
        page,
        limit,
      );
      expect(result).toEqual(expectedAlbums);
      expect(
        mockDeezerService.fetchAndStoreAlbumsBySearch,
      ).toHaveBeenCalledWith(searchParam, page, limit);
    });
  });
});
