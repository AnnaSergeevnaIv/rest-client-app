import { METHODS } from '@/components/MethodUrlSelector/MethodUrlSelector.constants';
import { describe, vi } from 'vitest';
import { getData } from './getData';
import axios from 'axios';
import { getErrorMessage } from '@/common/utils';

vi.mock('axios', () => ({
  default: vi.fn(),
}));

vi.mock('@/common/utils', () => ({
  getErrorMessage: vi.fn(),
  showErrorToast: vi.fn(),
}));

describe('getData', () => {
  const mockFormData = {
    url: 'https://example.com',
    method: METHODS.GET,
    headers: [],
    body: undefined,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('should return data', async () => {
    const mockReturnAxiosData = {
      status: 200,
      statusText: 'OK',
      headers: {},
      data: 'some data',
    };
    const mockReturnData = {
      data: {
        status: 200,
        statusText: 'OK',
        headers: {},
        body: 'some data',
      },
      error: null,
    };
    vi.mocked(getErrorMessage).mockReturnValue('');
    vi.mocked(axios).mockResolvedValue(mockReturnAxiosData);
    const result = await getData(mockFormData);
    expect(result).toStrictEqual(mockReturnData);
  });
  test('should return error', async () => {
    const errorMessage = 'Network error';
    vi.mocked(getErrorMessage).mockReturnValue(errorMessage);
    vi.mocked(axios).mockRejectedValue(new Error('Network Error'));
    const result = await getData(mockFormData);
    expect(result).toStrictEqual({
      data: null,
      error: errorMessage,
    });
  });
});
