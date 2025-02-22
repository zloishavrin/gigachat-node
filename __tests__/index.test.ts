import { jest } from '@jest/globals';
import axios from 'axios';

import { GigaChat } from '../src/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GigaChatJS', () => {
  const config = {
    clientSecretKey: 'secret-key',
    isIgnoreTSL: true,
    isPersonal: true,
    autoRefreshToken: true,
    imgOn: true,
    imgPath: './__tests__/images/',
  };

  let client: GigaChat;

  beforeEach(() => {
    client = new GigaChat(config);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Создание токена', () => {
    it('Должен успешно создать токен', async () => {
      const mockTokenResponse = { data: { access_token: 'test_token' } };
      mockedAxios.post.mockResolvedValueOnce(mockTokenResponse);
      const tokenResponse = await client.createToken();

      expect(tokenResponse.access_token).toBe('test_token');
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });

    it('Должен обработать ошибку при создании токена', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));
      await expect(client.createToken()).rejects.toThrow(
        'Unknown error (create token): Error: Network error',
      );
    });
  });
});
